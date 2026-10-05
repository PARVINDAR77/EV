import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sectionStats } from '../../data/axionStats';
import bgImage from '../../assets/images/hero_bg_final.jpg';

// Subcomponent: Animated Counter
const AnimatedCounter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    
    // Fallback if 'to' is not a number (e.g. string with XX+)
    if (typeof to !== 'number' && isNaN(parseInt(to))) {
      setCount(to);
      return;
    }

    const targetValue = typeof to === 'number' ? to : parseInt(to);
    
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * (targetValue - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

// Subcomponent: StatCard
const StatCard = ({ stat, index }) => {
  const percentage = stat.goal ? Math.min((stat.value / stat.goal) * 100, 100) : 0;
  const remaining = stat.goal ? stat.goal - stat.value : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
      className="flex flex-col items-center justify-center p-4 py-8 rounded-lg border border-white/10 bg-transparent hover:border-[#00FF3C]/50 hover:bg-[#00FF3C]/5 transition-all duration-300 w-full"
    >
      <div className="flex items-baseline gap-0.5 mb-2">
        <span className="text-[2rem] font-display font-bold text-[#00FF3C] leading-none tracking-tight drop-shadow-[0_0_8px_rgba(0,255,60,0.5)]">
          {stat.value === 'XX' || isNaN(stat.value) ? stat.value : <AnimatedCounter to={stat.value} />}
          <span className="text-[1.5rem]">{stat.suffix}</span>
        </span>
      </div>
      <span className="text-[0.55rem] font-sans font-bold text-gray-300 uppercase tracking-widest leading-snug text-center mb-4">
        {stat.label.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
      </span>
      
      {stat.goal && (
        <div className="w-full px-2">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-1.5">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.8 + index * 0.1, ease: "easeOut" }}
              className="h-full bg-[#00FF3C] shadow-[0_0_10px_rgba(0,255,60,0.8)]" 
            />
          </div>
          <div className="text-[0.6rem] md:text-[0.65rem] text-gray-400 font-sans tracking-[0.1em] uppercase text-center mt-1.5 font-medium">
            <span className="text-white font-bold">{remaining}</span> TO GOAL ({stat.goal})
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ElectricShiftSection = () => {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#050806] flex items-center justify-center py-20 z-20">
      
      <div className="max-w-[1500px] mx-auto px-4 md:px-10 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          
          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-[clamp(1.8rem,5vw,4rem)] font-display font-bold leading-[1.05] tracking-tight text-white mb-6 uppercase"
          >
            THE WAY INDIA MOVES<br/>
            <span className="text-[#00FF3C] drop-shadow-[0_0_15px_rgba(0,255,60,0.4)]">IS CHANGING.</span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[1rem] md:text-[1.1rem] text-gray-300 font-sans max-w-[500px] mb-12 leading-relaxed"
          >
            The transition to electric mobility requires an infrastructure built for scale.
          </motion.p>

          {/* Statistics Grid */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard index={0} stat={{ value: 5, suffix: '+', label: 'CHARGING SOLUTIONS', goal: 100 }} />
            <StatCard index={1} stat={{ value: 150, suffix: '+', label: 'PROJECTS', goal: 500 }} />
            <StatCard index={2} stat={{ value: 45, suffix: '+', label: 'PARTNERS', goal: 200 }} />
            <StatCard index={3} stat={{ value: 28, suffix: '+', label: 'CITIES', goal: 100 }} />
          </motion.div>

        </div>

        {/* Right Content - Framed Angled Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] flex justify-end items-center"
        >
          {/* Glowing Green Backdrop shape */}
          <div 
             className="absolute w-[85%] h-[90%] bg-[#00FF3C] right-0 opacity-20 blur-[20px]"
             style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          />

          {/* The Actual Image Container with thick green border */}
          <div 
             className="relative w-[85%] h-[90%] z-10 p-[2px] right-0 bg-[#00FF3C] shadow-[0_0_30px_rgba(0,255,60,0.6)]"
             style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: `url('/src/assets/images/electric_shift_car.png')`, 
                clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" 
              }}
            >
              {/* Optional dark overlay if image is too bright */}
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ElectricShiftSection;
