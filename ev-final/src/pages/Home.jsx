import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Activity, Cpu } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import SolutionCard from '../components/SolutionCard';
import ProductCard from '../components/ProductCard';
import ContactCTA from '../components/ContactCTA';
import { products } from '../data/products';

export const Home = () => {
  // 4 Featured Chargers for Hardware Section
  const featuredHardware = products.filter(p => ['ac-7-4kw', 'ac-22kw', 'dc-30kw', 'dc-120kw'].includes(p.id));

  return (
    <div className="home-page">
      {/* SECTION 2: HERO */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge-wrap">
              <span className="badge">
                <span className="badge-dot"></span>
                Indian EV Infrastructure
              </span>
            </div>

            <h1 className="hero-title">
              EV charging for the places we live, work and travel.
            </h1>

            <p className="hero-desc">
              Practical EV charging hardware and intelligent software for homes, residential societies, workplaces, commercial parking, and highway networks.
            </p>

            <div className="hero-actions">
              <Link to="/solutions/residential" className="btn btn-primary btn-lg">
                Explore Solutions <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                Talk to Our Team
              </Link>
            </div>

            <div className="hero-features-strip">
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Single & 3-Phase AC</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>Fast DC up to 240kW</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-icon" />
                <span>OCPP 1.6J Cloud CMS</span>
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-image-frame">
              <img 
                src="/images/home/hero-charging.jpg" 
                alt="Electric vehicle charging installation in India" 
                className="hero-image"
                loading="eager"
              />
              <div className="hero-caption">
                <strong>Real-World Deployment</strong>
                <span>Certified hardware tailored for Indian grid conditions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CHARGING SOLUTIONS */}
      <section id="solutions" className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Tailored Solutions"
            title="Charging designed for real-world properties"
            subtitle="Different spaces have different electrical loads and dwell times. We match your building with the right charger, sub-metering, and access control."
            centered={true}
          />

          <div className="grid-4">
            <SolutionCard 
              title="Residential Charging"
              badge="Homes & Apartments"
              description="Safe overnight charging for villas, private bungalows, and apartment society basements without exceeding sanctioned loads."
              image="/images/solutions/residential.jpg"
              link="/solutions/residential"
            />
            <SolutionCard 
              title="Commercial & Retail"
              badge="Malls & Hotels"
              description="Turn parking spaces into customer amenities and revenue streams with dynamic tariffs and contactless UPI payments."
              image="/images/solutions/commercial.jpg"
              link="/solutions/commercial"
            />
            <SolutionCard 
              title="Workplace & Offices"
              badge="Corporate Parks"
              description="Empower employees with reliable daily charging featuring smart load balancing to prevent building power spikes."
              image="/images/solutions/workplace.jpg"
              link="/solutions/workplace"
            />
            <SolutionCard 
              title="Fleet Logistics"
              badge="Depots & Vans"
              description="High-uptime DC fast charging depots engineered to keep last-mile e-commerce vans and passenger cabs moving."
              image="/images/solutions/fleet.jpg"
              link="/solutions/fleet"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: HARDWARE AND SOFTWARE */}
      <section className="section">
        <div className="container">
          <SectionHeading 
            badge="Hardware & Software"
            title="Reliable equipment paired with intelligent management"
            subtitle="Hardware built to withstand Indian summer heat, combined with cloud monitoring for automated billing and remote diagnostics."
          />

          {/* Dual Pillar Presentation */}
          <div className="grid-2" style={{ marginBottom: 'var(--space-12)' }}>
            
            {/* Pillar 1: Hardware */}
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={20} color="var(--brand-green)" />
                </div>
                <div>
                  <h3 style={{ marginBottom: '2px' }}>Charging Hardware</h3>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>AC Wallboxes (3.3kW–22kW) & DC Fast Chargers (30kW–240kW)</span>
                </div>
              </div>
              <p style={{ marginBottom: '20px' }}>
                Tested to comply with AIS-138 and IEC standards. Built with built-in Type A RCD and 6mA DC leakage protection, IP65/IP54 weatherproofing, and robust surge suppression.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <Link to="/products/ac-chargers" className="btn btn-secondary btn-sm">AC Chargers</Link>
                <Link to="/products/dc-chargers" className="btn btn-secondary btn-sm">DC Fast Chargers</Link>
                <Link to="/products/accessories" className="btn btn-secondary btn-sm">Cables & Accessories</Link>
              </div>
            </div>

            {/* Pillar 2: Software */}
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={20} color="var(--brand-green)" />
                </div>
                <div>
                  <h3 style={{ marginBottom: '2px' }}>Software & Operations</h3>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Station CMS, Driver App & Enterprise API</span>
                </div>
              </div>
              <p style={{ marginBottom: '20px' }}>
                The Axion CMS provides station hosts with live utilization metrics, per-unit billing settlement, RFID card management, and automated over-the-air firmware updates.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <Link to="/product/cms" className="btn btn-secondary btn-sm">Station CMS</Link>
                <Link to="/product/charge-app" className="btn btn-secondary btn-sm">Driver Mobile App</Link>
                <Link to="/product/enterprise-api" className="btn btn-secondary btn-sm">Enterprise API</Link>
              </div>
            </div>

          </div>

          {/* Featured Hardware Grid Preview */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-6)' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Featured Chargers</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Commonly specified for residential and commercial projects</p>
            </div>
            <Link to="/products/ac-chargers" className="btn btn-secondary btn-sm">
              View All Hardware <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-4">
            {featuredHardware.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Deployment Process"
            title="How an EV charging project gets done"
            subtitle="A clear, practical process from initial electrical assessment to completed commissioning."
            centered={true}
          />

          <div className="grid-4">
            <div className="card" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="step-num">01</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Discuss Requirements</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                We understand your property type, parking layout, expected vehicle traffic, and whether you intend to charge personal or commercial fleets.
              </p>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="step-num">02</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Evaluate Site & Power</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Our field engineers inspect your existing electrical panel, available transformer headroom, cable route distances, and earthing values.
              </p>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="step-num">03</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Finalize Solution</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                We prepare a transparent proposal specifying suitable charger power ratings, safety switchgear, mounting pedestals, and metering setups.
              </p>
            </div>

            <div className="card" style={{ backgroundColor: 'var(--bg-primary)' }}>
              <div className="step-num">04</div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Install & Commission</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Certified electricians execute cabling, protective conduit laying, testing, and connection to the Axion CMS management network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY AXION CHARGE */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)' }}>
            <div>
              <SectionHeading 
                badge="Why Choose Us"
                title="Practical engineering for India's real conditions"
                subtitle="We don't sell generic imported units with exaggerated claims. We engineer charging infrastructure that actually works on Indian power grids."
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={20} color="var(--brand-green)" />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>Grid & Voltage Fluctuation Resilience</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                      Wide operating voltage windows with automatic under/over-voltage cutoffs designed for Indian city and highway supply conditions.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Activity size={20} color="var(--brand-green)" />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>Transparent Sub-Metering & Billing</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                      Eliminates society and office disputes. Every unit consumed is logged and accounted for through certified MID meters or digital CMS records.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={20} color="var(--brand-green)" />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>Local Support from Ahmedabad, Gujarat</h4>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                      Our headquarters and technical teams are based right here in Ahmedabad off SG Highway, providing accessible field service and engineering backup.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <img 
                  src="/images/about/engineering.jpg" 
                  alt="Axion Charge engineering and inspection" 
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                  loading="lazy"
                />
                <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--bg-primary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ display: 'block', color: 'var(--deep-green)', fontSize: '1rem' }}>Corporate Headquarters</strong>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Skywalk The Element, Jagatpur Rd, Ahmedabad</span>
                    </div>
                    <Link to="/about" className="btn btn-secondary btn-sm">About Us</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL ENQUIRY CTA */}
      <ContactCTA 
        title="Planning EV charging for your property or business?"
        description="Tell us what you need. Our team can help you evaluate your power capacity and explore the appropriate charging setup."
        primaryButtonText="Discuss Your Requirements"
        primaryButtonLink="/contact"
      />

      <style>{`
        .hero-section {
          padding-top: var(--space-16);
          padding-bottom: var(--space-16);
          background-color: var(--bg-primary);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: var(--space-12);
          align-items: center;
        }

        .hero-badge-wrap {
          margin-bottom: var(--space-4);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--brand-green);
          display: inline-block;
        }

        .hero-title {
          font-size: clamp(2.5rem, 4.5vw, 3.5rem);
          color: var(--deep-green);
          line-height: 1.15;
          margin-bottom: var(--space-5);
          letter-spacing: -0.02em;
        }

        .hero-desc {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-8);
          max-width: 580px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }

        .hero-features-strip {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          padding-top: var(--space-6);
          border-top: 1px solid var(--border-color);
          flex-wrap: wrap;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .feature-icon {
          color: var(--brand-green);
        }

        .hero-image-frame {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          background-color: var(--bg-secondary);
        }

        .hero-image {
          width: 100%;
          height: auto;
          display: block;
          aspect-ratio: 4 / 3;
          object-fit: cover;
        }

        .hero-caption {
          padding: var(--space-4) var(--space-5);
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
        }

        .hero-caption strong {
          color: var(--deep-green);
          font-size: 0.875rem;
        }

        .hero-caption span {
          color: var(--text-secondary);
          font-size: 0.75rem;
          margin-top: 2px;
        }

        .step-num {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--brand-green);
          margin-bottom: var(--space-3);
          font-family: monospace;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
