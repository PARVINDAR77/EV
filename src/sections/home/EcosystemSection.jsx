import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, Truck, Navigation } from 'lucide-react';

const EcosystemNode = ({ icon: Icon, title, description, side, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`absolute flex items-center gap-4 w-[240px] top-1/2 -translate-y-1/2 ${side === 'left' ? 'flex-row right-[35px]' : 'flex-row-reverse left-[35px]'}`}
    >
      <div className={`flex flex-col ${side === 'left' ? 'items-end text-right' : 'items-start text-left'}`}>
        <h3 className="text-white font-display font-bold text-[1rem] tracking-wider uppercase mb-0.5">{title}</h3>
        <p className="text-gray-400 font-sans text-[0.7rem]">{description}</p>
      </div>
      <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-accent bg-black/80 flex items-center justify-center shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)] relative group cursor-default hover:scale-110 transition-transform hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.6)]">
        <Icon className="text-accent w-6 h-6 group-hover:animate-pulse" strokeWidth={1.5} />
        {/* Pulsing ring behind icon */}
        <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-20 group-hover:opacity-60" />
      </div>
    </motion.div>
  );
};

const ConnectionLines = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="glow-ecosystem" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="lineGradLeftEco" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="lineGradRightEco" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <g filter="url(#glow-ecosystem)">
        {/* Top Left (Center is 500,200. Node is at 200, 60) */}
        <path d="M 400 200 L 330 200 L 270 60 L 200 60" fill="none" stroke="url(#lineGradLeftEco)" strokeWidth="2" strokeDasharray="6 4" className="animate-[dash_20s_linear_infinite]" />
        
        {/* Bottom Left (Node is at 200, 340) */}
        <path d="M 400 200 L 330 200 L 270 340 L 200 340" fill="none" stroke="url(#lineGradLeftEco)" strokeWidth="2" strokeDasharray="6 4" className="animate-[dash_20s_linear_infinite]" />
        
        {/* Top Right (Node is at 800, 60) */}
        <path d="M 600 200 L 670 200 L 730 60 L 800 60" fill="none" stroke="url(#lineGradRightEco)" strokeWidth="2" strokeDasharray="6 4" className="animate-[dash_20s_linear_infinite]" />
        
        {/* Bottom Right (Node is at 800, 340) */}
        <path d="M 600 200 L 670 200 L 730 340 L 800 340" fill="none" stroke="url(#lineGradRightEco)" strokeWidth="2" strokeDasharray="6 4" className="animate-[dash_20s_linear_infinite]" />
      </g>
    </svg>
  );
};

