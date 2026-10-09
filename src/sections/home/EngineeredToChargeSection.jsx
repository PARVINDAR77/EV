import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, ArrowRight } from 'lucide-react';
import dcChargerImg from '../../assets/images/AXION DC charger with black cables-1.png';
import acChargerImg from '../../assets/images/22 kW EV charger, black AXION logo-4.png';
import softwareImg from '../../assets/images/software_dashboard.jpg';

const EngineeredToChargeSection = () => {
  return (
    <section className="relative w-full bg-[#050708] py-24 md:py-32 z-20 overflow-hidden border-t border-white/5">
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,255,0,0.03)_0%,transparent_60%)] pointer-events-none" />

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
              <div className="w-8 h-[1px] bg-[#00FF00]" />
              <span className="text-[#00FF00] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Hardware & Software Ecosystem</span>
            </div>
            
            <h2 className="text-[2rem] sm:text-[2.8rem] md:text-[4rem] font-display font-bold text-white uppercase tracking-tight leading-[1.1] max-w-[800px]">
              ENGINEERED TO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-[#00C800]">CHARGE.</span>
            </h2>
            <p className="text-[1.1rem] text-[#9CA3AF] font-sans max-w-[600px] mt-6 leading-relaxed">
              From ultra-fast DC hubs to intelligent AC wallboxes, our technology stack is designed for relentless performance and absolute reliability.
            </p>
          </motion.div>
        </div>

        {/* Asymmetric Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[580px]">
          
          {/* Main Feature: DC Fast Charger (Left, spanning 7 columns) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-[#0B0F12] border border-white/5 hover:border-[#00FF00]/30 group h-[480px] lg:h-auto min-h-[480px] lg:min-h-[580px] cursor-pointer transition-colors duration-300"
          >
            <img 
              src={dcChargerImg} 
              alt="DC Fast Charger" 
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[2s] group-hover:scale-105 opacity-100"
            />
            
            {/* Top Badges */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
              <div className="px-3 py-1 bg-black/70 backdrop-blur-md border border-[#00FF00]/40 rounded-full text-[#00FF00] font-mono text-[0.65rem] uppercase tracking-widest font-bold shadow-[0_0_12px_rgba(0,255,0,0.25)]">
                Flagship
              </div>
              <div className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-gray-300 font-mono text-[0.65rem] uppercase tracking-widest">
                30kW – 240kW+
              </div>
            </div>

            {/* Gradient Overlay for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/85 via-transparent to-transparent pointer-events-none" />

            {/* Content Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex items-end justify-between gap-4">
              <div className="max-w-[460px]">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1.5 tracking-wide">
                  DC FAST CHARGER
                </h3>
                <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                  High-power monolithic charging stations designed for highway corridors and rapid fleet depots.
                </p>
              </div>
              
              <div className="w-11 h-11 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#00FF00] group-hover:border-[#00FF00] group-hover:text-black transition-all duration-300 flex-shrink-0 shadow-lg">
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
              className="relative min-h-[260px] lg:min-h-0 lg:flex-1 rounded-2xl overflow-hidden bg-[#0B0F12] border border-white/5 hover:border-[#00FF00]/30 group cursor-pointer transition-colors duration-300"
            >
              <img 
                src={acChargerImg} 
                alt="AC Wallbox Charger" 
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[2s] group-hover:scale-105 opacity-100"
              />
              
              {/* Top Badges */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-[#00FF00]/40 rounded-full text-[#00FF00] font-mono text-[0.6rem] uppercase tracking-widest font-bold shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                  AC Wallbox
                </div>
                <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-gray-300 font-mono text-[0.6rem] uppercase tracking-widest">
                  3.3kW – 22kW
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/85 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 flex items-end justify-between gap-3 pointer-events-none">
                <div className="max-w-[380px]">
                  <h3 className="text-xl font-display font-bold text-white mb-1">AC CHARGERS</h3>
                  <p className="text-gray-300 font-sans text-xs leading-relaxed">
                    Compact and smart wallboxes for residential, apartment, and corporate workplace charging.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#00FF00] group-hover:border-[#00FF00] group-hover:text-black transition-all duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>

            {/* Tertiary Feature: Software */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative min-h-[260px] lg:min-h-0 lg:flex-1 rounded-2xl overflow-hidden bg-[#0B0F12] border border-white/5 hover:border-[#00FF00]/30 group cursor-pointer transition-colors duration-300"
            >
              <img 
                src={softwareImg} 
                alt="Smart Charging Software" 
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-[center_28%] transition-transform duration-[2s] group-hover:scale-105 opacity-100"
              />
              
              {/* Top Badges */}
              <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                <div className="px-2.5 py-1 bg-[#00FF00]/15 backdrop-blur-md border border-[#00FF00]/40 rounded-full text-[#00FF00] font-mono text-[0.6rem] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                  <Cpu className="w-3 h-3 text-[#00FF00]" /> Core OS
                </div>
                <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-gray-300 font-mono text-[0.6rem] uppercase tracking-widest">
                  Cloud CMS
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/85 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 flex items-end justify-between gap-3 pointer-events-none">
                <div className="max-w-[380px]">
                  <h3 className="text-xl font-display font-bold text-white mb-1">AXION INTELLIGENCE</h3>
                  <p className="text-gray-300 font-sans text-xs leading-relaxed">
                    Real-time monitoring, dynamic load balancing, telemetry, and fleet management.
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#00FF00] group-hover:border-[#00FF00] group-hover:text-black transition-all duration-300 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EngineeredToChargeSection;
