import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Shield, Wifi, BatteryCharging, CheckCircle2 } from 'lucide-react';
import { productsData } from '../data/productsData';

const ProductPage = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[#050708] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-[#00FF3C] mb-4">Product Not Found</h1>
          <Link to="/" className="text-gray-400 hover:text-white underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#050708] text-white pt-32 pb-24 overflow-hidden relative">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00FF3C] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF3C] transition-colors mb-12 font-sans text-sm">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex items-center justify-center"
          >
            {/* Glowing Plinth */}
            <div className="absolute bottom-0 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#00FF3C] to-transparent shadow-[0_0_20px_rgba(0,255,60,0.5)]" />
            
            {/* Actual Product Image */}
            <div className="relative w-full max-w-[500px] flex items-center justify-center rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,255,60,0.15)] border border-white/5 bg-[#020403]/50">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700"
               />
               {/* Overlay gradient to blend bottom edge */}
               <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050708] to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-[#00FF3C]/10 border border-[#00FF3C]/30 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF3C] animate-pulse" />
                <span className="text-[#00FF3C] font-mono text-[0.65rem] uppercase tracking-[0.2em] font-bold">
                  {product.category === 'ac' ? 'AC Charging Series' : 'DC Fast Series'}
                </span>
              </div>
            </div>

            <h1 className="text-[3rem] md:text-[4rem] font-display font-bold uppercase tracking-tight leading-[1] mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 drop-shadow-sm">
              {product.name}
            </h1>
            
            <p className="text-xl text-[#00FF3C] font-sans font-medium mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(0,255,60,0.3)]">
              {product.tagline}
            </p>

            <p className="text-gray-400 font-sans leading-relaxed mb-8 max-w-[500px] text-[1.05rem]">
              {product.description}
            </p>

            {/* Key Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {product.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-lg p-3">
                  <CheckCircle2 size={16} className="text-[#00FF3C] flex-shrink-0" />
                  <span className="text-gray-300 text-sm font-sans font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mb-10" />

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 gap-5 mb-12">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className="relative group overflow-hidden bg-[#0A0D10] border border-white/10 rounded-2xl p-5 hover:border-[#00FF3C]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,60,0.1)] hover:-translate-y-1">
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FF3C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <span className="block text-[#00FF3C]/70 font-mono text-[0.65rem] uppercase tracking-[0.15em] mb-2 font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="block text-white font-sans font-semibold text-[1.1rem] tracking-wide">{value}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-6">
              <Link to="/contact" className="px-8 py-4 bg-[#00FF3C] text-black font-sans text-sm font-bold uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,60,0.6)]">
                Request a Quote
              </Link>
              <button className="px-8 py-4 border border-white/20 text-white font-sans text-sm font-bold uppercase rounded-full hover:bg-white/10 transition-colors">
                Download Datasheet
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
