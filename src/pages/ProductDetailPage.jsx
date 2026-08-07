import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

import { products, getProductBySlug, getRelatedProducts, categories } from '../data/productsData';

import blueprintImg from '../assets/vessel_blueprint.png';
import weldingImg from '../assets/welding_close_up.png';
import polishingImg from '../assets/polishing_close_up.png';
import inspectionImg from '../assets/inspection_close_up.png';
import dispatchImg from '../assets/dispatch_loading.png';

gsap.registerPlugin(ScrollTrigger);

function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams();
  const navigate = useNavigate();

  const product = getProductBySlug(categorySlug, productSlug);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [brochureNoticeOpen, setBrochureNoticeOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const revealElements = gsap.utils.toArray('.detail-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [categorySlug, productSlug]);

  if (!product) {
    return (
      <div className="products-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111111', minHeight: '100vh' }}>
        <Navbar />
        <div className="container-centered" style={{ padding: '160px 24px 100px', textAlign: 'center' }}>
          <h2>Product Not Found</h2>
          <p style={{ marginTop: '12px', color: '#666666' }}>The requested equipment page is unavailable or has been relocated.</p>
          <Link to="/products" className="vort-btn-primary" style={{ marginTop: '24px', display: 'inline-block' }}>
            Back to Products Directory &rarr;
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  const galleryImages = (product.images && product.images.length > 0)
    ? product.images
    : [blueprintImg, polishingImg, inspectionImg];

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNextImage();
    } else if (diff < -50) {
      handlePrevImage();
    }
    setTouchStartX(null);
  };

  const handleQuoteClick = (e, customEnquiryType = 'Quote Request') => {
    if (e) e.preventDefault();
    navigate('/contact', {
      state: {
        category: product.categoryName,
        productName: product.name,
        enquiryType: customEnquiryType,
        sourcePage: `/products/${product.categoryId}/${product.slug}`
      }
    });
  };

  return (
    <div className="product-detail-wrapper" style={{ backgroundColor: '#ffffff', color: '#111111', minHeight: '100vh' }}>
      <Navbar />

      {/* PRODUCT DETAIL HERO */}
      <section className="detail-hero-section">
        <div className="container-centered">
          
          {/* Breadcrumbs */}
          <nav className="detail-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-sep">/</span>
            <Link to="/products">Products</Link>
            <span className="crumb-sep">/</span>
            <Link to={`/products#${product.categoryId}`}>{product.categoryName}</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{product.name}</span>
          </nav>

          <div className="detail-hero-grid">
            
            {/* GALLERY COMPONENT */}
            <div className="detail-gallery-container">
              <div 
                className="main-gallery-view" 
                onTouchStart={handleTouchStart} 
                onTouchEnd={handleTouchEnd}
              >
                <img 
                  src={galleryImages[selectedImageIndex]} 
                  alt={`${product.name} - View ${selectedImageIndex + 1}`} 
                  className="gallery-main-img" 
                  onClick={() => setLightboxOpen(true)}
                  title="Click to enlarge view"
                />
                
                <button 
                  className="gallery-nav-btn prev-btn" 
                  onClick={handlePrevImage} 
                  aria-label="Previous Image"
                >
                  &#8249;
                </button>
                <button 
                  className="gallery-nav-btn next-btn" 
                  onClick={handleNextImage} 
                  aria-label="Next Image"
                >
                  &#8250;
                </button>

                <span className="gallery-counter">
                  {selectedImageIndex + 1} / {galleryImages.length}
                </span>
              </div>

              {/* Thumbnails */}
              <div className="gallery-thumbnails-row">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View thumbnail ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* HERO PRODUCT INFO */}
            <div className="detail-hero-info">
              <span className="text-label-caps accent-red">{product.categoryName}</span>
              <h1 className="detail-product-title">{product.name}</h1>
              <p className="detail-short-desc">{product.shortDescription}</p>

              {/* Temporary Technical Badges */}
              <div className="detail-key-badges">
                <span className="detail-badge">Multiple Capacities Available</span>
                <span className="detail-badge">SS304 & SS316 Food-Grade</span>
                <span className="detail-badge">Export Seaworthy Packaging</span>
              </div>

              {/* Action Buttons */}
              <div className="detail-hero-actions">
                <button onClick={(e) => handleQuoteClick(e, 'Quote Request')} className="vort-btn-primary detail-action-btn">
                  Request a Quote &rarr;
                </button>
                <button onClick={() => setBrochureNoticeOpen(true)} className="vort-btn-secondary detail-action-btn">
                  Download Brochure
                </button>
              </div>

              {/* Quick Verification Disclaimer Notice */}
              <div className="detail-verification-notice">
                <span>ℹ️ Official engineering data sheet available on request. Technical specifications are customizable per site requirements.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OVERVIEW & KEY FEATURES */}
      <section className="detail-section overview-section detail-reveal">
        <div className="container-centered">
          <div className="detail-split-grid">
            <div className="detail-split-col">
              <h2 className="detail-section-heading">Product Overview</h2>
              <p className="detail-body-text">{product.overview}</p>

              <div className="detail-app-box">
                <h4>Primary Applications</h4>
                <div className="detail-app-tags">
                  {product.primaryApplications.map((app, i) => (
                    <span key={i} className="app-tag-pill">{app}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="detail-split-col">
              <h2 className="detail-section-heading">Key Features & Construction</h2>
              <ul className="detail-features-list">
                {product.features.map((feat, i) => (
                  <li key={i}>
                    <span className="feature-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL SPECIFICATIONS TABLE */}
      <section className="detail-section specs-section detail-reveal alt-bg">
        <div className="container-centered">
          <div className="section-title-block">
            <span className="text-label-caps accent-red">ENGINEERING DATA</span>
            <h2 className="detail-section-heading">Technical Specifications</h2>
            <p className="detail-sub-text">Standard parameters and customizable configuration options for {product.name}.</p>
          </div>

          <div className="specs-table-wrapper">
            <table className="specs-table">
              <thead>
                <tr>
                  <th style={{ width: '35%' }}>Technical Specification Parameter</th>
                  <th style={{ width: '65%' }}>Standard / Safe Temporary Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <tr key={idx}>
                    <td className="spec-name">{key}</td>
                    <td className="spec-val">{val}</td>
                  </tr>
                ))}
                <tr>
                  <td className="spec-name">Capacity Range</td>
                  <td className="spec-val">{product.capacities.join(', ')}</td>
                </tr>
                <tr>
                  <td className="spec-name">Material Options</td>
                  <td className="spec-val">{product.materials.join(', ')}</td>
                </tr>
                <tr>
                  <td className="spec-name">Export Suitability</td>
                  <td className="spec-val">{product.exportSuitable ? 'Full Export Ready (ISPM-15 Wooden Crating)' : 'Domestic / Standard Shipping'}</td>
                </tr>
                <tr>
                  <td className="spec-name">OEM / White-Label Availability</td>
                  <td className="spec-val">{product.oemAvailable ? 'Available on drawing approval' : 'Standard AMBE Branding'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CAPACITY, CUSTOMISATION & QUALITY */}
      <section className="detail-section options-section detail-reveal">
        <div className="container-centered">
          <div className="options-3col-grid">
            
            {/* Customisation Options */}
            <div className="option-card">
              <h3>Customisation Options</h3>
              <ul className="option-list">
                {product.customisationOptions.map((opt, i) => (
                  <li key={i}>• {opt}</li>
                ))}
              </ul>
            </div>

            {/* Standard & Optional Accessories */}
            <div className="option-card">
              <h3>Accessories & Outfits</h3>
              <div className="acc-group">
                <strong>Standard Included:</strong>
                <ul>
                  {product.standardAccessories.map((acc, i) => (
                    <li key={i}>✓ {acc}</li>
                  ))}
                </ul>
              </div>
              <div className="acc-group" style={{ marginTop: '16px' }}>
                <strong>Optional Accessories:</strong>
                <ul>
                  {product.optionalAccessories.map((acc, i) => (
                    <li key={i}>+ {acc}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quality Checks & Packaging */}
            <div className="option-card">
              <h3>Quality & Dispatch</h3>
              <div className="acc-group">
                <strong>Quality Inspections:</strong>
                <ul>
                  {product.qualityChecks.map((qc, i) => (
                    <li key={i}>✓ {qc}</li>
                  ))}
                </ul>
              </div>
              <div className="acc-group" style={{ marginTop: '16px' }}>
                <strong>Packaging & Delivery:</strong>
                <p style={{ fontSize: '13px', color: '#555555', marginTop: '6px', lineHeight: 1.5 }}>
                  {product.packaging}
                </p>
                <p style={{ fontSize: '12px', color: '#888888', marginTop: '4px' }}>
                  Dispatched: {product.delivery}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="detail-section related-section detail-reveal alt-bg">
        <div className="container-centered">
          <div className="section-title-block" style={{ marginBottom: '40px' }}>
            <span className="text-label-caps accent-red">SIMILAR EQUIPMENT</span>
            <h2 className="detail-section-heading">Related Products</h2>
          </div>

          <div className="products-grid-4col">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL PRODUCT ENQUIRY CTA */}
      <section className="detail-final-cta-section detail-reveal">
        <div className="container-centered">
          <div className="detail-final-box">
            <span className="text-label-caps accent-red">TECHNICAL DISCUSSIONS</span>
            <h2 className="detail-final-title">Request Quotation or Custom Engineering for {product.name}</h2>
            <p className="detail-final-desc">
              Connect directly with Jay AMBE Industries’ commercial engineering desk to receive exact technical parameters, capacity drawings, and export freight quotes.
            </p>
            <div className="detail-final-actions">
              <button onClick={(e) => handleQuoteClick(e, 'Quote Request')} className="vort-btn-primary">
                Request a Quote &rarr;
              </button>
              <button onClick={(e) => handleQuoteClick(e, 'Technical Discussion')} className="vort-btn-secondary light-border">
                Discuss Your Requirement
              </button>
              <button onClick={(e) => handleQuoteClick(e, 'Drawing Upload')} className="vort-btn-secondary light-border">
                Upload Your Drawing
              </button>
              <Link to="/exports" className="vort-btn-secondary light-border">
                Contact Export Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={() => setLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setLightboxOpen(false)}>✕</button>
            <img src={galleryImages[selectedImageIndex]} alt={product.name} className="lightbox-img" />
          </div>
        </div>
      )}

      {/* BROCHURE NOTICE MODAL */}
      {brochureNoticeOpen && (
        <div className="catalogue-modal-overlay" onClick={() => setBrochureNoticeOpen(false)}>
          <div className="catalogue-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setBrochureNoticeOpen(false)}>✕</button>
            <h3>Product Brochure Information</h3>
            <p style={{ marginTop: '12px', color: '#555555', lineHeight: '1.6' }}>
              The official technical brochure for <strong>{product.name}</strong> is currently being updated with certified client datasheets.
            </p>
            <p style={{ marginTop: '8px', color: '#888888', fontSize: '13px' }}>
              {product.brochure.note || 'Product brochure will be available soon.'}
            </p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <button onClick={(e) => { setBrochureNoticeOpen(false); handleQuoteClick(e, 'Brochure Request'); }} className="vort-btn-primary" style={{ flex: 1 }}>
                Request Spec Sheet via Email &rarr;
              </button>
              <button onClick={() => setBrochureNoticeOpen(false)} className="vort-btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetailPage;
