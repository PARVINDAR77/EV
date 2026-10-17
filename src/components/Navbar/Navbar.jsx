import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ArrowRight, 
  Cpu, 
  Smartphone, 
  Wrench, 
  Home, 
  Briefcase, 
  Map, 
  Calculator, 
  TrendingUp, 
  Zap, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';
import AxionLogo from '../common/AxionLogo';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredSubCat, setHoveredSubCat] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const isActive = (href) => path === href || (href !== '/' && path.startsWith(href));

  const linkClass = (active) =>
    `font-sans text-[0.8rem] relative group transition-colors ${
      active ? 'text-accent' : 'text-white hover:text-accent'
    }`;

  const underlineClass = (active) =>
    `absolute bottom-[-4px] left-0 h-[1px] bg-accent transition-all duration-300 ${
      active ? 'w-full' : 'w-0 group-hover:w-full'
    }`;

  const isGrowthActive = path.startsWith('/solutions') || path === '/calculator' || path === '/franchise';
  const isSystemActive = path.startsWith('/products') || path.startsWith('/product') || path.startsWith('/services');

  return (
    <nav 
      className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 sm:px-8 transition-all duration-300"
      onMouseLeave={() => {
        setActiveMenu(null);
        setHoveredSubCat(null);
      }}
    >
      <div className="w-full max-w-[1440px] flex items-center justify-between bg-[#020403]/75 backdrop-blur-2xl border border-white/10 rounded-full px-6 sm:px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.85)] relative z-50">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center group cursor-pointer transition-transform duration-300 hover:scale-[1.03] select-none"
          aria-label="AXION CHARGE Home"
        >
          <AxionLogo 
            className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_10px_rgba(0,255,0,0.35)] group-hover:drop-shadow-[0_0_18px_rgba(0,255,0,0.75)]" 
          />
        </Link>

        {/* Center Nav: Home -> Growth -> System -> Network -> ROI Calculator -> Why Us */}
        <div className="hidden md:flex items-center space-x-9 lg:space-x-11">

          {/* 1. Home */}
          <Link to="/" className={linkClass(path === '/')} onMouseEnter={() => setActiveMenu(null)}>
            Home
            <span className={underlineClass(path === '/')}></span>
          </Link>

          {/* 2. Growth (Merged Mega Menu: Solutions + Products + ROI Calculator) */}
          <div
            className="group py-4 -my-4 flex items-center cursor-pointer"
            onMouseEnter={() => setActiveMenu('growth')}
          >
            <span className={`${linkClass(isGrowthActive)} flex items-center gap-1.5`}>
              Growth <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${activeMenu === 'growth' ? 'rotate-180 text-accent' : ''}`} />
              <span className={underlineClass(isGrowthActive)}></span>
            </span>
          </div>

          {/* 3. System (Hardware, Software/CMS, Operations & Maintenance) */}
          <div
            className="group py-4 -my-4 flex items-center cursor-pointer"
            onMouseEnter={() => setActiveMenu('system')}
          >
            <span className={`${linkClass(isSystemActive)} flex items-center gap-1.5`}>
              System <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${activeMenu === 'system' ? 'rotate-180 text-accent' : ''}`} />
              <span className={underlineClass(isSystemActive)}></span>
            </span>
          </div>

          {/* 4. Network (Franchise + Contact) */}
          <div className="relative group py-4 -my-4 flex items-center cursor-pointer" onMouseEnter={() => setActiveMenu(null)}>
            <span className={`${linkClass(path === '/franchise' || path === '/contact')} flex items-center gap-1.5`}>
              Network <ChevronDown size={12} className="opacity-70 group-hover:rotate-180 transition-transform duration-300 group-hover:text-accent" />
              <span className={underlineClass(path === '/franchise' || path === '/contact')}></span>
            </span>
            
            {/* Simple Popup Sub-Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-[#020403]/95 backdrop-blur-2xl border border-white/10 rounded-2xl py-2 px-2 shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-all duration-300 origin-top opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-50">
              <Link to="/franchise" className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                Franchise Program
              </Link>
              <Link to="/contact" className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                Charging Network Hubs
              </Link>
            </div>
          </div>

          {/* 5. ROI Calculator (Standalone Direct Link) */}
          <Link to="/calculator" className={linkClass(path === '/calculator')} onMouseEnter={() => setActiveMenu(null)}>
            ROI Calculator
            <span className={underlineClass(path === '/calculator')}></span>
          </Link>

          {/* 6. Why Us (Company Mission, Growth Trajectory & Engineering Advantage) */}
          <Link to="/about" className={linkClass(path === '/about')} onMouseEnter={() => setActiveMenu(null)}>
            Why Us
            <span className={underlineClass(path === '/about')}></span>
          </Link>

        </div>

        {/* Right CTA / Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-accent text-black font-sans text-[0.7rem] font-bold uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.6)] group">
            GET A QUOTE
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Hamburger Menu Icon (Mobile Only) */}
          <button 
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-accent transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* ========================================================
          FULL-WIDTH MEGA MENU OVERLAY: GROWTH
          (Merged Solutions + Products + ROI Calculator Card)
         ======================================================== */}
      <div 
        className={`absolute top-full mt-4 left-0 w-full bg-[#020403]/95 backdrop-blur-2xl border-t border-b border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-all duration-300 z-40 ${activeMenu === 'growth' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        onMouseEnter={() => setActiveMenu('growth')}
      >
        <div className="w-full max-w-[1440px] mx-auto px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
            
            {/* Column 1: Solutions */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                  <TrendingUp className="text-accent w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold text-base">Charging Solutions</h4>
                  <p className="text-[0.68rem] text-gray-400 font-mono">Tailored Turnkey Models</p>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                <li><Link to="/solutions/residential" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Residential & Villas <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/solutions/workplace" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Workplaces & Tech Parks <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/solutions/commercial" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Retail, Malls & Hospitality <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/solutions/fleet" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Fleet Logistics & Depots <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/solutions/highway" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Highway Transit Plazas <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Column 2: Products & Hardware */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Cpu className="text-white w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold text-base">Products & Hardware</h4>
                  <p className="text-[0.68rem] text-gray-400 font-mono">AC & High-Power DC</p>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                <li><Link to="/products/ac-chargers" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">AC Smart Wallboxes (3.3kW-22kW) <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/products/dc-chargers" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">DC Ultra-Fast (30kW-240kW) <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/products/accessories" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Pedestals & Accessories <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/product/charging-cables" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Heavy-Duty Charging Cables <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Column 3: Software & Services */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Smartphone className="text-white w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold text-base">Software & Services</h4>
                  <p className="text-[0.68rem] text-gray-400 font-mono">App, Cloud & Support</p>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                <li><Link to="/product/charge-app" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Axion Driver App <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/product/cms" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Cloud Charger CMS <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/services/installation" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Turnkey Site Installation <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/services/maintenance" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Annual Maintenance SLA <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Column 4: ROI Calculator Spotlight Card */}
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-[#05150a] via-[#020403] to-[#010a04] border border-accent/30 shadow-[0_0_25px_rgba(0,255,0,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00FF00]" />
                  <span className="text-accent font-mono text-[0.65rem] uppercase tracking-[0.2em] font-bold">
                    Interactive Estimator
                  </span>
                </div>
                <h5 className="text-white font-display text-lg font-bold mb-2">
                  ROI & Payback Calculator
                </h5>
                <p className="text-gray-400 font-sans text-xs leading-relaxed mb-6">
                  Estimate station throughput, capital investment, and monthly charging profits across 3.3 kW to 240 kW hubs.
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <Link 
                  to="/calculator" 
                  onClick={() => setActiveMenu(null)} 
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-accent text-black font-sans text-xs font-bold uppercase rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:shadow-[0_0_25px_rgba(0,255,0,0.6)] cursor-pointer"
                >
                  <Calculator size={14} />
                  Calculate ROI Now
                  <ArrowRight size={13} />
                </Link>
                <Link 
                  to="/franchise" 
                  onClick={() => setActiveMenu(null)} 
                  className="w-full text-center text-gray-400 hover:text-accent font-mono text-[0.7rem] uppercase tracking-wider transition-colors pt-1"
                >
                  Or View Franchise Model &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          FULL-WIDTH MEGA MENU OVERLAY: SYSTEM
          (Hardware Systems, Cloud Software/CMS, Operations & Maintenance)
         ======================================================== */}
      <div 
        className={`absolute top-full mt-4 left-0 w-full bg-[#020403]/95 backdrop-blur-2xl border-t border-b border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-all duration-300 z-40 ${activeMenu === 'system' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        onMouseEnter={() => setActiveMenu('system')}
      >
        <div className="w-full max-w-[1440px] mx-auto px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
            
            {/* System Column 1: Hardware Architecture */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Zap className="text-accent w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold text-base">Charging Hardware</h4>
                  <p className="text-[0.68rem] text-gray-400 font-mono">Engineered For India</p>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                <li 
                  className="relative group w-max"
                  onMouseEnter={() => setHoveredSubCat('ac')}
                  onMouseLeave={() => setHoveredSubCat(null)}
                >
                  <Link to="/products/ac-chargers" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2">
                    AC Wallboxes (3.3 - 22 kW) <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/>
                  </Link>
                  <div className={`absolute top-0 left-full ml-2 w-48 bg-[#020403]/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 px-2 shadow-2xl transition-all duration-300 origin-left ${hoveredSubCat === 'ac' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <Link to="/product/ac-3-3kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion 3.3 kW AC</Link>
                    <Link to="/product/ac-7-4kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion 7.4 kW AC</Link>
                    <Link to="/product/ac-11kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion 11 kW AC</Link>
                    <Link to="/product/ac-22kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion 22 kW AC</Link>
                  </div>
                </li>
                <li 
                  className="relative group w-max"
                  onMouseEnter={() => setHoveredSubCat('dc')}
                  onMouseLeave={() => setHoveredSubCat(null)}
                >
                  <Link to="/products/dc-chargers" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2">
                    DC Fast Chargers (30 - 240 kW) <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/>
                  </Link>
                  <div className={`absolute top-0 left-full ml-2 w-48 bg-[#020403]/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 px-2 shadow-2xl transition-all duration-300 origin-left ${hoveredSubCat === 'dc' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <Link to="/product/dc-30kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion DC 30kW</Link>
                    <Link to="/product/dc-60kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion DC 60kW</Link>
                    <Link to="/product/dc-120kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion DC 120kW</Link>
                    <Link to="/product/dc-240kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion DC 240kW</Link>
                  </div>
                </li>
                <li><Link to="/products/accessories" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Pedestals & Mount Stands <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/product/rfid-access" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">RFID Cards & Keyfobs <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* System Column 2: Software & Cloud Platform */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Layers className="text-white w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold text-base">Software Platform</h4>
                  <p className="text-[0.68rem] text-gray-400 font-mono">Real-Time Cloud Control</p>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                <li><Link to="/product/charge-app" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Axion Charge Mobile App <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/product/cms" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Charger Management System (CMS) <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/products/software" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Cloud Analytics & Billing <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/contact" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Custom Enterprise Integration <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* System Column 3: Deployment & Field Engineering */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Wrench className="text-white w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold text-base">Services & Operations</h4>
                  <p className="text-[0.68rem] text-gray-400 font-mono">Turnkey Deployment</p>
                </div>
              </div>
              <ul className="flex flex-col gap-3">
                <li><Link to="/services/installation" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Site Survey & Turnkey Installation <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/services/maintenance" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">24/7 Remote Monitoring & SLA <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/franchise" onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Partner Onboarding Program <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* System Column 4: Quick Action Banner */}
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-[#030604] border border-white/10 shadow-lg relative">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="text-accent w-4 h-4" />
                  <span className="text-white font-mono text-[0.65rem] uppercase tracking-wider font-bold">
                    Enterprise Standards
                  </span>
                </div>
                <h5 className="text-white font-display text-base font-bold mb-2">
                  Need a Customized System?
                </h5>
                <p className="text-gray-400 font-sans text-xs leading-relaxed mb-6">
                  Speak directly with our technical infrastructure team for electrical load studies, multi-gun setups, and custom firmware.
                </p>
              </div>

              <Link 
                to="/contact" 
                onClick={() => setActiveMenu(null)} 
                className="w-full flex items-center justify-center gap-2 px-5 py-3 border border-accent/50 text-accent font-sans text-xs font-bold uppercase rounded-full hover:bg-accent hover:text-black transition-all cursor-pointer"
              >
                Request Architecture Consultation
                <ArrowRight size={13} />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          MOBILE NAVIGATION DRAWER
          (Home -> Growth -> System -> Network -> ROI Calculator -> Why Us)
         ======================================================== */}
      <div 
        data-lenis-prevent="true"
        className={`fixed inset-0 bg-[#020403] z-40 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-28 px-7 overflow-y-auto pb-12 h-[100dvh]`}
      >
        <div className="flex flex-col gap-5 text-lg font-display uppercase tracking-wider text-white min-h-max">
          
          {/* 1. Home */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors pb-3 border-b border-white/10">
            Home
          </Link>
          
          {/* 2. Growth */}
          <div className="flex flex-col gap-3 pb-3 border-b border-white/10">
            <span className="text-accent font-bold">Growth</span>
            <div className="flex flex-col gap-2.5 pl-3 text-sm text-white/70">
              <span className="text-[0.7rem] text-accent/80 font-mono tracking-widest uppercase">Solutions:</span>
              <Link to="/solutions/residential" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Residential</Link>
              <Link to="/solutions/workplace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Workplace</Link>
              <Link to="/solutions/commercial" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Commercial</Link>
              <Link to="/solutions/fleet" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Fleet Logistics</Link>
              <Link to="/solutions/highway" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Highway Hubs</Link>

              <span className="text-[0.7rem] text-accent/80 font-mono tracking-widest uppercase mt-2">Tools:</span>
              <Link to="/calculator" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2 font-bold text-accent">ROI Calculator</Link>
            </div>
          </div>

          {/* 3. System */}
          <div className="flex flex-col gap-3 pb-3 border-b border-white/10">
            <span className="text-accent font-bold">System</span>
            <div className="flex flex-col gap-2.5 pl-3 text-sm text-white/70">
              <span className="text-[0.7rem] text-accent/80 font-mono tracking-widest uppercase">Hardware:</span>
              <Link to="/products/ac-chargers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">AC Wallboxes</Link>
              <Link to="/products/dc-chargers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">DC Fast Chargers</Link>
              <Link to="/products/accessories" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Accessories & Stands</Link>

              <span className="text-[0.7rem] text-accent/80 font-mono tracking-widest uppercase mt-2">Software & Services:</span>
              <Link to="/product/charge-app" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Axion Charge App</Link>
              <Link to="/product/cms" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Cloud CMS Platform</Link>
              <Link to="/services/installation" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Turnkey Installation</Link>
              <Link to="/services/maintenance" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Maintenance & Support</Link>
            </div>
          </div>

          {/* 4. Network */}
          <div className="flex flex-col gap-3 pb-3 border-b border-white/10">
            <span className="text-accent font-bold">Network</span>
            <div className="flex flex-col gap-2 pl-3 text-sm text-white/70">
              <Link to="/franchise" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Franchise Program</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white pl-2">Network Hubs & Inquiry</Link>
            </div>
          </div>

          {/* 5. ROI Calculator */}
          <Link to="/calculator" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors pb-3 border-b border-white/10">
            ROI Calculator
          </Link>

          {/* 6. Why Us */}
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent transition-colors pb-3 border-b border-white/10">
            Why Us
          </Link>
          
          {/* CTA Button */}
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 flex justify-center items-center gap-2 px-6 py-4 bg-accent text-black font-sans text-xs font-bold uppercase rounded-full w-full shadow-[0_0_20px_rgba(0,255,0,0.4)]">
            GET A QUOTE
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
