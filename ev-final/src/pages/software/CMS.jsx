import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, CheckCircle2, ShieldAlert, Cpu, BarChart3, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import ContactCTA from '../../components/ContactCTA';

export const CMS = () => {
  return (
    <div className="software-page">
      {/* Header */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Station Host Platform"
            title="Axion Charger Management System (CMS)"
            subtitle="Cloud-based station management software for commercial hosts, apartment societies, and charging network operators."
          />
        </div>
      </section>

      {/* Main CMS Features */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>Operational Control</span>
              <h2 style={{ fontSize: '1.875rem', marginBottom: '16px' }}>
                Full visibility over energy, revenue, and charger health
              </h2>
              <p>
                Operating EV charging equipment requires more than just mounting hardware. You need real-time data on who is charging, how many kilowatt-hours are consumed, and whether billing payments are settled accurately.
              </p>
              <p>
                The Axion CMS acts as your central command dashboard. It connects seamlessly to all Axion AC and DC chargers through standard OCPP 1.6J protocols, providing automatic alerts if a charger drops offline or encounters an electrical fault.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/contact" className="btn btn-primary btn-sm">
                  Schedule a CMS Demo <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
                <img 
                  src="/images/software/cms-dashboard.jpg" 
                  alt="Axion Charger Management System Dashboard" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="eager" 
                />
              </div>
            </div>
          </div>

          {/* Capabilities Grid */}
          <SectionHeading 
            badge="Verified Capabilities"
            title="What you can do from the station host portal"
            centered={true}
          />

          <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Dynamic Tariff & Rate Cards</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Set custom pricing per kilowatt-hour (₹/kWh) or session time. Configure peak-hour rates to match commercial grid tariffs or subsidized employee rates.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>User & Access Control</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Manage resident RFID cards, employee whitelist databases, or open public charging for walk-up drivers using QR code payments.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Automated Settlement</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Driver payments collected via UPI, credit/debit cards, and net banking are reconciled and deposited directly into the host’s registered bank account.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Remote Diagnostics & Reset</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Over 80% of minor software glitches can be diagnosed and rebooted remotely from the dashboard without waiting for an on-site technician.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Dynamic Load Balancing</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Intelligently balances power output across multiple chargers in the same parking lot to prevent tripping the building’s main circuit breaker.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Audit-Ready Reporting</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Generate monthly carbon savings certificates, electricity consumption logs, and financial statements for society AGMs and corporate sustainability audits.
              </p>
            </div>
          </div>

        </div>
      </section>

      <ContactCTA 
        title="Want to manage charging at your facility with Axion CMS?"
        description="We can set up a live demonstration showing how tariffs, RFID management, and monthly reports work."
      />
    </div>
  );
};

export default CMS;
