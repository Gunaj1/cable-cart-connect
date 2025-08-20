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
  highResSrc?: string; // for higher quality images if available
};

type Product = {
  id: string;
  title: string;
  price: number;
  images?: Image[];
  content?: ProductContent; // detailed content object
  variants?: { id: string; name: string; price: number; inStock?: boolean }[];
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

  // Limit to 5 images max for better UI and performance
  const images = useMemo(() => {
    if (!product?.images) return [];
    return product.images.slice(0, 5);
  }, [product]);

  const variants = useMemo(() => product?.variants ?? [], [product]);

  const [imageIndex, setImageIndex] = useState(0);
  const initialVariantId = useMemo(() => (variants.length > 0 ? variants[0].id : undefined), [variants]);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(initialVariantId);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSelectedVariantId(variants.length > 0 ? variants.id : undefined);
  }, [variants]);

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

  // Helper to render list if exists
  const renderListSection = (title: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <section style={{ marginBottom: 20 }}>
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 12 }}>{title}</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: 20, color: '#444' }}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>
    );
  };

  // Helper to render specifications table
  const renderSpecifications = (specs?: Record<string, string>) => {
    if (!specs || Object.keys(specs).length === 0) return null;
    return (
      <section style={{ marginBottom: 20 }}>
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 12 }}>Specifications</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(specs).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '6px 10px', fontWeight: '600', color: '#333', width: '40%' }}>{key}</td>
                <td style={{ padding: '6px 10px', color: '#555' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  };

  return (
    <div
      ref={modalRef}
      onClick={onBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        overflowY: 'auto',
        padding: 20,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          width: 'min(95vw, 1100px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 32,
          padding: 30,
        }}
      >
        {/* Left: Image gallery carousel */}
        <div style={{ position: 'relative', borderRadius: 12, boxShadow: '0 0 12px #ddd' }}>
          {images.length > 0 ? (
            <>
              <img
                src={images[imageIndex].highResSrc || images[imageIndex].src}
                alt={images[imageIndex].alt || product?.title || 'Product image'}
                style={{ width: '100%', height: 'auto', borderRadius: 12, objectFit: 'contain', maxHeight: '70vh' }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 12,
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.8)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
                      cursor: 'pointer',
                      fontSize: 24,
                      lineHeight: 1,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Next image"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 12,
                      transform: 'translateY(-50%)',
                      background: 'rgba(255,255,255,0.8)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
                      cursor: 'pointer',
                      fontSize: 24,
                      lineHeight: 1,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    ›
                  </button>
                </>
              )}
              {/* Thumbnail strip below */}
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  marginTop: 12,
                  overflowX: 'auto',
                  paddingBottom: 4,
                }}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    style={{
                      border: i === imageIndex ? '2px solid #0070f3' : '2px solid transparent',
                      padding: 0,
                      borderRadius: 8,
                      cursor: 'pointer',
                      flexShrink: 0,
                      width: 60,
                      height: 60,
                      background: 'none',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt || `Product thumbnail ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }}
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{ display: 'grid', placeItems: 'center', height: 400, color: '#999', fontSize: 18 }}
            >
              No Images
            </div>
          )}
        </div>

        {/* Right: Product details */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 10 }}>
            <h2 style={{ margin: 0 }}>{product?.title || 'Product'}</h2>
            <p style={{ color: '#0070f3', fontSize: 22, fontWeight: '600', marginTop: 4 }}>
              ${displayPrice.toFixed(2)}
            </p>
          </div>

          {/* Detailed Sections from product.content */}
          {product?.content ? (
            <>
              {product.content.description && (
                <section style={{ marginBottom: 20 }}>
                  <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 12 }}>
                    Description
                  </h3>
                  <p style={{ color: '#444', lineHeight: 1.6 }}>{product.content.description}</p>
                </section>
              )}

              {renderListSection('Features', product.content.features)}
              {renderListSection('Applications', product.content.applications)}
              {renderSpecifications(product.content.specifications)}
            </>
          ) : (
            product?.description && (
              <p style={{ color: '#444', lineHeight: 1.6 }}>{product.description}</p>
            )
          )}

          {/* Variants */}
          {variants.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <label
                htmlFor="variant-select"
                style={{ display: 'block', fontWeight: '600', marginBottom: 6 }}
              >
                Variant
              </label>
              <select
                id="variant-select"
                value={selectedVariantId}
                onChange={(e) => setSelectedVariantId(e.target.value)}
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  fontSize: 16,
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

          {/* Quantity */}
          <div style={{ marginBottom: 30 }}>
            <label
              htmlFor="qty-input"
              style={{ display: 'block', fontWeight: '600', marginBottom: 6 }}
            >
              Quantity
            </label>
            <input
              id="qty-input"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
              style={{
                width: 100,
                padding: 10,
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 16,
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleAddToCart}
              disabled={!hasProduct}
              style={{
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 10,
                fontWeight: '600',
                cursor: 'pointer',
                flexGrow: 1,
                fontSize: 16,
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: '#eee',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 10,
                cursor: 'pointer',
                fontSize: 16,
                flexGrow: 1,
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper functions inside component
  function renderListSection(title: string, items?: string[]) {
    if (!items || items.length === 0) return null;
    return (
      <section style={{ marginBottom: 20 }}>
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 12 }}>{title}</h3>
        <ul style={{ listStyle: 'disc', paddingLeft: 20, color: '#444' }}>
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
      <section style={{ marginBottom: 20 }}>
        <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: 6, marginBottom: 12 }}>Specifications</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(specs).map(([key, value]) => (
              <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '6px 10px', fontWeight: '600', color: '#333', width: '40%' }}>
                  {key}
                </td>
                <td style={{ padding: '6px 10px', color: '#555' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}
