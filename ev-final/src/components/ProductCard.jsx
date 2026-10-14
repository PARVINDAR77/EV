import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { id, name, power, tagline, price, image, specs } = product;

  return (
    <div className="product-card">
      <div className="product-image-box">
        <img src={image} alt={name} loading="lazy" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span className="badge">{power}</span>
        {price && <span style={{ fontWeight: '700', color: 'var(--brand-green)', fontSize: '1rem' }}>{price}</span>}
      </div>

      <h3 style={{ fontSize: '1.1875rem', marginBottom: '4px', color: 'var(--deep-green)' }}>{name}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '12px' }}>
        {tagline}
      </p>

      {specs && (
        <ul className="product-specs-list">
          {Object.entries(specs).slice(0, 3).map(([key, val]) => (
            <li key={key}>
              <span className="spec-label">{key}:</span>
              <span className="spec-val">{val}</span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
        <Link to={`/product/${id}`} className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'space-between' }}>
          <span>View Details & Specs</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
