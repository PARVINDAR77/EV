import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  centered = false,
  dark = false,
  className = ""
}) => {
  return (
    <div className={`section-header ${centered ? 'text-center' : ''} ${className}`}>
      {badge && (
        <div style={{ marginBottom: '12px' }}>
          <span className={`badge ${dark ? 'badge-dark' : ''}`}>{badge}</span>
        </div>
      )}
      <h2 style={{ color: dark ? 'var(--text-inverse)' : 'var(--deep-green)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="subheading" style={{ color: dark ? 'var(--text-inverse-muted)' : 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
