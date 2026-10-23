import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Cpu, ArrowRight, ShieldCheck, ArrowUpRight } from 'lucide-react';

import ac3kwImg from '../../assets/images/product_ac_2wheeler_3_3kw.webp';
import ac7kwImg from '../../assets/images/product_ac_7_4kw.webp';
import ac7kwCompactImg from '../../assets/images/product_ac_7_4kw_compact.webp';
import ac11kwImg from '../../assets/images/product_ac_11kw.webp';
import ac22kwImg from '../../assets/images/product_ac_22kw.webp';
import dcChargerImg from '../../assets/images/AXION DC charger with black cables-1.webp';
import softwareImg from '../../assets/images/Outdoor Axion Charge Dashboard Billboard.webp';

const EngineeredToChargeSection = () => {
  const [variant7kw, setVariant7kw] = useState('compact'); // 'compact' | 'pro'

  const acChargersList = [
    {
      id: "ac-3kw",
      name: "Axion AC 3.3 kW",
      badge: "AXION 3",
      power: "3.3 kW",
      tag: "3 Sockets · 2W/3W/4W",
      price: "₹14,900",
      image: ac3kwImg,
      link: "/product/ac-3kw",
    },
    {
      id: "ac-7kw",
      name: variant7kw === 'compact' ? "Axion 7.4 kW Compact" : "Axion 7.4 kW Pro",
      badge: variant7kw === 'compact' ? "Compact" : "Axion Pro",
      power: "7.4 kW",
      tag: variant7kw === 'compact' ? "Ultra-Slim Home Wallbox" : "Home & Apartment Pro",
      price: variant7kw === 'compact' ? "₹49,900" : "₹59,900",
      image: variant7kw === 'compact' ? ac7kwCompactImg : ac7kwImg,
      link: variant7kw === 'compact' ? "/product/ac-7-4kw-compact" : "/product/ac-7kw",
    },
    {
      id: "ac-11kw",
      name: "Axion AC 11 kW",
      badge: "Commercial",
      power: "11 kW",
      tag: "3-Phase Workplace",
      price: "₹74,900",
      image: ac11kwImg,
      link: "/product/ac-11kw",
    },
    {
      id: "ac-22kw",
      name: "Axion AC 22 kW",
      badge: "Dual-Gun",
      power: "22 kW",
      tag: "Fast Fleet & Retail",
      price: "₹89,900",
      image: ac22kwImg,
      link: "/product/ac-22kw",
    },
  ];
  return (
    <section className="relative w-full bg-[#050708] py-24 md:py-32 z-20 overflow-hidden border-t border-white/5">
      
      {/* Background Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,255,0,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full relative z-10 flex flex-col h-full">
        
        {/* Header */}
        <div className="mb-14 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Hardware & Software Ecosystem</span>
            </div>
            
            <h2 className="text-[2rem] sm:text-[2.8rem] md:text-[4rem] font-display font-bold text-white uppercase tracking-tight leading-[1.1] max-w-[800px]">
              ENGINEERED TO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00C800]">CHARGE.</span>
            </h2>
            <p className="text-[1.05rem] sm:text-[1.1rem] text-[#9CA3AF] font-sans max-w-[650px] mt-6 leading-relaxed">
              From ultra-fast DC hubs to intelligent AC wallboxes, our technology stack is designed for relentless performance and absolute reliability.
            </p>
          </motion.div>
        </div>

        {/* Asymmetric Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-[580px]">
          
          {/* Left Feature: AC Chargers Showcase with 4 Small Boxes in 2x2 Grid (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-[#0A0D10] border border-white/10 hover:border-accent/40 transition-colors duration-500 p-5 sm:p-7 md:p-8 flex flex-col justify-between shadow-2xl group"
          >
            {/* Ambient glowing background inside box */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Header inside Left Big Box */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-accent font-mono text-[0.65rem] uppercase tracking-widest font-bold shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.2)]">
                    AC Wallbox Series
                  </span>
                  <span className="px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full text-gray-300 font-mono text-[0.65rem] uppercase tracking-widest">
                    3.3kW – 22kW
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-wide">
                  SMART AC CHARGERS
                </h3>
              </div>

              <Link 
                to="/products/ac-chargers"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent hover:text-white transition-colors duration-300 group/link"
              >
                <span>View All Specs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* 2x2 Mini Boxes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 my-5 relative z-10">
              {acChargersList.map((charger) => (
                <Link
                  key={charger.id}
                  to={charger.link}
                  className="group/card relative rounded-2xl overflow-hidden bg-[#060809] border border-white/10 hover:border-accent/60 p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(var(--color-accent-rgb),0.18)] hover:-translate-y-1"
                >
                  {/* Top bar of mini box */}
                  <div className="flex items-center justify-between gap-1.5 mb-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-xs sm:text-sm font-display font-bold text-white/95 truncate">
                        {charger.name}
                      </span>
                      {charger.id === "ac-7kw" && (
                        <div 
                          className="flex items-center gap-0.5 bg-black/70 p-0.5 rounded-full border border-white/15 text-[0.55rem] font-mono flex-shrink-0"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setVariant7kw('compact');
                            }}
                            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                              variant7kw === 'compact' 
                                ? 'bg-accent text-black font-bold shadow-[0_0_8px_rgba(0,255,0,0.4)]' 
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            COMPACT
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setVariant7kw('pro');
                            }}
                            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                              variant7kw === 'pro' 
                                ? 'bg-accent text-black font-bold shadow-[0_0_8px_rgba(0,255,0,0.4)]' 
                                : 'text-white/60 hover:text-white'
                            }`}
                          >
                            PRO
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="text-[0.6rem] sm:text-[0.65rem] font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/30 whitespace-nowrap shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.2)]">
                      {charger.power}
                    </span>
                  </div>

                  {/* Image thumbnail */}
                  <div className="relative w-full aspect-[16/9.5] rounded-xl overflow-hidden bg-black/60 border border-white/5 my-1">
                    <img 
                      key={`${charger.id}-${charger.image}`}
                      src={charger.image} 
                      alt={charger.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover/card:scale-108 transition-transform duration-700 brightness-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover/card:opacity-30 transition-opacity" />
                    
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80 group-hover/card:bg-accent group-hover/card:text-black group-hover/card:border-accent transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom bar of mini box */}
                  <div className="flex items-center justify-between gap-1 pt-2.5 border-t border-white/5 mt-1.5">
                    <span className="text-[0.65rem] sm:text-xs text-white/60 font-sans truncate">
                      {charger.tag}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-accent">
                      {charger.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer Bar of Left Big Box */}
            <div className="relative z-10 pt-4 border-t border-white/5 flex items-center justify-between gap-3 text-xs text-[#9CA3AF]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-[0.75rem] sm:text-xs">OCPP 1.6J · IP65 Weatherproof · 1-Year Warranty</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Stack: Up (DC Charger) and Down (Software CMS) (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            
            {/* TOP BOX (UP): DC Fast Charger */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative min-h-[270px] lg:min-h-0 lg:flex-1 rounded-3xl overflow-hidden bg-[#0A0D10] border border-white/10 hover:border-accent/40 group cursor-pointer transition-all duration-300 shadow-xl"
            >
              <Link to="/products/dc-chargers" className="block w-full h-full">
                <img 
                  src={dcChargerImg} 
                  alt="DC Fast Charger" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[2s] group-hover:scale-105 opacity-100"
                />
                
                {/* Top Badges */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <div className="px-3 py-1 bg-black/70 backdrop-blur-md border border-accent/40 rounded-full text-accent font-mono text-[0.65rem] uppercase tracking-widest font-bold shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.25)]">
                    Flagship
                  </div>
                  <div className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-gray-300 font-mono text-[0.65rem] uppercase tracking-widest">
                    30kW – 240kW+
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#020403]/90 via-[#020403]/30 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 flex items-end justify-between gap-3">
                  <div className="max-w-[380px]">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1 tracking-wide group-hover:text-accent transition-colors duration-300">
                      DC FAST CHARGERS
                    </h3>
                    <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                      High-power monolithic stations designed for highway transit corridors & fleet depots.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300 flex-shrink-0 shadow-lg">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* BOTTOM BOX (DOWN): Axion Intelligence / Software CMS */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative min-h-[270px] lg:min-h-0 lg:flex-1 rounded-3xl overflow-hidden bg-[#0A0D10] border border-white/10 hover:border-accent/40 group cursor-pointer transition-all duration-300 shadow-xl"
            >
              <Link to="/product/cms" className="block w-full h-full">
                <img 
                  src={softwareImg} 
                  alt="Smart Charging Software" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-[center_28%] transition-transform duration-[2s] group-hover:scale-105 opacity-100"
                />
                
                {/* Top Badges */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <div className="px-3 py-1 bg-accent/15 backdrop-blur-md border border-accent/40 rounded-full text-accent font-mono text-[0.65rem] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.2)]">
                    <Cpu className="w-3 h-3 text-accent" /> Core OS
                  </div>
                  <div className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-gray-300 font-mono text-[0.65rem] uppercase tracking-widest">
                    Cloud CMS
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#020403]/90 via-[#020403]/30 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 flex items-end justify-between gap-3">
                  <div className="max-w-[380px]">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1 tracking-wide group-hover:text-accent transition-colors duration-300">
                      AXION INTELLIGENCE
                    </h3>
                    <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed">
                      Real-time monitoring, dynamic load balancing, fleet telemetry & automated billing.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300 flex-shrink-0 shadow-lg">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default EngineeredToChargeSection;
