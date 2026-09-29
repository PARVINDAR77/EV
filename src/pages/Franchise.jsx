import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';
import { TrendingUp, MapPin, DollarSign, ArrowRight, ShieldCheck, Zap, Activity, Building, Briefcase } from 'lucide-react';

// Using the freshly downloaded unique image
import heroImg from '../assets/images/franchise_hero.jpg';

const Franchise = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', location: '', model: 'Partner' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Received! Our infrastructure team will contact you shortly.");
    setFormState({ name: '', email: '', phone: '', location: '', model: 'Partner' });
  };

  return (
    <PageTransition locationKey="franchise">
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative font-sans">
        
        {/* Massive Ambient Backgrounds */}
        <div className="absolute top-0 right-[-10%] w-[1000px] h-[1000px] bg-[#00FF3C]/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute top-1/2 left-[-10%] w-[800px] h-[800px] bg-[#00FF3C]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pt-10 pb-24 relative z-10">
          
          {/* 1. HERO SECTION (ULTRA PREMIUM) */}
          <div className="flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-20 mb-40 relative">
            
            {/* Left Content */}
            <div className="w-full xl:w-1/2 flex flex-col items-start relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/5 border border-[#00FF3C]/30 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-[#00FF3C] animate-pulse shadow-[0_0_10px_#00FF3C]" />
                <span className="text-[#00FF3C] font-mono text-xs uppercase tracking-[0.2em] font-bold">B2B PARTNERSHIP PROGRAM</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl lg:text-[5.5rem] font-display font-bold text-white uppercase tracking-tighter mb-8 leading-none"
              >
                TURN SPACE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF3C] to-white/70 drop-shadow-sm">INTO REVENUE.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-[#B0B0B0] max-w-xl leading-relaxed mb-12 border-l-2 border-[#00FF3C]/50 pl-6"
              >
                Transform your commercial real estate into a high-yield asset. AXION CHARGE provides turnkey EV infrastructure that generates passive income while elevating your property value.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6 w-full max-w-xl"
              >
                <button 
                  onClick={() => document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center gap-3 px-10 py-5 bg-[#00FF3C] text-black text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(0,255,60,0.6)] group"
                >
                  APPLY FOR FRANCHISE
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-4 px-8 py-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                  <Activity className="text-[#00FF3C]" />
                  <div>
                    <div className="text-white font-bold text-xl leading-none">38.5%</div>
                    <div className="text-[#00FF3C] text-[0.65rem] tracking-[0.2em] uppercase mt-1">Avg IRR</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Side - Complex Visual Dashboard Mockup & Image */}
            <div className="w-full xl:w-1/2 relative h-[500px] lg:h-[650px] z-10 mt-16 xl:mt-0">
              
              {/* Main Image Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="absolute inset-0 md:inset-8 rounded-[2rem] overflow-hidden border border-[#00FF3C]/20 shadow-[0_0_60px_rgba(0,255,60,0.15)] z-10"
              >
                <img src={heroImg} alt="Commercial Charging Station" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#020403] via-[#020403]/20 to-transparent" />
              </motion.div>

              {/* Floating UI Element 1: Revenue Graph */}
              <motion.div 
                initial={{ opacity: 0, x: 50, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-4 -right-4 lg:bottom-12 lg:-right-8 w-64 md:w-80 p-6 rounded-2xl bg-[#020403]/95 backdrop-blur-xl border border-[#00FF3C]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/70 text-[0.7rem] font-mono uppercase tracking-[0.15em]">Projected Rev (Y1)</span>
                  <TrendingUp className="text-[#00FF3C] w-4 h-4" />
                </div>
                
                {/* FIX: Added h-full to the flex children so the absolute bars can render */}
                <div className="flex items-end gap-2 h-24 mb-4">
                  {[40, 60, 45, 80, 65, 90, 100].map((h, i) => (
                    <div key={i} className="flex-1 h-full bg-white/5 rounded-t-sm relative group overflow-hidden">
                       <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#00FF3C] to-[#00FF3C]/50 rounded-t-sm transition-all duration-1000 group-hover:shadow-[0_0_15px_#00FF3C]" style={{ height: `${h}%` }} />
                    </div>
                  ))}
                </div>
                <div className="text-white font-display text-4xl font-bold tracking-tight">$124,500<span className="text-[#00FF3C] text-xl">.00</span></div>
              </motion.div>

              {/* Floating UI Element 2: Status Pill */}
              <motion.div 
                initial={{ opacity: 0, x: -50, y: -30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute top-12 -left-4 lg:top-24 lg:-left-12 px-6 py-4 rounded-xl bg-[#020403]/95 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#00FF3C]/20 flex items-center justify-center border border-[#00FF3C]/50">
                  <ShieldCheck className="text-[#00FF3C] w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-wide">Turnkey Installation</div>
                  <div className="text-[#00FF3C] text-[0.65rem] font-mono tracking-widest mt-0.5">100% MANAGED</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 2. THREE-TIER PARTNERSHIP MODELS */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
             <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">CHOOSE YOUR <span className="text-[#00FF3C]">MODEL</span></h2>
             <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">Whether you want to be a passive landlord or a fully invested franchise owner, we have a financial structure that fits your goals.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
            {/* Tier 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-10 rounded-[2rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 hover:border-[#00FF3C]/30 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-[8rem] font-display font-bold text-white/[0.02] group-hover:text-[#00FF3C]/5 transition-colors leading-none pointer-events-none">1</div>
              <Building className="text-[#00FF3C] w-10 h-10 mb-8" />
              <h3 className="text-3xl font-display font-bold text-white mb-2">Site Host</h3>
              <p className="text-[#00FF3C] text-sm font-mono tracking-widest uppercase mb-8">Passive Income</p>
              <p className="text-[#A0A0A0] leading-relaxed mb-8">You provide the parking spaces. We install, own, and operate the chargers. You receive a guaranteed monthly rent check or a small percentage of gross revenue.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> $0 Capital Expenditure</li>
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> Zero Maintenance Liability</li>
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> Attracts EV Drivers to your business</li>
              </ul>
            </motion.div>

            {/* Tier 2 (Highlighted) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-10 rounded-[2rem] bg-gradient-to-b from-[#00FF3C]/10 to-transparent border border-[#00FF3C]/40 relative group overflow-hidden shadow-[0_0_40px_rgba(0,255,60,0.1)] transform md:-translate-y-4"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00FF3C] to-emerald-400" />
              <div className="absolute top-0 right-0 p-8 text-[8rem] font-display font-bold text-[#00FF3C]/5 group-hover:text-[#00FF3C]/10 transition-colors leading-none pointer-events-none">2</div>
              <Briefcase className="text-[#00FF3C] w-10 h-10 mb-8" />
              <h3 className="text-3xl font-display font-bold text-white mb-2">Revenue Share</h3>
              <p className="text-[#00FF3C] text-sm font-mono tracking-widest uppercase mb-8">Shared Investment</p>
              <p className="text-[#A0A0A0] leading-relaxed mb-8">We split the capital costs of installation. You receive a significant 50% split of all charging profits while we continue to handle all technical maintenance.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> 50% Profit Share</li>
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> Axion handles all software & billing</li>
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> 5-Year Hardware Warranty</li>
              </ul>
            </motion.div>

            {/* Tier 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-10 rounded-[2rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5 hover:border-[#00FF3C]/30 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-[8rem] font-display font-bold text-white/[0.02] group-hover:text-[#00FF3C]/5 transition-colors leading-none pointer-events-none">3</div>
              <DollarSign className="text-[#00FF3C] w-10 h-10 mb-8" />
              <h3 className="text-3xl font-display font-bold text-white mb-2">Owner / Operator</h3>
              <p className="text-[#00FF3C] text-sm font-mono tracking-widest uppercase mb-8">Maximum Yield</p>
              <p className="text-[#A0A0A0] leading-relaxed mb-8">You purchase the hardware upfront. You keep 100% of the charging revenue, minus a small flat monthly fee for access to the AxionOS cloud management network.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> 100% Revenue Retention</li>
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> Control your own pricing tariffs</li>
                <li className="flex items-start gap-3 text-white/80 text-sm"><CheckIcon /> Qualify for government tax credits</li>
              </ul>
            </motion.div>
          </div>

          {/* 3. STEP-BY-STEP TIMELINE */}
          <div className="mb-40 w-full max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-white mb-16 text-center">PATH TO DEPLOYMENT</h2>
            <div className="relative border-l border-[#00FF3C]/30 ml-6 md:ml-0 md:border-none">
              
              {/* Vertical line for desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#00FF3C]/30 -translate-x-1/2" />

              {[
                { step: "01", title: "Site Assessment", desc: "Our engineers evaluate your property's electrical capacity and traffic potential." },
                { step: "02", title: "Permitting & Approvals", desc: "We navigate all local city regulations and utility grid upgrade requests." },
                { step: "03", title: "Civil & Electrical Install", desc: "Trenching, wiring, and mounting. Completed efficiently by certified contractors." },
                { step: "04", title: "Go Live & Monetize", desc: "Chargers come online, added to the global map, and you start earning immediately." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-12 relative ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-full md:w-[45%] pl-10 md:pl-0 mb-4 md:mb-0">
                    <div className={`p-8 rounded-2xl bg-[#050A07] border border-white/5 shadow-xl ${idx % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                      <p className="text-[#888888]">{item.desc}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="absolute left-[-5px] md:left-1/2 top-6 md:top-1/2 w-3 h-3 bg-[#00FF3C] rounded-full md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_15px_#00FF3C]" />
                  <div className="absolute left-[-24px] md:left-1/2 top-1 md:top-1/2 w-12 h-12 border border-[#00FF3C]/30 rounded-full md:-translate-x-1/2 md:-translate-y-1/2 flex items-center justify-center bg-[#020403]">
                    <span className="text-[#00FF3C] font-mono text-xs font-bold">{item.step}</span>
                  </div>

                  <div className="w-full md:w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* 4. MASSIVE APPLICATION FORM */}
          <motion.div 
            id="apply-form"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full max-w-6xl mx-auto bg-gradient-to-br from-[#050A07] to-[#020403] rounded-[3rem] p-10 lg:p-20 border border-[#00FF3C]/20 shadow-[0_0_100px_rgba(0,255,60,0.05)] relative overflow-hidden"
          >
            {/* Form BG Decoration */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#00FF3C]/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#00FF3C]/5 rounded-full blur-[100px]" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-20">
              <div className="w-full lg:w-5/12">
                <div className="w-16 h-16 rounded-2xl bg-[#00FF3C]/10 border border-[#00FF3C]/30 flex items-center justify-center mb-8">
                  <Zap className="text-[#00FF3C] w-8 h-8" />
                </div>
                <h2 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">BECOME A <br/><span className="text-[#00FF3C]">PARTNER.</span></h2>
                <p className="text-[#A0A0A0] font-sans mb-10 text-lg">Submit your property details. Our infrastructure analysts will generate a free custom ROI projection for your specific location within 48 hours.</p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                     <MapPin className="text-[#00FF3C]" />
                     <span className="text-white">Active in 40+ Countries</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                     <Building className="text-[#00FF3C]" />
                     <span className="text-white">Commercial & Retail Focus</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-7/12">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/50 text-xs font-bold mb-2 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" required
                        value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-[#020403] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00FF3C]/50 transition-colors shadow-inner"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-bold mb-2 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" required
                        value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-[#020403] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00FF3C]/50 transition-colors shadow-inner"
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/50 text-xs font-bold mb-2 uppercase tracking-wider">Proposed Property Address</label>
                    <input 
                      type="text" required
                      value={formState.location} onChange={e => setFormState({...formState, location: e.target.value})}
                      className="w-full bg-[#020403] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00FF3C]/50 transition-colors shadow-inner"
                      placeholder="e.g. 123 Retail Plaza, Austin TX"
                    />
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-bold mb-4 uppercase tracking-wider">Interested Partnership Tier</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {['Host', 'Partner', 'Owner'].map((model) => (
                        <div 
                          key={model}
                          onClick={() => setFormState({...formState, model})}
                          className={`cursor-pointer px-4 py-4 rounded-xl border text-center font-bold transition-all duration-300 ${
                            formState.model === model 
                            ? 'bg-[#00FF3C]/10 border-[#00FF3C] text-[#00FF3C]' 
                            : 'bg-[#020403] border-white/10 text-white/50 hover:border-white/30'
                          }`}
                        >
                          {model}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-6 bg-[#00FF3C] text-black font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(0,255,60,0.4)] transition-all duration-300"
                  >
                    Request Free ROI Analysis
                  </button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

// Helper component for lists
const CheckIcon = () => (
  <svg className="text-[#00FF3C] w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default Franchise;
