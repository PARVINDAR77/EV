import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import AxionLogo from './common/AxionLogo';

export const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="container">
        {/* Main Footer Columns */}
        <div className="footer-grid">
          
          {/* Column 1: Brand & Office Details */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo" aria-label="AXION CHARGE Home">
              <AxionLogo fill="#00FF00" style={{ height: '32px', width: 'auto', display: 'block' }} />
            </Link>
            <p className="footer-bio">
              Axion Charge provides EV charging hardware, intelligent software, and turnkey deployment for homes, workplaces, commercial destinations, and transit networks across India.
            </p>
            <div className="footer-contact-info">
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <address className="address-text">
                  <strong>AXION CHARGE PRIVATE LIMITED</strong><br />
                  509, Skywalk The Element, Jagatpur Rd,<br />
                  off SG Highway, Ahmedabad, Gujarat 382470
                </address>
              </div>
              <div className="contact-item">
                <Phone size={16} className="contact-icon" />
                <div>
                  <a href="tel:+919979993397">+91 99799 93397</a> (Growth & Sales)<br />
                  <a href="tel:+919979993396">+91 99799 93396</a> (Operations & Systems)
                </div>
              </div>
              <div className="contact-item">
                <Mail size={16} className="contact-icon" />
                <a href="mailto:info@axioncharge.com">info@axioncharge.com</a>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="footer-col">
            <h4 className="footer-heading">Charging Solutions</h4>
            <ul className="footer-links">
              <li><Link to="/solutions/residential">Residential & Apartments</Link></li>
              <li><Link to="/solutions/workplace">Workplace & Corporate Offices</Link></li>
              <li><Link to="/solutions/commercial">Commercial & Retail Malls</Link></li>
              <li><Link to="/solutions/fleet">Fleet Logistics & Depots</Link></li>
              <li><Link to="/solutions/highway">Highway Corridors</Link></li>
            </ul>
          </div>

          {/* Column 3: Hardware & Products */}
          <div className="footer-col">
            <h4 className="footer-heading">Charging Hardware</h4>
            <ul className="footer-links">
              <li><Link to="/products/ac-chargers">AC Wallboxes (3.3kW to 22kW)</Link></li>
              <li><Link to="/products/dc-chargers">DC Fast Chargers (30kW to 240kW)</Link></li>
              <li><Link to="/products/accessories">Cables & Pedestals</Link></li>
              <li><Link to="/services/installation">Turnkey Installation Service</Link></li>
              <li><Link to="/services/maintenance">Maintenance & AMC Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Software & Company */}
          <div className="footer-col">
            <h4 className="footer-heading">Software & Tools</h4>
            <ul className="footer-links">
              <li><Link to="/product/charge-app">Driver Mobile App</Link></li>
              <li><Link to="/product/cms">Station Management (CMS)</Link></li>
              <li><Link to="/product/enterprise-api">Enterprise API</Link></li>
              <li><Link to="/calculator">ROI Payback Calculator</Link></li>
              <li><Link to="/franchise">Franchise & Partner Program</Link></li>
              <li><Link to="/about">About Axion Charge</Link></li>
              <li><Link to="/contact">Contact & Support</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal / Copyright Strip */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} AXION CHARGE PRIVATE LIMITED. All rights reserved.
          </p>
          <div className="footer-meta-links">
            <Link to="/contact">Privacy Policy</Link>
            <span className="dot">•</span>
            <Link to="/contact">Terms of Service</Link>
            <span className="dot">•</span>
            <span>Made for India's Electric Transition</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-root {
          background-color: var(--deep-green);
          color: var(--text-inverse);
          padding-top: var(--space-16);
          padding-bottom: var(--space-8);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.9375rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--space-10);
          margin-bottom: var(--space-12);
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .brand-col {
          max-width: 380px;
        }

        .footer-logo {
          display: inline-block;
          margin-bottom: var(--space-4);
        }

        .footer-logo svg {
          height: 32px !important;
          width: auto !important;
          display: block !important;
        }

        .footer-bio {
          color: var(--text-inverse-muted);
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: var(--space-6);
        }

        .footer-contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          font-size: 0.8125rem;
          color: var(--text-inverse-muted);
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
        }

        .contact-icon {
          color: var(--brand-green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .address-text {
          font-style: normal;
          line-height: 1.5;
        }

        .footer-contact-info a {
          color: var(--text-inverse);
          text-decoration: none;
        }

        .footer-contact-info a:hover {
          color: var(--brand-green);
        }

        .footer-heading {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #FFFFFF;
          margin-bottom: var(--space-4);
          font-weight: 700;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .footer-links a {
          color: var(--text-inverse-muted);
          font-size: 0.875rem;
          padding: 2px 0;
          display: inline-block;
        }

        .footer-links a:hover {
          color: #FFFFFF;
        }

        .footer-bottom {
          padding-top: var(--space-6);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8125rem;
          color: var(--text-inverse-muted);
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .footer-meta-links {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .footer-meta-links a {
          color: var(--text-inverse-muted);
        }

        .footer-meta-links a:hover {
          color: #FFFFFF;
        }

        .dot {
          opacity: 0.4;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-8);
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
