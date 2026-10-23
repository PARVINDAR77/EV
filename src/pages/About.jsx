import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';
import { Leaf, Zap, Shield, Globe, Cpu, Wrench, Headphones, Cloud } from 'lucide-react';

// Using local images to guarantee they load perfectly without network blocking
import heroImg from '../assets/images/about_hero_superhub.webp';
import hardwareImg from '../assets/images/why_engineered_for_india.webp';
import softwareImg from '../assets/images/Outdoor Axion Charge Dashboard Billboard.webp';
import supportImg from '../assets/images/why_247_support.webp';
import networkImg from '../assets/images/Axion Charge Highway Stop.webp';

const About = () => {
  return (
    <PageTransition locationKey="about">
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative">
        
        {/* Ambient Glowing Background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pt-10 pb-24 relative z-10">
          
          {/* 1. PREMIUM HERO MISSION SECTION */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 mb-40 relative">
            
            {/* Abstract Tech Grid Background (Local to Hero) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* Left Content */}
            <div className="w-full lg:w-3/5 flex flex-col items-start text-left relative z-10">
              
              {/* Premium Pill Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8 px-5 py-2.5 rounded-full bg-white/[0.03] border border-accent/20 backdrop-blur-md shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.1)]"
              >
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse" />
                <span className="text-accent font-mono text-[0.75rem] uppercase tracking-[0.2em] font-bold">OUR ORIGIN STORY</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl lg:text-[5.5rem] font-display font-bold text-white uppercase tracking-tighter mb-8 leading-[0.95] drop-shadow-2xl"
              >
                WE BUILD <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">THE VEINS</span> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00B523]">OF THE NEW ERA.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-[#B0B0B0] font-sans max-w-2xl leading-relaxed border-l-4 border-accent/50 pl-6"
              >
                AXION CHARGE is a unified technology ecosystem engineered to eliminate range anxiety entirely. From the driveway to the highway, we build the hardware, write the software, and provide the unyielding support necessary to push the world into a 100% sustainable future.
              </motion.p>
            </div>
            
            {/* Right Image Content - Overlapping and Dynamic */}
            <div className="w-full lg:w-2/5 relative h-[460px] sm:h-[520px] lg:h-[580px] flex items-center justify-center z-10 mt-10 lg:mt-0">
              
              <motion.div 
                initial={{ opacity: 0, x: 50, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                className="w-full h-full relative rounded-3xl overflow-hidden bg-[#070A0C] border border-white/15 shadow-[0_0_60px_rgba(var(--color-accent-rgb),0.25)] z-20 group"
                style={{ transformPerspective: "1000px" }}
              >
                <img 
                  src={heroImg} 
                  alt="Axion Charge National Superhub" 
                  loading="eager"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" 
                />
                
                {/* Ambient Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020403]/80 via-transparent to-transparent pointer-events-none" />

                {/* Glassmorphic Infrastructure Badge */}
                <div className="absolute bottom-6 left-6 flex flex-col z-20 bg-black/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shadow-lg">
                  <div className="w-8 h-[2px] bg-accent mb-2" />
                  <span className="text-accent font-mono text-[0.7rem] uppercase tracking-widest font-bold">Global Infrastructure</span>
                  <span className="text-white text-xs font-sans font-medium mt-0.5">High-Speed Transit Superhub</span>
                </div>
              </motion.div>

              {/* Decorative floating geometric shapes behind the image */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -right-20 w-[400px] h-[400px] border border-dashed border-accent/20 rounded-full z-0 pointer-events-none"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -left-10 w-[300px] h-[300px] border border-accent/10 rounded-full z-0 pointer-events-none"
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
                <div className="w-full lg:w-1/2 relative aspect-[16/7.5] rounded-3xl overflow-hidden bg-[#070A0C] border border-white/10 hover:border-accent/40 shadow-xl transition-all duration-500 group">
                  <img src={hardwareImg} alt="Proprietary Hardware" loading="lazy" decoding="async" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
                    <Cpu className="text-accent w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Proprietary Hardware</h3>
                  <p className="text-[#A0A0A0] font-sans text-lg leading-relaxed mb-6">Our charging stations are built in-house with military-grade components. Liquid-cooled cables, dynamic power balancing, and modular architectures mean our hardware delivers up to 360kW effortlessly, day in and day out.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-accent w-4 h-4" /> 99.9% Hardware Uptime</li>
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-accent w-4 h-4" /> IP65 Weather & Vandal Proof</li>
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
                <div className="w-full lg:w-1/2 relative aspect-[16/7.5] rounded-3xl overflow-hidden bg-[#070A0C] border border-white/10 hover:border-accent/40 shadow-xl transition-all duration-500 group">
                  <img src={softwareImg} alt="Intelligent Software" loading="lazy" decoding="async" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
                    <Cloud className="text-accent w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Intelligent Cloud Platform</h3>
                  <p className="text-[#A0A0A0] font-sans text-lg leading-relaxed mb-6">Hardware is nothing without intelligence. Our AxionOS cloud platform monitors millions of data points every second, predicting hardware wear, dynamically pricing energy, and offering flawless over-the-air (OTA) updates.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-accent w-4 h-4" /> Real-time Fleet Telemetry</li>
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-accent w-4 h-4" /> Automated Billing & Invoicing</li>
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
                <div className="w-full lg:w-1/2 relative aspect-[16/7.5] rounded-3xl overflow-hidden bg-[#070A0C] border border-white/10 hover:border-accent/40 shadow-xl transition-all duration-500 group">
                  <img src={supportImg} alt="Installation and Support" loading="lazy" decoding="async" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="w-full lg:w-1/2">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
                    <Wrench className="text-accent w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white mb-4">End-to-End Installation</h3>
                  <p className="text-[#A0A0A0] font-sans text-lg leading-relaxed mb-6">We handle the red tape. From grid capacity analysis and city permits to final civil engineering and electrical commissioning, our dedicated teams ensure your chargers go live fast and safely.</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-accent w-4 h-4" /> Turnkey Civil & Electrical Engineering</li>
                    <li className="flex items-center gap-3 text-white/80"><Zap className="text-accent w-4 h-4" /> 24/7 Remote Diagnostics & Support</li>
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
                className="group p-8 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-accent/30 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.1)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#020403] border border-accent/20 flex items-center justify-center mb-6 group-hover:border-accent/60 transition-colors duration-300 shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.1)]">
                  <val.icon className="text-accent w-6 h-6" />
                </div>
                <h4 className="text-white font-display font-bold text-xl mb-3 group-hover:text-accent transition-colors">{val.title}</h4>
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
            className="w-full relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(var(--color-accent-rgb),0.15)] py-24 px-8 flex flex-col items-center justify-center text-center group"
          >
            {/* Animated Panning Background */}
            <div className="absolute inset-0 z-0">
               <img src={networkImg} alt="Global Network" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[10s] ease-out" />
               <div className="absolute inset-0 bg-gradient-to-b from-[#020403]/60 via-[#020403]/80 to-[#020403]" />
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
            </div>
            
            {/* Top Glowing Edge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50" />
            
            <div className="relative z-10 w-full max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6 tracking-tight drop-shadow-xl">
                BUILDING THE NETWORK <br/> OF TOMORROW
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/70 font-sans max-w-2xl mx-auto leading-relaxed">
                Empowering India's EV revolution with robust, high-efficiency charging infrastructure engineered for absolute reliability, zero downtime, and nationwide scale.
              </p>
            </div>
          </motion.div>

        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;
