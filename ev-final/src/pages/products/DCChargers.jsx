import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading';
import ProductCard from '../../components/ProductCard';
import ContactCTA from '../../components/ContactCTA';
import { products } from '../../data/products';

export const DCChargers = () => {
  const dcList = products.filter(p => p.category === 'dc');

  return (
    <div className="product-category-page">
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Hardware Catalog"
            title="DC Fast Charging Power Stations"
            subtitle="High-output direct-current charging stations engineered for urban rapid charging, highway transit corridors, and commercial fleet depots (30 kW to 240 kW)."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 'var(--space-12)' }}>
            {dcList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Technical Guidance Note */}
          <div className="card" style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-secondary)', borderStyle: 'solid' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>DC Fast Charging Infrastructure Requirements</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              • <strong>Grid Connection:</strong> Requires dedicated commercial High Tension (HT) or robust 3-phase LT connection depending on transformer headroom.<br />
              • <strong>Dual Gun Matrix:</strong> Models from 60kW upward feature dual CCS2 guns with dynamic power sharing to service multiple vehicles at once.<br />
              • <strong>Compliance:</strong> Built to Indian AIS-138 Part 2 and IEC 61851-23 standards with automated emergency shutoffs and cloud telemetry.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA 
        title="Planning a DC fast charging deployment?"
        description="Our high-voltage team handles transformer evaluation, power sanction coordination, and civil bay preparation."
      />
    </div>
  );
};

export default DCChargers;
