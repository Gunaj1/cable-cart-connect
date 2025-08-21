import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Product } from '@/types/Product';

// Remove legacy local types and use unified Product from '@/types/Product'

type ProductQuickViewProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart?: (product: Product, quantity: number) => void;
  onViewDetails?: (product: Product) => void;
};

export default function ProductQuickView({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onViewDetails,
}: ProductQuickViewProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const hasProduct = !!product;

  // Up to 5 images for display (replicate main image to fill gallery)
  const images = useMemo(() => {
    if (!product) return [] as { src: string; alt?: string }[];
    const base = { src: product.image, alt: product.name };
    return [base, base, base, base, base];
  }, [product]);

  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setImageIndex(0);
  }, [images]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    },
    [isOpen, onClose]
  );
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current && e.target === modalRef.current) onClose();
    },
    [onClose]
  );

  const displayPrice = useMemo(() => {
    return product?.price ?? 0;
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    onAddToCart?.(product, qty);
  }, [onAddToCart, product, qty]);

  if (!isOpen) return null;

  const unifiedDescription = useMemo(() => {
    if (!product) return '';
    const parts: string[] = [];
    if (product.description) parts.push(product.description);
    const dd = product.detailedDescription;
    if (dd?.features && dd.features.length > 0) {
      parts.push(`Features: ${dd.features.slice(0, 5).join('; ')}`);
    }
    if (dd?.applications && dd.applications.length > 0) {
      parts.push(`Applications: ${dd.applications.slice(0, 5).join('; ')}`);
    }
    if (dd?.specifications && dd.specifications.length > 0) {
      parts.push(`Specifications: ${dd.specifications.slice(0, 5).join('; ')}`);
    }
    return parts.join(' ');
  }, [product]);

  return (
    <div
      ref={modalRef}
      onClick={onBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        overflowY: 'auto',
        padding: 20,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 14,
          width: 'min(95vw, 1100px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 36,
          padding: 36,
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          color: '#222',
        }}
      >
        {/* Left: Images */}
        <div style={{ position: 'relative', borderRadius: 14, boxShadow: '0 0 18px #ccc', userSelect: 'none' }}>
          {images.length > 0 ? (
            <>
              <img
                src={images[imageIndex].src}
                alt={images[imageIndex].alt || product?.name || 'Product image'}
                style={{
                  width: '100%',
                  borderRadius: 14,
                  objectFit: 'contain',
                  maxHeight: '75vh',
                  backgroundColor: '#fdfdfd',
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    style={navButtonStyles('left')}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                    aria-label="Next image"
                    style={navButtonStyles('right')}
                  >
                    ›
                  </button>
                </>
              )}
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginTop: 16,
                  overflowX: 'auto',
                  paddingBottom: 6,
                }}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    style={{
                      border: i === imageIndex ? '3px solid #0070f3' : '2px solid #ccc',
                      padding: 0,
                      borderRadius: 10,
                      cursor: 'pointer',
                      flexShrink: 0,
                      width: 72,
                      height: 72,
                      background: 'none',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt || `Thumbnail ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{ display: 'grid', placeItems: 'center', height: 400, color: '#aaa', fontSize: 20 }}
            >
              No Images Available
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ marginTop: 0, marginBottom: 8, fontWeight: '700', fontSize: 28 }}>{product?.name || 'Product'}</h1>

          <p style={{ color: '#0070f3', fontSize: 24, fontWeight: '700', marginTop: 2, marginBottom: 18 }}>
            ${displayPrice.toFixed(2)}
          </p>

          {unifiedDescription && (
            <section style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Description</h3>
              <p style={sectionTextStyle}>{unifiedDescription}</p>
            </section>
          )}

          {renderListSection('Features', product?.detailedDescription?.features)}
          {renderListSection('Applications', product?.detailedDescription?.applications)}
          {renderSpecificationsFromArray(product?.detailedDescription?.specifications)}

          <div style={{ marginBottom: 36 }}>
            <label htmlFor="qty-input" style={{ fontWeight: '600', fontSize: 16, display: 'block', marginBottom: 6 }}>
              Quantity
            </label>
            <input
              type="number"
              id="qty-input"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              style={{
                width: 110,
                padding: 12,
                fontSize: 16,
                borderRadius: 10,
                border: '1px solid #ccc',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <button
              onClick={handleAddToCart}
              disabled={!hasProduct}
              style={{
                flex: 1,
                backgroundColor: '#0070f3',
                color: 'white',
                fontWeight: '700',
                fontSize: 18,
                padding: '14px 0',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005bb5')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0070f3')}
            >
              Add to Cart
            </button>
            {hasProduct && onViewDetails && (
              <button
                onClick={() => product && onViewDetails(product)}
                style={{
                  flex: 1,
                  backgroundColor: '#f5f5f5',
                  fontWeight: '600',
                  fontSize: 18,
                  padding: '14px 0',
                  border: 'none',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e5e5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              >
                View Details
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                flex: 1,
                backgroundColor: '#eee',
                fontWeight: '600',
                fontSize: 18,
                padding: '14px 0',
                border: 'none',
                borderRadius: 12,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ccc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#eee')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const navButtonStyles = (pos: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  [pos]: 16,
  transform: 'translateY(-50%)',
  background: 'rgba(255, 255, 255, 0.85)',
  border: 'none',
  borderRadius: '50%',
  width: 38,
  height: 38,
  cursor: 'pointer',
  fontSize: 26,
  lineHeight: 1,
  fontWeight: '700',
  boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
  userSelect: 'none',
});

const sectionStyle: React.CSSProperties = {
  marginBottom: 24,
};

const sectionTitleStyle: React.CSSProperties = {
  borderBottom: '2px solid #ddd',
  paddingBottom: 8,
  marginBottom: 14,
  fontWeight: 700,
  fontSize: 20,
};

const sectionTextStyle: React.CSSProperties = {
  color: '#444',
  lineHeight: 1.7,
  fontSize: 16,
};

function renderListSection(title: string, items?: string[]) {
  if (!items || items.length === 0) return null;
  return (
    <section style={sectionStyle}>
      <h3 style={sectionTitleStyle}>{title}</h3>
      <ul style={{ listStyle: 'disc', paddingLeft: 24, color: '#444', fontSize: 16, lineHeight: 1.6 }}>
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function renderSpecificationsFromArray(specs?: string[]) {
  if (!specs || specs.length === 0) return null;
  return (
    <section style={sectionStyle}>
      <h3 style={sectionTitleStyle}>Specifications</h3>
      <ul style={{ listStyle: 'disc', paddingLeft: 24, color: '#444', fontSize: 16, lineHeight: 1.6 }}>
        {specs.map((spec, idx) => (
          <li key={idx}>{spec}</li>
        ))}
      </ul>
    </section>
  );
}