// src/components/ImageGallery.tsx
import React, { useState, useEffect } from 'react';

interface MediaItem {
  src: string;
  alt: string;
  type?: string;
}

interface VideoItem extends MediaItem {
  poster: string;
}

interface ImageGalleryProps {
  images: MediaItem[];
  video: VideoItem;
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, video, productName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [videoError, setVideoError] = useState(false);

  const allMedia: (MediaItem | VideoItem)[] = [...images];
  if (video && !videoError) {
    allMedia.push({ ...video, type: 'video' });
  }

  const handleImageError = (index: number) => {
    console.log(`Image improvement needed: ${productName} (${allMedia[index].src})`);
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleVideoError = () => {
    console.log(`Video improvement needed: ${productName} (${video.src})`);
    setVideoError(true);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction: 'next' | 'prev') => {
    const newIndex =
      direction === 'next'
        ? (lightboxIndex + 1) % allMedia.length
        : (lightboxIndex - 1 + allMedia.length) % allMedia.length;
    setLightboxIndex(newIndex);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex]);

  const renderMainMedia = () => {
    const current = allMedia[activeIndex];
    if (!current) return <div className="media-placeholder">No media available</div>;

    if ((current as VideoItem).poster && current.type === 'video') {
      return (
        <div className="main-video-container">
          <video
            controls
            poster={(current as VideoItem).poster}
            onError={handleVideoError}
          >
            <source src={current.src} type="video/mp4" />
            Your browser does not support video.
          </video>
          <div className="video-overlay" onClick={() => openLightbox(activeIndex)}>
            <div className="play-button">▶</div>
          </div>
        </div>
      );
    }

    return (
      <div className="main-image-container">
        {imageErrors[activeIndex] ? (
          <div className="media-placeholder">Image Coming Soon</div>
        ) : (
          <>
            <img
              src={current.src}
              alt={current.alt}
              onError={() => handleImageError(activeIndex)}
            />
            <div className="zoom-overlay" onClick={() => openLightbox(activeIndex)}>
              <div className="zoom-icon">🔍</div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderThumbnails = () => (
    <div className="thumbnails-container">
      {allMedia.map((item, idx) => (
        <button
          key={idx}
          className={`thumbnail ${idx === activeIndex ? 'active' : ''}`}
          onClick={() => setActiveIndex(idx)}
        >
          {item.type === 'video' ? (
            <div className="video-thumbnail">
              <img src={(item as VideoItem).poster} alt="Video" />
              <div className="video-play-icon">▶</div>
            </div>
          ) : (
            <img src={item.src} alt={item.alt} />
          )}
        </button>
      ))}
    </div>
  );

  const renderLightbox = () => {
    if (!lightboxOpen) return null;
    const current = allMedia[lightboxIndex];
    return (
      <div className="lightbox-overlay" onClick={closeLightbox}>
        <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          <div className="lightbox-content">
            {current.type === 'video' ? (
              <video controls autoPlay poster={(current as VideoItem).poster}>
                <source src={current.src} type="video/mp4" />
              </video>
            ) : (
              <img src={current.src} alt={current.alt} />
            )}
          </div>
          {allMedia.length > 1 && (
            <>
              <button className="lightbox-nav prev" onClick={() => navigateLightbox('prev')}>‹</button>
              <button className="lightbox-nav next" onClick={() => navigateLightbox('next')}>›</button>
            </>
          )}
          <div className="lightbox-counter">{lightboxIndex + 1}/{allMedia.length}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="image-gallery">
      <div className="main-media">{renderMainMedia()}</div>
      {allMedia.length > 1 && renderThumbnails()}
      {renderLightbox()}
    </div>
  );
};

export default ImageGallery;
