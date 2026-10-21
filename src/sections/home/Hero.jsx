import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import heroCarCharger from '../../assets/images/hero_tiago_220kw_showcase.webp';
import heroBackdrop from '../../assets/images/hero_atmosphere_backdrop.webp';

const Hero = () => {
  const navigate = useNavigate();

  const handleExploreSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -40, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/solutions/residential');
    }
  };

  const handleGetQuote = () => {
    navigate('/contact', {
      state: {
        type: 'quote',
        source: 'hero'
      }
    });
  };

  return (
    <section className="relative w-full min-h-[100svh] bg-[#020403] overflow-hidden flex flex-col justify-center pt-20 sm:pt-24 md:pt-28 pb-8 md:pb-12">

      {/* Atmospheric Skyline Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src={heroBackdrop}
          alt=""
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover object-left-top opacity-50 mix-blend-screen"
        />
        {/* Cyber Green Ambient Glows */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00FF00]/12 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute left-[-10%] top-1/4 w-[500px] h-[500px] bg-[#00FF00]/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      {/* Vignette Gradients for Text Legibility & Section Transitions */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#020403] via-[#020403]/80 via-40% to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#020403] via-transparent via-15% to-transparent pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#020403]/90 to-transparent z-[1] pointer-events-none" />

      {/* Content Container: 2-Column Responsive Layout on Tablets & Desktop */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10 flex-1">
        
        {/* Left Column: Brand Copy & Actions */}
        <div className="w-full md:w-[48%] lg:w-[44%] xl:w-[42%] flex flex-col justify-center py-4 md:py-6 z-10 flex-shrink-0">

          {/* Brand Slogan */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 md:mb-4">
            <span className="w-5 sm:w-8 h-[1.5px] bg-accent shadow-[0_0_8px_var(--color-accent)] inline-block" />
            <span className="text-[0.7rem] sm:text-xs md:text-sm font-mono text-accent tracking-[0.3em] sm:tracking-[0.35em] uppercase font-bold drop-shadow-[0_0_10px_rgba(0,255,0,0.35)] select-none">
              ENERGY : EVOLVED
            </span>
            <span className="w-5 sm:w-8 h-[1.5px] bg-accent shadow-[0_0_8px_var(--color-accent)] inline-block" />
          </div>

          {/* Main Headline */}
          <h1 
            className="text-2xl sm:text-3xl md:text-[2rem] lg:text-[2.6rem] xl:text-[3.4rem] font-display font-bold leading-[1.12] mb-3 sm:mb-4 md:mb-5 tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]"
          >
            <span className="block mb-1 text-white">
              POWERING INDIA'S
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] via-[#39FF14] to-white drop-shadow-[0_0_25px_rgba(0,255,0,0.4)]">
              SUSTAINABLE FUTURE.
            </span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-xs sm:text-sm md:text-base text-white/80 font-sans max-w-[460px] mb-5 sm:mb-6 md:mb-8 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
          >
            Advanced EV charging infrastructure built for the next generation of clean mobility across residential, workplace, and highway networks.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 max-w-md">
            <button 
              type="button"
              onClick={handleExploreSolutions}
              className="group flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 bg-accent text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_25px_rgba(var(--color-accent-rgb),0.35)] hover:shadow-[0_0_35px_rgba(var(--color-accent-rgb),0.7)] cursor-pointer"
            >
              EXPLORE SOLUTIONS
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button 
              type="button"
              onClick={handleGetQuote}
              className="group flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 border border-white/30 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full hover:border-accent hover:text-accent transition-all bg-black/40 hover:bg-accent/10 backdrop-blur-md cursor-pointer"
            >
              GET A QUOTE
              <ArrowRight className="w-4 h-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </button>
          </div>

        </div>

        {/* Right Column: Tata Tiago EV + AXION 220 kW Fast Charger Showcase */}
        <div className="w-full md:w-[52%] lg:w-[56%] xl:w-[58%] flex items-center justify-center md:justify-end relative z-10 mt-3 md:mt-0">
          <div className="relative w-full max-w-[850px] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-[#0B0F12] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(0,255,0,0.15)] group transition-all duration-500 hover:border-[#00FF00]/40">
            
            {/* Real Hardware Image */}
            <img
              src={heroCarCharger}
              alt="Tata Tiago EV charging at AXION 220 kW Fast Charger"
              fetchPriority="high"
              decoding="sync"
              className="w-full h-auto object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />

            {/* Subtle Vignette Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Tech HUD Badges */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#00FF00]/40 shadow-lg pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse shadow-[0_0_8px_#00FF00]" />
              <span className="text-[0.62rem] sm:text-xs font-mono text-[#00FF00] font-bold uppercase tracking-wider">
                AXION 220 kW ULTRA-FAST CHARGER
              </span>
            </div>

            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white/90 text-[0.62rem] sm:text-xs font-mono tracking-wider shadow-lg pointer-events-none">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-[#00FF00] font-bold">CHARGING ACTIVE</span>
            </div>

            {/* Cyber Corner Tech Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00FF00]/70 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00FF00]/70 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00FF00]/70 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00FF00]/70 pointer-events-none" />
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
