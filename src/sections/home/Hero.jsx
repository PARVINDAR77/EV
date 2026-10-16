import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Settings, TowerControl } from 'lucide-react';
import bgImage from '../../assets/images/hero_bg_final.webp';

const LoopingTypewriterText = ({ texts, delay = 0, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let timeout;
    let isDeleting = false;
    let i = 0;
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

      let delta = isDeleting ? 30 : 70;

      if (!isDeleting && i === currentText.length) {
        delta = 2500;
        isDeleting = true;
      } else if (isDeleting && i === 0) {
        isDeleting = false;
        setTextIndex((prev) => (prev + 1) % texts.length);
        delta = 500;
      }

      timeout = setTimeout(tick, delta);
    };

    const initialTimeout = setTimeout(tick, delay);
    return () => {
      clearTimeout(timeout);
      clearTimeout(initialTimeout);
    };
  }, [textIndex, texts, delay]);

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-[6px] h-[0.8em] bg-accent ml-2 animate-pulse align-middle opacity-80" />
    </span>
  );
};



const Hero = () => {
  return (
    <section className="relative w-full min-h-[100svh] bg-[#000] overflow-hidden flex flex-col pt-32 md:pt-40 pb-0">

        {/* Background Image with high LCP priority */}
        <img
          src={bgImage}
          alt="AXION CHARGE EV Charging Network"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none select-none"
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-[1500px] mx-auto px-4 md:px-10 flex flex-col justify-between flex-1 pb-2 md:pb-8">

          <div className="flex justify-between w-full mt-0 flex-1">
            {/* Left Content */}
            <div className="w-full md:w-[65%] flex flex-col mt-4 md:mt-8">
              <div>

              {/* Tagline */}
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="w-2 h-[10px] bg-accent"></div>
                <span className="text-[0.65rem] font-mono text-gray-300 tracking-[0.3em] uppercase font-bold">EV CHARGING INFRASTRUCTURE</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-4 md:mb-5 tracking-[-0.02em] text-white flex flex-col break-words" style={{ textShadow: "0px 4px 15px rgba(0, 0, 0, 0.9)" }}>
                <span className="block">POWERING INDIA'S</span>
                <LoopingTypewriterText 
                  texts={["ELECTRIC JOURNEY.", "SUSTAINABLE FUTURE.", "GREEN MOBILITY."]} 
                  delay={500} 
                  className="text-accent mt-1 md:mt-2 break-words" 
                />
              </h1>

              {/* Subheading */}
              <p className="text-[0.9rem] md:text-[1.1rem] text-white font-sans max-w-[500px] mb-6 md:mb-10 leading-snug opacity-0 animate-[fadeIn_1s_ease-in_2.5s_forwards]">
                Advanced EV charging infrastructure built for the next generation of mobility.
              </p>
              <style>{`
                @keyframes fadeIn {
                  to { opacity: 1; }
                }
              `}</style>

              </div>

              {/* Bottom Section (Buttons) */}
              <div className="w-full mt-auto pt-6 pb-6 md:pb-14 flex flex-col gap-4">
                {/* Buttons */}
                <div className="flex flex-row w-full gap-2 sm:gap-3 opacity-0 animate-[fadeIn_1s_ease-in_3s_forwards]">
                  <button className="group flex flex-1 items-center justify-center gap-1 sm:gap-3 px-2 sm:px-5 md:px-7 py-3 md:py-3.5 bg-accent text-black font-sans text-[0.65rem] sm:text-[0.75rem] md:text-[0.85rem] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--color-accent-rgb),0.6)]">
                    EXPLORE SOLUTIONS
                    <span className="text-[0.9rem] sm:text-[1.1rem] leading-none mb-[2px] transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </button>
                  <button className="group flex flex-1 items-center justify-center gap-1 sm:gap-3 px-2 sm:px-5 md:px-7 py-3 md:py-3.5 border border-white/40 text-white font-sans text-[0.65rem] sm:text-[0.75rem] md:text-[0.85rem] font-bold uppercase tracking-widest rounded-full hover:border-white transition-all bg-transparent hover:bg-white/5">
                    GET A QUOTE
                    <span className="text-[0.9rem] sm:text-[1.1rem] leading-none mb-[2px] opacity-70 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
    </section>
  );
};

export default Hero;
