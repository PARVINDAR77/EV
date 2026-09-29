import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#020403] pt-24 pb-10 z-20 overflow-hidden border-t border-white/5">
      
      {/* Huge Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <span className="text-[25vw] font-display font-black text-white/[0.015] tracking-tighter uppercase whitespace-nowrap select-none">
          AXION
        </span>
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00FF3C]/[0.02] rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00FF3C]/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full relative z-10 flex flex-col">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-20 border-b border-white/10 pb-16">
          
          <div className="flex flex-col max-w-lg">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight mb-4">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF3C] to-white/50">Evolution.</span>
            </h3>
            <p className="text-white/50 font-sans text-sm md:text-base leading-relaxed mb-8">
              Subscribe to our newsletter for the latest updates on EV infrastructure, product launches, and industry insights.
            </p>
            
            <form className="relative flex items-center w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
              <Mail className="absolute left-4 text-white/40 w-5 h-5" />
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-32 text-white font-sans text-sm focus:outline-none focus:border-[#00FF3C]/50 transition-colors"
                required
              />
              <button 
                type="submit"
                className="absolute right-2 px-6 py-2 bg-[#00FF3C] text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,60,0.4)] transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex flex-col items-start lg:items-end text-left lg:text-right">
            <div className="flex flex-col items-start lg:items-end mb-6 group cursor-pointer">
              <span className="text-[#00FF3C] font-display font-bold text-[3.5rem] tracking-widest uppercase leading-none group-hover:drop-shadow-[0_0_15px_rgba(0,255,60,0.5)] transition-all duration-300">AXION</span>
              <span className="text-white font-sans text-[1.4rem] tracking-[0.4em] leading-none mt-2">CHARGE</span>
              <span className="text-[#00FF3C]/70 font-mono text-[0.6rem] tracking-[0.3em] mt-3 border border-[#00FF3C]/20 px-3 py-1 rounded-full bg-[#00FF3C]/5">ENERGY : EVOLVED</span>
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-[#00FF3C] hover:border-[#00FF3C]/50 hover:bg-[#00FF3C]/10 hover:shadow-[0_0_15px_rgba(0,255,60,0.2)] transition-all duration-300 font-mono text-[0.7rem] uppercase font-bold tracking-widest">
                X
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-[#00FF3C] hover:border-[#00FF3C]/50 hover:bg-[#00FF3C]/10 hover:shadow-[0_0_15px_rgba(0,255,60,0.2)] transition-all duration-300 font-mono text-[0.7rem] uppercase font-bold tracking-widest">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-[#00FF3C] hover:border-[#00FF3C]/50 hover:bg-[#00FF3C]/10 hover:shadow-[0_0_15px_rgba(0,255,60,0.2)] transition-all duration-300 font-mono text-[0.7rem] uppercase font-bold tracking-widest">
                IN
              </a>
            </div>
          </div>
          
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          <div className="flex flex-col">
            <h5 className="text-white font-mono font-bold text-[0.8rem] uppercase tracking-widest mb-6 border-l-2 border-[#00FF3C] pl-3">Company</h5>
            <ul className="flex flex-col gap-4 text-white/50 font-sans text-sm">
              <li><Link to="/about" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> About Us</Link></li>
              <li><Link to="/franchise" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Franchise</Link></li>
              <li><Link to="/contact" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Contact</Link></li>
              <li><Link to="#" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Careers</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h5 className="text-white font-mono font-bold text-[0.8rem] uppercase tracking-widest mb-6 border-l-2 border-[#00FF3C] pl-3">Solutions</h5>
            <ul className="flex flex-col gap-4 text-white/50 font-sans text-sm">
              <li><Link to="/solutions/residential" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Residential</Link></li>
              <li><Link to="/solutions/workplace" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Workplace</Link></li>
              <li><Link to="/solutions/commercial" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Commercial</Link></li>
              <li><Link to="/solutions/fleet" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Fleet Logistics</Link></li>
              <li><Link to="/solutions/highway" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Highway Transit</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h5 className="text-white font-mono font-bold text-[0.8rem] uppercase tracking-widest mb-6 border-l-2 border-[#00FF3C] pl-3">Hardware</h5>
            <ul className="flex flex-col gap-4 text-white/50 font-sans text-sm">
              <li><Link to="#" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> AC Wallboxes</Link></li>
              <li><Link to="#" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> DC Fast Chargers</Link></li>
              <li><Link to="#" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Fleet Hubs</Link></li>
              <li><Link to="#" className="hover:text-[#00FF3C] transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"/> Accessories</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h5 className="text-white font-mono font-bold text-[0.8rem] uppercase tracking-widest mb-6 border-l-2 border-[#00FF3C] pl-3">Contact HQ</h5>
            <ul className="flex flex-col gap-4 text-white/50 font-sans text-sm">
              <li className="flex flex-col gap-1">
                <span className="text-white/30 text-[0.65rem] font-bold uppercase tracking-wider">Call Us</span>
                <span className="text-white font-mono">+91 98798 80561</span>
              </li>
              <li className="flex flex-col gap-1 mt-2">
                <span className="text-white/30 text-[0.65rem] font-bold uppercase tracking-wider">Email</span>
                <a href="mailto:info@axioncharge.com" className="hover:text-[#00FF3C] transition-colors font-mono">info@axioncharge.com</a>
              </li>
              <li className="flex flex-col gap-1 mt-2">
                <span className="text-white/30 text-[0.65rem] font-bold uppercase tracking-wider">Location</span>
                <span className="leading-relaxed">Silicon Valley, CA 94025<br/>United States</span>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 relative z-10">
          <p className="text-white/40 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} AXION CHARGE. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6 text-white/40 font-mono text-[0.65rem] uppercase tracking-[0.1em]">
            <Link to="#" className="hover:text-[#00FF3C] transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <Link to="#" className="hover:text-[#00FF3C] transition-colors">Terms of Service</Link>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <Link to="#" className="hover:text-[#00FF3C] transition-colors">Cookie Settings</Link>
          </div>
        </div>
        
        {/* Animated Green Laser Line at very bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden z-20">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#00FF3C] to-transparent shadow-[0_0_15px_#00FF3C]"
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
