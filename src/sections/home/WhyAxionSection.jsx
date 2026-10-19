import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Maximize, Cpu, Headphones, CheckCircle2, Handshake } from 'lucide-react';
import AxionLogo from '../../components/common/AxionLogo';

// 6 completely unique images — none repeated anywhere else on the site
import imgEngineered  from '../../assets/images/why_engineered_for_india.webp';    // 7.png: Lab test / 235 kW
import imgScalable    from '../../assets/images/why_scalable.webp';                 // Large charging station
import imgSmartTech   from '../../assets/images/why_smarttech.webp';                // AI / tech brain
import imgDeployment  from '../../assets/images/why_reliable_deployment.webp';     // 3.png: Turnkey engineering
import imgSupport     from '../../assets/images/why_247_support.webp';              // 2.png: 24/7 NOC support
import imgPartnership from '../../assets/images/why_partnership.webp';              // Business handshake

const cards = [
  {
    span: 'lg:col-span-2',
    height: 'h-[420px]',
    image: imgEngineered,
    badge: '01 · Reliability',
    icon: Shield,
    title: 'ENGINEERED FOR INDIA',
    desc: 'Built to withstand extreme temperatures, voltage fluctuations, and diverse weather conditions without compromising on charging speeds.',
    delay: 0.1,
    hasEmbeddedText: true,
  },
  {
    span: 'lg:col-span-1',
    height: 'h-[420px]',
    image: imgScalable,
    badge: '02 · Modular',
    icon: Maximize,
    title: 'SCALABLE INFRASTRUCTURE',
    desc: 'From single parking bays to massive highway transit hubs, our modular architecture grows seamlessly with your demand.',
    delay: 0.2,
    hasEmbeddedText: false,
  },
  {
    span: 'lg:col-span-1',
    height: 'h-[420px]',
    image: imgSmartTech,
    badge: '03 · IoT',
    icon: Cpu,
    title: 'SMART TECHNOLOGY',
    desc: 'IoT-enabled chargers with over-the-air software updates, remote diagnostics, and dynamic load management built in.',
    delay: 0.3,
    hasEmbeddedText: false,
  },
  {
    span: 'lg:col-span-2',
    height: 'h-[420px]',
    image: imgDeployment,
    badge: '04 · Turnkey',
    icon: CheckCircle2,
    title: 'RELIABLE DEPLOYMENT',
    desc: 'End-to-end project execution. Site survey, civil works, grid connection, commissioning — all managed by our team. On time, every time.',
    delay: 0.4,
    hasEmbeddedText: true,
  },
  {
    span: 'lg:col-span-2',
    height: 'h-[420px]',
    image: imgSupport,
    badge: '05 · Always On',
    icon: Headphones,
    title: '24/7 SUPPORT',
    desc: 'Our NOC team monitors every charger in real time. Rapid on-site response guaranteed. 99.9% uptime SLA backed by our service contract.',
    delay: 0.5,
    hasEmbeddedText: true,
  },
  {
    span: 'lg:col-span-1',
    height: 'h-[420px]',
    image: imgPartnership,
    badge: '06 · Partners',
    icon: Handshake,
    title: 'LONG-TERM PARTNERSHIP',
    desc: "We don't just sell chargers. We build sustainable EV ecosystems — infrastructure, software, and ongoing maintenance.",
    delay: 0.6,
    hasEmbeddedText: false,
  },
];

const Card = ({ image, badge, icon: Icon, title, desc, delay, hasEmbeddedText }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative rounded-3xl overflow-hidden group cursor-pointer w-full aspect-[16/7.6] bg-[#070A0C] border border-white/10 hover:border-accent/50 transition-colors duration-500 shadow-xl"
  >
    {/* Background image - fills entire box edge-to-edge */}
    <img
      src={image}
      alt={title}
      loading="lazy"
      decoding="async"
      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 brightness-[1.03]"
    />

    {/* Overlays for cards without embedded text */}
    {!hasEmbeddedText && (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-[#020403]/95 via-[#020403]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020403]/30 via-transparent to-transparent pointer-events-none" />
      </>
    )}

    {/* Neon border glow on hover */}
    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 group-hover:ring-[var(--color-accent)]/50 transition-all duration-500 pointer-events-none" />
    {/* Green ambient glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--color-accent-rgb),0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

    {/* HTML Content (rendered only when not already part of the image) */}
    {!hasEmbeddedText && (
      <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 sm:p-6 md:p-7 lg:p-8">
        {/* Badge + icon */}
        <div className="flex items-center gap-2 sm:gap-2.5 mb-1.5 sm:mb-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-black/60 border border-accent/40 flex items-center justify-center backdrop-blur-md group-hover:border-accent group-hover:bg-accent/15 group-hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)] transition-all duration-500 flex-shrink-0">
            <Icon className="text-accent w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" strokeWidth={1.5} />
          </div>
          <span className="text-accent font-mono text-[0.6rem] sm:text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.25em] font-bold drop-shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.5)]">{badge}</span>
        </div>

        {/* Title */}
        <h4 className="text-white font-display font-bold text-base sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-tight mb-1 sm:mb-1.5 group-hover:text-accent transition-colors duration-500 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {title}
        </h4>

        {/* Description */}
        <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed group-hover:text-white transition-colors duration-500 max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-2 sm:line-clamp-none">
          {desc}
        </p>
      </div>
    )}
  </motion.div>
);

const WhyAxionSection = () => {
  return (
    <section className="relative w-full bg-[#020403] py-24 sm:py-32 z-20 overflow-hidden border-t border-white/5">

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/[0.03] rounded-full blur-[160px] pointer-events-none" />

      {/* Giant watermark text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
        <span className="text-[20vw] font-display font-black text-white/[0.015] tracking-tighter uppercase whitespace-nowrap select-none">
          AXION
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-10 w-full relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">The Axion Advantage</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[clamp(2.5rem,8vw,5.5rem)] font-display font-bold text-white uppercase tracking-tighter leading-[0.9] flex flex-col items-start gap-1"
            >
              <span>WHY</span>
              <div className="flex items-center mt-1 sm:mt-2">
                <AxionLogo 
                  wordmarkOnly
                  className="h-9 sm:h-11 md:h-14 lg:h-[68px] max-w-[85vw] sm:max-w-[380px] md:max-w-[440px] w-auto object-contain drop-shadow-[0_0_15px_rgba(0,255,0,0.35)] transition-all duration-300 hover:drop-shadow-[0_0_25px_rgba(0,255,0,0.65)]"
                />
              </div>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:max-w-[480px]"
          >
            <p className="text-[1.05rem] md:text-[1.15rem] text-[#B0B0B0] font-sans leading-relaxed border-l-2 border-accent/50 pl-6">
              Technology, trust, and industrial-grade experience — built for the uncompromising future of mobility.
            </p>
          </motion.div>
        </div>

        {/* 6-Card 2x2 Responsive Grid: 1 col (mobile), 2 cols (laptop, tablet, desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <Card key={i} {...c} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyAxionSection;
