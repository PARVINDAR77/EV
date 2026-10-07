import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 500,  suffix: '+', label: 'Charging Stations\nDeployed' },
  { value: 120,  suffix: '+', label: 'Cities\nCovered' },
  { value: 80,   suffix: '+', label: 'Enterprise\nPartners' },
  { value: 99.9, suffix: '%', label: 'Network\nUptime SLA', decimal: true },
  { value: 50,   suffix: 'K+', label: 'EV Sessions\nMonthly' },
];

const Counter = ({ to, suffix, decimal }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const target = decimal ? to * 10 : to;
    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      const ease = 1 - Math.pow(2, -10 * p);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, decimal]);

  return (
    <span ref={ref}>
      {decimal ? (count / 10).toFixed(1) : count}{suffix}
    </span>
  );
};

const StatsSection = () => (
  <section className="relative w-full bg-[#020403] py-28 z-20 border-t border-white/5 overflow-hidden">

    {/* Ambient glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full relative z-10">

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-[1px] bg-accent" />
          <span className="text-accent font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">By The Numbers</span>
          <div className="w-8 h-[1px] bg-accent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[2rem] sm:text-[3.5rem] md:text-[5rem] font-display font-bold text-white uppercase tracking-tighter leading-[0.9]"
        >
          INDIA'S EV FUTURE,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white/40">IN NUMBERS.</span>
        </motion.h2>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5 rounded-2xl overflow-hidden mt-6 md:mt-0">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group flex flex-col items-center justify-center py-10 md:py-14 px-4 md:px-6 bg-[#020403] hover:bg-accent/5 transition-colors duration-500 text-center"
          >
            <span className="text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] font-display font-bold text-accent leading-none tracking-tight drop-shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)] mb-3 md:mb-4">
              <Counter to={s.value} suffix={s.suffix} decimal={s.decimal} />
            </span>
            <span className="text-[0.6rem] md:text-[0.65rem] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] leading-relaxed whitespace-pre-line group-hover:text-gray-200 transition-colors duration-500">
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default StatsSection;
