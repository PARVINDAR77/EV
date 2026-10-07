import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { LineChart, LayoutDashboard, CreditCard, CloudLightning, Activity, Settings2 } from 'lucide-react';
import cmsImg from '../../assets/images/software_dashboard.jpg';

const CMS = () => {
  return (
    <PageTransition locationKey="cms">
      <main className="w-full min-h-screen bg-[#020403] relative overflow-hidden font-sans">
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-accent/5 rounded-[100%] blur-[120px]" />
          <div 
            className="absolute inset-0 opacity-[0.02]" 
            style={{ 
              backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)',
              backgroundSize: '50px 50px' 
            }} 
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pt-24 md:pt-40 pb-16 md:pb-32 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
            >
              <LayoutDashboard className="w-4 h-4 text-accent" />
              <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] font-bold">STATION MANAGEMENT</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-6 md:mb-8 leading-[0.9]"
            >
              CONTROL THE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">CHAOS.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed font-sans"
            >
              The Axion Charger Management System (CMS) is the central nervous system of your network. Monitor thousands of chargers, adjust dynamic pricing, and dispatch technicians—all from one unified, cloud-based dashboard.
            </motion.p>
          </div>

          {/* Massive Dashboard Image Presentation */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="w-full relative mb-16 md:mb-32"
          >
            <div className="absolute -inset-1 bg-gradient-to-b from-accent/50 to-transparent rounded-t-[40px] blur-xl opacity-30" />
            <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(var(--color-accent-rgb),0.1)] bg-[#0B100D] p-2">
              <div className="rounded-[24px] overflow-hidden relative group">
                <img src={cmsImg} alt="CMS Dashboard" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-transparent to-transparent opacity-80" />
                
                {/* Floating Stats UI */}
                <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 flex gap-4">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl">
                    <p className="text-gray-400 text-[10px] md:text-xs font-mono mb-1 uppercase">Active Sessions</p>
                    <p className="text-xl md:text-3xl font-display font-bold text-white">1,204</p>
                  </div>
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl hidden sm:block">
                    <p className="text-gray-400 text-[10px] md:text-xs font-mono mb-1 uppercase">Network Uptime</p>
                    <p className="text-xl md:text-3xl font-display font-bold text-accent">99.9%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CMS Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <LineChart />, title: "Real-Time Analytics", desc: "Granular reporting on energy dispensed, revenue generated, and peak usage hours." },
              { icon: <CreditCard />, title: "Dynamic Billing", desc: "Create flexible tariffs based on time-of-use, energy delivered, or parking duration." },
              { icon: <CloudLightning />, title: "OTA Firmware", desc: "Push software updates to your entire hardware fleet with a single click." },
              { icon: <Activity />, title: "Predictive Maintenance", desc: "AI-driven alerts notify you of potential hardware failures before they occur." },
              { icon: <Settings2 />, title: "Load Balancing", desc: "Intelligently distribute available power across multiple chargers to avoid grid overloads." },
              { icon: <LayoutDashboard />, title: "White-Label Ready", desc: "Completely rebrand the dashboard with your corporate colors and logo." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default CMS;
