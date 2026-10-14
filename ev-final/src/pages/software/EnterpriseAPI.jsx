import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Server, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import ContactCTA from '../../components/ContactCTA';

export const EnterpriseAPI = () => {
  return (
    <div className="software-page">
      {/* Header */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Developer & Enterprise Integration"
            title="Axion Enterprise Charging API"
            subtitle="Secure REST APIs and real-time webhooks allowing fleet management systems, ERPs, and custom mobile apps to interact directly with charging hardware."
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>Headless Architecture</span>
              <h2 style={{ fontSize: '1.875rem', marginBottom: '16px' }}>
                Integrate EV charging into your existing operational software
              </h2>
              <p>
                Logistics companies, corporate transit operators, and real estate management portals don't need another standalone dashboard. They need charging telemetry flowing directly into their fleet dispatch tools.
              </p>
              <p>
                Our Enterprise API provides secure, token-authenticated endpoints for session start/stop, live power draw metrics, automated RFID synchronization, and raw metering data.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/contact" className="btn btn-primary btn-sm">
                  Request API Documentation & Sandbox Key <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: 'var(--space-6)' }}>
                <img 
                  src="/images/software/api-architecture.png" 
                  alt="Axion Enterprise API and Cloud Topology" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy" 
                />
              </div>
            </div>
          </div>

          {/* Endpoints & Use Cases */}
          <SectionHeading 
            badge="API Capabilities"
            title="Standard endpoints for enterprise integration"
            centered={true}
          />

          <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Session Telemetry</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Query active charging sessions, instantaneous kilowatt draw, battery voltage, cumulative kWh consumed, and session duration in real-time.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Fleet Remote Control</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Trigger remote start/stop commands programmatically when vans dock at depot bays based on your delivery dispatch schedules.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Webhooks & Event Streams</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Receive instant JSON payloads when a vehicle connects, completes charging, or encounters an emergency disconnect event.
              </p>
            </div>
          </div>

        </div>
      </section>

      <ContactCTA 
        title="Building custom charging software or fleet integrations?"
        description="Our engineering team provides dedicated technical onboarding, staging sandbox environments, and OpenAPI specs."
      />
    </div>
  );
};

export default EnterpriseAPI;
