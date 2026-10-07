import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! Our team will get back to you within 24 hours.");
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <PageTransition locationKey="contact">
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative font-sans">
        
        {/* Massive Ambient Backgrounds */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pt-10 pb-24 relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Content - Info */}
            <div className="w-full lg:w-5/12 flex flex-col items-start relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-white/5 border border-accent/30 backdrop-blur-md"
              >
                <MessageSquare className="text-accent w-4 h-4" />
                <span className="text-accent font-mono text-xs uppercase tracking-[0.2em] font-bold">24/7 SUPPORT</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl lg:text-[6rem] font-display font-bold text-white uppercase tracking-tighter mb-8 leading-[0.9]"
              >
                LET'S <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white/70 drop-shadow-sm">CONNECT.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-[#B0B0B0] max-w-xl leading-relaxed mb-16 border-l-2 border-accent/50 pl-6"
              >
                Whether you have a question about our hardware, need technical support, or want to explore partnership opportunities, our global team is ready to help.
              </motion.p>

              {/* Contact Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col gap-6 w-full"
              >
                {/* Global HQ */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-5 hover:border-accent/30 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#020403] border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                    <MapPin className="text-accent w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold text-xl mb-1">Global Headquarters</h4>
                    <p className="text-[#A0A0A0] text-sm">One Axion Way<br/>Silicon Valley, CA 94025<br/>United States</p>
                  </div>
                </div>

                {/* Direct Lines */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-5 hover:border-accent/30 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#020403] border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                    <Phone className="text-accent w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold text-xl mb-1">Direct Lines</h4>
                    <p className="text-[#A0A0A0] text-sm mb-1">Support: <span className="text-white font-mono">+1 (800) 555-0199</span></p>
                    <p className="text-[#A0A0A0] text-sm">Sales: <span className="text-white font-mono">+1 (800) 555-0299</span></p>
                  </div>
                </div>

                {/* Email */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-start gap-5 hover:border-accent/30 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#020403] border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                    <Mail className="text-accent w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-display font-bold text-xl mb-1">Electronic Mail</h4>
                    <p className="text-[#A0A0A0] text-sm mb-1">hello@axioncharge.com</p>
                    <p className="text-[#A0A0A0] text-sm">support@axioncharge.com</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Side - Massive Form */}
            <div className="w-full lg:w-7/12 relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="w-full bg-gradient-to-br from-[#050A07] to-[#020403] rounded-3xl md:rounded-[3rem] p-6 md:p-10 lg:p-16 border border-accent/20 shadow-[0_0_80px_rgba(var(--color-accent-rgb),0.05)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />
                
                <h3 className="text-3xl font-display font-bold text-white mb-8 relative z-10">SEND A MESSAGE</h3>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/50 text-xs font-bold mb-2 uppercase tracking-wider">Your Name</label>
                      <input 
                        type="text" required
                        value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-[#020403] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 transition-colors shadow-inner"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 text-xs font-bold mb-2 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" required
                        value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-[#020403] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 transition-colors shadow-inner"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/50 text-xs font-bold mb-2 uppercase tracking-wider">Subject</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {['General Inquiry', 'Technical Support', 'Sales'].map((sub) => (
                        <div 
                          key={sub}
                          onClick={() => setFormState({...formState, subject: sub})}
                          className={`cursor-pointer px-4 py-3 rounded-xl border text-center text-sm font-bold transition-all duration-300 ${
                            formState.subject === sub 
                            ? 'bg-accent/10 border-accent text-accent' 
                            : 'bg-[#020403] border-white/10 text-white/50 hover:border-white/30'
                          }`}
                        >
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/50 text-xs font-bold mb-2 uppercase tracking-wider">Message</label>
                    <textarea 
                      required rows="6"
                      value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-[#020403] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent/50 transition-colors shadow-inner resize-none"
                      placeholder="How can we help you today?"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-4 flex justify-center items-center gap-3 bg-accent text-black font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-white hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.4)] transition-all duration-300 group"
                  >
                    SEND MESSAGE
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
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
