import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Cpu, Smartphone, Wrench, Home, Briefcase, Map } from 'lucide-react';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredSubCat, setHoveredSubCat] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const isActive = (href) => path === href || (href !== '/' && path.startsWith(href));

  const linkClass = (href) =>
    `font-sans text-[0.8rem] relative group transition-colors ${
      isActive(href) ? 'text-[#00FF3C]' : 'text-white hover:text-[#00FF3C]'
    }`;

  const underlineClass = (href) =>
    `absolute bottom-[-4px] left-0 h-[1px] bg-[#00FF3C] transition-all duration-300 ${
      isActive(href) ? 'w-full' : 'w-0 group-hover:w-full'
    }`;

  return (
    <nav 
      className="fixed top-6 left-0 w-full z-50 flex justify-center px-8 transition-all duration-300"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* SVG Filter to dynamically make black background transparent */}
      <svg width="0" height="0" className="absolute">
        <filter id="remove-black" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            3 3 3 0 0
          " />
        </filter>
      </svg>

      <div className="w-full max-w-[1400px] flex items-center justify-between bg-[#020403]/40 backdrop-blur-lg border border-white/10 rounded-full px-8 py-3.5 shadow-lg relative z-50">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center justify-center -mt-1 group cursor-pointer transition-all duration-300">
          <img 
            src="/logo.png" 
            alt="Axion Charge Logo" 
            className="h-14 sm:h-16 w-auto object-contain scale-[1.4] sm:scale-[1.5] origin-left transition-all duration-300 group-hover:brightness-125"
            style={{ filter: 'url(#remove-black)' }}
          />
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center space-x-12">

          {/* Home */}
          <Link to="/" className={linkClass('/')} onMouseEnter={() => setActiveMenu(null)}>
            Home
            <span className={underlineClass('/')}></span>
          </Link>

          {/* Solutions Mega Menu Trigger */}
          <div
            className="group py-4 -my-4 flex items-center cursor-pointer"
            onMouseEnter={() => setActiveMenu('solutions')}
          >
            <span className={`${linkClass('/solutions')} flex items-center gap-1`}>
              Solutions <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${activeMenu === 'solutions' ? 'rotate-180 text-[#00FF3C]' : ''}`} />
              <span className={underlineClass('/solutions')}></span>
            </span>
          </div>

          {/* Products Mega Menu Trigger */}
          <div
            className="group py-4 -my-4 flex items-center cursor-pointer"
            onMouseEnter={() => setActiveMenu('products')}
          >
            <span className={`${linkClass('/products')} flex items-center gap-1`}>
              Products <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${activeMenu === 'products' ? 'rotate-180 text-[#00FF3C]' : ''}`} />
              <span className={underlineClass('/products')}></span>
            </span>
          </div>

          {/* Growth */}
          <Link to="/about" className={linkClass('/about')} onMouseEnter={() => setActiveMenu(null)}>
            Growth
            <span className={underlineClass('/about')}></span>
          </Link>

          {/* Calculator */}
          <Link to="/calculator" className={linkClass('/calculator')} onMouseEnter={() => setActiveMenu(null)}>
            ROI Calculator
            <span className={underlineClass('/calculator')}></span>
          </Link>

          {/* Network (Franchise + Contact) Dropdown */}
          <div className="relative group py-4 -my-4 flex items-center cursor-pointer" onMouseEnter={() => setActiveMenu(null)}>
            <span className={`${linkClass('/franchise')} flex items-center gap-1`}>
              Network <ChevronDown size={12} className="opacity-70 group-hover:rotate-180 transition-transform duration-300 group-hover:text-[#00FF3C]" />
              <span className={underlineClass('/franchise')}></span>
            </span>
            
            {/* Simple Popup Sub-Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#020403]/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 px-2 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 origin-top opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-50">
              <Link to="/franchise" className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Franchise</Link>
              <Link to="/contact" className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Right CTA / Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#00FF3C] text-black font-sans text-[0.7rem] font-bold uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,60,0.6)] group">
            GET A QUOTE
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Hamburger Menu Icon (Mobile Only) */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-[#00FF3C] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Full-Width Mega Menu Overlay for Solutions */}
      <div 
        className={`absolute top-full mt-4 left-0 w-full bg-[#020403]/95 backdrop-blur-xl border-t border-b border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)] transition-all duration-300 z-40 ${activeMenu === 'solutions' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        onMouseEnter={() => setActiveMenu('solutions')}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Personal Column */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Home className="text-white w-5 h-5" />
                </div>
                <h4 className="text-white font-sans font-bold text-lg">Personal</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li><Link to="/solutions/residential" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Residential <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Business Column */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Briefcase className="text-white w-5 h-5" />
                </div>
                <h4 className="text-white font-sans font-bold text-lg">Business</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li><Link to="/solutions/workplace" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Workplace <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/solutions/commercial" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Commercial <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Transit Column */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Map className="text-white w-5 h-5" />
                </div>
                <h4 className="text-white font-sans font-bold text-lg">Transit</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li><Link to="/solutions/fleet" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Fleet Logistics <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/solutions/highway" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Highway Transit <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="flex flex-col md:pl-10 md:border-l border-white/10">
              <div className="flex items-center gap-3 mb-6 pb-4">
                <h4 className="text-white font-sans font-bold text-lg">Quick Links</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li><Link to="/calculator" className="text-gray-400 hover:text-[#00FF3C] transition-colors text-sm font-sans flex items-center justify-between group">ROI Calculator <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"/></Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-[#00FF3C] transition-colors text-sm font-sans flex items-center justify-between group">Get a Quote <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"/></Link></li>
                <li><Link to="/franchise" className="text-gray-400 hover:text-[#00FF3C] transition-colors text-sm font-sans flex items-center justify-between group">Become a Partner <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"/></Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Full-Width Mega Menu Overlay for Products */}
      <div 
        className={`absolute top-full mt-4 left-0 w-full bg-[#020403]/95 backdrop-blur-xl border-t border-b border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.9)] transition-all duration-300 z-40 ${activeMenu === 'products' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        onMouseEnter={() => setActiveMenu('products')}
      >
        <div className="w-full max-w-[1400px] mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Hardware Column */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Cpu className="text-white w-5 h-5" />
                </div>
                <h4 className="text-white font-sans font-bold text-lg">Hardware</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li 
                  className="relative group w-max"
                  onMouseEnter={() => setHoveredSubCat('ac')}
                  onMouseLeave={() => setHoveredSubCat(null)}
                >
                  <Link to="/products/ac-chargers" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2">
                    AC Wallboxes <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/>
                  </Link>
                  {/* Flyout Sub-Menu */}
                  <div className={`absolute top-0 left-full ml-2 w-48 bg-[#020403]/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 px-2 shadow-2xl transition-all duration-300 origin-left ${hoveredSubCat === 'ac' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <Link to="/product/ac-7kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion AC 7kW</Link>
                    <Link to="/product/ac-22kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion AC 22kW</Link>
                  </div>
                </li>
                <li 
                  className="relative group w-max"
                  onMouseEnter={() => setHoveredSubCat('dc')}
                  onMouseLeave={() => setHoveredSubCat(null)}
                >
                  <Link to="/products/dc-chargers" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2">
                    DC Fast Chargers <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/>
                  </Link>
                  {/* Flyout Sub-Menu */}
                  <div className={`absolute top-0 left-full ml-2 w-48 bg-[#020403]/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 px-2 shadow-2xl transition-all duration-300 origin-left ${hoveredSubCat === 'dc' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <Link to="/product/dc-30kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion DC 30kW</Link>
                    <Link to="/product/dc-120kw" onClick={() => setActiveMenu(null)} className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Axion DC 120kW</Link>
                  </div>
                </li>
                <li className="w-max"><Link to="/products/accessories" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Accessories & Cables <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Software Column */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Smartphone className="text-white w-5 h-5" />
                </div>
                <h4 className="text-white font-sans font-bold text-lg">Software</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li><Link to="/products/software" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Axion Charge App <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/products/software" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Charger Management System <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/products/software" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Enterprise API <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <Wrench className="text-white w-5 h-5" />
                </div>
                <h4 className="text-white font-sans font-bold text-lg">Services</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li><Link to="/solutions/commercial" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">End-to-End Installation <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Maintenance & Support <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
                <li><Link to="/franchise" className="text-gray-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-2 group">Franchise Onboarding <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/></Link></li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="flex flex-col md:pl-10 md:border-l border-white/10">
              <div className="flex items-center gap-3 mb-6 pb-4">
                <h4 className="text-white font-sans font-bold text-lg">Quick Links</h4>
              </div>
              <ul className="flex flex-col gap-4">
                <li><Link to="/calculator" className="text-gray-400 hover:text-[#00FF3C] transition-colors text-sm font-sans flex items-center justify-between group">Resources <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"/></Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-[#00FF3C] transition-colors text-sm font-sans flex items-center justify-between group">Blogs <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"/></Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-[#00FF3C] transition-colors text-sm font-sans flex items-center justify-between group">Choose Your Plan <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"/></Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#020403] z-40 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-32 px-8 overflow-y-auto pb-10`}>
        <div className="flex flex-col gap-6 text-xl font-display uppercase tracking-widest text-white">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#00FF3C] transition-colors pb-4 border-b border-white/10">Home</Link>
          
          <div className="flex flex-col gap-4 pb-4 border-b border-white/10">
            <span className="text-[#00FF3C]">Solutions</span>
            <div className="flex flex-col gap-3 pl-4 text-base text-white/60">
              <Link to="/solutions/residential" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Residential</Link>
              <Link to="/solutions/workplace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Workplace</Link>
              <Link to="/solutions/commercial" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Commercial</Link>
              <Link to="/solutions/fleet" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Fleet</Link>
              <Link to="/solutions/highway" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Highway</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 pb-4 border-b border-white/10">
            <span className="text-[#00FF3C]">Products</span>
            <div className="flex flex-col gap-3 pl-4 text-base text-white/60">
              <Link to="/products/ac-chargers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">AC Chargers</Link>
              <Link to="/products/dc-chargers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">DC Fast Chargers</Link>
              <Link to="/products/software" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Software</Link>
              <Link to="/products/accessories" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Accessories</Link>
            </div>
          </div>

          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#00FF3C] transition-colors pb-4 border-b border-white/10">Growth</Link>
          <Link to="/calculator" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#00FF3C] transition-colors pb-4 border-b border-white/10">ROI Calculator</Link>
          
          <div className="flex flex-col gap-4 pb-4 border-b border-white/10">
            <span className="text-[#00FF3C]">Network</span>
            <div className="flex flex-col gap-3 pl-4 text-base text-white/60">
              <Link to="/franchise" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Franchise</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-8 flex justify-center items-center gap-2 px-6 py-4 bg-[#00FF3C] text-black font-sans text-sm font-bold uppercase rounded-full w-full">
            GET A QUOTE
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
