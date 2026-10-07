import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';
import { Leaf, Zap, Shield, Globe, Cpu, Wrench, Headphones, Cloud } from 'lucide-react';

// Using local images to guarantee they load perfectly without network blocking
import heroImg from '../assets/images/why_scalable.jpg';
import hardwareImg from '../assets/images/why_engineered.jpg';
import softwareImg from '../assets/images/why_smarttech.jpg';
import supportImg from '../assets/images/why_support.jpg';
import networkImg from '../assets/images/why_deployment.jpg';

const About = () => {
  return (
    <PageTransition locationKey="about">
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative">
        
        {/* Ambient Glowing Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00FF3C]/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-[#00FF3C]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pt-10 pb-24 relative z-10">
          
          {/* 1. PREMIUM HERO MISSION SECTION */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-40 relative">
            
            {/* Abstract Tech Grid Background (Local to Hero) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00FF3C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Left Content */}
            <div className="w-full lg:w-3/5 flex flex-col items-start text-left relative z-10">
              
              {/* Premium Pill Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-white/[0.03] border border-[#00FF3C]/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,60,0.1)]"
              >
                <div className="w-2 h-2 rounded-full bg-[#00FF3C] shadow-[0_0_8px_#00FF3C] animate-pulse" />
                <span className="text-[#00FF3C] font-mono text-[0.75rem] uppercase tracking-[0.2em] font-bold">OUR ORIGIN STORY</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl lg:text-[5.5rem] font-display font-bold text-white uppercase tracking-tighter mb-8 leading-[0.95] drop-shadow-2xl"
              >
                WE BUILD <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">THE VEINS</span> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF3C] to-[#00B523]">OF THE NEW ERA.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-[#B0B0B0] font-sans max-w-2xl leading-relaxed border-l-4 border-[#00FF3C]/50 pl-6"
              >
                AXION CHARGE is a unified technology ecosystem engineered to eliminate range anxiety entirely. From the driveway to the highway, we build the hardware, write the software, and provide the unyielding support necessary to push the world into a 100% sustainable future.
              </motion.p>
            </div>
            
            {/* Right Image Content - Overlapping and Dynamic */}
            <div className="w-full lg:w-2/5 relative h-[500px] lg:h-[700px] flex items-center justify-center z-10 mt-10 lg:mt-0">
              
              <motion.div 
                initial={{ opacity: 0, x: 50, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="w-full h-full relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,255,60,0.2)] z-20"
                style={{ transformPerspective: "1000px" }}
              >
                <img src={heroImg} alt="Future of Mobility" className="w-full h-full object-cover opacity-100 hover:scale-105 transition-transform duration-1000" />
                <div className="absolute bottom-8 left-8 flex flex-col">
                  <div className="w-12 h-[2px] bg-[#00FF3C] mb-3" />
                  <span className="text-[#00FF3C] font-mono text-xs uppercase tracking-widest">Global Infrastructure</span>
                </div>
              </motion.div>

              {/* Decorative floating geometric shapes behind the image */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-[400px] h-[400px] border border-dashed border-[#00FF3C]/20 rounded-full z-0 pointer-events-none"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -left-10 w-[300px] h-[300px] border border-[#00FF3C]/10 rounded-full z-0 pointer-events-none"
              />
            </div>
          </div>

          {/* 2. WHAT WE PROVIDE (THE ECOSYSTEM) */}
          <div className="mb-32">
            <div className="mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-4">THE COMPLETE ECOSYSTEM</h2>
              <p className="text-[#A0A0A0] font-sans text-lg max-w-2xl">We don't rely on third parties. By controlling every layer of the charging experience, we guarantee unparalleled reliability and speed.</p>
            </div>

            <div className="flex flex-col gap-32">
              
              {/* Hardware */}
              <motion.div 
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col lg:flex-row items-center gap-16"
              >
                <div className="w-full lg:w-1/2 relative h-[400px] rounded-3xl overflow-hidden border border-white/5 hover:border-[#00FF3C]/30 transition-all duration-500 group">
                  <img src={hardwareImg} alt="Proprietary Hardware" className="w-full h-full object-cover opacity-100 hover:scale-105 transition-all duration-700" />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="w-12 h-12 rounded-full bg-[#00FF3C]/10 border border-[#00FF3C]/30 flex items-center justify-center mb-6">
                    <Cpu className="text-[#00FF3C] w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Proprietary Hardware</h3>
                  <p className="text-[#A0A0A0] font-sans text-lg leading-relaxed mb-6">Our charging stations are built in-house with military-grade components. Liquid-cooled cables, dynamic power balancing, and modular architectures mean our hardware delivers up to 360kW effortlessly, day in and day out.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-[#00FF3C] w-4 h-4" /> 99.9% Hardware Uptime</li>
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-[#00FF3C] w-4 h-4" /> IP65 Weather & Vandal Proof</li>
                  </ul>
                </div>
              </motion.div>

              {/* Software */}
              <motion.div 
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col lg:flex-row-reverse items-center gap-16"
              >
                <div className="w-full lg:w-1/2 relative h-[400px] rounded-3xl overflow-hidden border border-white/5 hover:border-[#00FF3C]/30 transition-all duration-500 group">
                  <img src={softwareImg} alt="Intelligent Software" className="w-full h-full object-cover opacity-100 hover:scale-105 transition-all duration-700" />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="w-12 h-12 rounded-full bg-[#00FF3C]/10 border border-[#00FF3C]/30 flex items-center justify-center mb-6">
                    <Cloud className="text-[#00FF3C] w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Intelligent Cloud Platform</h3>
                  <p className="text-[#A0A0A0] font-sans text-lg leading-relaxed mb-6">Hardware is nothing without intelligence. Our AxionOS cloud platform monitors millions of data points every second, predicting hardware wear, dynamically pricing energy, and offering flawless over-the-air (OTA) updates.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-[#00FF3C] w-4 h-4" /> Real-time Fleet Telemetry</li>
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-[#00FF3C] w-4 h-4" /> Automated Billing & Invoicing</li>
                  </ul>
                </div>
              </motion.div>

              {/* Installation & Support */}
              <motion.div 
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="flex flex-col lg:flex-row items-center gap-16"
              >
                <div className="w-full lg:w-1/2 relative h-[400px] rounded-3xl overflow-hidden border border-white/5 hover:border-[#00FF3C]/30 transition-all duration-500 group">
                  <img src={supportImg} alt="Installation and Support" className="w-full h-full object-cover opacity-100 hover:scale-105 transition-all duration-700" />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="w-12 h-12 rounded-full bg-[#00FF3C]/10 border border-[#00FF3C]/30 flex items-center justify-center mb-6">
                    <Wrench className="text-[#00FF3C] w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">End-to-End Installation</h3>
                  <p className="text-[#A0A0A0] font-sans text-lg leading-relaxed mb-6">We handle the red tape. From grid capacity analysis and city permits to final civil engineering and electrical commissioning, our dedicated teams ensure your chargers go live fast and safely.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-[#00FF3C] w-4 h-4" /> Turnkey Civil & Electrical Engineering</li>
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-[#00FF3C] w-4 h-4" /> 24/7 Remote Diagnostics & Support</li>
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>

          {/* 3. CORE VALUES GRID */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
             <h2 className="text-4xl font-display font-bold text-white mb-4">DRIVEN BY PRINCIPLES</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32"
          >
            {[
              { icon: Zap, title: "Hyper-Fast", desc: "Pushing the absolute physical limits of DC fast-charging speeds." },
              { icon: Leaf, title: "Sustainable", desc: "Committed to integrating with 100% renewable grid sources." },
              { icon: Shield, title: "Reliable", desc: "Our network doesn't go down. 99.9% uptime is our baseline." },
              { icon: Globe, title: "Accessible", desc: "Building charging equity so no route is impossible." }
            ].map((val, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="group p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-[#00FF3C]/30 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(0,255,60,0.1)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#020403] border border-[#00FF3C]/20 flex items-center justify-center mb-6 group-hover:border-[#00FF3C]/60 transition-colors duration-300 shadow-[0_0_15px_rgba(0,255,60,0.1)]">
                  <val.icon className="text-[#00FF3C] w-6 h-6" />
                </div>
                <h4 className="text-white font-display font-bold text-xl mb-3 group-hover:text-[#00FF3C] transition-colors">{val.title}</h4>
                <p className="text-[#888888] font-sans text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* 4. GLOBAL IMPACT BANNER */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,255,60,0.15)] py-24 px-8 flex flex-col items-center justify-center text-center group"
          >
            {/* Animated Panning Background */}
            <div className="absolute inset-0 z-0">
               <img src={networkImg} alt="Global Network" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[10s] ease-out" />
               <div className="absolute inset-0 bg-gradient-to-b from-[#020403]/60 via-[#020403]/80 to-[#020403]" />
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00FF3C]/10 via-transparent to-transparent" />
            </div>
            
            {/* Top Glowing Edge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#00FF3C] to-transparent opacity-50" />
            
            <div className="relative z-10 w-full max-w-5xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-20 tracking-tight drop-shadow-xl">
                BUILDING THE NETWORK <br/> OF TOMORROW
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-xl hover:bg-white/[0.04] hover:border-[#00FF3C]/30 transition-all duration-300"
                >
                  <span className="text-6xl lg:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00FF3C] mb-3 drop-shadow-[0_0_20px_rgba(0,255,60,0.3)] px-2 py-1">10k+</span>
                  <span className="text-white/60 font-mono tracking-[0.2em] uppercase text-xs font-bold">Active Chargers</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-xl hover:bg-white/[0.04] hover:border-[#00FF3C]/30 transition-all duration-300"
                >
                  <span className="text-6xl lg:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00FF3C] mb-3 drop-shadow-[0_0_20px_rgba(0,255,60,0.3)] px-2 py-1">45M</span>
                  <span className="text-white/60 font-mono tracking-[0.2em] uppercase text-xs font-bold">Gallons of Gas Saved</span>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-xl hover:bg-white/[0.04] hover:border-[#00FF3C]/30 transition-all duration-300"
                >
                  <span className="text-6xl lg:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-[#00FF3C] mb-3 drop-shadow-[0_0_20px_rgba(0,255,60,0.3)] px-2 py-1">99.9%</span>
                  <span className="text-white/60 font-mono tracking-[0.2em] uppercase text-xs font-bold">Network Uptime</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;
