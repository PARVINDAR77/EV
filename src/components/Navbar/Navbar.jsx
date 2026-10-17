import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ArrowRight, 
  ChevronRight,
  Cpu, 
  Smartphone, 
  Wrench, 
  Home, 
  Briefcase, 
  ShoppingBag,
  Truck,
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
  const timeoutRef = useRef(null);
  const navRef = useRef(null);

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = (menuKey) => {
    clearCloseTimeout();
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredSubCat(null);
    }, 180);
  };

  const handleCloseImmediately = () => {
    clearCloseTimeout();
    setActiveMenu(null);
    setHoveredSubCat(null);
    setIsMobileMenuOpen(false);
  };

  // Close menus immediately on route change
  useEffect(() => {
    handleCloseImmediately();
  }, [location.pathname]);

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        handleCloseImmediately();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseImmediately();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearCloseTimeout();
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Strict route partition - ZERO overlap between nav items to eliminate dual green lines
  const isHomeActive = path === '/';
  const isGrowthActive = path.startsWith('/solutions');
  const isSystemActive = path.startsWith('/products') || path.startsWith('/product') || path.startsWith('/services');
  const isNetworkActive = path === '/franchise' || path === '/contact';
  const isCalculatorActive = path === '/calculator';
  const isWhyUsActive = path === '/about';

  const linkClass = (active, isMenuOpen = false) =>
    `font-sans text-[0.8rem] relative group transition-colors select-none ${
      active || isMenuOpen ? 'text-accent' : 'text-white hover:text-accent'
    }`;

  const underlineClass = (active, isMenuOpen = false) =>
    `absolute bottom-[-4px] left-0 h-[1px] bg-accent transition-all duration-300 pointer-events-none ${
      active ? 'w-full' : isMenuOpen ? 'w-full opacity-70 shadow-[0_0_8px_#00FF00]' : 'w-0 group-hover:w-full'
    }`;

  return (
    <nav 
      ref={navRef}
      className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 sm:px-8 transition-all duration-300"
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full max-w-[1440px] flex items-center justify-between bg-[#020403]/75 backdrop-blur-2xl border border-white/10 rounded-full px-6 sm:px-8 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.85)] relative z-50">
        
        {/* Logo */}
        <Link 
          to="/" 
          onClick={handleCloseImmediately}
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
          <Link 
            to="/" 
            className={linkClass(isHomeActive)} 
            onMouseEnter={() => handleMouseEnter(null)}
            onClick={handleCloseImmediately}
          >
            Home
            <span className={underlineClass(isHomeActive)}></span>
          </Link>

          {/* 2. Growth (Merged Mega Menu: Solutions + Products + ROI Calculator) */}
          <div
            className="group py-4 -my-4 flex items-center cursor-pointer"
            onMouseEnter={() => handleMouseEnter('growth')}
            onMouseLeave={handleMouseLeave}
          >
            <span className={`${linkClass(isGrowthActive, activeMenu === 'growth')} flex items-center gap-1.5`}>
              Growth <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${activeMenu === 'growth' ? 'rotate-180 text-accent' : ''}`} />
              <span className={underlineClass(isGrowthActive, activeMenu === 'growth')}></span>
            </span>
          </div>

          {/* 3. System (Hardware, Software/CMS, Operations & Maintenance) */}
          <div
            className="group py-4 -my-4 flex items-center cursor-pointer"
            onMouseEnter={() => handleMouseEnter('system')}
            onMouseLeave={handleMouseLeave}
          >
            <span className={`${linkClass(isSystemActive, activeMenu === 'system')} flex items-center gap-1.5`}>
              System <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${activeMenu === 'system' ? 'rotate-180 text-accent' : ''}`} />
              <span className={underlineClass(isSystemActive, activeMenu === 'system')}></span>
            </span>
          </div>

          {/* 4. Network (Franchise + Contact) */}
          <div 
            className="relative group py-4 -my-4 flex items-center cursor-pointer" 
            onMouseEnter={() => handleMouseEnter('network')}
            onMouseLeave={handleMouseLeave}
          >
            <span className={`${linkClass(isNetworkActive, activeMenu === 'network')} flex items-center gap-1.5`}>
              Network <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${activeMenu === 'network' ? 'rotate-180 text-accent' : 'group-hover:rotate-180 group-hover:text-accent'}`} />
              <span className={underlineClass(isNetworkActive, activeMenu === 'network')}></span>
            </span>
            
            {/* Simple Popup Sub-Menu */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-[#020403]/95 backdrop-blur-2xl border border-white/10 rounded-2xl py-2 px-2 shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-all duration-200 origin-top before:absolute before:-top-3 before:left-0 before:w-full before:h-3 before:content-[''] z-50 ${
                activeMenu === 'network'
                  ? 'opacity-100 scale-100 pointer-events-auto visible'
                  : 'opacity-0 scale-95 pointer-events-none invisible group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto group-hover:visible'
              }`}
              onMouseEnter={() => handleMouseEnter('network')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to="/franchise" 
                onClick={handleCloseImmediately}
                className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                Franchise Program
              </Link>
              <Link 
                to="/contact" 
                onClick={handleCloseImmediately}
                className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                Charging Network Hubs
              </Link>
            </div>
          </div>

          {/* 5. ROI Calculator (Standalone Direct Link) */}
          <Link 
            to="/calculator" 
            className={linkClass(isCalculatorActive)} 
            onMouseEnter={() => handleMouseEnter(null)}
            onClick={handleCloseImmediately}
          >
            ROI Calculator
            <span className={underlineClass(isCalculatorActive)}></span>
          </Link>

          {/* 6. Why Us (Company Mission, Growth Trajectory & Engineering Advantage) */}
          <Link 
            to="/about" 
            className={linkClass(isWhyUsActive)} 
            onMouseEnter={() => handleMouseEnter(null)}
            onClick={handleCloseImmediately}
          >
            Why Us
            <span className={underlineClass(isWhyUsActive)}></span>
          </Link>

        </div>

        {/* Right CTA / Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link 
            to="/contact" 
            onClick={handleCloseImmediately}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-accent text-black font-sans text-[0.7rem] font-bold uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.6)] group"
          >
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
        className={`absolute top-full mt-3 left-0 w-full bg-[#020403]/98 backdrop-blur-2xl border-t border-b border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-all duration-300 z-40 before:absolute before:-top-4 before:left-0 before:w-full before:h-4 before:content-[''] ${
          activeMenu === 'growth' 
            ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => handleMouseEnter('growth')}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full max-w-[1440px] mx-auto px-8 py-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Column 1: Solutions (4 cols) */}
            <div className="lg:col-span-4 flex flex-col pr-0 lg:pr-6 lg:border-r border-white/10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                  <TrendingUp className="text-accent w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold text-sm tracking-wide">Charging Solutions</h4>
                  <p className="text-[0.65rem] text-gray-400 font-mono">Turnkey EV Infrastructure</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Link 
                  to="/solutions/residential" 
                  onClick={handleCloseImmediately}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                      <Home size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Residential & Housing</div>
                      <div className="text-[0.65rem] text-gray-400">Villas, gated societies & private apartments</div>
                    </div>
                  </div>
                  <ChevronRight size={13} className="text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link 
                  to="/solutions/workplace" 
                  onClick={handleCloseImmediately}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                      <Briefcase size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Workplaces & Campuses</div>
                      <div className="text-[0.65rem] text-gray-400">Corporate offices & commercial tech parks</div>
                    </div>
                  </div>
                  <ChevronRight size={13} className="text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link 
                  to="/solutions/commercial" 
                  onClick={handleCloseImmediately}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                      <ShoppingBag size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Retail & Hospitality</div>
                      <div className="text-[0.65rem] text-gray-400">Malls, restaurants, cinemas & hotels</div>
                    </div>
                  </div>
                  <ChevronRight size={13} className="text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link 
                  to="/solutions/fleet" 
                  onClick={handleCloseImmediately}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                      <Truck size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Fleet & Logistics</div>
                      <div className="text-[0.65rem] text-gray-400">Electric delivery vans, taxis & bus depots</div>
                    </div>
                  </div>
                  <ChevronRight size={13} className="text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>

                <Link 
                  to="/solutions/highway" 
                  onClick={handleCloseImmediately}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                      <Map size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-accent transition-colors">Highway Transit Plazas</div>
                      <div className="text-[0.65rem] text-gray-400">Inter-city highways & travel corridors</div>
                    </div>
                  </div>
                  <ChevronRight size={13} className="text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>
            </div>

            {/* Column 2: Products & Hardware Equipment (5 cols) */}
            <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-6 lg:border-r border-white/10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Cpu className="text-white w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold text-sm tracking-wide">Products & Hardware</h4>
                  <p className="text-[0.65rem] text-gray-400 font-mono">Certified Fast Chargers</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* AC Wallboxes */}
                <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <Link 
                      to="/products/ac-chargers" 
                      onClick={handleCloseImmediately}
                      className="text-xs font-bold text-white hover:text-accent transition-colors flex items-center gap-1.5"
                    >
                      <Zap size={13} className="text-accent" />
                      AC Smart Wallboxes
                      <ArrowRight size={11} className="opacity-60" />
                    </Link>
                    <span className="text-[0.6rem] font-mono text-gray-400">3.3 kW - 22 kW</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    <Link to="/product/ac-3-3kw" onClick={handleCloseImmediately} className="px-2 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-mono font-semibold rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      3.3 kW
                    </Link>
                    <Link to="/product/ac-7-4kw" onClick={handleCloseImmediately} className="px-2 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-mono font-semibold rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      7.4 kW
                    </Link>
                    <Link to="/product/ac-11kw" onClick={handleCloseImmediately} className="px-2 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-mono font-semibold rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      11 kW
                    </Link>
                    <Link to="/product/ac-22kw" onClick={handleCloseImmediately} className="px-2 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-mono font-semibold rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      22 kW
                    </Link>
                  </div>
                </div>

                {/* DC Fast Chargers */}
                <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <Link 
                      to="/products/dc-chargers" 
                      onClick={handleCloseImmediately}
                      className="text-xs font-bold text-white hover:text-accent transition-colors flex items-center gap-1.5"
                    >
                      <Zap size={13} className="text-accent" />
                      DC Ultra-Fast Chargers
                      <ArrowRight size={11} className="opacity-60" />
                    </Link>
                    <span className="text-[0.6rem] font-mono text-gray-400">30 kW - 240 kW</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    <Link to="/product/dc-30kw" onClick={handleCloseImmediately} className="px-2 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-mono font-semibold rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      30 kW
                    </Link>
                    <Link to="/product/dc-60kw" onClick={handleCloseImmediately} className="px-2 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-mono font-semibold rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      60 kW
                    </Link>
                    <Link to="/product/dc-120kw" onClick={handleCloseImmediately} className="px-2 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-mono font-semibold rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      120 kW
                    </Link>
                    <Link to="/product/dc-240kw" onClick={handleCloseImmediately} className="px-2 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-mono font-semibold rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      240 kW
                    </Link>
                  </div>
                </div>

                {/* Infrastructure & Accessories */}
                <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <Link 
                      to="/products/accessories" 
                      onClick={handleCloseImmediately}
                      className="text-xs font-bold text-white hover:text-accent transition-colors flex items-center gap-1.5"
                    >
                      <Layers size={13} className="text-accent" />
                      Infrastructure & Accessories
                      <ArrowRight size={11} className="opacity-60" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/product/charging-cables" onClick={handleCloseImmediately} className="px-3 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-sans font-medium rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      Heavy Cables
                    </Link>
                    <Link to="/product/rfid-access" onClick={handleCloseImmediately} className="px-3 py-1.5 bg-black/40 hover:bg-accent hover:text-black text-gray-300 text-[0.68rem] font-sans font-medium rounded-lg text-center border border-white/5 hover:border-accent transition-all">
                      RFID Terminals
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: ROI & Business Growth Hub (3 cols) */}
            <div className="lg:col-span-3 flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-[#041407]/90 via-[#020704]/90 to-[#010402]/90 border border-accent/25 shadow-[0_10px_35px_rgba(0,0,0,0.85)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00FF00]" />
                  <span className="text-accent font-mono text-[0.62rem] uppercase tracking-widest font-bold">
                    Business Analytics
                  </span>
                </div>

                <h5 className="text-white font-display text-base font-bold mb-1.5 leading-snug">
                  Station ROI & Payback Calculator
                </h5>
                <p className="text-gray-400 font-sans text-xs leading-relaxed mb-4">
                  Simulate utilization, tariff revenues, and investment payback for your property.
                </p>

                {/* Key Metric Highlights */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                    <div className="text-[0.6rem] font-mono text-gray-400 uppercase">Payback</div>
                    <div className="text-xs font-bold text-accent font-mono">18 - 24 Mos</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
                    <div className="text-[0.6rem] font-mono text-gray-400 uppercase">Uptime SLA</div>
                    <div className="text-xs font-bold text-white font-mono">99.8%</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link 
                  to="/calculator" 
                  onClick={handleCloseImmediately} 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-black font-sans text-xs font-bold uppercase rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,0,0.35)] cursor-pointer"
                >
                  <Calculator size={13} />
                  Calculate Returns
                  <ArrowRight size={12} />
                </Link>

                <Link 
                  to="/franchise" 
                  onClick={handleCloseImmediately} 
                  className="w-full text-center text-gray-400 hover:text-accent font-mono text-[0.68rem] uppercase tracking-wider transition-colors pt-1"
                >
                  Apply For Franchise &rarr;
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
        className={`absolute top-full mt-3 left-0 w-full bg-[#020403]/95 backdrop-blur-2xl border-t border-b border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] transition-all duration-300 z-40 before:absolute before:-top-4 before:left-0 before:w-full before:h-4 before:content-[''] ${
          activeMenu === 'system' 
            ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => handleMouseEnter('system')}
        onMouseLeave={handleMouseLeave}
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
                  className="relative group/sub w-full"
                  onMouseEnter={() => setHoveredSubCat('sys-ac')}
                  onMouseLeave={() => setHoveredSubCat(null)}
                >
                  <Link 
                    to="/products/ac-chargers" 
                    onClick={handleCloseImmediately} 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center justify-between py-1 group cursor-pointer"
                  >
                    <span>AC Wallboxes (3.3 - 22 kW)</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-accent flex-shrink-0 ml-2"/>
                  </Link>
                  <div 
                    className={`absolute top-0 left-full pl-3 w-56 transition-all duration-200 origin-left z-50 before:absolute before:top-0 before:-left-4 before:w-4 before:h-full before:content-[''] ${
                      hoveredSubCat === 'sys-ac' 
                        ? 'opacity-100 scale-100 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:scale-100 group-hover/sub:pointer-events-auto'
                    }`}
                  >
                    <div className="bg-[#020403]/98 backdrop-blur-2xl border border-white/15 rounded-xl py-2 px-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col gap-1">
                      <Link to="/product/ac-3-3kw" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Axion 3.3 kW AC</Link>
                      <Link to="/product/ac-7-4kw" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Axion 7.4 kW AC</Link>
                      <Link to="/product/ac-11kw" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Axion 11 kW AC</Link>
                      <Link to="/product/ac-22kw" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Axion 22 kW AC</Link>
                    </div>
                  </div>
                </li>
                <li 
                  className="relative group/sub w-full"
                  onMouseEnter={() => setHoveredSubCat('sys-dc')}
                  onMouseLeave={() => setHoveredSubCat(null)}
                >
                  <Link 
                    to="/products/dc-chargers" 
                    onClick={handleCloseImmediately} 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center justify-between py-1 group cursor-pointer"
                  >
                    <span>DC Fast Chargers (30 - 240 kW)</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-accent flex-shrink-0 ml-2"/>
                  </Link>
                  <div 
                    className={`absolute top-0 left-full pl-3 w-56 transition-all duration-200 origin-left z-50 before:absolute before:top-0 before:-left-4 before:w-4 before:h-full before:content-[''] ${
                      hoveredSubCat === 'sys-dc' 
                        ? 'opacity-100 scale-100 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:scale-100 group-hover/sub:pointer-events-auto'
                    }`}
                  >
                    <div className="bg-[#020403]/98 backdrop-blur-2xl border border-white/15 rounded-xl py-2 px-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col gap-1">
                      <Link to="/product/dc-30kw" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Axion DC 30kW</Link>
                      <Link to="/product/dc-60kw" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Axion DC 60kW</Link>
                      <Link to="/product/dc-120kw" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Axion DC 120kW</Link>
                      <Link to="/product/dc-240kw" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Axion DC 240kW</Link>
                    </div>
                  </div>
                </li>
                <li 
                  className="relative group/sub w-full"
                  onMouseEnter={() => setHoveredSubCat('sys-acc')}
                  onMouseLeave={() => setHoveredSubCat(null)}
                >
                  <Link 
                    to="/products/accessories" 
                    onClick={handleCloseImmediately} 
                    className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center justify-between py-1 group cursor-pointer"
                  >
                    <span>Cables & Accessories</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-accent flex-shrink-0 ml-2"/>
                  </Link>
                  <div 
                    className={`absolute top-0 left-full pl-3 w-56 transition-all duration-200 origin-left z-50 before:absolute before:top-0 before:-left-4 before:w-4 before:h-full before:content-[''] ${
                      hoveredSubCat === 'sys-acc' 
                        ? 'opacity-100 scale-100 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:scale-100 group-hover/sub:pointer-events-auto'
                    }`}
                  >
                    <div className="bg-[#020403]/98 backdrop-blur-2xl border border-white/15 rounded-xl py-2 px-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col gap-1">
                      <Link to="/product/charging-cables" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Charging Cables</Link>
                      <Link to="/product/rfid-access" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">RFID Card & Keyfob</Link>
                      <Link to="/products/accessories" onClick={handleCloseImmediately} className="block px-3 py-2 text-xs text-accent hover:text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">View All Accessories →</Link>
                    </div>
                  </div>
                </li>
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
                <li><Link to="/product/charge-app" onClick={handleCloseImmediately} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Axion Charge Mobile App <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/product/cms" onClick={handleCloseImmediately} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Charger Management System (CMS) <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/products/software" onClick={handleCloseImmediately} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Cloud Analytics & Billing <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/contact" onClick={handleCloseImmediately} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Custom Enterprise Integration <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
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
                <li><Link to="/services/installation" onClick={handleCloseImmediately} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Site Survey & Turnkey Installation <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/services/maintenance" onClick={handleCloseImmediately} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">24/7 Remote Monitoring & SLA <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/franchise" onClick={handleCloseImmediately} className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Partner Onboarding Program <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
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
                onClick={handleCloseImmediately} 
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
          <Link to="/" onClick={handleCloseImmediately} className="hover:text-accent transition-colors pb-3 border-b border-white/10">
            Home
          </Link>
          
          {/* 2. Growth */}
          <div className="flex flex-col gap-3 pb-3 border-b border-white/10">
            <span className="text-accent font-bold">Growth</span>
            <div className="flex flex-col gap-2.5 pl-3 text-sm text-white/70">
              <span className="text-[0.7rem] text-accent/80 font-mono tracking-widest uppercase">Solutions:</span>
              <Link to="/solutions/residential" onClick={handleCloseImmediately} className="hover:text-white pl-2">Residential</Link>
              <Link to="/solutions/workplace" onClick={handleCloseImmediately} className="hover:text-white pl-2">Workplace</Link>
              <Link to="/solutions/commercial" onClick={handleCloseImmediately} className="hover:text-white pl-2">Commercial</Link>
              <Link to="/solutions/fleet" onClick={handleCloseImmediately} className="hover:text-white pl-2">Fleet Logistics</Link>
              <Link to="/solutions/highway" onClick={handleCloseImmediately} className="hover:text-white pl-2">Highway Hubs</Link>

              <span className="text-[0.7rem] text-accent/80 font-mono tracking-widest uppercase mt-2">Tools:</span>
              <Link to="/calculator" onClick={handleCloseImmediately} className="hover:text-white pl-2 font-bold text-accent">ROI Calculator</Link>
            </div>
          </div>

          {/* 3. System */}
          <div className="flex flex-col gap-3 pb-3 border-b border-white/10">
            <span className="text-accent font-bold">System</span>
            <div className="flex flex-col gap-2.5 pl-3 text-sm text-white/70">
              <span className="text-[0.7rem] text-accent/80 font-mono tracking-widest uppercase">Hardware:</span>
              <Link to="/products/ac-chargers" onClick={handleCloseImmediately} className="hover:text-white pl-2">AC Wallboxes</Link>
              <Link to="/products/dc-chargers" onClick={handleCloseImmediately} className="hover:text-white pl-2">DC Fast Chargers</Link>
              <Link to="/products/accessories" onClick={handleCloseImmediately} className="hover:text-white pl-2">Cables & Accessories</Link>

              <span className="text-[0.7rem] text-accent/80 font-mono tracking-widest uppercase mt-2">Software & Services:</span>
              <Link to="/product/charge-app" onClick={handleCloseImmediately} className="hover:text-white pl-2">Axion Charge App</Link>
              <Link to="/product/cms" onClick={handleCloseImmediately} className="hover:text-white pl-2">Cloud CMS Platform</Link>
              <Link to="/services/installation" onClick={handleCloseImmediately} className="hover:text-white pl-2">Turnkey Installation</Link>
              <Link to="/services/maintenance" onClick={handleCloseImmediately} className="hover:text-white pl-2">Maintenance & Support</Link>
            </div>
          </div>

          {/* 4. Network */}
          <div className="flex flex-col gap-3 pb-3 border-b border-white/10">
            <span className="text-accent font-bold">Network</span>
            <div className="flex flex-col gap-2 pl-3 text-sm text-white/70">
              <Link to="/franchise" onClick={handleCloseImmediately} className="hover:text-white pl-2">Franchise Program</Link>
              <Link to="/contact" onClick={handleCloseImmediately} className="hover:text-white pl-2">Network Hubs & Inquiry</Link>
            </div>
          </div>

          {/* 5. ROI Calculator */}
          <Link to="/calculator" onClick={handleCloseImmediately} className="hover:text-accent transition-colors pb-3 border-b border-white/10">
            ROI Calculator
          </Link>

          {/* 6. Why Us */}
          <Link to="/about" onClick={handleCloseImmediately} className="hover:text-accent transition-colors pb-3 border-b border-white/10">
            Why Us
          </Link>
          
          {/* CTA Button */}
          <Link to="/contact" onClick={handleCloseImmediately} className="mt-4 flex justify-center items-center gap-2 px-6 py-4 bg-accent text-black font-sans text-xs font-bold uppercase rounded-full w-full shadow-[0_0_20px_rgba(0,255,0,0.4)]">
            GET A QUOTE
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
