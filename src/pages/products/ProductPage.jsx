import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const ProductPage = ({ title, category, description, image, features = [] }) => {
  return (
    <PageTransition locationKey={`product-${title}`}>
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative">
        
        {/* Background ambient glow */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00FF3C]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-[#00FF3C]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pt-10 pb-24 relative z-10">
          
          {/* Top category label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#00FF3C]" />
            <span className="text-[#00FF3C] font-mono text-[0.8rem] uppercase tracking-[0.3em] font-bold">{category}</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content (Text & Features) */}
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 uppercase tracking-tight mb-6 leading-[1.1] drop-shadow-lg"
              >
                {title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-[#A0A0A0] font-sans mb-10 max-w-xl leading-relaxed tracking-wide"
              >
                {description}
              </motion.p>
              
              {/* Feature Grid */}
              {features.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
                >
                  {features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="group flex items-start gap-4 p-5 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-[#00FF3C]/30 rounded-2xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(0,255,60,0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Subtle hover glow inside card */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00FF3C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="w-10 h-10 rounded-full bg-[#020403] border border-[#00FF3C]/20 shadow-[0_0_10px_rgba(0,255,60,0.1)] flex items-center justify-center flex-shrink-0 group-hover:border-[#00FF3C]/60 group-hover:shadow-[0_0_15px_rgba(0,255,60,0.3)] transition-all duration-300 z-10">
                        <CheckCircle2 className="text-[#00FF3C] w-5 h-5" />
                      </div>
                      
                      <div className="z-10">
                        <h4 className="text-white font-display font-bold text-[0.95rem] tracking-wide mb-1.5 group-hover:text-[#00FF3C] transition-colors duration-300">{feature.title}</h4>
                        <p className="text-[#888888] text-[0.8rem] leading-relaxed font-sans">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              <motion.button 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-[#00FF3C] text-black font-sans text-sm font-bold uppercase rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,60,0.5)] group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  DOWNLOAD DATASHEET
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
                <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
              </motion.button>
            </div>

            {/* Right Content (Image) */}
            <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full h-full relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
              </motion.div>
              
              {/* Floating decorative elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 border border-[#00FF3C]/30 rounded-full z-0 blur-[2px]"
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-48 h-48 border border-white/10 rounded-full z-20 blur-[1px]"
              />
            </div>

          </div>
        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default ProductPage;
