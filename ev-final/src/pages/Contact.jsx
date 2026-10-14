import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export const Contact = () => {
  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    propertyType: 'Residential Apartment / Society',
    requirements: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.fullName.trim() || !formState.phone.trim()) {
      setErrorMsg('Please enter your full name and a valid phone number.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="section section-alt" style={{ paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <SectionHeading 
            badge="Contact & Field Support"
            title="Let's talk about your EV charging requirements"
            subtitle="Whether you represent an apartment RWA, a commercial property, a corporate office, or a fleet operation, our team in Ahmedabad is here to assist."
          />
        </div>
      </section>

      {/* Main Form & Contact Information */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            
            {/* Form Column */}
            <div className="contact-form-pane">
              <div className="card" style={{ padding: 'var(--space-8)' }}>
                <h3 style={{ marginBottom: '6px' }}>Send an Inquiry</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Fill out the form below. An infrastructure specialist will respond within 24 business hours.
                </p>

                {submitted ? (
                  <div className="success-box" role="status">
                    <CheckCircle2 size={32} color="var(--brand-green)" />
                    <div>
                      <h4 style={{ color: 'var(--brand-green)', marginBottom: '4px' }}>Inquiry Received</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', margin: 0 }}>
                        Thank you, {formState.fullName}. We have recorded your inquiry for <strong>{formState.propertyType}</strong>. Our team will contact you shortly at <strong>{formState.phone}</strong>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {errorMsg && (
                      <div className="error-box" role="alert">
                        <AlertCircle size={18} />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name <span className="req">*</span></label>
                        <input 
                          id="fullName"
                          name="fullName"
                          type="text" 
                          required
                          value={formState.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Rajesh Patel"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                        <input 
                          id="phone"
                          name="phone"
                          type="tel" 
                          required
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                          id="email"
                          name="email"
                          type="email" 
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="name@domain.com"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="city">City / Location</label>
                        <input 
                          id="city"
                          name="city"
                          type="text" 
                          value={formState.city}
                          onChange={handleChange}
                          placeholder="e.g. Ahmedabad, Surat, Rajkot"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="propertyType">Property / Deployment Type</label>
                      <select 
                        id="propertyType"
                        name="propertyType"
                        value={formState.propertyType}
                        onChange={handleChange}
                      >
                        <option value="Residential Apartment / Society">Residential Apartment / Society</option>
                        <option value="Private Villa / Bungalow">Private Villa / Bungalow</option>
                        <option value="Corporate Office / Tech Park">Corporate Office / Tech Park</option>
                        <option value="Shopping Mall / Retail Center">Shopping Mall / Retail Center</option>
                        <option value="Hotel / Hospital / Hospitality">Hotel / Hospital / Hospitality</option>
                        <option value="Commercial Fleet Logistics Depot">Commercial Fleet Logistics Depot</option>
                        <option value="Highway Petrol Pump / Restaurant Hub">Highway Petrol Pump / Restaurant Hub</option>
                        <option value="Franchise Opportunity Inquiry">Franchise Opportunity Inquiry</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message & Property Details</label>
                      <textarea 
                        id="message"
                        name="message"
                        rows="4" 
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Share any details about available electrical load, number of bays required, or your timeline."
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Office Info Column */}
            <div className="contact-info-pane">
              
              {/* Primary Office Card */}
              <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                <span className="badge" style={{ alignSelf: 'flex-start', marginBottom: '12px' }}>Corporate Headquarters</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>AXION CHARGE PRIVATE LIMITED</h3>
                
                <div className="contact-detail-item">
                  <MapPin size={20} className="detail-icon" />
                  <div>
                    <strong>Office Address:</strong>
                    <address style={{ fontStyle: 'normal', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.5' }}>
                      509, Skywalk The Element,<br />
                      Jagatpur Road, off SG Highway,<br />
                      Ahmedabad, Gujarat 382470, India
                    </address>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <Phone size={20} className="detail-icon" />
                  <div>
                    <strong>Direct Telephones:</strong>
                    <div style={{ marginTop: '2px', lineHeight: '1.6' }}>
                      <div><a href="tel:+919979993397" style={{ color: 'var(--deep-green)', fontWeight: '600' }}>+91 99799 93397</a> (Sales & Growth)</div>
                      <div><a href="tel:+919979993396" style={{ color: 'var(--deep-green)', fontWeight: '600' }}>+91 99799 93396</a> (Operations & Systems)</div>
                    </div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <Mail size={20} className="detail-icon" />
                  <div>
                    <strong>Email Correspondence:</strong>
                    <div style={{ marginTop: '2px' }}>
                      <a href="mailto:info@axioncharge.com" style={{ color: 'var(--brand-green)', fontWeight: '500' }}>
                        info@axioncharge.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <Clock size={20} className="detail-icon" />
                  <div>
                    <strong>Working Hours:</strong>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                      Monday – Saturday: 9:30 AM to 6:30 PM IST<br />
                      Sunday: Closed (Emergency network monitoring is 24/7)
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Map / Directions Helper */}
              <div className="card" style={{ backgroundColor: 'var(--bg-secondary)', borderStyle: 'dashed' }}>
                <h4 style={{ marginBottom: '6px' }}>Visiting Our Office?</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Our headquarters are conveniently located right off Sarkhej-Gandhinagar (SG) Highway at Jagatpur, near Nirma University and Gota.
                </p>
                <a 
                  href="https://maps.google.com/?q=Skywalk+The+Element+Jagatpur+Ahmedabad" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-sm"
                  style={{ alignSelf: 'flex-start' }}
                >
                  Open in Google Maps
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: var(--space-8);
          align-items: flex-start;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .form-group {
          margin-bottom: var(--space-4);
        }

        .req {
          color: #DC2626;
        }

        .success-box {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: var(--space-5);
          background-color: var(--brand-green-subtle);
          border: 1px solid var(--brand-green);
          border-radius: var(--radius-md);
        }

        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background-color: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #991B1B;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          margin-bottom: var(--space-4);
        }

        .contact-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.875rem;
        }

        .contact-detail-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-icon {
          color: var(--brand-green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
