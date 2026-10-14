import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Phone, FileText } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import ContactCTA from '../../components/ContactCTA';
import { products } from '../../data/products';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id) || products[0];

  return (
    <div className="product-detail-page">
      {/* Breadcrumb strip */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <Link to={product.category === 'ac' ? '/products/ac-chargers' : product.category === 'dc' ? '/products/dc-chargers' : '/products/accessories'} style={{ color: 'var(--text-secondary)' }}>
            {product.categoryName}
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--deep-green)', fontWeight: '600' }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase */}
      <section className="section">
        <div className="container">
          <div className="product-layout-grid">
            
            {/* Left: Product Image Box */}
            <div className="product-visual-box">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-main-img" />
              </div>
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span className="badge badge-dark" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                  Certified Indian Hardware
                </span>
              </div>
            </div>

            {/* Right: Product Details & Specs */}
            <div className="product-info-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge">{product.categoryName}</span>
                <span className="badge" style={{ backgroundColor: 'var(--deep-green)', color: '#FFFFFF' }}>{product.power}</span>
              </div>

              <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', marginBottom: '8px' }}>{product.name}</h1>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                {product.tagline}
              </p>

              {product.price && (
                <div style={{ marginBottom: '20px', padding: '12px 16px', backgroundColor: 'var(--brand-green-subtle)', borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Ex-Factory Price</span>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--brand-green)' }}>{product.price}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '6px' }}>+ GST & Installation</span>
                </div>
              )}

              <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '24px' }}>
                {product.description}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Request Quotation & Site Visit
                </Link>
                <Link to="/calculator" className="btn btn-secondary btn-lg">
                  Calculate ROI
                </Link>
              </div>

              {/* Verified Technical Specifications Table */}
              <div className="specs-table-card">
                <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'var(--deep-green)' }}>Technical Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    {Object.entries(product.specs).map(([label, val]) => (
                      <tr key={label}>
                        <td className="spec-name">{label}</td>
                        <td className="spec-value">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recommended Use Cases */}
              {product.useCases && (
                <div style={{ marginTop: '24px' }}>
                  <h4 style={{ fontSize: '0.9375rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Recommended Applications
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {product.useCases.map((useCase, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}>
                        <CheckCircle2 size={16} color="var(--brand-green)" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      <ContactCTA 
        title={`Looking to deploy the ${product.name}?`}
        description="Our sales and electrical engineering teams in Ahmedabad provide turnkey support from power evaluation to commissioning."
      />

      <style>{`
        .product-layout-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: var(--space-12);
          align-items: flex-start;
        }

        .product-visual-box {
          position: sticky;
          top: calc(var(--header-height) + 24px);
        }

        .product-image-container {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1;
        }

        .product-main-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .specs-table-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--space-5);
        }

        .specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .specs-table tr {
          border-bottom: 1px solid var(--border-subtle);
        }

        .specs-table tr:last-child {
          border-bottom: none;
        }

        .specs-table td {
          padding: 8px 4px;
        }

        .spec-name {
          color: var(--text-secondary);
          width: 45%;
        }

        .spec-value {
          color: var(--text-primary);
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .product-layout-grid {
            grid-template-columns: 1fr;
          }
          .product-visual-box {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
