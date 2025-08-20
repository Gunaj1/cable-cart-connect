import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ProductContent = {
  description?: string;
  features?: string[];
  applications?: string[];
  specifications?: Record<string, string>;
};

type Image = {
  src: string;
  alt?: string;
  highResSrc?: string;
};

type Variant = {
  id: string;
  name: string;
  price: number;
  inStock?: boolean;
};

type Product = {
  id: string;
  title: string;
  price: number;
  images?: Image[];
  content?: ProductContent; // Detailed content structure (same as search results)
  variants?: Variant[];
};

type ProductQuickViewProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null | undefined;
  onAddToCart?: (info: { productId: string; variantId?: string; quantity: number }) => void;
};

export default function ProductQuickView({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: ProductQuickViewProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const hasProduct = !!product;

  // Use up to 5 images for better UI, take from the product or empty array
  const images = useMemo(() => {
    if (!product?.images) return [];
    return product.images.slice(0, 5);
  }, [product]);

  // Variants or empty
  const variants = useMemo(() => product?.variants ?? [], [product]);

  // Manage states safely with stable hook order
  const [imageIndex, setImageIndex] = useState(0);
  const initialVariantId = useMemo(() => (variants.length > 0 ? variants[0].id : undefined), [variants]);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(initialVariantId);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSelectedVariantId(initialVariantId);
  }, [initialVariantId]);

  useEffect(() => {
    setImageIndex(0);
  }, [images]);

  // Close on ESC
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

  // Close on backdrop click
  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current && e.target === modalRef.current) onClose();
    },
    [onClose]
  );

  const selectedVariant = useMemo(() => {
    if (!selectedVariantId) return undefined;
    return variants.find((v) => v.id === selectedVariantId);
  }, [selectedVariantId, variants]);

  const displayPrice = useMemo(() => {
    if (selectedVariant) return selectedVariant.price;
    return product?.price ?? 0;
  }, [selectedVariant, product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    onAddToCart?.({
      productId: product.id,
      variantId: selectedVariant?.id,
      quantity: qty,
    });
  }, [onAddToCart, product, selectedVariant, qty]);

  const handleNextImage = useCallback(() => {
    if (images.length === 0) return;
    setImageIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    if (images.length === 0) return;
    setImageIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={onBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
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
          background: '#fff',
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
        {/* Left: Image gallery */}
        <div style={{ position: 'relative', borderRadius: 14, boxShadow: '0 0 18px #ccc', userSelect: 'none' }}>
          {images.length > 0 ? (
            <>
              <img
                src={images[imageIndex].highResSrc || images[imageIndex].src}
                alt={images[imageIndex].alt || product?.title || 'Product image'}
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
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    style={navButtonStyles('left')}
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Next image"
                    style={navButtonStyles('right')}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Thumbnails below */}
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

        {/* Right: Product details */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ marginTop: 0, marginBottom: 8, fontWeight: '700', fontSize: 28 }}>{product?.title || 'Product'}</h1>

          <p style={{ color: '#0070f3', fontSize: 24, fontWeight: '700', marginTop: 2, marginBottom: 18 }}>
            ${displayPrice.toFixed(2)}
          </p>

          {/* Content sections */}
          {product?.content ? (
            <>
              {product.content.description && (
                <section style={sectionStyle}>
                  <h3 style={sectionTitleStyle}>Description</h3>
                  <p style={sectionTextStyle}>{product.content.description}</p>
                </section>
              )}

              {renderListSection('Features', product.content.features)}
              {renderListSection('Applications', product.content.applications)}
              {renderSpecifications(product.content.specifications)}
            </>
          ) : (
            product?.description && (
              <p style={{ color: '#444', lineHeight: 1.7 }}>{product.description}</p>
            )
          )}

          {/* Variant selector */}
          {variants.length > 0 && (
            <div style={{ marginTop: 24, marginBottom: 30 }}>
              <label htmlFor="variant-select" style={{ fontWeight: '600', fontSize: 16, display: 'block', marginBottom: 6 }}>
                Choose Variant
              </label>
              <select
                id="variant-select"
                value={selectedVariantId}
                onChange={(e) => setSelectedVariantId(e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 10,
                  border: '1px solid #ccc',
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                {variants.map((v) => (
                  <option key={v.id} value={v.id} disabled={v.inStock === false}>
                    {v.name} {v.inStock === false ? '(Out of stock)' : ''}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity input */}
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

          {/* Action buttons */}
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

function renderSpecifications(specs?: Record<string, string>) {
  if (!specs || Object.keys(specs).length === 0) return null;
  return (
    <section style={sectionStyle}>
      <h3 style={sectionTitleStyle}>Specifications</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16, color: '#444' }}>
        <tbody>
          {Object.entries(specs).map(([key, value]) => (
            <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
              <td
                style={{
                  padding: '8px 14px',
                  fontWeight: '600',
                  width: '38%',
                  verticalAlign: 'top',
                }}
              >
                {key}
              </td>
              <td style={{ padding: '8px 14px', verticalAlign: 'top' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
