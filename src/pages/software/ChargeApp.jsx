import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { Smartphone, Map, CreditCard, Route, BatteryCharging } from 'lucide-react';
import appImg from '../../assets/images/why_smarttech.jpg';

const ChargeApp = () => {
  return (
    <PageTransition locationKey="charge-app">
      <main className="w-full min-h-screen bg-[#020403] relative overflow-hidden font-sans">
        
        {/* Soft Glow Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pt-24 md:pt-40 pb-16 md:pb-32 relative z-10">
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20 md:mb-32">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col z-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 w-max mb-8"
              >
                <Smartphone className="w-4 h-4 text-accent" />
                <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] font-bold">DRIVER EXPERIENCE</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-8xl font-display font-bold text-white uppercase tracking-tighter mb-4 md:mb-6 leading-[0.9]"
              >
                YOUR EV, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00B523]">UNLEASHED.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 mb-10 leading-relaxed font-sans max-w-lg"
              >
                The ultimate companion for the modern driver. Locate ultrafast chargers, plan cross-country routes, and pay with a single tap. Range anxiety is officially dead.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm rounded-full hover:bg-accent hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.4)] transition-all flex items-center justify-center gap-2">
                  Download iOS
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold uppercase tracking-wider text-sm rounded-full border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  Download Android
                </button>
              </motion.div>
            </div>

            {/* Right Content - Floating Phone Mockup Effect */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="w-full lg:w-1/2 relative flex justify-center perspective-[1000px]"
            >
              <div className="relative w-[300px] sm:w-[350px] aspect-[1/2] rounded-[40px] border-[8px] border-[#1A1A1A] bg-black shadow-2xl overflow-hidden shadow-[0_0_80px_rgba(var(--color-accent-rgb),0.2)]">
                {/* Fake Phone Screen */}
                <div className="absolute top-0 w-full h-8 bg-black z-20 flex justify-center rounded-t-3xl">
                  <div className="w-1/3 h-6 bg-black rounded-b-2xl" /> {/* Dynamic Island fake */}
                </div>
                <img src={appImg} alt="App Interface" className="w-full h-full object-cover opacity-80" />
                
                {/* Floating UI Element inside phone */}
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-10 left-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-bold text-sm">Charging...</span>
                    <span className="text-accent font-bold text-sm">82%</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[82%] h-full bg-accent" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-300">
                    <span>120 kW</span>
                    <span>12 mins left</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Map />, title: "Live Availability", desc: "Never drive to a broken or occupied charger again. See real-time status instantly." },
              { icon: <Route />, title: "Smart Routing", desc: "Input your destination, and we'll map the perfect charging stops for your battery." },
              { icon: <CreditCard />, title: "Seamless Wallet", desc: "Pre-load funds or link a card. Plug in, charge, and drive away. No swiping needed." },
              { icon: <BatteryCharging />, title: "Live Telemetry", desc: "Watch your charge speed and estimated completion time live from your couch." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <div className="text-accent w-8 h-8">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
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

export default ChargeApp;
