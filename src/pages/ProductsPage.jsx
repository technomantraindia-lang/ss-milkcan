import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

import { categories, products, getProductsByCategory } from '../data/productsData';

import heroImg from '../assets/hero.png';
import factoryViewImg from '../assets/factory_view.png';
import blueprintImg from '../assets/vessel_blueprint.png';
import weldingImg from '../assets/welding_close_up.png';
import polishingImg from '../assets/polishing_close_up.png';
import inspectionImg from '../assets/inspection_close_up.png';
import dispatchImg from '../assets/dispatch_loading.png';
import milkCoolerImg from '../assets/milk_cooler.png';

gsap.registerPlugin(ScrollTrigger);

function ProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('milk-collection-handling');
  const [catalogueModalOpen, setCatalogueModalOpen] = useState(false);

  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Milk Collection & Handling',
    capacity: '',
    quantity: '1 Unit',
    application: '',
    destination: '',
    message: ''
  });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Check if URL has hash (e.g. #dairy-processing-equipment)
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
          setActiveCategory(targetId);
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }

    // Scroll trigger reveals
    const revealElements = gsap.utils.toArray('.products-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
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

    // Update active category on scroll
    const categorySections = categories.map(c => document.getElementById(c.id)).filter(Boolean);
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = categorySections.length - 1; i >= 0; i--) {
        const sec = categorySections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveCategory(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [location]);

  const handleNavClick = (e, categoryId) => {
    e.preventDefault();
    setActiveCategory(categoryId);
    const el = document.getElementById(categoryId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);
    setTimeout(() => {
      setEnquirySubmitted(false);
      alert('Thank you! Your product catalogue request and commercial inquiry have been logged under reference #JA-CAT-' + Math.floor(100000 + Math.random() * 900000) + '. Our engineering team will send the technical documentation to your email.');
      setEnquiryForm({
        name: '', company: '', email: '', phone: '',
        category: 'Milk Collection & Handling', capacity: '', quantity: '1 Unit',
        application: '', destination: '', message: ''
      });
      setCatalogueModalOpen(false);
    }, 600);
  };

  const handleCustomQuote = (type) => {
    navigate('/contact', {
      state: {
        category: 'Custom Stainless-Steel Fabrication',
        enquiryType: type,
        message: `I am interested in ${type} for Jay AMBE Industries.`
      }
    });
  };

  return (
    <div className="products-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111111', minHeight: '100vh' }}>
      <Navbar />

      {/* 1. PRODUCTS HERO */}
      <header className="about-hero-section" style={{ minHeight: '520px', backgroundColor: '#0a0a0a', display: 'flex', flexPosition: 'relative', overflow: 'hidden', alignItems: 'center' }}>
        <div className="about-hero-bg">
          <img src={factoryViewImg} alt="Jay AMBE Stainless Steel Manufacturing Facility" className="about-hero-bg-img" style={{ opacity: 0.35 }} />
          <div className="about-hero-overlay"></div>
        </div>

        <div className="container-centered about-hero-content" style={{ zIndex: 10, paddingTop: '110px', paddingBottom: '50px' }}>
          <div className="about-breadcrumbs" style={{ marginBottom: '16px' }}>
            <Link to="/" className="breadcrumb-link" style={{ color: '#aaaaaa', textDecoration: 'none' }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: '#666666', margin: '0 8px' }}>/</span>
            <span className="breadcrumb-active" style={{ color: '#ffffff', fontWeight: 600 }}>Products & Process Equipment</span>
          </div>

          <h1 className="about-hero-title" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, maxWidth: '880px' }}>
            Stainless Steel Equipment for Dairy, Food Processing & Institutional Applications
          </h1>

          <p className="about-hero-desc" style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#dddddd', lineHeight: 1.6, maxWidth: '750px', marginTop: '18px' }}>
            Jay AMBE Industries engineers standard and custom stainless-steel process machinery, sanitary storage vessels, bulk coolers, and mega-kitchen systems for milk collection, dairy processing, institutional canteens, and hygienic industrial facilities.
          </p>

          <div className="hero-cta-group" style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            <a href="#milk-collection-handling" onClick={(e) => handleNavClick(e, 'milk-collection-handling')} className="vort-btn-primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
              Explore Product Categories &rarr;
            </a>
            <button onClick={() => setCatalogueModalOpen(true)} className="vort-btn-secondary" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', background: 'rgba(255,255,255,0.05)', cursor: 'pointer' }}>
              Request Product Catalogue ↓
            </button>
          </div>
        </div>
      </header>

      {/* 2. STICKY CATEGORY NAVIGATION */}
      <nav className="products-sticky-category-nav" aria-label="Product Category Navigation">
        <div className="container-centered">
          <div className="products-cat-nav-inner">
            <span className="cat-nav-label">CATEGORIES:</span>
            <div className="products-cat-nav-links">
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={(e) => handleNavClick(e, cat.id)}
                  className={`cat-nav-link ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MILK COLLECTION & HANDLING SECTION */}
      <section className="product-category-section products-reveal" id="milk-collection-handling">
        <div className="container-centered">
          <div className="category-section-header">
            <div className="header-left">
              <span className="section-step-num">CATEGORY 01</span>
              <h2 className="text-headline-md font-strong">Milk Collection & Handling</h2>
              <p className="text-body-md section-desc-text">
                Sanitary stainless-steel milk collection cans, double-walled insulated cans, ice-chamber vessels, receiver buffer tanks, and milking machine cluster components built for hygienic raw milk intake and farm transit.
              </p>
            </div>
            <div className="header-right-meta">
              <span className="cat-meta-tag">7 Standard Products</span>
              <span className="cat-meta-tag">Sanitary Polish Ra &lt; 0.4 µm</span>
            </div>
          </div>

          <div className="products-grid-4col">
            {getProductsByCategory('milk-collection-handling').map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. DAIRY PROCESSING EQUIPMENT SECTION */}
      <section className="product-category-section products-reveal alt-bg" id="dairy-processing-equipment">
        <div className="container-centered">
          <div className="category-section-header">
            <div className="header-left">
              <span className="section-step-num">CATEGORY 02</span>
              <h2 className="text-headline-md font-strong">Dairy Processing Equipment</h2>
              <p className="text-body-md section-desc-text">
                Commercial direct-expansion (DX) bulk milk coolers, milk storage silos, batch pasteurisers, butter churners, paneer press stations, and motorized khoya and ghee boiling machines for dairy processing plants.
              </p>
            </div>
            <div className="header-right-meta">
              <span className="cat-meta-tag">9 Processing Systems</span>
              <span className="cat-meta-tag">Direct Expansion & Steam Jacket</span>
            </div>
          </div>

          {/* Featured Industrial Callout */}
          <div className="featured-category-banner">
            <div className="banner-image-box">
              <img src={milkCoolerImg} alt="Direct Expansion Bulk Milk Cooler" className="banner-img" />
            </div>
            <div className="banner-text-box">
              <span className="text-label-caps accent-red">FEATURED PROCESSING SYSTEM</span>
              <h3 className="banner-title">Direct-Expansion (DX) Bulk Milk Cooling Systems</h3>
              <p className="banner-desc">
                Engineered to rapidly chill raw milk from 35°C to 4°C within 3 hours. Features laser-welded dimple jackets, automatic digital temperature controllers, and slow-speed gear agitators to preserve milk quality.
              </p>
              <div className="banner-specs-pills">
                <span>250L to 5000L Capacities</span>
                <span>R404A / R134a Refrigerant</span>
                <span>CFC-Free PUF Insulation</span>
              </div>
              <button 
                onClick={() => navigate('/products/dairy-processing-equipment/bulk-milk-coolers')} 
                className="vort-btn-primary"
                style={{ marginTop: '16px', display: 'inline-block' }}
              >
                View Bulk Milk Cooler Specifications &rarr;
              </button>
            </div>
          </div>

          <div className="products-grid-4col">
            {getProductsByCategory('dairy-processing-equipment').map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. INSTITUTIONAL & MEGA KITCHEN EQUIPMENT SECTION */}
      <section className="product-category-section products-reveal" id="institutional-mega-kitchen-equipment">
        <div className="container-centered">
          <div className="category-section-header">
            <div className="header-left">
              <span className="section-step-num">CATEGORY 03</span>
              <h2 className="text-headline-md font-strong">Institutional & Mega Kitchen Equipment</h2>
              <p className="text-body-md section-desc-text">
                Heavy-duty steam cooking systems, rice cauldrons, daal & sambar kettles, insulated food distribution carriers, and commercial burner ranges engineered for central kitchens, canteens, hostels, and temple trusts.
              </p>
            </div>
            <div className="header-right-meta">
              <span className="cat-meta-tag">9 Institutional Solutions</span>
              <span className="cat-meta-tag">Centralized Steam & Gas</span>
            </div>
          </div>

          <div className="products-grid-4col">
            {getProductsByCategory('institutional-mega-kitchen-equipment').map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS & STORAGE EQUIPMENT SECTION */}
      <section className="product-category-section products-reveal alt-bg" id="process-storage-equipment">
        <div className="container-centered">
          <div className="category-section-header">
            <div className="header-left">
              <span className="section-step-num">CATEGORY 04</span>
              <h2 className="text-headline-md font-strong">Process & Storage Equipment</h2>
              <p className="text-body-md section-desc-text">
                Single-skin & jacketed stainless-steel storage tanks, agitated mixing vessels, 55-gallon export barrels, open-top process drums, and sugar syrup manufacturing vessels for food, beverage, and process industries.
              </p>
            </div>
            <div className="header-right-meta">
              <span className="cat-meta-tag">8 Liquid Handling Systems</span>
              <span className="cat-meta-tag">SS304 & SS316L Grades</span>
            </div>
          </div>

          <div className="products-grid-4col">
            {getProductsByCategory('process-storage-equipment').map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOM STAINLESS-STEEL FABRICATION SECTION */}
      <section className="custom-fab-section products-reveal" id="custom-stainless-steel-fabrication">
        <div className="container-centered">
          <div className="custom-fab-split-grid">
            <div className="fab-split-left">
              <span className="text-label-caps accent-red">SPECIALIZED FABRICATION DIVISION</span>
              <h2 className="text-headline-md font-strong fab-main-heading">
                Equipment Manufactured Around Your Process
              </h2>
              <p className="text-body-md fab-sub-text">
                Beyond our standard product lines, Jay AMBE Industries operates an OEM drawing-based custom stainless steel fabrication division. We manufacture custom vessels, jackets, and mechanical assemblies around your exact factory layouts and process parameters.
              </p>

              <div className="custom-capabilities-list-grid">
                <div className="cap-list-item">
                  <span className="cap-check">✓</span>
                  <div>
                    <strong>Custom Capacities & Dimensions</strong>
                    <p>Vessels engineered from 50L to 25,000L fitting specific floor space heights.</p>
                  </div>
                </div>

                <div className="cap-list-item">
                  <span className="cap-check">✓</span>
                  <div>
                    <strong>SS304, SS316 & SS316L Grades</strong>
                    <p>Certified prime sheet & pipe materials with full mill test reports.</p>
                  </div>
                </div>

                <div className="cap-list-item">
                  <span className="cap-check">✓</span>
                  <div>
                    <strong>Jacketed & Insulated Construction</strong>
                    <p>Dimple jackets, limpet coils, thermal oil jackets, and mineral wool insulation.</p>
                  </div>
                </div>

                <div className="cap-list-item">
                  <span className="cap-check">✓</span>
                  <div>
                    <strong>Agitator & Tilting Systems</strong>
                    <p>High-torque gearmotor mixers, scraper blades, VFD drives, and hydraulic tilt.</p>
                  </div>
                </div>

                <div className="cap-list-item">
                  <span className="cap-check">✓</span>
                  <div>
                    <strong>OEM & Drawing-Based Fabrication</strong>
                    <p>White-label production for international process consultants and plant contractors.</p>
                  </div>
                </div>
              </div>

              <div className="fab-actions-row">
                <button onClick={() => handleCustomQuote('Discuss Custom Manufacturing')} className="vort-btn-primary">
                  Discuss Custom Manufacturing &rarr;
                </button>
                <button onClick={() => handleCustomQuote('Drawing Upload')} className="vort-btn-secondary">
                  Upload Your Drawing
                </button>
              </div>
            </div>

            <div className="fab-split-right">
              <div className="fab-blueprint-visual-card">
                <img src={blueprintImg} alt="Jay AMBE Custom Stainless Steel Vessel Blueprint Engineering" className="fab-blueprint-img" />
                <div className="blueprint-overlay-card">
                  <span className="overlay-title">Engineering Desk Support</span>
                  <span className="overlay-desc">CAD Drawing Review • Material Certification • Hydrostatic Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MANUFACTURING & MATERIAL CAPABILITY BAND */}
      <section className="manufacturing-capabilities-band products-reveal">
        <div className="container-centered">
          <div className="mfg-band-grid">
            <div className="mfg-band-item">
              <div className="mfg-icon-wrap">
                <img src={weldingImg} alt="TIG Welding" />
              </div>
              <h4>Precision TIG Welding</h4>
              <p>Purged TIG welding producing smooth, crevice-free sanitary joint seams.</p>
            </div>

            <div className="mfg-band-item">
              <div className="mfg-icon-wrap">
                <img src={polishingImg} alt="Mirror Polishing" />
              </div>
              <h4>Mirror Polish Finish</h4>
              <p>Hygienic mechanical polishing achieving internal Ra &lt; 0.4 µm smoothness.</p>
            </div>

            <div className="mfg-band-item">
              <div className="mfg-icon-wrap">
                <img src={inspectionImg} alt="Quality Testing" />
              </div>
              <h4>Rigorous Quality Testing</h4>
              <p>Hydrostatic pressure hold, weld radiographing, and dimensional verification.</p>
            </div>

            <div className="mfg-band-item">
              <div className="mfg-icon-wrap">
                <img src={dispatchImg} alt="Seaworthy Packaging" />
              </div>
              <h4>Seaworthy Export Packing</h4>
              <p>ISPM-15 fumigated wooden crates and containerized lashing protocols.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRODUCT CATALOGUE & TECHNICAL ENQUIRY SECTION */}
      <section className="catalogue-enquiry-section products-reveal" id="catalogue-enquiry">
        <div className="container-centered">
          <div className="cat-enquiry-grid">
            <div className="cat-download-card">
              <span className="text-label-caps accent-red">OFFICIAL DOCUMENTATION</span>
              <h3>Request Technical Product Catalogue</h3>
              <p>
                Download or request our comprehensive product profile containing detailed dimensional layouts, material grades, capacity ranges, and application guidelines.
              </p>
              
              <div className="catalogue-features-list">
                <div className="cat-feat">📄 Complete 33-Product Lineup Overview</div>
                <div className="cat-feat">📐 Standard Vessel Dimension Drawings</div>
                <div className="cat-feat">🚢 International Export & Container Guidelines</div>
              </div>

              <div className="catalogue-placeholder-note">
                <span>Note: Official digital product catalogue is available on request. Safe temporary documentation will be provided upon submission.</span>
              </div>
            </div>

            <div className="cat-form-card">
              <h3>Technical Equipment Enquiry</h3>
              <p className="form-subtext">Share your capacity and process requirements. Our engineering desk will recommend the optimal equipment model.</p>

              <form onSubmit={handleEnquirySubmit} className="cat-form">
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={enquiryForm.name} 
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })} 
                      placeholder="e.g. Rajesh Kumar" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Organization *</label>
                    <input 
                      type="text" 
                      required 
                      value={enquiryForm.company} 
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, company: e.target.value })} 
                      placeholder="e.g. AMUL Cooperative / Dairy Plant" 
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      required 
                      value={enquiryForm.email} 
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })} 
                      placeholder="name@company.com" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone / WhatsApp *</label>
                    <input 
                      type="tel" 
                      required 
                      value={enquiryForm.phone} 
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })} 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Equipment Category</label>
                    <select 
                      value={enquiryForm.category} 
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, category: e.target.value })}
                    >
                      {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Required Capacity / Volume</label>
                    <input 
                      type="text" 
                      value={enquiryForm.capacity} 
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, capacity: e.target.value })} 
                      placeholder="e.g. 1000 Litres / 500 kg per batch" 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Application & Technical Requirements</label>
                  <textarea 
                    rows="3" 
                    value={enquiryForm.message} 
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })} 
                    placeholder="Describe your process, heating/cooling medium, or custom drawing requirements..."
                  ></textarea>
                </div>

                <button type="submit" className="vort-btn-primary form-submit-btn">
                  Ask Our Team to Recommend Equipment &rarr;
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL PRODUCT CTA */}
      <section className="final-product-cta-section products-reveal">
        <div className="container-centered">
          <div className="final-cta-box">
            <span className="text-label-caps accent-red">COMMERCIAL & ENGINEERING DESK</span>
            <h2 className="final-cta-title">
              Ready to Discuss Your Stainless Steel Equipment Requirement?
            </h2>
            <p className="final-cta-desc">
              Whether you need standard food-grade milk cans, automated bulk milk coolers, mega-kitchen cauldrons, or custom-engineered process tanks, Jay AMBE Industries manufactures both standard and customized configurations matching international specifications.
            </p>
            <div className="final-cta-buttons">
              <Link to="/contact" className="vort-btn-primary">
                Request a Quote &rarr;
              </Link>
              <button onClick={() => handleCustomQuote('Project Discussion')} className="vort-btn-secondary light-border">
                Discuss Your Project
              </button>
              <Link to="/exports" className="vort-btn-secondary light-border">
                Contact Export Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE REQUEST MODAL */}
      {catalogueModalOpen && (
        <div className="catalogue-modal-overlay">
          <div className="catalogue-modal-card">
            <button className="modal-close-btn" onClick={() => setCatalogueModalOpen(false)}>✕</button>
            <h3>Request Official AMBE Product Catalogue</h3>
            <p>Enter your contact details to receive our technical product documentation.</p>
            <form onSubmit={handleEnquirySubmit} style={{ marginTop: '16px' }}>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label>Your Name *</label>
                <input type="text" required placeholder="Full Name" value={enquiryForm.name} onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })} />
              </div>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label>Work Email *</label>
                <input type="email" required placeholder="name@company.com" value={enquiryForm.email} onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })} />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Phone Number *</label>
                <input type="tel" required placeholder="+91 98765 43210" value={enquiryForm.phone} onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })} />
              </div>
              <button type="submit" className="vort-btn-primary" style={{ width: '100%' }}>
                Download Product Catalogue &rarr;
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProductsPage;
