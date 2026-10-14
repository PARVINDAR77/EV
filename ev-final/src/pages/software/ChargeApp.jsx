import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, MapPin, CreditCard, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import ContactCTA from '../../components/ContactCTA';

export const ChargeApp = () => {
  return (
    <div className="software-page">
      {/* Header */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="Driver Experience"
            title="Axion Driver Mobile App"
            subtitle="The simple, intuitive mobile companion for electric vehicle owners across India to discover, reserve, and pay for charging sessions."
          />
        </div>
      </section>

      {/* Overview */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>Zero Friction</span>
              <h2 style={{ fontSize: '1.875rem', marginBottom: '16px' }}>
                Locate stations, check real-time availability, and pay with UPI
              </h2>
              <p>
                Nothing is more frustrating for an EV driver than driving to a charger only to find it occupied, out of service, or blocked.
              </p>
              <p>
                The Axion Driver App provides live status telemetry for all public and semi-public network chargers. See whether a gun is available, occupied, or under maintenance before you leave your driveway.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
                <span className="badge" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                  Android (Google Play)
                </span>
                <span className="badge" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                  iOS (Apple App Store)
                </span>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', maxWidth: '420px', margin: '0 auto', boxShadow: 'var(--shadow-md)' }}>
                <img 
                  src="/images/software/app-interface.jpg" 
                  alt="Axion Charge Mobile Driver App interface" 
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="eager" 
                />
              </div>
            </div>
          </div>

          {/* Key Features Grid */}
          <SectionHeading 
            badge="Driver Features"
            title="Designed for everyday convenience"
            centered={true}
          />

          <div className="grid-3" style={{ marginBottom: 'var(--space-16)' }}>
            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <MapPin size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Real-Time Live Map</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Filter chargers by AC or DC output, connector type (Type 2 / CCS2), and instant availability status with turn-by-turn navigation integration.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <CreditCard size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Direct UPI & Wallet Payment</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Pay directly using Google Pay, PhonePe, Paytm, or credit/debit cards with transparent per-unit GST tax invoices generated instantly.
              </p>
            </div>

            <div className="card">
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--brand-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Clock size={20} color="var(--brand-green)" />
              </div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>Remote Session Tracking</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Step away for a coffee or grocery shopping while monitoring your battery state of charge (SoC), charging speed, and session cost on your phone.
              </p>
            </div>
          </div>

        </div>
      </section>

      <ContactCTA 
        title="Looking to white-label a charging app for your fleet or society?"
        description="We offer custom-branded driver app deployments for large residential townships, commercial fleet operators, and hotel chains."
      />
    </div>
  );
};

export default ChargeApp;
