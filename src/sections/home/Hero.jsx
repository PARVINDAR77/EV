import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Settings, TowerControl } from 'lucide-react';
import bgImage from '../../assets/images/hero_bg_final.jpg';

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

const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutCubic
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(easeOut * value));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    // Small delay before starting the animation for better effect
    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return <>{count}</>;
};

const StatItem = ({ value, goal, duration, label, isActive = false }) => {
  const percentage = Math.min((value / goal) * 100, 100);
  const remaining = goal - value;
  
  return (
    <div className={`flex flex-col border-l ${isActive ? 'border-accent' : 'border-accent/40'} pl-3 md:pl-4`}>
      <div className="text-accent font-mono text-xl sm:text-2xl md:text-3xl font-bold leading-none mb-1">
        <AnimatedNumber value={value} duration={duration} />+
      </div>
      <div className="text-[0.45rem] sm:text-[0.55rem] text-gray-400 font-sans tracking-wider sm:tracking-widest uppercase font-bold mt-1 w-full leading-tight mb-2">
        {label}
      </div>
      <div className="w-full max-w-[100px]">
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-1">
          <div 
            className="h-full bg-accent transition-all duration-1000 ease-out" 
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-[0.4rem] sm:text-[0.6rem] md:text-[0.65rem] text-gray-400 font-sans tracking-wide sm:tracking-[0.1em] uppercase mt-1.5 font-medium">
          <span className="text-white font-bold">{remaining}</span> <span className="hidden sm:inline">TO GOAL</span> ({goal})
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <>
      <section className="relative w-full min-h-[100svh] bg-[#000] overflow-hidden flex flex-col pt-32 md:pt-40 pb-0">

        {/* Background Image (Using the provided image as the base layer) */}
        <div
          className="absolute inset-0 z-0 opacity-100 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center' }}
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

              {/* Bottom Section (Buttons & Stats) */}
              <div className="w-full mt-auto pt-4 flex flex-col gap-4 md:gap-8">
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

            {/* Stats Bar */}
            <div className="w-full">
            <h3 className="text-white font-sans font-bold tracking-[0.1em] text-[0.7rem] md:text-[0.85rem] mb-4 md:mb-5 uppercase">
              THE WAY INDIA MOVES IS CHANGING.
            </h3>
            <div className="grid grid-cols-4 gap-1 sm:gap-4 md:gap-8 lg:gap-14 w-full">
              <div className="w-full">
                <StatItem value={5} goal={100} duration={1500} label="CHARGING SOLUTIONS" isActive={true} />
              </div>
              <div className="w-full">
                <StatItem value={150} goal={500} duration={2500} label="PROJECTS" />
              </div>
              <div className="w-full">
                <StatItem value={45} goal={200} duration={2000} label="PARTNERS" />
              </div>
              <div className="w-full">
                <StatItem value={28} goal={100} duration={2000} label="CITIES" />
              </div>
            </div>
          </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ecosystem Section underneath */}
      <section className="w-full bg-[#000] relative pb-20 -mt-1">

        {/* Angled SVG Divider */}
        <div className="w-full max-w-[1920px] mx-auto h-[50px] relative hidden md:block">
          <svg width="100%" height="100%" viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 0 H450 L500 50 H1440" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 md:px-10 relative mt-8 md:mt-12">

          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-10 gap-3">
            <div>
              <h2 className="text-white font-sans font-bold text-[1.2rem] tracking-wide mb-2 uppercase">ONE ENERGY ECOSYSTEM.</h2>
              <p className="text-gray-400 font-sans text-[0.8rem]"><span className="text-gray-500">From</span> home to highway — a complete charging network.</p>
            </div>
            <div className="hidden md:flex items-center text-[0.55rem] text-gray-400 font-mono tracking-widest uppercase gap-2">
              EXPLORE THE ECOSYSTEM <ArrowRight size={12} />
            </div>
          </div>

          <div className="relative">
            {/* Horizontal dotted line */}
            <div className="absolute top-9 left-0 w-full border-t border-dashed border-accent/30 hidden md:block z-0"></div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-16 relative z-10">

              {/* Home */}
              <div className="flex flex-col gap-5">
                <div className="w-[70px] h-[70px] rounded-2xl border border-accent flex items-center justify-center bg-black relative">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold uppercase text-[0.85rem] mb-1.5 tracking-wide">HOME</h4>
                  <p className="text-gray-400 text-[0.75rem] leading-relaxed max-w-[180px]">Charge at your home<br />with ease.</p>
                </div>
              </div>

              {/* Business */}
              <div className="flex flex-col gap-5">
                <div className="w-[70px] h-[70px] rounded-2xl border border-accent flex items-center justify-center bg-black relative">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold uppercase text-[0.85rem] mb-1.5 tracking-wide">BUSINESS</h4>
                  <p className="text-gray-400 text-[0.75rem] leading-relaxed max-w-[180px]">Powering workplaces<br />and commercial spaces.</p>
                </div>
              </div>

              {/* Fleet */}
              <div className="flex flex-col gap-5">
                <div className="w-[70px] h-[70px] rounded-2xl border border-accent flex items-center justify-center bg-black relative">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3" /><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" /><path d="M14 17h1" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold uppercase text-[0.85rem] mb-1.5 tracking-wide">FLEET</h4>
                  <p className="text-gray-400 text-[0.75rem] leading-relaxed max-w-[180px]">Keep your fleet<br />moving.</p>
                </div>
              </div>

              {/* Highway */}
              <div className="flex flex-col gap-5">
                <div className="w-[70px] h-[70px] rounded-2xl border border-accent flex items-center justify-center bg-black relative">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 22 8.7-17.4a2 2 0 0 1 3.6 0L24 22" /><path d="M14 13h-4l-1 2h6Z" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-sans font-bold uppercase text-[0.85rem] mb-1.5 tracking-wide">HIGHWAY</h4>
                  <p className="text-gray-400 text-[0.75rem] leading-relaxed max-w-[180px]">Longer journeys,<br />greater freedom.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
