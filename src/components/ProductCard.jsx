import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  if (!product) return null;

  const categorySlug = product.categoryId;
  const productDetailUrl = `/products/${categorySlug}/${product.slug}`;

  const mainImage = (product.images && product.images.length > 0) 
    ? product.images[0] 
    : '/images/products/placeholder-main.jpg';

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
      </div>

      <div className="product-card-body">
        <div className="product-card-category-label">{product.categoryName}</div>
        <h3 className="product-card-title">
          <Link to={productDetailUrl}>{product.name}</Link>
        </h3>
        <p className="product-card-desc">{product.shortDescription}</p>

        <div className="product-card-actions">
          <Link to={productDetailUrl} className="product-btn-premium">
            Explore Model &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