const EcosystemSection = () => {
  return (
    <section className="relative w-full bg-[#030405] pt-24 pb-16 z-20 flex flex-col items-center overflow-hidden border-t border-white/5">
      
      {/* Unique Animated Cyber-Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'linear-gradient(to right, rgba(var(--color-accent-rgb), 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(var(--color-accent-rgb), 0.1) 1px, transparent 1px)',
             backgroundSize: '4rem 4rem'
           }}>
        {/* Radial mask so the grid fades out at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030405_70%)]" />
      </div>

      {/* Background concentric rings to add depth */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 rounded-full border border-accent/5" />
        <div className="absolute inset-20 rounded-full border border-accent/10" />
        <div className="absolute inset-40 rounded-full border border-accent/20 shadow-[inset_0_0_50px_rgba(var(--color-accent-rgb),0.1)]" />
        <div className="absolute inset-60 rounded-full border border-accent/20 border-dashed animate-[spin_60s_linear_infinite]" />
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 w-full relative z-10 flex flex-col">
        
        {/* Unique Stylish Header */}
        <div className="w-full z-30 mb-8 md:mb-12 relative">
          {/* Tech Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-accent font-mono text-[0.6rem] uppercase tracking-[0.3em] font-bold">Network Architecture</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(2rem,6vw,4.5rem)] font-display font-bold uppercase tracking-tight mb-6 leading-[1.1]"
          >
            <span className="text-white">ONE ENERGY</span><br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 drop-shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]">ECOSYSTEM.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-stretch gap-4 max-w-[600px]"
          >
            {/* Vertical glowing accent line */}
            <div className="w-1 bg-gradient-to-b from-accent to-transparent rounded-full shadow-[0_0_10px_var(--color-accent)]" />
            <p className="text-[1.1rem] md:text-[1.2rem] text-gray-300 font-sans py-1">
              Homes, businesses, fleets and highways — all connected by a <span className="text-white font-bold">smarter charging network</span>.
            </p>
          </motion.div>
        </div>

        {/* Diagram Container - Fixed aspect ratio 5/2 so SVG and HTML perfectly align everywhere. Margin removed so it doesn't overlap header */}
        <div className="relative w-full max-w-[1000px] mx-auto aspect-[5/2] z-20 hidden md:block">
          
          <ConnectionLines />

          {/* Center Hub (50%, 50%) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] md:w-[220px] md:h-[220px] rounded-full border-2 border-accent bg-[#0A0D10]/90 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_60px_rgba(var(--color-accent-rgb),0.5)] z-30 group cursor-crosshair"
          >
            {/* Spinning orbital rings */}
            <div className="absolute inset-[-15px] md:inset-[-20px] rounded-full border-t-2 border-l-2 border-transparent border-r-[var(--color-accent)]/50 border-b-[var(--color-accent)]/50 animate-[spin_5s_linear_infinite]" />
            <div className="absolute inset-[-30px] md:inset-[-40px] rounded-full border-2 border-white/5 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
            
            <span className="text-accent font-display font-bold text-[1.5rem] md:text-[2.2rem] tracking-widest uppercase">AXION</span>
            <span className="text-white font-sans text-[0.6rem] md:text-[0.9rem] tracking-[0.4em] mt-1">CHARGE</span>
            <span className="text-accent/80 font-sans text-[0.35rem] md:text-[0.5rem] tracking-[0.2em] mt-3 bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">ENERGY EVOLVED</span>
            
            {/* Pulsing core glow */}
            <div className="absolute inset-0 bg-accent/10 rounded-full blur-[20px] group-hover:bg-accent/30 group-hover:scale-125 transition-all duration-500" />
          </motion.div>

          {/* Top Left Node (20%, 15%) */}
          <div className="absolute top-[15%] left-[20%] w-0 h-0 z-30">
            <EcosystemNode icon={Home} title="HOME" description="Charging at your home" side="left" delay={0.3} />
          </div>

          {/* Bottom Left Node (20%, 85%) */}
          <div className="absolute top-[85%] left-[20%] w-0 h-0 z-30">
            <EcosystemNode icon={Truck} title="FLEET" description="Keeping fleets moving" side="left" delay={0.4} />
          </div>

          {/* Top Right Node (80%, 15%) */}
          <div className="absolute top-[15%] left-[80%] w-0 h-0 z-30">
            <EcosystemNode icon={Building2} title="BUSINESS" description="Powering enterprises" side="right" delay={0.5} />
          </div>

          {/* Bottom Right Node (80%, 85%) */}
          <div className="absolute top-[85%] left-[80%] w-0 h-0 z-30">
            <EcosystemNode icon={Navigation} title="HIGHWAY" description="Enabling long journeys" side="right" delay={0.6} />
          </div>

        </div>

        {/* Mobile fallback grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:hidden mt-4">
          {[
            { icon: Home, title: 'HOME', description: 'Charging at your home' },
            { icon: Truck, title: 'FLEET', description: 'Keeping fleets moving' },
            { icon: Building2, title: 'BUSINESS', description: 'Powering enterprises' },
            { icon: Navigation, title: 'HIGHWAY', description: 'Enabling long journeys' },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3 p-4 border border-accent/20 rounded-xl">
              <div className="w-12 h-12 rounded-full border-2 border-accent bg-black/80 flex items-center justify-center">
                <Icon className="text-accent w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-[0.85rem] uppercase mb-0.5">{title}</h3>
                <p className="text-gray-400 font-sans text-[0.7rem]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
