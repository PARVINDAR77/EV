import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  // Returns true if current path matches the given href
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
    <nav className="fixed top-6 left-0 w-full z-50 flex justify-center px-8 transition-all duration-300">
      <div className="w-full max-w-[1400px] flex items-center justify-between bg-[#020403]/40 backdrop-blur-lg border border-white/10 rounded-full px-8 py-3.5 shadow-lg">
        
        {/* Logo */}
        <Link to="/" className="flex flex-col items-center justify-center -mt-1 group cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(0,255,60,0.6)]">
          <div className="flex items-center text-[1.7rem] font-display font-bold tracking-[0.1em] leading-none">
            <span className="text-[#00FF3C]">AXI</span>
            <span className="text-white relative mx-[2px] flex items-center justify-center">
              O
              <span className="absolute text-[#00FF3C] text-[0.45em]">⚡</span>
            </span>
            <span className="text-[#00FF3C]">N</span>
          </div>
          <div className="flex items-center gap-1 mt-[2px] w-full justify-center">
            <div className="w-8 h-[1px] bg-[#00FF3C] opacity-70"></div>
            <span className="text-white font-mono text-[0.45rem] tracking-[0.3em] font-bold">CHARGE</span>
            <div className="w-8 h-[1px] bg-[#00FF3C] opacity-70"></div>
          </div>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center space-x-12">

          {/* Home */}
          <Link to="/" className={linkClass('/')}>
            Home
            <span className={underlineClass('/')}></span>
          </Link>

          {/* Solutions Dropdown */}
          <div
            className="relative group py-4 -my-4 flex items-center"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <span className={`${linkClass('/solutions')} flex items-center gap-1 cursor-pointer`}>
              Solutions <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180 text-[#00FF3C]' : ''}`} />
              <span className={underlineClass('/solutions')}></span>
            </span>
            <div className={`absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 pt-4 w-48 transition-all duration-300 z-50 ${isSolutionsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="bg-[#020403]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col py-2">
                <Link to="/solutions/residential" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">Residential</Link>
                <Link to="/solutions/workplace" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">Workplace</Link>
                <Link to="/solutions/commercial" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">Commercial</Link>
                <Link to="/solutions/fleet" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">Fleet</Link>
                <Link to="/solutions/highway" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">Highway</Link>
              </div>
            </div>
          </div>

          {/* Products Dropdown */}
          <div
            className="relative group py-4 -my-4 flex items-center"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <span className={`${linkClass('/products')} flex items-center gap-1 cursor-pointer`}>
              Products <ChevronDown size={12} className={`opacity-70 transition-transform duration-300 ${isProductsOpen ? 'rotate-180 text-[#00FF3C]' : ''}`} />
              <span className={underlineClass('/products')}></span>
            </span>
            <div className={`absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 pt-4 w-48 transition-all duration-300 z-50 ${isProductsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <div className="bg-[#020403]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col py-2">
                <Link to="/products/ac-chargers" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">AC Chargers</Link>
                <Link to="/products/dc-chargers" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">DC Fast Chargers</Link>
                <Link to="/products/software" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">Management Software</Link>
                <Link to="/products/accessories" className="px-5 py-2.5 text-[0.8rem] text-white/80 hover:text-[#00FF3C] hover:bg-white/5 transition-all">Accessories</Link>
              </div>
            </div>
          </div>

          {/* About */}
          <Link to="/about" className={linkClass('/about')}>
            About
            <span className={underlineClass('/about')}></span>
          </Link>

          {/* Franchise */}
          <Link to="/franchise" className={linkClass('/franchise')}>
            Franchise
            <span className={underlineClass('/franchise')}></span>
          </Link>

          {/* Contact */}
          <Link to="/contact" className={linkClass('/contact')}>
            Contact
            <span className={underlineClass('/contact')}></span>
          </Link>
        </div>

        {/* Right CTA */}
        <div>
          <Link to="/contact" className="flex items-center gap-2 px-6 py-2.5 bg-[#00FF3C] text-black font-sans text-[0.7rem] font-bold uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,60,0.6)] group">
            GET A QUOTE
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
