import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';

export const ContactCTA = ({
  title = "Planning EV charging for your property or business?",
  description = "Tell us what you need. Our team in Ahmedabad can evaluate your power availability and guide you through the appropriate charging solution.",
  primaryButtonText = "Discuss Your Requirements",
  primaryButtonLink = "/contact"
}) => {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="cta-banner">
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="cta-banner-buttons">
            <Link to={primaryButtonLink} className="btn btn-primary btn-lg">
              {primaryButtonText} <ArrowRight size={18} />
            </Link>
            <a href="tel:+919979993397" className="btn btn-secondary btn-lg" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
              <PhoneCall size={18} /> Call +91 99799 93397
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
