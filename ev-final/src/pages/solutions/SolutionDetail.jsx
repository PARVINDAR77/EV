import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import ContactCTA from '../../components/ContactCTA';
import ProductCard from '../../components/ProductCard';
import { solutions } from '../../data/solutions';
import { products } from '../../data/products';

export const SolutionDetail = ({ solutionId }) => {
  const params = useParams();
  const id = solutionId || params.id || 'residential';
  const solution = solutions.find(s => s.id === id) || solutions[0];

  const recommendedProducts = products.filter(p => solution.recommendedHardware.includes(p.id));

  return (
    <div className="solution-detail-page">
      {/* Hero Header */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge={solution.badge}
            title={solution.title}
            subtitle={solution.heroTagline}
          />
        </div>
      </section>

      {/* Main Solution Content */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>Audience & Application</span>
              <h2 style={{ fontSize: '1.875rem', marginBottom: '16px' }}>{solution.summary}</h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <strong>Designed for:</strong> {solution.targetAudience}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
                <Link to="/contact" className="btn btn-primary btn-sm">
                  Request Site Survey <ArrowRight size={14} />
                </Link>
                <Link to="/calculator" className="btn btn-secondary btn-sm">
                  Calculate Payback
                </Link>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <img 
                  src={solution.image} 
                  alt={solution.title} 
                  style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '16/10', objectFit: 'cover' }}
                  loading="eager" 
                />
              </div>
            </div>
          </div>

          {/* Key Engineering Considerations */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <SectionHeading 
              badge="Engineering Focus"
              title="Key technical and operational considerations"
              subtitle="Addressing real-world infrastructure challenges before equipment is mounted."
            />

            <div className="grid-3">
              {solution.keyConsiderations.map((item, idx) => (
                <div key={idx} className="card">
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--brand-green-light)', color: 'var(--brand-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginBottom: '16px' }}>
                    0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Implementation */}
          <div style={{ marginBottom: 'var(--space-16)' }}>
            <SectionHeading 
              badge="Execution Roadmap"
              title="Implementation process for this setup"
            />

            <div className="card" style={{ padding: 'var(--space-8)', backgroundColor: 'var(--bg-secondary)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {solution.process.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: 'var(--deep-green)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8125rem', fontWeight: '700', flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--text-primary)', paddingTop: '2px' }}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Hardware */}
          {recommendedProducts.length > 0 && (
            <div>
              <SectionHeading 
                badge="Hardware Specification"
                title="Recommended charging equipment"
                subtitle="Certified units matched to the electrical requirements of this solution."
              />

              <div className="grid-3">
                {recommendedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CTA */}
      <ContactCTA 
        title={`Ready to explore ${solution.title} for your property?`}
        description="Our technical team will visit your site, inspect your panel capacity, and provide an itemized proposal."
      />
    </div>
  );
};

export default SolutionDetail;
