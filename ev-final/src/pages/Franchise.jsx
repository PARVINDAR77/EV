import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ContactCTA from '../components/ContactCTA';

export const Franchise = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    locationType: 'Commercial Complex / Mall',
    availablePowerKw: '30 kW - 60 kW',
    parkingBays: '2 - 4 Bays',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="franchise-page">
      {/* Header */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading 
            badge="B2B Commercial Partnership"
            title="Monetize commercial parking with Axion Charge"
            subtitle="Turn unused parking bays into revenue-generating EV charging hubs. We provide certified hardware, cloud billing, and technical operations."
          />
        </div>
      </section>

      {/* Overview & Models */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
            <div>
              <h2 style={{ fontSize: '1.875rem', marginBottom: '16px' }}>
                A structured opportunity for commercial property owners
              </h2>
              <p>
                As EV numbers rise in cities like Ahmedabad, Surat, Vadodara, and across Indian highway routes, drivers choose retail and commercial destinations that offer reliable charging.
              </p>
              <p>
                Axion Charge works with hotel owners, restaurant hubs, shopping complexes, and petrol pump operators to establish fast and destination charging stations with transparent revenue accounting.
              </p>
              <div style={{ marginTop: '24px' }}>
                <Link to="/calculator" className="btn btn-secondary btn-sm">
                  Run Numbers on ROI Calculator <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div>
              <img 
                src="/images/about/franchise.jpg" 
                alt="Commercial EV charging station host property" 
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'block' }}
                loading="lazy" 
              />
            </div>
          </div>

          {/* Partnership Models */}
          <SectionHeading 
            badge="Business Models"
            title="Flexible models tailored to your capital and space"
            centered={true}
          />

          <div className="grid-2" style={{ marginBottom: 'var(--space-16)' }}>
            <div className="card">
              <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>Model 01</span>
              <h3 style={{ fontSize: '1.375rem', marginBottom: '8px' }}>Franchise Owned, Franchise Operated (FOFO)</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                You invest in the charging hardware and installation. You retain the largest share of the charging tariff revenue, while Axion provides the cloud CMS, payment gateway, and network listing.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--brand-green)" /> Maximum per-unit profit margin</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--brand-green)" /> Full ownership of charging assets</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--brand-green)" /> Backed by 24/7 CMS and remote troubleshooting</li>
              </ul>
            </div>

            <div className="card">
              <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>Model 02</span>
              <h3 style={{ fontSize: '1.375rem', marginBottom: '8px' }}>Site Host Partnership (Revenue Share)</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                For high-traffic highway fuel pumps, prime malls, and restaurant food plazas. You provide the parking space and power connection; equipment deployment and operations are co-managed.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--brand-green)" /> Lower upfront capital expenditure</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--brand-green)" /> Predictable monthly parking revenue share</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="var(--brand-green)" /> Attracts high-spending EV driver footfall</li>
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-8)' }}>
            <h3 style={{ fontSize: '1.375rem', marginBottom: '6px' }}>Apply for Site Assessment</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Tell us about your property. Our business development team will evaluate the location and contact you to schedule an inspection.
            </p>

            {submitted ? (
              <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--brand-green-subtle)', border: '1px solid var(--brand-green)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: 'var(--brand-green)', marginBottom: '6px' }}>Application Submitted</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                  Thank you, {formState.name}. We have logged your property details ({formState.locationType} in {formState.city || 'your area'}). A franchise representative will call you at {formState.phone} within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label htmlFor="fName">Full Name *</label>
                    <input 
                      id="fName"
                      type="text" 
                      required 
                      value={formState.name} 
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Amit Shah"
                    />
                  </div>

                  <div>
                    <label htmlFor="fPhone">Contact Phone *</label>
                    <input 
                      id="fPhone"
                      type="tel" 
                      required 
                      value={formState.phone} 
                      onChange={e => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label htmlFor="fEmail">Email Address</label>
                    <input 
                      id="fEmail"
                      type="email" 
                      value={formState.email} 
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      placeholder="contact@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="fCity">Property City / Highway</label>
                    <input 
                      id="fCity"
                      type="text" 
                      value={formState.city} 
                      onChange={e => setFormState({ ...formState, city: e.target.value })}
                      placeholder="e.g. Ahmedabad, NH-48 Vadodara"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <label htmlFor="fType">Property Type</label>
                    <select 
                      id="fType"
                      value={formState.locationType}
                      onChange={e => setFormState({ ...formState, locationType: e.target.value })}
                    >
                      <option value="Commercial Complex / Mall">Commercial Complex / Mall</option>
                      <option value="Highway Food Plaza / Fuel Pump">Highway Food Plaza / Fuel Pump</option>
                      <option value="Hotel / Resort / Banquet">Hotel / Resort / Banquet</option>
                      <option value="Hospital / Healthcare Campus">Hospital / Healthcare Campus</option>
                      <option value="Standalone Commercial Plot">Standalone Commercial Plot</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="fPower">Estimated Power Available</label>
                    <select 
                      id="fPower"
                      value={formState.availablePowerKw}
                      onChange={e => setFormState({ ...formState, availablePowerKw: e.target.value })}
                    >
                      <option value="15 kW - 30 kW (AC Charging)">15 kW - 30 kW (AC Charging)</option>
                      <option value="30 kW - 60 kW (Fast DC)">30 kW - 60 kW (Fast DC)</option>
                      <option value="100 kW+ (Highway Fast DC)">100 kW+ (Highway Fast DC)</option>
                      <option value="Need Technical Assessment">Need Technical Assessment</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 'var(--space-5)' }}>
                  <label htmlFor="fMessage">Additional Site Information</label>
                  <textarea 
                    id="fMessage"
                    rows="3" 
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Briefly describe the location, parking bays available, and current electricity connection."
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  Submit Franchise Application
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* CTA */}
      <ContactCTA 
        title="Have questions about franchise requirements or power availability?"
        description="Call our commercial team directly at +91 99799 93397 or meet us at our Ahmedabad office."
      />
    </div>
  );
};

export default Franchise;
