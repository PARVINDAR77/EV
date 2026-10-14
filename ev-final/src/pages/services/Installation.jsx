import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Ruler, Zap, Hammer, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import ContactCTA from '../../components/ContactCTA';

export const Installation = () => {
  return (
    <div className="services-page">
      {/* Header */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Turnkey Services"
            title="End-to-End EV Charger Installation"
            subtitle="Professional site surveys, electrical panel upgrades, cable routing, earthing pits, and official commissioning across Gujarat and India."
          />
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>Safety & Electrical Standards</span>
              <h2 style={{ fontSize: '1.875rem', marginBottom: '16px' }}>
                Executed by certified electrical engineers, not ad-hoc wiring
              </h2>
              <p>
                EV charging stations draw high continuous electrical currents for hours at a time. Improper cable gauge, inadequate earthing, or missing residual current breakers pose severe fire hazards to building basements and vehicle batteries.
              </p>
              <p>
                Axion Charge manages the complete deployment pipeline with certified technicians. We measure cable run distances from your meter room, check transformer headroom, lay armored copper/aluminum power cables through fire-retardant conduits, and ensure compliant earthing resistance below 5 ohms.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/contact" className="btn btn-primary btn-sm">
                  Schedule Site Survey <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
                <img 
                  src="/images/services/installation.jpg" 
                  alt="Axion Charge engineering crew installing EV infrastructure" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="eager" 
                />
              </div>
            </div>
          </div>

          {/* 4-Step Deployment Roadmap */}
          <SectionHeading 
            badge="Engineering Stages"
            title="The 4-stage deployment process"
            centered={true}
          />

          <div className="grid-4" style={{ marginBottom: 'var(--space-16)' }}>
            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Ruler size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>01. Site & Load Survey</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                We inspect your existing panel board, available phase capacity, cable conduit path to the parking bay, and proximity to the main meter room.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Hammer size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>02. Civil & Conduit Works</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Laying heavy-gauge armored cabling, cutting trenches or mounting cable trays, installing concrete foundation plinths for pedestals if needed.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Zap size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>03. Electrical Safety</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Installing dedicated miniature circuit breakers (MCBs), Type A RCCBs with 6mA DC fault protection, and specialized chemical earthing electrode pits.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>04. Live Commissioning</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Testing insulation resistance, verifying cloud CMS connectivity over Wi-Fi/4G, conducting trial charging sessions, and official handover.
              </p>
            </div>
          </div>

        </div>
      </section>

      <ContactCTA 
        title="Planning a charger installation at your property?"
        description="Contact our electrical project managers to schedule a physical survey and receive a transparent quotation."
      />
    </div>
  );
};

export default Installation;
