import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Wrench, Headphones, ArrowRight, Building, Award } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ContactCTA from '../components/ContactCTA';

export const About = () => {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="About Axion Charge"
            title="Building practical charging infrastructure for India's electric mobility"
            subtitle="Headquartered in Ahmedabad, Gujarat, we design, deploy, and manage EV charging hardware and software built specifically for real Indian operating conditions."
          />
        </div>
      </section>

      {/* Narrative & Company Overview */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>
                Bridging the gap between vehicle adoption and reliable charging
              </h2>
              <p>
                India’s transition to electric mobility is not held back by vehicle technology—it is held back by accessible, predictable, and working charging infrastructure where vehicles are actually parked.
              </p>
              <p>
                Too many charging stations suffer from prolonged downtime, confusing billing, incompatible plugs, or electrical faults caused by voltage swings and extreme summer heat.
              </p>
              <p>
                At Axion Charge, our mission is straightforward: build rugged AC wallboxes and fast DC chargers that comply with Indian electrical standards, paired with intuitive cloud software that makes charging simple for drivers and profitable for property hosts.
              </p>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <img 
                  src="/images/about/infrastructure.jpg" 
                  alt="Axion Charge infrastructure deployment" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Engineering Standards"
            title="What defines our hardware and software"
            subtitle="Four core pillars guide our development and deployment across all locations."
            centered={true}
          />

          <div className="grid-4">
            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={22} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Grid-Ready Hardware</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Tolerant of voltage fluctuations, dust, and monsoon rain with IP65 ingress protection and certified 6mA DC residual current trip devices.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Cpu size={22} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Open Protocols (OCPP)</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Our systems adhere strictly to OCPP 1.6J standards, ensuring you are never locked into a closed proprietary vendor ecosystem.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Wrench size={22} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Certified Installation</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                We provide complete turnkey installation—from meter room cable trenching and earthing pits to final safety approvals and commissioning.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Headphones size={22} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Local Gujarat NOC</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Network operations and customer support handled directly from our Ahmedabad office, ensuring fast resolution times for hosts and drivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities & Address */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: 'var(--space-10)', backgroundColor: 'var(--bg-secondary)', borderStyle: 'solid' }}>
            <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-8)' }}>
              <div>
                <span className="badge" style={{ marginBottom: '12px' }}>Corporate Headquarters</span>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>AXION CHARGE PRIVATE LIMITED</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.6' }}>
                  509, Skywalk The Element, Jagatpur Road, off SG Highway,<br />
                  Ahmedabad, Gujarat 382470, India
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <Link to="/contact" className="btn btn-primary btn-sm">Contact Our Team</Link>
                  <Link to="/franchise" className="btn btn-secondary btn-sm">Partner Opportunities</Link>
                </div>
              </div>

              <div>
                <img 
                  src="/images/about/partnership.jpg" 
                  alt="Business partnership at Axion Charge" 
                  style={{ borderRadius: 'var(--radius-md)', width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactCTA />
    </div>
  );
};

export default About;
