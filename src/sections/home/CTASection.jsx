import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import bgImage from '../../assets/images/hero_bg_final.jpg';

const CTASection = () => {
  return (
    <section className="relative w-full py-32 z-20 flex flex-col items-center justify-center border-t border-white/10 overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-[#020403]/70 to-[#020403]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--color-accent-rgb),0.1)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-10 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-accent font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Partner With Us</span>
            <div className="w-8 h-[1px] bg-accent" />
          </div>
          
          <h2 className="text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] font-display font-bold text-white uppercase tracking-tighter leading-[1.1] md:leading-[0.95]">
            BUILD A <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00A020]">CHARGING</span> BUSINESS.
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[1.1rem] md:text-[1.2rem] text-[#B0B0B0] font-sans max-w-[650px] mb-12 leading-relaxed"
        >
          Power the future of mobility and grow your business with AXION CHARGE. Let's build a connected tomorrow — together.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <button className="group w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-accent text-[#020403] font-sans text-[0.85rem] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--color-accent-rgb),0.6)]">
            GET A CHARGING SOLUTION
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={3} />
          </button>
          
          <button className="group w-full md:w-auto flex items-center justify-center px-8 py-4 border border-accent/50 text-accent font-sans text-[0.85rem] font-bold uppercase tracking-widest rounded-full hover:border-accent hover:bg-accent/10 transition-colors bg-[#020403]/50 backdrop-blur-sm">
            BECOME A FRANCHISE PARTNER
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
