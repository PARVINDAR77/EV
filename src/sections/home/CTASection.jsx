import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import bgImage from '../../assets/images/hero_bg_final.jpg';

const CTASection = () => {
  return (
    <section className="relative w-full py-32 z-20 flex flex-col items-center justify-center border-t border-white/10 overflow-hidden">
      
      {/* Background Image (Using placeholder, user will replace) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#030405] via-black/70 to-black/90" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[2rem] sm:text-[2.8rem] md:text-[4rem] font-display font-bold text-white uppercase tracking-tight mb-4"
        >
          BUILD A CHARGING BUSINESS.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[1.1rem] md:text-[1.3rem] text-gray-300 font-sans max-w-[700px] mb-12"
        >
          Power the future of mobility and grow your business with AXION CHARGE. Let's build a connected tomorrow — together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full"
        >
          <button className="group w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#00FF3C] text-black font-sans text-[0.85rem] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,60,0.3)] hover:shadow-[0_0_25px_rgba(0,255,60,0.6)]">
            GET A CHARGING SOLUTION
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={3} />
          </button>
          
          <button className="w-full md:w-auto flex items-center justify-center px-8 py-4 border border-white/20 text-white font-sans text-[0.85rem] font-bold uppercase tracking-widest rounded-full hover:border-[#00FF3C] hover:text-[#00FF3C] transition-colors bg-black/50 backdrop-blur-sm">
            BECOME A FRANCHISE PARTNER
          </button>
          
          <button className="w-full md:w-auto flex items-center justify-center px-8 py-4 border border-white/20 text-white font-sans text-[0.85rem] font-bold uppercase tracking-widest rounded-full hover:border-white transition-colors bg-black/50 backdrop-blur-sm">
            TALK TO AXION
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
