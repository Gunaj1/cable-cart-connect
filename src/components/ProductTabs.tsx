// src/components/ProductTabs.tsx
import React, { useEffect, useRef } from 'react';

interface Product {
  short_description?: string;
  features?: string;
  applications?: string;
}

interface SpecObj {
  [key: string]: any;
}

interface Highlight {
  label: string;
  icon: string;
  description: string;
}

interface ProductTabsProps {
  product: Product;
  specifications: SpecObj;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  uniformHighlights: Highlight[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product, specifications, activeTab, setActiveTab, uniformHighlights }) => {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        tabsRef.current.classList.toggle('sticky', tabsRef.current.getBoundingClientRect().top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Key Highlights' },
    { id: 'description', label: 'Detailed Description' },
    { id: 'specifications', label: 'Tech Specs' },
    { id: 'applications', label: 'Applications' },
    { id: 'certifications', label: 'Quality Certifications' },
    { id: 'faq', label: 'FAQ' },
    { id: 'reviews', label: 'Reviews' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="tab-content overview-content">
            <h3>Product Overview</h3>
            <p>{product.short_description || 'High-quality cable solution designed for professional applications.'}</p>
            <h4>Key Benefits</h4>
            <ul>
              <li>✅ Superior signal integrity and minimal interference</li>
              <li>🔧 Customizable configurations available</li>
              <li>🛡️ Durable construction for long-lasting performance</li>
              <li>⚡ Optimized for high-speed data transmission</li>
            </ul>
          </div>
        );
      case 'highlights':
        return (
          <div className="tab-content highlights-content">
            <h3>Key Highlights</h3>
            <div className="highlights-grid">
              {uniformHighlights.map((h, i) => (
                <div key={i} className="highlight-card">
                  <div className="highlight-icon-large">{h.icon}</div>
                  <h4>{h.label}</h4>
                  <p>{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'description':
        return (
          <div className="tab-content description-content">
            <h3>Detailed Description</h3>
            {product.short_description && (
              <section>
                <h4>Overview</h4>
                <p>{product.short_description}</p>
              </section>
            )}
            {product.features && (
              <section>
                <h4>Features & Benefits</h4>
                {product.features.split(',').map((f, i) => (
                  <div key={i} className="feature-detail">
                    <strong>{f.trim()}</strong>
                    <p>Enhanced performance and reliability for professional applications.</p>
                  </div>
                ))}
              </section>
            )}
            {product.applications && (
              <section>
                <h4>Applications</h4>
                <p>{product.applications}</p>
              </section>
            )}
            <section>
              <h4>Quality Assurance</h4>
              <p>Every cable undergoes Fluke and DCM testing for optimal performance.</p>
            </section>
          </div>
        );
      case 'specifications':
        return (
          <div className="tab-content specifications-content">
            <h3>Technical Specifications</h3>
            {Object.keys(specifications).length > 0 ? (
              <table className="specs-table">
                <tbody>
                  {Object.entries(specifications).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-label">{key}</td>
                      <td className="spec-value">{String(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Specifications will be available soon.</p>
            )}
          </div>
        );
      case 'applications':
        return (
          <div className="tab-content applications-content">
            <h3>Applications</h3>
            {product.applications ? (
              <div className="pills">
                {product.applications.split(',').map((a, i) => (
                  <span key={i} className="pill">{a.trim()}</span>
                ))}
              </div>
            ) : <p>No applications specified.</p>}
          </div>
        );
      default:
        return <p>Select a tab.</p>;
    }
  };

  return (
    <div className="product-tabs">
      <div className="tabs-navigation" ref={tabsRef}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={activeTab === t.id ? 'active' : ''}
            onClick={() => setActiveTab(t.id)}
          >{t.label}</button>
        ))}
      </div>
      <div className="tab-content-container">{renderTabContent()}</div>
    </div>
  );
};

export default ProductTabs;
