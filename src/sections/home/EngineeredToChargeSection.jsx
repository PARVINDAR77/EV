import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, ArrowRight } from 'lucide-react';
import dcChargerImg from '../../assets/images/product_render.jpg';
import acChargerImg from '../../assets/images/ac_charger.jpg';
import softwareImg from '../../assets/images/software_dashboard.jpg';

const Watermark = () => (
  <div className="absolute top-6 right-6 z-10 flex flex-col items-end opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
    <img src="/logo.png" alt="Axion Charge Logo" className="h-6 sm:h-8 w-auto object-contain mix-blend-screen opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

const EngineeredToChargeSection = () => {
  return (
    <section className="relative w-full bg-[#050708] py-24 md:py-32 z-20 overflow-hidden border-t border-white/5">
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,227,44,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full relative z-10 flex flex-col h-full">
        
        {/* Header */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#00E32C]" />
              <span className="text-[#00E32C] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Hardware & Software Ecosystem</span>
            </div>
            
            <h2 className="text-[2rem] sm:text-[2.8rem] md:text-[4rem] font-display font-bold text-white uppercase tracking-tight leading-[1.1] max-w-[800px]">
              ENGINEERED TO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E32C] to-[#00B523]">CHARGE.</span>
            </h2>
            <p className="text-[1.1rem] text-[#9CA3AF] font-sans max-w-[600px] mt-6 leading-relaxed">
              From ultra-fast DC hubs to intelligent AC wallboxes, our technology stack is designed for relentless performance and absolute reliability.
            </p>
          </motion.div>
        </div>

        {/* Asymmetric Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[700px]">
          
          {/* Main Feature: DC Fast Charger (Left, spanning 7 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#0B0F12] border border-white/5 group h-[500px] lg:h-auto cursor-pointer"
          >
            <img 
              src={dcChargerImg} 
              alt="DC Fast Charger" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-100"
            />
            
            <Watermark />
            
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/90 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050708]/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-[#00E32C]/10 border border-[#00E32C]/30 rounded text-[#00E32C] font-mono text-[0.6rem] uppercase tracking-widest">Flagship</div>
                  <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400 font-mono text-[0.6rem] uppercase tracking-widest">30kW - 240kW+</div>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">DC FAST CHARGER</h3>
                <p className="text-gray-400 font-sans text-sm md:text-base max-w-[400px]">High-power monolithic charging stations designed for highways and fleet depots.</p>
              </div>
              
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#00E32C] group-hover:border-[#00E32C] group-hover:text-black transition-all duration-300">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>

          {/* Right Column Stack (spanning 5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            
            {/* Secondary Feature: AC Charger */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative min-h-[300px] lg:min-h-0 lg:flex-1 rounded-2xl overflow-hidden bg-[#0B0F12] border border-white/5 group cursor-pointer"
            >
              <img 
                src={acChargerImg} 
                alt="AC Wallbox Charger" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-100"
              />
              <Watermark />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/90 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 mb-2">
                  <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[#00E32C] font-mono text-[0.6rem] uppercase tracking-widest">3.3kW - 22kW</div>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-1">AC CHARGERS</h3>
                <p className="text-gray-400 font-sans text-sm">Compact and smart wallboxes for residential and workplace charging.</p>
              </div>
            </motion.div>

            {/* Tertiary Feature: Software */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative min-h-[300px] lg:min-h-0 lg:flex-1 rounded-2xl overflow-hidden bg-[#0B0F12] border border-white/5 group cursor-pointer"
            >
              <img 
                src={softwareImg} 
                alt="Smart Charging Software" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-100"
              />
              <Watermark />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/90 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center gap-2 mb-2">
                   <div className="px-2 py-1 bg-[#00E32C]/10 border border-[#00E32C]/30 rounded text-[#00E32C] font-mono text-[0.6rem] uppercase tracking-widest flex items-center gap-1">
                     <Cpu className="w-3 h-3" /> Core OS
                   </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-1">AXION INTELLIGENCE</h3>
                <p className="text-gray-400 font-sans text-sm">Real-time monitoring, dynamic load balancing, and fleet management.</p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EngineeredToChargeSection;
