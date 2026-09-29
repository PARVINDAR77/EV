import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Map, PencilRuler, Wrench, Power, Headphones } from 'lucide-react';

const steps = [
  { id: 1, title: 'CONSULTATION', desc: 'Understand your needs', icon: MessageSquare },
  { id: 2, title: 'SITE SURVEY', desc: 'Assess location', icon: Map },
  { id: 3, title: 'SOLUTION DESIGN', desc: 'Custom plan & proposal', icon: PencilRuler },
  { id: 4, title: 'INSTALLATION', desc: 'Professional setup', icon: Wrench },
  { id: 5, title: 'ACTIVATION', desc: 'System live & running', icon: Power },
  { id: 6, title: 'SUPPORT', desc: 'Ongoing service', icon: Headphones }
];

const ProcessStep = ({ step, index, total }) => {
  const Icon = step.icon;
  return (
    <div className="relative flex flex-col items-center flex-1 z-10 group">
      
      {/* Circle Icon */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 * index }}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#00FF3C] bg-[#030405] flex items-center justify-center mb-6 relative shadow-[0_0_20px_rgba(0,255,60,0.1)] group-hover:shadow-[0_0_30px_rgba(0,255,60,0.4)] transition-all duration-300"
      >
        <Icon className="text-[#00FF3C] w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
        {/* Number Badge */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#030405] px-2 text-[#00FF3C] font-mono font-bold text-[0.8rem]">
          {step.id}
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
        className="text-center"
      >
        <h4 className="text-white font-sans font-bold text-[0.7rem] md:text-[0.85rem] uppercase tracking-wider mb-1">{step.title}</h4>
        <p className="text-gray-400 font-sans text-[0.6rem] md:text-[0.7rem] whitespace-nowrap">{step.desc}</p>
      </motion.div>

    </div>
  );
};

const DeploymentProcessSection = () => {
  return (
    <section className="relative w-full py-24 bg-[#030405] border-t border-white/5 overflow-hidden z-20">
      
      {/* Background abstract waves */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
          <path d="M0,150 C200,50 300,250 500,150 C700,50 800,250 1000,150" fill="none" stroke="#00FF3C" strokeWidth="1" />
          <path d="M0,180 C200,80 300,280 500,180 C700,80 800,280 1000,180" fill="none" stroke="#00FF3C" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 w-full relative z-10 flex flex-col">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-display font-bold text-white uppercase tracking-tight mb-2"
          >
            FROM CONSULTATION TO ACTIVATION.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[1rem] md:text-[1.1rem] text-gray-400 font-sans"
          >
            A <span className="text-[#00FF3C]">seamless process</span>, designed for speed and reliability.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative w-full flex flex-col sm:flex-row items-start justify-between gap-8 sm:gap-0">
          
          {/* Horizontal Connecting Line */}
          <div className="hidden sm:block absolute top-8 md:top-10 left-10 right-10 h-[2px] bg-white/10 z-0">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-[#00FF3C] shadow-[0_0_10px_#00FF3C]"
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} total={steps.length} />
          ))}

        </div>

      </div>
    </section>
  );
};

export default DeploymentProcessSection;
