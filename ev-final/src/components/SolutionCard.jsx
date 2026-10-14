import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const SolutionCard = ({
  title,
  badge,
  description,
  image,
  link
}) => {
  return (
    <article className="card">
      <div className="card-image-wrap">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="card-content">
        {badge && (
          <div style={{ marginBottom: '8px' }}>
            <span className="badge" style={{ fontSize: '0.7rem' }}>{badge}</span>
          </div>
        )}
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
        <div className="card-footer">
          <Link to={link} className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'space-between' }}>
            <span>Explore Solution</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SolutionCard;
