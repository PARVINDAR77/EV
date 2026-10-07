import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Maximize, Cpu, Headphones, CheckCircle2, Handshake } from 'lucide-react';

// 6 completely unique images — none repeated anywhere else on the site
import imgEngineered  from '../../assets/images/why_engineered.jpg';    // EV tech / India roads
import imgScalable    from '../../assets/images/why_scalable.jpg';      // Large charging station
import imgSmartTech   from '../../assets/images/why_smarttech.jpg';     // AI / tech brain
import imgDeployment  from '../../assets/images/why_deployment.jpg';    // Installation crew
import imgSupport     from '../../assets/images/why_support.jpg';       // NOC support room
import imgPartnership from '../../assets/images/why_partnership.jpg';   // Business handshake

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
  },
];

const Card = ({ image, badge, icon: Icon, title, desc, delay, span, height }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`relative rounded-3xl overflow-hidden group cursor-pointer ${span} ${height}`}
  >
    {/* Background image */}
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100 group-hover:brightness-110"
    />

    {/* Dark gradient overlays - reduced to let image shine through */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-[#020403]/50 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#020403]/40 to-transparent" />

    {/* Neon border glow on hover */}
    <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 group-hover:ring-[var(--color-accent)]/40 transition-all duration-500" />
    {/* Green ambient glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--color-accent-rgb),0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-10">
      {/* Badge + icon */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-black/60 border border-accent/30 flex items-center justify-center backdrop-blur-md group-hover:border-accent/80 group-hover:bg-accent/10 group-hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)] transition-all duration-500 flex-shrink-0">
          <Icon className="text-accent w-4 h-4" strokeWidth={1.5} />
        </div>
        <span className="text-accent font-mono text-[0.65rem] uppercase tracking-[0.25em] font-bold">{badge}</span>
      </div>

      {/* Title */}
      <h4 className="text-white font-display font-bold text-2xl md:text-3xl uppercase tracking-tight mb-3 group-hover:text-accent transition-colors duration-500 leading-tight drop-shadow-lg">
        {title}
      </h4>

      {/* Description */}
      <p className="text-white/55 font-sans text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-500 max-w-sm">
        {desc}
      </p>
    </div>
  </motion.div>
);

const WhyAxionSection = () => {
  return (
    <section className="relative w-full bg-[#020403] py-32 z-20 overflow-hidden border-t border-white/5">

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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
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
              className="text-[clamp(2.5rem,8vw,5.5rem)] font-display font-bold text-white uppercase tracking-tighter leading-[0.9]"
            >
              WHY
              <div className="flex justify-start -ml-2 md:-ml-4 -mt-5 sm:-mt-6 md:-mt-10 lg:-mt-16 -mb-12 sm:-mb-16 md:-mb-24 lg:-mb-[138px]">
                <img 
                  src="/logo.png" 
                  alt="Axion Logo" 
                  className="h-28 sm:h-36 md:h-52 lg:h-[300px] w-auto object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)]"
                  style={{ clipPath: 'inset(20% 0 46% 0)' }}
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

        {/* 6-Card Grid — all with unique images */}
        {/* Row 1: 2 + 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {cards.slice(0, 3).map((c, i) => <Card key={i} {...c} />)}
        </div>
        {/* Row 2: 1 + 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.slice(3, 6).map((c, i) => <Card key={i} {...c} />)}
        </div>

      </div>
    </section>
  );
};

export default WhyAxionSection;
