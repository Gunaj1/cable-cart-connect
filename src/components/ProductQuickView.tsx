import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Variant = {
  id: string;
  name: string;
  price: number;
  inStock?: boolean;
};

type Image = {
  src: string;
  alt?: string;
};

type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
  images?: Image[];
  variants?: Variant[];
};

type ProductQuickViewProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null | undefined;
  onAddToCart?: (payload: { productId: string; variantId?: string; quantity: number }) => void;
};

export default function ProductQuickView({
  isOpen,
  onClose,
  product,
  onAddToCart,
}: ProductQuickViewProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const hasProduct = !!product;

  const images = useMemo<Image[]>(() => (product?.images && product.images.length > 0 ? product.images : []), [product]);
  const variants = useMemo<Variant[]>(() => (product?.variants && product.variants.length > 0 ? product.variants : []), [product]);

  const [imageIndex, setImageIndex] = useState(0);
  const initialVariantId = useMemo(() => (variants.length > 0 ? variants[0].id : undefined), [variants]);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(initialVariantId);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSelectedVariantId(variants.length > 0 ? variants[0].id : undefined);
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
      if (modalRef.current && e.target === modalRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  const selectedVariant = useMemo(() => {
    if (!selectedVariantId) return undefined;
    return variants.find(v => v.id === selectedVariantId);
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
    setImageIndex(i => (i + 1) % images.length);
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    if (images.length === 0) return;
    setImageIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={onBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          width: 'min(92vw, 900px)',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          padding: 16,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>{hasProduct ? product!.title : 'Product'}</h2>
          <button onClick={onClose} aria-label="Close quick view">✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ position: 'relative', background: '#fafafa', borderRadius: 8, minHeight: 300 }}>
            {images.length > 0 ? (
              <>
                <img
                  src={images[Math.min(imageIndex, images.length - 1)].src}
                  alt={images[Math.min(imageIndex, images.length - 1)].alt || (hasProduct ? product!.title : 'Product image')}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                />
                {images.length > 1 && (
                  <div style={{ position: 'absolute', top: '50%', left: 8, right: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={handlePrevImage} aria-label="Previous image">‹</button>
                    <button onClick={handleNextImage} aria-label="Next image">›</button>
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: 'grid', placeItems: 'center', height: 300, color: '#888' }}>No image</div>
            )}
          </div>

          <div>
            <div style={{ marginBottom: 8, fontSize: 18, fontWeight: 600 }}>
              ${displayPrice.toFixed(2)}
            </div>

            {hasProduct && product!.description && (
              <p style={{ color: '#555', lineHeight: 1.5 }}>{product!.description}</p>
            )}

            {variants.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <label htmlFor="variant" style={{ display: 'block', marginBottom: 6 }}>Variant</label>
                <select
                  id="variant"
                  value={selectedVariantId}
                  onChange={(e) => setSelectedVariantId(e.target.value)}
                  style={{ width: '100%', padding: 8 }}
                >
                  {variants.map(v => (
                    <option key={v.id} value={v.id} disabled={v.inStock === false}>
                      {v.name} {v.inStock === false ? '(Out of stock)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
              <label htmlFor="qty">Qty</label>
              <input
                id="qty"
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                style={{ width: 80, padding: 6 }}
              />
            </div>

            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button
                onClick={handleAddToCart}
                disabled={!hasProduct}
                style={{ padding: '10px 14px' }}
              >
                Add to cart
              </button>
              <button onClick={onClose} style={{ padding: '10px 14px' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
