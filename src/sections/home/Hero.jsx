import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import bgImage from '../../assets/images/hero_bg_tiago.webp';

const LoopingTypewriterText = ({ texts, delay = 0, className = '' }) => {
  const [displayedText, setDisplayedText] = useState(texts[0]);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let timeout;
    let isDeleting = false;
    let i = texts[0].length;
    let currentText = texts[0];
    
    const tick = () => {
      currentText = texts[textIndex];
      
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, i - 1));
        i--;
      } else {
        setDisplayedText(currentText.substring(0, i + 1));
        i++;
      }

      let delta = isDeleting ? 30 : 65;

      if (!isDeleting && i === currentText.length) {
        delta = 2600;
        isDeleting = true;
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        setTextIndex((prev) => (prev + 1) % texts.length);
        delta = 400;
      }

      timeout = setTimeout(tick, delta);
    };

    const initialTimeout = setTimeout(() => {
      isDeleting = true;
      timeout = setTimeout(tick, 2000);
    }, delay + 1000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialTimeout);
    };
  }, [textIndex, texts, delay]);

  return (
    <span className={`inline-block min-h-[1.15em] ${className}`}>
      {displayedText}
      <span className="inline-block w-[4px] md:w-[6px] h-[0.75em] bg-accent ml-2 animate-pulse align-middle opacity-90 shadow-[0_0_8px_var(--color-accent)]" />
    </span>
  );
};

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
    <section className="relative w-full min-h-[100svh] bg-[#020403] overflow-hidden flex flex-col justify-center pt-28 md:pt-32 pb-12">

      {/* Background Image with high LCP priority */}
      <img
        src={bgImage}
        alt="Tata Tiago EV charging at AXION DC Fast Charger"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover object-[72%_center] md:object-[65%_center] lg:object-center z-0 pointer-events-none select-none brightness-[1.02]"
      />
      
      {/* Asymmetric Horizontal Gradient: Deep dark on left to protect text, clear on right to showcase car & charger */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#020403]/95 via-[#020403]/80 md:via-[#020403]/55 to-transparent pointer-events-none" />

      {/* Vertical Edge Gradients: Seamless blends for Navbar and next section */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#020403]/80 via-transparent to-[#020403] pointer-events-none" />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col justify-center flex-1">
        
        {/* Left Content Column */}
        <div className="w-full md:w-[64%] lg:w-[58%] flex flex-col py-6 md:py-10">

          {/* Tagline */}
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <div className="w-2 h-[10px] bg-accent shadow-[0_0_8px_var(--color-accent)]" />
            <span className="text-[0.65rem] sm:text-xs font-mono text-accent tracking-[0.25em] uppercase font-bold drop-shadow-md">
              EV CHARGING INFRASTRUCTURE
            </span>
          </div>

          {/* Main Headline with protected line box & no overlap */}
          <h1 
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-display font-bold leading-[1.12] mb-5 md:mb-6 tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]"
          >
            <span className="block mb-1 sm:mb-2 text-white/95">
              POWERING INDIA'S
            </span>
            <LoopingTypewriterText 
              texts={["ELECTRIC JOURNEY.", "SUSTAINABLE FUTURE.", "GREEN MOBILITY."]} 
              delay={400} 
              className="text-accent block text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] via-[#00E500] to-white" 
            />
          </h1>

          {/* Subheading */}
          <p 
            className="text-sm sm:text-base md:text-lg text-white/80 font-sans max-w-[520px] mb-8 md:mb-10 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
          >
            Advanced EV charging infrastructure built for the next generation of clean mobility across residential, workplace, and highway networks.
          </p>

          {/* Action Buttons: Solid flow spacing preventing any viewport collapse */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 max-w-lg">
            <button 
              type="button"
              onClick={handleExploreSolutions}
              className="group flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-accent text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_25px_rgba(var(--color-accent-rgb),0.35)] hover:shadow-[0_0_35px_rgba(var(--color-accent-rgb),0.7)] cursor-pointer"
            >
              EXPLORE SOLUTIONS
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button 
              type="button"
              onClick={handleGetQuote}
              className="group flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 border border-white/30 text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full hover:border-accent hover:text-accent transition-all bg-black/40 hover:bg-accent/10 backdrop-blur-md cursor-pointer"
            >
              GET A QUOTE
              <ArrowRight className="w-4 h-4 opacity-70 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;

