import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { Activity, Shield, RefreshCw, Cpu, Wifi } from 'lucide-react';
import supportImg from '../../assets/images/why_support.jpg';

const Maintenance = () => {
  return (
    <PageTransition locationKey="maintenance">
      <main className="w-full min-h-screen bg-[#020403] relative overflow-hidden">
        
        {/* Floating Abstract Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pt-24 md:pt-40 pb-16 md:pb-20 relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mb-8 relative"
            >
              <div className="absolute inset-0 border border-accent rounded-full animate-ping opacity-20" />
              <Activity className="w-10 h-10 text-accent" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-4 md:mb-6"
            >
              MAINTENANCE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00B523]">SUPPORT</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-xl text-gray-400 max-w-2xl font-sans px-2"
            >
              Zero downtime is the standard. We monitor, predict, and resolve issues before they even happen.
            </motion.p>
          </div>

          {/* Core Architecture - Diagonal / Staggered Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-32">
            
            {/* Left Image Component (Modern Glassmorphic styling) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative rounded-3xl md:rounded-[40px] overflow-hidden border border-white/10 aspect-[4/3] lg:aspect-[4/5] shadow-[0_0_50px_rgba(var(--color-accent-rgb),0.1)] group"
            >
              <img src={supportImg} alt="Technician Support" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
              
              {/* Overlay Glass Panel */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_10px_var(--color-accent)]" />
                  <span className="text-white font-mono text-sm tracking-widest uppercase">System Status: Optimal</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side Content - Floating Cards */}
            <div className="flex flex-col gap-6">
              {[
                { icon: <Wifi />, title: "24/7 Telemetry Monitoring", desc: "Every charger streams live diagnostics to our network operation center." },
                { icon: <Cpu />, title: "Over-the-Air Healing", desc: "90% of software glitches are resolved remotely within minutes." },
                { icon: <RefreshCw />, title: "Proactive Component Swaps", desc: "We replace aging filters and cables before they fail." },
                { icon: <Shield />, title: "Vandalism Rapid Response", desc: "Priority dispatch for hardware damage and safety risks." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex items-start gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-accent/30 transition-all duration-300"
                >
                  <div className="p-4 rounded-2xl bg-[#0B100D] border border-white/10 text-accent shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Maintenance;
