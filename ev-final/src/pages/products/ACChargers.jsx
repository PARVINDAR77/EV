import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading';
import ProductCard from '../../components/ProductCard';
import ContactCTA from '../../components/ContactCTA';
import { products } from '../../data/products';

export const ACChargers = () => {
  const acList = products.filter(p => p.category === 'ac');

  return (
    <div className="product-category-page">
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Hardware Catalog"
            title="AC Charging Wallboxes"
            subtitle="Intelligent, compact alternating-current charging equipment designed for homes, residential apartment societies, workplaces, and retail destinations (3.3 kW to 22 kW)."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 'var(--space-12)' }}>
            {acList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Technical Guidance Note */}
          <div className="card" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-secondary)', borderStyle: 'solid' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Selecting the Right AC Power Rating in India</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              • <strong>3.3 kW / 16A:</strong> Suitable for standard residential single-phase connections (5kW sanction) where electrical load cannot be upgraded.<br />
              • <strong>7.4 kW / 32A:</strong> Ideal standard for private overnight home charging on single-phase. Delivers 40-50 km range per hour.<br />
              • <strong>11 kW & 22 kW:</strong> Require 3-phase 400V power. Highly recommended for commercial offices, hotels, and retail destinations.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA 
        title="Need guidance choosing an AC charger for your property?"
        description="Our engineers will check your sanctioned DISCOM power connection and recommend the ideal capacity."
      />
    </div>
  );
};

export default ACChargers;
