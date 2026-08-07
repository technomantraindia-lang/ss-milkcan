import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const categorySlug = product.categoryId;
  const productDetailUrl = `/products/${categorySlug}/${product.slug}`;

  const mainImage = (product.images && product.images.length > 0) 
    ? product.images[0] 
    : '/images/products/placeholder-main.jpg';

  const primaryApp = (product.primaryApplications && product.primaryApplications.length > 0)
    ? product.primaryApplications[0]
    : 'Industrial Processing';

  const handleQuoteClick = (e) => {
    e.preventDefault();
    navigate('/contact', {
      state: {
        category: product.categoryName || 'Dairy & Process Equipment',
        productName: product.name,
        enquiryType: 'Quote Request',
        sourcePage: productDetailUrl
      }
    });
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <Link to={productDetailUrl} tabIndex={-1} aria-hidden="true">
          <img 
            src={mainImage} 
            alt={`${product.name} - Jay AMBE Industries`} 
            className="product-card-img" 
            loading="lazy" 
          />
        </Link>
        <span className="product-card-app-badge">{primaryApp}</span>
      </div>

      <div className="product-card-body">
        <div className="product-card-category-label">{product.categoryName}</div>
        <h3 className="product-card-title">
          <Link to={productDetailUrl}>{product.name}</Link>
        </h3>
        <p className="product-card-desc">{product.shortDescription}</p>

        <div className="product-card-meta-list">
          <div className="product-card-meta-item">
            <span className="meta-dot">•</span>
            <span className="meta-text">Multiple capacities available</span>
          </div>
          <div className="product-card-meta-item">
            <span className="meta-dot">•</span>
            <span className="meta-text">Material options based on product & application</span>
          </div>
          <div className="product-card-meta-item">
            <span className="meta-dot">•</span>
            <span className="meta-text">Custom configurations available</span>
          </div>
        </div>

        <div className="product-card-actions">
          <Link to={productDetailUrl} className="product-btn-secondary">
            View Technical Details &rarr;
          </Link>
          <button onClick={handleQuoteClick} className="product-btn-primary">
            Request a Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
