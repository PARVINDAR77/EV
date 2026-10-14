import React from 'react';
import SectionHeading from '../../components/SectionHeading';
import ProductCard from '../../components/ProductCard';
import ContactCTA from '../../components/ContactCTA';
import { products } from '../../data/products';

export const Accessories = () => {
  const accList = products.filter(p => p.category === 'accessories');

  return (
    <div className="product-category-page">
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Hardware Catalog"
            title="EV Cables, Pedestals & Accessories"
            subtitle="Essential hardware accessories to complete your charging installation—certified mounting pedestals, durable cables, and RFID management tokens."
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ marginBottom: 'var(--space-12)' }}>
            {accList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA 
        title="Need accessories or custom pedestal configurations?"
        description="We manufacture custom mounting pedestals and provide bulk RFID cards configured to your society or corporate CMS."
      />
    </div>
  );
};

export default Accessories;
