import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Message Sent! Our team will get back to you within 24 hours.");
      setFormState({ name: '', email: '', subject: 'General Inquiry', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <PageTransition locationKey="contact">
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative font-sans">
        
        {/* Abstract Ambient Lights */}
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.08)_0%,transparent_60%)] pointer-events-none z-0" />
        <div className="absolute bottom-0 left-[-20%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.05)_0%,transparent_60%)] pointer-events-none z-0" />

        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-10 pb-32 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
            
            {/* Left Content - Typography & Info */}
            <div className="w-full lg:w-5/12 flex flex-col items-start relative z-10 lg:pr-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.15)]"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] font-bold">24/7 Global Support</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-6xl sm:text-7xl lg:text-[7rem] font-display font-bold text-white uppercase tracking-tighter mb-8 leading-[0.85]"
              >
                LET'S <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] via-[#00C800] to-white drop-shadow-lg">CONNECT.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg lg:text-xl text-white/60 font-sans max-w-xl leading-relaxed mb-16 border-l-[3px] border-accent/40 pl-6 relative"
              >
                Whether you have a question about our hardware, need technical support, or want to explore partnership opportunities, our global team is ready to help.
              </motion.p>

              {/* Premium Contact Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col gap-5 w-full"
              >
                {/* Global HQ */}
                <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-accent/20 group hover:from-accent/50 hover:to-accent/20 transition-all duration-500 overflow-hidden cursor-default shadow-lg hover:shadow-[0_10px_40px_rgba(var(--color-accent-rgb),0.1)]">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="p-7 md:p-8 rounded-[1.4rem] bg-[#020403]/90 backdrop-blur-2xl flex items-center gap-6 relative z-10 w-full h-full">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)]">
                      <MapPin className="text-accent group-hover:text-black w-6 h-6 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-white font-display font-bold text-xl mb-2 group-hover:text-accent transition-colors">AXION CHARGE PRIVATE LIMITED</h4>
                      <p className="text-white/90 font-semibold text-sm leading-relaxed tracking-wide">509, Skywalk The Element,<br/>Jagatpur Rd, off SG Highway,<br/>Ahmedabad, Gujarat 382470</p>
                    </div>
                  </div>
                </div>

                {/* Direct Lines */}
                <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent group hover:from-accent/40 hover:to-accent/10 transition-all duration-500 overflow-hidden cursor-default shadow-lg hover:shadow-[0_10px_40px_rgba(var(--color-accent-rgb),0.1)]">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="p-7 md:p-8 rounded-[1.4rem] bg-[#020403]/90 backdrop-blur-2xl flex items-center gap-6 relative z-10 w-full h-full">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)]">
                      <Phone className="text-accent group-hover:text-black w-6 h-6 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-white font-display font-bold text-xl mb-2 group-hover:text-accent transition-colors">Direct Lines</h4>
                      <p className="text-white/90 font-semibold text-sm mb-1 tracking-wide">Growth: <span className="text-white font-bold font-mono">+91 99799 93397</span></p>
                      <p className="text-white/90 font-semibold text-sm tracking-wide">Systems: <span className="text-white font-bold font-mono">+91 99799 93396</span></p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent group hover:from-accent/40 hover:to-accent/10 transition-all duration-500 overflow-hidden cursor-default shadow-lg hover:shadow-[0_10px_40px_rgba(var(--color-accent-rgb),0.1)]">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="p-7 md:p-8 rounded-[1.4rem] bg-[#020403]/90 backdrop-blur-2xl flex items-center gap-6 relative z-10 w-full h-full">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)]">
                      <Mail className="text-accent group-hover:text-black w-6 h-6 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-white font-display font-bold text-xl mb-2 group-hover:text-accent transition-colors">Electronic Mail</h4>
                      <a href="mailto:info@axioncharge.com" className="block text-white/90 font-semibold text-sm mb-1 hover:text-accent transition-colors tracking-wide">info@axioncharge.com</a>
                      <a href="mailto:systems@axioncharge.com" className="block text-white/90 font-semibold text-sm hover:text-accent transition-colors tracking-wide">systems@axioncharge.com</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Side - Premium Glassmorphic Form */}
            <div className="w-full lg:w-7/12 relative z-10 flex items-center justify-center lg:pl-8">
              
              {/* Backlight Glow for the Form */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] max-w-[800px] bg-accent/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="w-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] p-[1px] pointer-events-none z-20">
                  <div className="w-full h-full bg-[#020403] rounded-[2.5rem]" />
                </div>

                <div className="relative z-30 w-full bg-[#050806]/80 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.02)] overflow-hidden">
                  
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div className="mb-10 relative z-10">
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Send a Message</h3>
                    <p className="text-white/40 font-sans text-sm md:text-base">Fill out the form below and our team will get back to you immediately.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col gap-7 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                      <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[0.65rem] font-bold uppercase tracking-[0.2em] pl-1">Your Name</label>
                        <input 
                          type="text" required
                          value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent focus:bg-accent/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 shadow-inner"
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-white/40 text-[0.65rem] font-bold uppercase tracking-[0.2em] pl-1">Email Address</label>
                        <input 
                          type="email" required
                          value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})}
                          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent focus:bg-accent/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 shadow-inner"
                          placeholder="e.g. john@company.com"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <label className="text-white/40 text-[0.65rem] font-bold uppercase tracking-[0.2em] pl-1">Subject</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['General Inquiry', 'Technical Support', 'Sales'].map((sub) => (
                          <div 
                            key={sub}
                            onClick={() => setFormState({...formState, subject: sub})}
                            className={`cursor-pointer px-4 py-3.5 rounded-xl border text-center text-sm font-bold transition-all duration-300 select-none ${
                              formState.subject === sub 
                              ? 'bg-accent border-accent text-black shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)]' 
                              : 'bg-white/[0.02] border-white/10 text-white/50 hover:border-white/30 hover:bg-white/[0.05]'
                            }`}
                          >
                            {sub}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-white/40 text-[0.65rem] font-bold uppercase tracking-[0.2em] pl-1">Message</label>
                      <textarea 
                        required rows="5"
                        value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})}
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-accent focus:bg-accent/[0.02] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 shadow-inner resize-none"
                        placeholder="How can we help you today?"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 relative overflow-hidden flex justify-center items-center gap-3 bg-accent text-black font-bold uppercase tracking-widest py-5 rounded-2xl transition-all duration-300 group shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)] hover:shadow-[0_0_40px_rgba(var(--color-accent-rgb),0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                        {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                      </span>
                      <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Contact;
