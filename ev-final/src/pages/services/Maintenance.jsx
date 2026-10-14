import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, RefreshCw, Cpu, Headphones, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import ContactCTA from '../../components/ContactCTA';

export const Maintenance = () => {
  return (
    <div className="services-page">
      {/* Header */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Ongoing Support"
            title="EV Charger Maintenance & AMC Services"
            subtitle="Preventive maintenance schedules, 24/7 cloud telemetry alerting, genuine replacement parts, and guaranteed on-site technician response."
          />
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>Operational Reliability</span>
              <h2 style={{ fontSize: '1.875rem', marginBottom: '16px' }}>
                Protecting your investment and maintaining high station uptime
              </h2>
              <p>
                A broken charger generates zero revenue and damages driver trust. In high-traffic locations, downtime can mean lost customers and negative public reviews.
              </p>
              <p>
                Our annual maintenance contracts (AMCs) ensure your hardware stays in optimal health. We perform periodic physical contactor checks, cable wear assessments, thermal camera scans to detect hot spots, and prompt field servicing when required.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/contact" className="btn btn-primary btn-sm">
                  Inquire About AMC Plans <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
                <img 
                  src="/images/services/maintenance.jpg" 
                  alt="Axion Charge maintenance and testing engineer" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="eager" 
                />
              </div>
            </div>
          </div>

          {/* Service Matrix */}
          <SectionHeading 
            badge="What We Provide"
            title="Comprehensive maintenance coverage"
            centered={true}
          />

          <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Activity size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>24/7 Remote Monitoring</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Our cloud NOC tracks heartbeat signals from every station. Any sudden disconnect, earth fault, or communication drop automatically triggers a support ticket.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Quarterly Preventive Visits</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Field technicians clean air filters, inspect connector pins for physical wear, test breaker trip thresholds, and re-torque all internal electrical connections.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <RefreshCw size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Local Spares Inventory</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                We maintain genuine replacement cables, contactors, power supply units, and motherboards in our Ahmedabad warehouse, minimizing repair delays.
              </p>
            </div>
          </div>

        </div>
      </section>

      <ContactCTA 
        title="Need maintenance or emergency service for your chargers?"
        description="Call our dedicated operations line at +91 99799 93396 or submit an AMC inquiry."
      />
    </div>
  );
};

export default Maintenance;
