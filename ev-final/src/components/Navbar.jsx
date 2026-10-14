import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight,
  ArrowRight, 
  Home, 
  Briefcase, 
  Building2, 
  Truck, 
  Compass, 
  Menu, 
  X,
  Zap,
  CheckCircle2
} from 'lucide-react';
import AxionLogo from './common/AxionLogo';

// Solutions data merged with dedicated products for each use-case
const solutionSections = [
  {
    id: 'residential',
    title: 'Residential',
    badge: 'Villas & Societies',
    href: '/solutions/residential',
    description: 'Safe, overnight AC charging engineered for single-phase home connections and gated apartment complexes.',
    icon: Home,
    products: [
      { 
        id: 'ac-3-3kw', 
        name: 'Axion 3.3 kW AC Wallbox', 
        tag: '3.3 kW (16A)', 
        href: '/product/ac-3-3kw', 
        desc: 'Overnight home charging without costly sanctioned load upgrades.' 
      },
      { 
        id: 'ac-7-4kw', 
        name: 'Axion 7.4 kW AC Smart Pro', 
        tag: '7.4 kW (32A)', 
        href: '/product/ac-7-4kw', 
        desc: 'Fast home charging with dynamic balancing to prevent circuit tripping.' 
      },
      { 
        id: 'charge-app', 
        name: 'Axion Driver Mobile App', 
        tag: 'iOS & Android', 
        href: '/product/charge-app', 
        desc: 'Schedule charging during off-peak hours, track units & pay via UPI.' 
      },
      { 
        id: 'charging-cables', 
        name: 'Type 2 Charging Cables', 
        tag: '5m / 7.5m Length', 
        href: '/product/charging-cables', 
        desc: 'Heavy-duty weather-sealed copper cables for daily home & travel use.' 
      },
    ]
  },
  {
    id: 'workplace',
    title: 'Workplace & Office',
    badge: 'Offices & Tech Parks',
    href: '/solutions/workplace',
    description: 'Scalable 3-phase AC wallboxes, DC visitor fast-chargers, and access software for corporate parking bays.',
    icon: Briefcase,
    products: [
      { 
        id: 'ac-11kw', 
        name: 'Axion 11 kW AC Commercial', 
        tag: '11 kW 3-Phase', 
        href: '/product/ac-11kw', 
        desc: 'Balanced 3-phase workday charging with MID certified revenue metering.' 
      },
      { 
        id: 'ac-22kw', 
        name: 'Axion 22 kW AC Ultra Dual', 
        tag: '22 kW Dual Socket', 
        href: '/product/ac-22kw', 
        desc: 'High-speed commercial AC charging for shared corporate bays.' 
      },
      { 
        id: 'dc-30kw', 
        name: 'Axion DC 30 kW Urban Fast', 
        tag: '30 kW CCS2', 
        href: '/product/dc-30kw', 
        desc: 'Compact DC fast turnaround for executive parking & visiting clients.' 
      },
      { 
        id: 'cms', 
        name: 'Station Management CMS', 
        tag: 'Cloud Software', 
        href: '/product/cms', 
        desc: 'Employee RFID access authorization, quota control & automated billing.' 
      },
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial & Retail',
    badge: 'Malls, Hotels & Retail',
    href: '/solutions/commercial',
    description: 'Turn vehicle dwell time into high-margin revenue with customer DC fast charging & destination AC units.',
    icon: Building2,
    products: [
      { 
        id: 'dc-30kw', 
        name: 'Axion DC 30 kW Fast Unit', 
        tag: '30 kW Rapid', 
        href: '/product/dc-30kw', 
        desc: 'Compact fast charger designed for restaurant & retail customer stops.' 
      },
      { 
        id: 'dc-60kw', 
        name: 'Axion DC 60 kW Dual Gun', 
        tag: '60 kW Dynamic Split', 
        href: '/product/dc-60kw', 
        desc: 'Simultaneous 2-car fast charging (30kW+30kW) with QR & POS terminal.' 
      },
      { 
        id: 'pedestal-stand', 
        name: 'Commercial Pedestal Stand', 
        tag: 'Stainless Steel', 
        href: '/product/pedestal-stand', 
        desc: 'Weather-coated heavy-gauge steel pedestal for outdoor parking lots.' 
      },
      { 
        id: 'cms', 
        name: 'Tariff & Billing CMS', 
        tag: 'OCPP 1.6J / 2.0.1', 
        href: '/product/cms', 
        desc: 'Set custom per-unit tariffs, automated UPI payouts & dynamic pricing.' 
      },
    ]
  },
  {
    id: 'fleet',
    title: 'Fleet Logistics',
    badge: 'Delivery Hubs & Depots',
    href: '/solutions/fleet',
    description: 'High-availability DC power stations and telemetry APIs built to keep electric delivery fleets in service.',
    icon: Truck,
    products: [
      { 
        id: 'dc-60kw', 
        name: 'Axion DC 60 kW Dual Gun', 
        tag: '60 kW Continuous', 
        href: '/product/dc-60kw', 
        desc: 'Rapid 35-min battery replenishment between delivery shifts.' 
      },
      { 
        id: 'dc-120kw', 
        name: 'Axion DC 120 kW High-Power', 
        tag: '120 kW Dual CCS2', 
        href: '/product/dc-120kw', 
        desc: 'High-output depot charging for electric vans and urban delivery trucks.' 
      },
      { 
        id: 'dc-240kw', 
        name: 'Axion DC 240 kW Heavy Duty', 
        tag: '240 kW Megawatt Ready', 
        href: '/product/dc-240kw', 
        desc: 'Ultra-fast modular station for commercial electric bus depots.' 
      },
      { 
        id: 'enterprise-api', 
        name: 'Enterprise Fleet API', 
        tag: 'REST & Webhooks', 
        href: '/product/enterprise-api', 
        desc: 'Direct telematics sync, live state-of-charge tracking & automated dispatch.' 
      },
    ]
  },
  {
    id: 'highway',
    title: 'Highway Corridors',
    badge: 'Corridors & Wayside',
    href: '/solutions/highway',
    description: 'Ultra-fast multi-gun DC power stations engineered for continuous duty across interstate expressways.',
    icon: Compass,
    products: [
      { 
        id: 'dc-120kw', 
        name: 'Axion DC 120 kW Highway Dual', 
        tag: '120 kW Expressway Dual', 
        href: '/product/dc-120kw', 
        desc: '20-30 min 80% charge for intercity passenger EVs at highway food plazas.' 
      },
      { 
        id: 'dc-240kw', 
        name: 'Axion DC 240 kW Ultra Station', 
        tag: '240 kW Ultra-Fast', 
        href: '/product/dc-240kw', 
        desc: 'Sub-20 min high power top-up with dual liquid-cooled CCS2 guns.' 
      },
      { 
        id: 'cms', 
        name: '24/7 Cloud NOC Monitoring', 
        tag: 'Cloud Telemetry', 
        href: '/product/cms', 
        desc: 'Remote diagnostics, automated rebooting & guaranteed 99.5% uptime SLA.' 
      },
      { 
        id: 'rfid-access', 
        name: 'Corridor Tap-and-Charge RFID', 
        tag: 'Mifare 13.56 MHz', 
        href: '/product/rfid-access', 
        desc: 'Instant driver tap charging without requiring cell service at remote plazas.' 
      },
    ]
  }
];

export const Navbar = () => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [selectedSolutionId, setSelectedSolutionId] = useState('residential');
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);

  const location = useLocation();
  const path = location.pathname;

  // Auto-close on route change
  useEffect(() => {
    setIsSolutionsOpen(false);
    setIsNetworkOpen(false);
    setIsMobileMenuOpen(false);
  }, [path]);

  const activeSolution = solutionSections.find(s => s.id === selectedSolutionId) || solutionSections[0];
  const isActive = (href) => path === href || (href !== '/' && path.startsWith(href));

  return (
    <header className="navbar-root" onMouseLeave={() => { setIsSolutionsOpen(false); setIsNetworkOpen(false); }}>
      <div className="navbar-container">
        {/* Left: Brand Logo */}
        <Link 
          to="/" 
          className="brand-logo" 
          aria-label="AXION CHARGE Home"
          onClick={() => { setIsSolutionsOpen(false); setIsNetworkOpen(false); setIsMobileMenuOpen(false); }}
        >
          <AxionLogo 
            fill="#00FF00" 
            style={{ height: '36px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Center: Desktop Navigation with Products Merged into Solutions */}
        <nav className="desktop-links" aria-label="Main Navigation">
          {/* 1. Home */}
          <Link 
            to="/" 
            className={`nav-link ${path === '/' ? 'active' : ''}`}
            onMouseEnter={() => { setIsSolutionsOpen(false); setIsNetworkOpen(false); }}
          >
            Home
          </Link>

          {/* 2. Solutions (With Integrated Products Mega Menu) */}
          <div 
            className="nav-item-wrapper solutions-nav-wrapper"
            onMouseEnter={() => { setIsSolutionsOpen(true); setIsNetworkOpen(false); }}
          >
            <button 
              type="button" 
              className={`nav-link has-dropdown ${isActive('/solutions') || isActive('/product') || isSolutionsOpen ? 'active' : ''}`}
              onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
              aria-expanded={isSolutionsOpen}
            >
              Solutions
              <ChevronDown size={14} className={`dropdown-arrow ${isSolutionsOpen ? 'rotated' : ''}`} />
            </button>

            {/* Unified Solutions & Products Mega Menu */}
            {isSolutionsOpen && (
              <div 
                className="solutions-mega-menu"
                onMouseEnter={() => setIsSolutionsOpen(true)}
                onMouseLeave={() => setIsSolutionsOpen(false)}
              >
                <div className="mega-menu-content">
                  
                  {/* Left Column: Solution Categories */}
                  <div className="solutions-sidebar">
                    <div className="sidebar-header">
                      <span className="sidebar-title">Select Sector</span>
                    </div>
                    <div className="solutions-tab-list">
                      {solutionSections.map((sec) => {
                        const Icon = sec.icon;
                        const isSelected = sec.id === selectedSolutionId;
                        return (
                          <div 
                            key={sec.id}
                            className={`solution-tab-item ${isSelected ? 'active' : ''}`}
                            onMouseEnter={() => setSelectedSolutionId(sec.id)}
                            onClick={() => setSelectedSolutionId(sec.id)}
                          >
                            <div className="tab-icon-box">
                              <Icon size={16} />
                            </div>
                            <div className="tab-meta">
                              <span className="tab-name">{sec.title}</span>
                              <span className="tab-badge">{sec.badge}</span>
                            </div>
                            <ChevronRight size={14} className="tab-arrow" />
                          </div>
                        );
                      })}
                    </div>

                    <div className="sidebar-footer">
                      <Link 
                        to="/calculator" 
                        className="sidebar-quick-link"
                        onClick={() => setIsSolutionsOpen(false)}
                      >
                        <Zap size={14} />
                        <span>ROI Payback Calculator →</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Selected Solution & Dedicated Products Details */}
                  <div className="solutions-main-panel">
                    {/* Header for Active Solution */}
                    <div className="panel-header">
                      <div>
                        <div className="panel-badge-row">
                          <span className="panel-badge">{activeSolution.badge}</span>
                          <span className="panel-title-text">{activeSolution.title} Charging System</span>
                        </div>
                        <p className="panel-desc">{activeSolution.description}</p>
                      </div>

                      <Link 
                        to={activeSolution.href}
                        className="btn-view-solution"
                        onClick={() => setIsSolutionsOpen(false)}
                      >
                        <span>Explore Sector Overview</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Dedicated Products Grid */}
                    <div className="products-section-label">
                      <span>Dedicated Hardware, Software & Accessories</span>
                    </div>

                    <div className="panel-products-grid">
                      {activeSolution.products.map((prod) => (
                        <Link 
                          key={prod.id}
                          to={prod.href}
                          className="product-tile"
                          onClick={() => setIsSolutionsOpen(false)}
                        >
                          <div className="tile-top">
                            <span className="tile-tag">{prod.tag}</span>
                            <ArrowRight size={14} className="tile-arrow" />
                          </div>
                          <h4 className="tile-title">{prod.name}</h4>
                          <p className="tile-desc">{prod.desc}</p>
                        </Link>
                      ))}
                    </div>

                    {/* Bottom Quick Links */}
                    <div className="panel-footer-bar">
                      <span className="footer-bar-label">All hardware engineered for Indian grid conditions:</span>
                      <div className="footer-bar-links">
                        <Link to="/services/installation" onClick={() => setIsSolutionsOpen(false)}>Turnkey Installation</Link>
                        <span className="divider">•</span>
                        <Link to="/services/maintenance" onClick={() => setIsSolutionsOpen(false)}>24/7 AMC Support</Link>
                        <span className="divider">•</span>
                        <Link to="/franchise" onClick={() => setIsSolutionsOpen(false)}>Partner Program</Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* 3. Growth (About) */}
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onMouseEnter={() => { setIsSolutionsOpen(false); setIsNetworkOpen(false); }}
          >
            Growth
          </Link>

          {/* 4. ROI Calculator */}
          <Link 
            to="/calculator" 
            className={`nav-link ${isActive('/calculator') ? 'active' : ''}`}
            onMouseEnter={() => { setIsSolutionsOpen(false); setIsNetworkOpen(false); }}
          >
            ROI Calculator
          </Link>

          {/* 5. Network Dropdown */}
          <div 
            className="nav-item-wrapper network-nav-wrapper"
            onMouseEnter={() => { setIsNetworkOpen(true); setIsSolutionsOpen(false); }}
          >
            <button 
              type="button" 
              className={`nav-link has-dropdown ${isActive('/franchise') || isActive('/contact') || isNetworkOpen ? 'active' : ''}`}
              onClick={() => setIsNetworkOpen(!isNetworkOpen)}
              aria-expanded={isNetworkOpen}
            >
              Network 
              <ChevronDown size={14} className={`dropdown-arrow ${isNetworkOpen ? 'rotated' : ''}`} />
            </button>

            {isNetworkOpen && (
              <div 
                className="network-dropdown-menu"
                onMouseEnter={() => setIsNetworkOpen(true)}
                onMouseLeave={() => setIsNetworkOpen(false)}
              >
                <Link to="/franchise" onClick={() => setIsNetworkOpen(false)} className="network-item-link">
                  <span className="net-title">Franchise Program</span>
                  <span className="net-sub">Host a charging station & earn recurring revenue</span>
                </Link>
                <Link to="/contact" onClick={() => setIsNetworkOpen(false)} className="network-item-link">
                  <span className="net-title">Contact & Support</span>
                  <span className="net-sub">Direct access to technical engineers & office</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right CTA / Mobile Toggle */}
        <div className="navbar-actions">
          <Link 
            to="/contact" 
            className="nav-cta-btn"
            onClick={() => { setIsSolutionsOpen(false); setIsNetworkOpen(false); }}
          >
            <span>GET A QUOTE</span>
            <ArrowRight size={14} />
          </Link>

          {/* Mobile Hamburger Button */}
          <button 
            type="button" 
            className="mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-drawer-inner">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`mobile-main-link ${path === '/' ? 'active' : ''}`}
            >
              Home
            </Link>

            {/* Mobile Solutions with Accordion Products */}
            <div className="mobile-solutions-block">
              <span className="mobile-section-heading">Solutions & Dedicated Products</span>
              
              <div className="mobile-solutions-accordion">
                {solutionSections.map((sec) => {
                  const isExpanded = mobileExpandedSection === sec.id;
                  const Icon = sec.icon;
                  return (
                    <div key={sec.id} className="mobile-acc-item">
                      <button 
                        type="button" 
                        className="mobile-acc-header"
                        onClick={() => setMobileExpandedSection(isExpanded ? null : sec.id)}
                      >
                        <div className="acc-left">
                          <Icon size={16} className="acc-icon" />
                          <span>{sec.title}</span>
                        </div>
                        <ChevronDown size={14} className={`acc-arrow ${isExpanded ? 'rotated' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="mobile-acc-body">
                          <Link 
                            to={sec.href} 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mobile-sec-overview-link"
                          >
                            <strong>Explore {sec.title} Overview →</strong>
                          </Link>

                          <span className="mobile-sub-label">Recommended Products:</span>
                          <div className="mobile-prod-list">
                            {sec.products.map(prod => (
                              <Link 
                                key={prod.id}
                                to={prod.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mobile-prod-item"
                              >
                                <span className="mobile-prod-name">• {prod.name}</span>
                                <span className="mobile-prod-tag">{prod.tag}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Growth */}
            <Link 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`mobile-main-link ${isActive('/about') ? 'active' : ''}`}
            >
              Growth
            </Link>

            {/* Mobile ROI Calculator */}
            <Link 
              to="/calculator" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`mobile-main-link ${isActive('/calculator') ? 'active' : ''}`}
            >
              ROI Calculator
            </Link>

            {/* Mobile Network */}
            <div className="mobile-network-block">
              <span className="mobile-section-heading">Network</span>
              <div className="mobile-net-links">
                <Link to="/franchise" onClick={() => setIsMobileMenuOpen(false)}>Franchise Program</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact & Inquiries</Link>
              </div>
            </div>

            <div className="mobile-cta-wrap">
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="nav-cta-btn full-width"
              >
                <span>GET A QUOTE</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Component Styles */}
      <style>{`
        .navbar-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          background-color: var(--deep-green, #122D26);
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          font-family: inherit;
        }

        .navbar-container {
          max-width: var(--max-width, 1400px);
          margin: 0 auto;
          height: 72px;
          padding: 0 var(--space-6, 24px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        /* Brand Logo Container */
        .brand-logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          min-width: 150px;
          cursor: pointer;
        }

        .brand-logo svg {
          height: 36px !important;
          width: auto !important;
          display: block !important;
        }

        /* Desktop Navigation Links */
        .desktop-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-item-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .nav-item-wrapper.solutions-nav-wrapper {
          position: static;
        }

        .nav-link {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.88);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          text-decoration: none;
          padding: 24px 4px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          position: relative;
          transition: color 0.15s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #00FF00;
        }

        .nav-link.has-dropdown {
          padding-right: 2px;
        }

        .dropdown-arrow {
          transition: transform 0.2s ease;
          opacity: 0.7;
        }

        .dropdown-arrow.rotated {
          transform: rotate(180deg);
          opacity: 1;
          color: #00FF00;
        }

        /* Network Dropdown Menu */
        .network-dropdown-menu {
          position: absolute;
          top: calc(100% - 10px);
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          background-color: #0d241e;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
          padding: 8px;
          z-index: 1050;
        }

        .network-item-link {
          display: flex;
          flex-direction: column;
          padding: 10px 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: background-color 0.15s ease;
        }

        .network-item-link:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }

        .net-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .network-item-link:hover .net-title {
          color: #00FF00;
        }

        .net-sub {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.65);
          margin-top: 3px;
        }

        /* Right CTA Button */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #00FF00;
          color: #05140f;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 10px 22px;
          border-radius: 9999px;
          transition: all 0.2s ease;
          border: 1px solid #00FF00;
          box-shadow: 0 2px 10px rgba(0, 255, 0, 0.25);
        }

        .nav-cta-btn:hover {
          background-color: #FFFFFF;
          border-color: #FFFFFF;
          color: #05140f;
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.35);
        }

        .nav-cta-btn.full-width {
          width: 100%;
          justify-content: center;
          padding: 14px 24px;
        }

        /* Mobile Toggle */
        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
          padding: 6px;
        }

        /* Unified Solutions & Products Mega Menu */
        .solutions-mega-menu {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          width: 100vw;
          background-color: #0b1f1a;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.6);
          z-index: 1040;
        }

        .mega-menu-content {
          max-width: var(--max-width, 1400px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 290px 1fr;
          min-height: 400px;
        }

        /* Left Sidebar: Solution Categories */
        .solutions-sidebar {
          background-color: #081713;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sidebar-header {
          padding-left: 8px;
          margin-bottom: 12px;
        }

        .sidebar-title {
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.45);
          font-weight: 700;
        }

        .solutions-tab-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .solution-tab-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid transparent;
        }

        .solution-tab-item:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .solution-tab-item.active {
          background-color: rgba(0, 255, 0, 0.12);
          border-color: rgba(0, 255, 0, 0.3);
        }

        .tab-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .solution-tab-item.active .tab-icon-box {
          background: #00FF00;
          color: #05140f;
        }

        .tab-meta {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .tab-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #FFFFFF;
        }

        .tab-badge {
          font-size: 0.6875rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
        }

        .solution-tab-item.active .tab-name {
          color: #00FF00;
        }

        .tab-arrow {
          color: rgba(255, 255, 255, 0.3);
          transition: transform 0.15s ease;
        }

        .solution-tab-item.active .tab-arrow {
          color: #00FF00;
          transform: translateX(2px);
        }

        .sidebar-footer {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-left: 8px;
        }

        .sidebar-quick-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: #00FF00;
          text-decoration: none;
          font-weight: 600;
        }

        .sidebar-quick-link:hover {
          text-decoration: underline;
        }

        /* Right Panel: Selected Solution & Dedicated Products */
        .solutions-main-panel {
          padding: 28px 36px;
          display: flex;
          flex-direction: column;
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 20px;
        }

        .panel-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .panel-badge {
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(0, 255, 0, 0.15);
          color: #00FF00;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 700;
        }

        .panel-title-text {
          font-size: 1.125rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .panel-desc {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          max-width: 650px;
          line-height: 1.5;
        }

        .btn-view-solution {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background-color: transparent;
          color: #00FF00;
          border: 1px solid rgba(0, 255, 0, 0.4);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          text-decoration: none;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }

        .btn-view-solution:hover {
          background-color: #00FF00;
          color: #05140f;
        }

        .products-section-label {
          margin-top: 20px;
          margin-bottom: 12px;
        }

        .products-section-label span {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 700;
        }

        .panel-products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          flex: 1;
        }

        .product-tile {
          display: flex;
          flex-direction: column;
          padding: 14px 16px;
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .product-tile:hover {
          background-color: rgba(255, 255, 255, 0.07);
          border-color: rgba(0, 255, 0, 0.35);
        }

        .tile-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .tile-tag {
          font-size: 0.6875rem;
          color: #00FF00;
          background: rgba(0, 255, 0, 0.08);
          padding: 2px 6px;
          border-radius: 3px;
          font-weight: 600;
        }

        .tile-arrow {
          color: rgba(255, 255, 255, 0.3);
          transition: transform 0.15s ease;
        }

        .product-tile:hover .tile-arrow {
          color: #00FF00;
          transform: translateX(3px);
        }

        .tile-title {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 4px 0;
        }

        .product-tile:hover .tile-title {
          color: #00FF00;
        }

        .tile-desc {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          line-height: 1.4;
        }

        .panel-footer-bar {
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
        }

        .footer-bar-label {
          color: rgba(255, 255, 255, 0.45);
        }

        .footer-bar-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-bar-links a {
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
        }

        .footer-bar-links a:hover {
          color: #00FF00;
        }

        .divider {
          color: rgba(255, 255, 255, 0.2);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--deep-green, #122D26);
          overflow-y: auto;
          padding: 24px;
          z-index: 1020;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-drawer-inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 40px;
        }

        .mobile-main-link {
          font-size: 1.125rem;
          font-weight: 600;
          color: #FFFFFF;
          text-decoration: none;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-main-link.active {
          color: #00FF00;
        }

        .mobile-solutions-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }

        .mobile-section-heading {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #00FF00;
          font-weight: 700;
        }

        .mobile-solutions-accordion {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-acc-item {
          background-color: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          overflow: hidden;
        }

        .mobile-acc-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: none;
          border: none;
          color: #FFFFFF;
          cursor: pointer;
          font-size: 0.9375rem;
          font-weight: 600;
        }

        .acc-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .acc-icon {
          color: #00FF00;
        }

        .acc-arrow {
          transition: transform 0.2s ease;
          opacity: 0.7;
        }

        .acc-arrow.rotated {
          transform: rotate(180deg);
          color: #00FF00;
        }

        .mobile-acc-body {
          padding: 0 14px 14px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 10px;
        }

        .mobile-sec-overview-link {
          color: #00FF00;
          font-size: 0.875rem;
          text-decoration: none;
        }

        .mobile-sub-label {
          font-size: 0.6875rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 4px;
        }

        .mobile-prod-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-prod-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          padding: 4px 0;
        }

        .mobile-prod-name {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .mobile-prod-tag {
          font-size: 0.6875rem;
          color: #00FF00;
          background: rgba(0, 255, 0, 0.08);
          padding: 2px 6px;
          border-radius: 3px;
        }

        .mobile-network-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }

        .mobile-net-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 10px;
        }

        .mobile-net-links a {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-size: 0.9375rem;
        }

        .mobile-cta-wrap {
          margin-top: 10px;
        }

        @media (max-width: 1080px) {
          .desktop-links {
            display: none;
          }
          .mobile-toggle-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
