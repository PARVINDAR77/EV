import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Zap, Users, BarChart3, ArrowRight } from 'lucide-react';
import dashboardBillboardImg from '../../assets/images/Outdoor Axion Charge Dashboard Billboard.webp';

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
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[90vh] bg-[#050708] py-24 z-20 overflow-hidden border-t border-white/5 flex items-center">
      
      {/* Background Depth */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center z-10 relative">
        
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
            className="text-[1.1rem] text-[#9CA3AF] font-sans max-w-[500px] mb-8 leading-relaxed"
          >
            Axion Intelligence gives you total oversight of your network. Real-time monitoring, dynamic load balancing, and predictive maintenance built right in.
          </motion.p>

          <div className="flex flex-col gap-2 mb-8">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <button
              onClick={() => navigate('/product/cms')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00FF00]/10 hover:bg-[#00FF00] text-[#00FF00] hover:text-black border border-[#00FF00]/30 hover:border-[#00FF00] font-sans text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.15)] group w-fit cursor-pointer"
            >
              <span>Explore CMS Platform</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Right Content - Software Dashboard Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          onClick={() => navigate('/product/cms')}
          className="relative w-full aspect-[16/9] rounded-2xl border border-white/10 hover:border-[#00FF00]/40 bg-[#0B0F12] shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center group cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,0,0.15)]"
        >
          {/* Subtle green ambient lighting behind the image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00FF00]/5 to-transparent pointer-events-none z-10" />
          
          <img 
            src={dashboardBillboardImg} 
            alt="Axion Charge Dashboard Billboard" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-[1.8s] ease-out"
          />

          {/* Bottom subtle gradient vignette to blend base smoothly */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />

          {/* Bottom Interactive Bar - placed on the plinth area without obstructing dashboard data */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="px-3 py-1.5 bg-black/75 backdrop-blur-md border border-[#00FF00]/30 rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse shadow-[0_0_8px_#00FF00]" />
              <span className="text-white font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-wider font-semibold">
                Axion Cloud CMS • Live Network
              </span>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/75 backdrop-blur-md border border-white/15 group-hover:border-[#00FF00]/60 rounded-full text-white group-hover:text-[#00FF00] transition-all duration-300 shadow-lg">
              <span className="text-[0.65rem] sm:text-[0.7rem] font-sans font-medium hidden sm:inline">Explore CMS</span>
              <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default SmartControlSection;
