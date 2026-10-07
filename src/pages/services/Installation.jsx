import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { HardHat, Ruler, Zap, Hammer, CheckCircle } from 'lucide-react';
import bgImg from '../../assets/images/why_deployment.jpg';

const Installation = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const steps = [
    { icon: <Ruler className="w-6 h-6" />, title: "01. Site Survey", desc: "Our engineers analyze the topology and existing electrical infrastructure." },
    { icon: <Hammer className="w-6 h-6" />, title: "02. Civil Work", desc: "Trenching, concrete pouring, and physical groundwork for the chargers." },
    { icon: <Zap className="w-6 h-6" />, title: "03. Grid Connection", desc: "High-voltage cabling and coordination with local utility providers." },
    { icon: <CheckCircle className="w-6 h-6" />, title: "04. Commissioning", desc: "Final software setup, safety testing, and official handover." }
  ];

  return (
    <PageTransition locationKey="installation">
      <main className="w-full min-h-screen bg-[#020403] relative overflow-hidden">
        
        {/* Massive Parallax Hero */}
        <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#020403] z-10" />
            <img src={bgImg} alt="Deployment" className="w-full h-full object-cover opacity-60" />
          </motion.div>
          
          <div className="relative z-20 text-center flex flex-col items-center px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)] backdrop-blur-xl"
            >
              <HardHat className="w-8 h-8 text-accent" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-white uppercase tracking-tighter mb-4 md:mb-6"
            >
              DEPLOY WITH <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">PRECISION</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-xl text-gray-300 max-w-3xl font-sans px-4"
            >
              End-to-End Installation Services. We handle the dirt, the wires, and the bureaucracy so you can focus on the future.
            </motion.p>
          </div>
        </div>

        {/* The Process Section - Custom Horizontal Timeline */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-32 relative z-20">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">THE DEPLOYMENT MATRIX</h2>
            <p className="text-gray-400">A flawless 4-step architecture for zero-headache installation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/5 z-0">
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-accent to-emerald-400 shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.5)]"
              />
            </div>

            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-[#0B100D] border-2 border-white/10 flex items-center justify-center mb-8 group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.2)] transition-all duration-500 relative">
                  <div className="text-white group-hover:text-accent transition-colors duration-500 z-10">
                    {step.icon}
                  </div>
                  {/* Glowing dot on the line */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_var(--color-accent)]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Bento Grid */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pb-16 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 bg-white/[0.02] border border-white/10 rounded-3xl p-10 overflow-hidden relative group hover:border-accent/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-3xl font-display font-bold text-white mb-4 relative z-10">Civil Engineering Prowess</h3>
              <p className="text-gray-400 max-w-md relative z-10">Our teams are equipped with heavy machinery and specialized tools to trench, pour, and mount in any terrain.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-10 overflow-hidden relative group hover:border-accent/30 transition-colors">
               <h3 className="text-2xl font-display font-bold text-white mb-4">Permit Handling</h3>
               <p className="text-gray-400">We deal with the city council. 100% compliance guaranteed.</p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Installation;
