// src/components/ProductCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string | number;
  name: string;
  category_slug?: string;
  price?: string;
  image_url?: string;
  short_description?: string;
  features?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const uniformHighlights = [
    { label: 'Customization Available', icon: '🔧' },
    { label: 'Fluke Test Passed', icon: '✅' },
    { label: 'DCM Tested', icon: '🔬' },
    { label: 'OEM Supplier', icon: '🏭' }
  ];

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
    console.log(`Image improvement needed: ${product.name} (${product.image_url})`);
  };

  const getProductUrl = (): string => {
    const slug = product.category_slug || 'products';
    const productId =
      typeof product.id === 'string'
        ? product.id
        : String(product.id);
    return `/product/${slug}/${productId}`;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {imageError ? (
          <div className="image-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon">📷</div>
              <span>Image Coming Soon</span>
            </div>
          </div>
        ) : (
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
            onLoad={() => setImageLoaded(true)}
            onError={handleImageError}
            loading="lazy"
          />
        )}

        <div className="uniform-badges">
          {uniformHighlights.slice(0, 2).map((highlight, index) => (
            <span key={index} className="uniform-badge">
              <span className="badge-icon">{highlight.icon}</span>
              <span className="badge-text">{highlight.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.short_description && (
          <p className="product-description">
            {product.short_description.length > 100
              ? `${product.short_description.substring(0, 100)}...`
              : product.short_description}
          </p>
        )}
        <div className="product-price">
          ${parseFloat(product.price || '0').toFixed(2)}
        </div>
        {product.features && (
          <div className="features-preview">
            {product.features.split(',').slice(0, 2).map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature.trim()}
              </span>
            ))}
          </div>
        )}
        <div className="product-actions">
          <Link to={getProductUrl()} className="view-details-btn">
            View Details
          </Link>
          <button className="quick-add-btn">Quick Add</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
