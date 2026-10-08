import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#020403] pt-24 pb-10 z-20 overflow-hidden border-t border-white/5">

      {/* Huge Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <span className="text-[25vw] font-display font-black text-white/[0.04] tracking-tighter uppercase whitespace-nowrap select-none">
          AXION
        </span>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.02] rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full relative z-10 flex flex-col">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-12 mb-20 border-b border-white/10 pb-16">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:max-w-lg">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight mb-4">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00A020] pr-2">Evolution.</span>
            </h3>
            <p className="text-white/50 font-sans text-sm md:text-base leading-relaxed mb-8">
              Subscribe to our newsletter for the latest updates on EV infrastructure, product launches, and industry insights.
            </p>
            
            <form className="flex flex-col sm:relative sm:items-center w-full max-w-md gap-3 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
              <div className="relative w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-4 sm:pr-32 text-white font-sans text-sm focus:outline-none focus:border-accent/50 transition-colors"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full sm:w-auto sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 px-6 py-4 sm:py-2 bg-accent text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center lg:items-end text-center lg:text-right w-full lg:w-auto mt-4 lg:mt-0">
            <div className="flex flex-col items-center mb-6 group cursor-pointer transition-all duration-300 hover:brightness-125">
              <img 
                src="/logo.png" 
                alt="Axion Charge Logo" 
                className="h-28 sm:h-32 md:h-36 lg:h-32 w-auto object-contain transition-all duration-300 opacity-60 hover:opacity-100" 
              />
            </div>
            
            <div className="flex items-center justify-center lg:justify-end gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.2)] transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.2)] transition-all duration-300">
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-accent hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.2)] transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 lg:gap-8 mb-20">
          
          <div className="flex flex-col">
            <h5 className="text-white font-mono font-bold text-[0.8rem] uppercase tracking-widest mb-6 border-l-2 border-accent pl-3">Company</h5>
            <ul className="flex flex-col gap-4 text-white/80 font-sans text-sm font-medium">
              <li><Link to="/about" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> About Us</Link></li>
              <li><Link to="/franchise" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Franchise</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Contact</Link></li>
              <li><Link to="#" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Careers</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h5 className="text-white font-mono font-bold text-[0.8rem] uppercase tracking-widest mb-6 border-l-2 border-accent pl-3">Solutions</h5>
            <ul className="flex flex-col gap-4 text-white/80 font-sans text-sm font-medium">
              <li><Link to="/solutions/residential" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Residential</Link></li>
              <li><Link to="/solutions/workplace" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Workplace</Link></li>
              <li><Link to="/solutions/commercial" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Commercial</Link></li>
              <li><Link to="/solutions/fleet" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Fleet Logistics</Link></li>
              <li><Link to="/solutions/highway" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Highway Transit</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h5 className="text-white font-mono font-bold text-[0.8rem] uppercase tracking-widest mb-6 border-l-2 border-accent pl-3">Hardware</h5>
            <ul className="flex flex-col gap-4 text-white/80 font-sans text-sm font-medium">
              <li><Link to="/products/ac-chargers" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> AC Wallboxes</Link></li>
              <li><Link to="/products/dc-chargers" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> DC Fast Chargers</Link></li>
              <li><Link to="/solutions/fleet" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Fleet Hubs</Link></li>
              <li><Link to="/products/accessories" className="hover:text-accent transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Accessories</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h5 className="text-white font-mono font-bold text-[0.8rem] uppercase tracking-widest mb-6 border-l-2 border-accent pl-3">Contact HQ</h5>
            <ul className="flex flex-col gap-4 text-white/80 font-sans text-sm font-medium">
              <li className="flex flex-col gap-1">
                <span className="text-white/40 text-[0.65rem] font-bold uppercase tracking-wider">Call Us</span>
                <span className="text-white font-mono text-xs mb-1">Growth: +91 99799 93397</span>
                <span className="text-white font-mono text-xs">Systems: +91 99799 93396</span>
              </li>
              <li className="flex flex-col gap-1 mt-2">
                <span className="text-white/40 text-[0.65rem] font-bold uppercase tracking-wider">Email</span>
                <a href="mailto:info@axioncharge.com" className="hover:text-accent transition-colors font-mono text-xs mb-1">info@axioncharge.com</a>
                <a href="mailto:systems@axioncharge.com" className="hover:text-accent transition-colors font-mono text-xs">systems@axioncharge.com</a>
              </li>
              <li className="flex flex-col gap-1 mt-2">
                <span className="text-white/40 text-[0.65rem] font-bold uppercase tracking-wider">Location</span>
                <span className="leading-relaxed text-xs">509, Skywalk The Element,<br/>Jagatpur Rd, off SG Highway,<br/>Ahmedabad, Gujarat 382470</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-center gap-6 pt-8 border-t border-white/10 relative z-10">
          <p className="text-white/40 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} AXION CHARGE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-white/40 font-mono text-[0.65rem] uppercase tracking-[0.1em]">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <Link to="#" className="hover:text-accent transition-colors">Cookie Settings</Link>
          </div>
        </div>
        
        {/* Animated Green Laser Line at very bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden z-20">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent shadow-[0_0_15px_var(--color-accent)]"
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
