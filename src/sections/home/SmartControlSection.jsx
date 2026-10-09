import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Users, BarChart3 } from 'lucide-react';
import softwareImg from '../../assets/images/software_dashboard.jpg';

const FeatureBullet = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className="flex items-center gap-5 p-4 rounded-xl border border-transparent hover:border-[#00FF00]/20 hover:bg-[#00FF00]/5 transition-all duration-300 group cursor-default"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 group-hover:border-[#00FF00]/50 flex items-center justify-center bg-[#0B0F12] transition-colors duration-300">
      <Icon className="text-[#00FF00] w-5 h-5" strokeWidth={1.5} />
    </div>
    <div className="flex flex-col">
      <h4 className="text-white font-sans font-bold text-[1rem] mb-0.5 group-hover:text-[#00FF00] transition-colors">{title}</h4>
      <p className="text-[#9CA3AF] font-sans text-[0.8rem]">{description}</p>
    </div>
  </motion.div>
);

const SmartControlSection = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#050708] py-24 z-20 overflow-hidden border-t border-white/5 flex items-center">
      
      {/* Background Depth */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center z-10 relative">
        
        {/* Left Content */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#00FF00]" />
              <span className="text-[#00FF00] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">OS Architecture</span>
            </div>
            
            <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-display font-bold text-white uppercase tracking-tight mb-6 leading-[1.1]">
              SMARTER CHARGING.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-[#00C800]">GREATER CONTROL.</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[1.1rem] text-[#9CA3AF] font-sans max-w-[500px] mb-12 leading-relaxed"
          >
            Axion Intelligence gives you total oversight of your network. Real-time monitoring, dynamic load balancing, and predictive maintenance built right in.
          </motion.p>

          <div className="flex flex-col gap-2">
            <FeatureBullet 
              icon={Activity} 
              title="Connected Fleet" 
              description="Live telemetry from every charging node." 
              delay={0.3} 
            />
            <FeatureBullet 
              icon={Zap} 
              title="Dynamic Load Balancing" 
              description="Optimize grid usage without blowing fuses." 
              delay={0.4} 
            />
            <FeatureBullet 
              icon={Users} 
              title="Session Control" 
              description="Manage users, RFID access, and billing seamlessly." 
              delay={0.5} 
            />
            <FeatureBullet 
              icon={BarChart3} 
              title="Deep Analytics" 
              description="Extract ROI and utilization metrics instantly." 
              delay={0.6} 
            />
          </div>
        </div>

        {/* Right Content - Software Dashboard Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative w-full aspect-[4/3] rounded-2xl border border-white/10 bg-[#0B0F12] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center group perspective-1000"
        >
          {/* Subtle green glow behind the image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00FF00]/10 to-transparent pointer-events-none z-10" />
          
          <img 
            src={softwareImg} 
            alt="Axion Charging Dashboard" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-100 brightness-[1.4] contrast-125 group-hover:scale-105 transition-transform duration-[2s]"
          />

          {/* Floating UI Element (HUD) */}
          <div className="absolute top-6 right-6 bg-[#0B0F12]/80 backdrop-blur-md border border-[#00FF00]/30 px-4 py-2 rounded-lg flex items-center gap-3 shadow-[0_0_20px_rgba(0,255,0,0.1)] z-20">
            <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
            <span className="text-white font-mono text-xs uppercase tracking-widest">Network Online</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default SmartControlSection;
