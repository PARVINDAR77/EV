import React from 'react';
import { motion } from 'framer-motion';
import electricShiftCar from '../../assets/images/electric_shift_car.webp';

const ElectricShiftSection = () => {
  return (
    <section className="relative w-full min-h-[80vh] md:min-h-[85vh] bg-[#050806] flex items-center justify-center py-20 z-20">
      
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
            <span className="text-accent drop-shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.4)]">IS CHANGING.</span>
          </motion.h2>

          {/* Description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4 max-w-[540px]"
          >
            <p className="text-[1.05rem] md:text-[1.2rem] text-gray-300 font-sans leading-relaxed">
              The transition to electric mobility requires an infrastructure built for scale.
            </p>
            <p className="text-[0.95rem] md:text-[1.05rem] text-gray-400 font-sans leading-relaxed">
              AXION CHARGE delivers ultra-fast, intelligent charging technology designed to power personal vehicles, enterprise commercial fleets, and national highway corridors with relentless reliability.
            </p>
          </motion.div>

        </div>

        {/* Right Content - Framed Angled Image (Hidden on mobile) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] hidden lg:flex justify-end items-center"
        >
          {/* Glowing Green Backdrop shape */}
          <div 
             className="absolute w-[85%] h-[90%] bg-accent right-0 opacity-20 blur-[20px]"
             style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          />

          {/* The Actual Image Container with thick green border */}
          <div 
             className="relative w-[85%] h-[90%] z-10 p-[2px] right-0 bg-accent shadow-[0_0_35px_rgba(var(--color-accent-rgb),0.6)]"
             style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <div 
              className="relative w-full h-full overflow-hidden bg-[#050806]"
              style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            >
              <img 
                src={electricShiftCar} 
                alt="Electric Mobility Charging Infrastructure" 
                className="w-full h-full object-cover object-center brightness-[1.02] contrast-[1.02]"
                loading="lazy"
                decoding="async"
              />
              {/* Subtle ambient gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ElectricShiftSection;
