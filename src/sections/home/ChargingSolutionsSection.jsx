import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useInView } from 'framer-motion';
import { ArrowRight, Home, Briefcase, ShoppingBag, Truck, Map } from 'lucide-react';

// High-definition Solution Videos
import resVideo from '../../assets/images/EV_charging_at_night_20260929123844_gwr_video_mvp.mp4';
import workVideo from '../../assets/images/EV_charging_at_corporate_office_20260929124509_gwr_video_mvp.mp4';
import commVideo from '../../assets/images/commercial_video.mp4';
import fleetVideo from '../../assets/images/Electric_fleet_vans_charging_depot_20260929131411_gwr_video_mvp.mp4';
import highVideo from '../../assets/images/Blue_SUV_charging_at_station_20260929134507_gwr_video_mvp.mp4';

// High-resolution still images (displayed cleanly after video completes)
import resImg from '../../assets/images/solution_residential_nexon.webp';
import workImg from '../../assets/images/AXION Ecocharge Station 01 (2).webp';
import commImg from '../../assets/images/solution_commercial_phoenix.webp';
import fleetImg from '../../assets/images/AXION Charge Logistics Hub.webp';
import highImg from '../../assets/images/solution_highway_expressway.webp';

const solutions = [
  {
    id: 'residential',
    title: 'RESIDENTIAL',
    subtitle: 'Home / Villa / Apartment',
    description: 'Smart AC charging solutions designed for seamless home integration, overnight charging, and energy efficiency.',
    icon: Home,
    video: resVideo,
    image: resImg,
    imageClass: 'w-full h-full object-cover object-[center_40%]'
  },
  {
    id: 'workplace',
    title: 'WORKPLACE',
    subtitle: 'Office / Corporate Campus',
    description: 'Scalable infrastructure for corporate campuses to empower employees and visitors with reliable daily charging.',
    icon: Briefcase,
    video: workVideo,
    image: workImg,
    imageClass: 'w-full h-full object-cover object-center'
  },
  {
    id: 'commercial',
    title: 'COMMERCIAL',
    subtitle: 'Retail / Hospitality / Malls',
    description: 'Attract premium customers with high-speed EV charging integrated directly into your retail or hospitality parking.',
    icon: ShoppingBag,
    video: commVideo,
    image: commImg,
    imageClass: 'w-full h-full object-cover object-[center_45%]'
  },
  {
    id: 'fleet',
    title: 'FLEET',
    subtitle: 'Logistics / Transport',
    description: 'Ultra-fast DC charging hubs built for continuous operation, ensuring your logistics fleet is never grounded.',
    icon: Truck,
    video: fleetVideo,
    image: fleetImg,
    imageClass: 'w-full h-full object-cover object-[center_45%]'
  },
  {
    id: 'highway',
    title: 'HIGHWAY',
    subtitle: 'Long Distance Corridors',
    description: 'High-power infrastructure enabling cross-country travel with reliable, rapid charging at strategic highway nodes.',
    icon: Map,
    video: highVideo,
    image: highImg,
    imageClass: 'w-full h-full object-cover object-center'
  }
];

const ChargingSolutionsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "250px 0px 250px 0px" });
  const [activeTab, setActiveTab] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoReady, setVideoReady] = useState(true);

  // When active tab changes, debounce video loading so fast scrolling uses zero decoder overhead
  useEffect(() => {
    setVideoEnded(false);
    setVideoReady(false);
    const timer = setTimeout(() => {
      setVideoReady(true);
    }, 280);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      let index = Math.floor(latest * 5);
      if (index >= 5) index = 4;
      if (index < 0) index = 0;
      setActiveTab((prev) => (prev !== index ? index : prev));
    });
  }, [scrollYProgress]);

  const handleTabClick = (index) => {
    if (activeTab === index) {
      setVideoEnded(false);
    }
    setActiveTab(index);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const totalScrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollableDistance > 0) {
        const targetScroll = containerTop + ((index + 0.5) / 5) * totalScrollableDistance;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 45;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && activeTab < solutions.length - 1) {
      setActiveTab((prev) => prev + 1);
      setVideoEnded(false);
    }
    if (isRightSwipe && activeTab > 0) {
      setActiveTab((prev) => prev - 1);
      setVideoEnded(false);
    }
  };

  return (
    <section id="solutions" ref={containerRef} className="relative w-full bg-[#050708] z-20">

      {/* Mobile & Tablet Interactive Showcase (screens < 1280px) */}
      <div 
        className="xl:hidden px-4 sm:px-6 md:px-10 pt-20 pb-16 border-t border-white/5"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-[#00FF00]" />
              <span className="text-[#00FF00] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Solutions Overview</span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] font-display font-bold text-white uppercase tracking-tight leading-[1.1]">
              CHARGING FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-[#00C800]">EVERY JOURNEY.</span>
            </h2>
          </div>

          {/* Tab Selector Pills (Smooth touch-scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {solutions.map((sol, index) => {
              const isActive = activeTab === index;
              const Icon = sol.icon;
              return (
                <button
                  key={`pill-${sol.id}`}
                  onClick={() => {
                    setActiveTab(index);
                    setVideoEnded(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                    isActive
                      ? 'bg-[#00FF00] text-black shadow-[0_0_20px_rgba(0,255,0,0.4)]'
                      : 'bg-[#0B0F12] text-white/70 border border-white/10 hover:border-[#00FF00]/40 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#00FF00]'}`} />
                  <span>{sol.title}</span>
                </button>
              );
            })}
          </div>

          {/* Visual Showcase Card with Video (16:9 Widescreen Horizontal Presentation) */}
          <div className="relative rounded-2xl overflow-hidden bg-[#0B0F12] border border-white/10 aspect-video w-full shadow-2xl mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-${activeTab}-${videoEnded ? 'image' : 'video'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black flex items-center justify-center"
              >
                {solutions[activeTab].video && !videoEnded && videoReady && isInView ? (
                  <video
                    key={`mobile-vid-${solutions[activeTab].id}`}
                    src={solutions[activeTab].video}
                    poster={solutions[activeTab].image}
                    autoPlay
                    muted
                    playsInline
                    preload="none"
                    onEnded={() => setVideoEnded(true)}
                    onError={() => setVideoEnded(true)}
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        el.defaultMuted = true;
                        el.play().catch(() => {});
                      }
                    }}
                    className="w-full h-full object-contain object-center bg-black"
                  />
                ) : (
                  <img
                    src={solutions[activeTab].image}
                    alt={solutions[activeTab].title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain md:object-cover object-center brightness-[1.02]"
                  />
                )}
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#00FF00]/30 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse shadow-[0_0_6px_#00FF00]" />
                  <span className="text-[0.65rem] sm:text-xs font-mono text-[#00FF00] uppercase tracking-wider font-bold">
                    {solutions[activeTab].title} • {solutions[activeTab].subtitle}
                  </span>
                </div>

                {/* Media Toggle: Switch between Video and High-res Still */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoEnded(prev => !prev);
                  }}
                  className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-[#00FF00] text-[0.65rem] sm:text-xs font-mono text-white/90 hover:text-[#00FF00] transition-all cursor-pointer shadow-lg"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] animate-pulse" />
                  <span>{videoEnded ? 'WATCH VIDEO' : 'VIEW STILL'}</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {solutions.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setActiveTab(dotIdx);
                  setVideoEnded(false);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeTab === dotIdx ? 'w-6 bg-[#00FF00]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to solution ${dotIdx + 1}`}
              />
            ))}
          </div>

          {/* Active Solution Description & CTA */}
          <div className="p-6 rounded-2xl bg-[#0B0F12]/80 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="block font-mono text-xs text-[#00FF00] uppercase tracking-widest mb-1">
                {solutions[activeTab].subtitle}
              </span>
              <h3 className="text-white font-display font-bold text-xl sm:text-2xl mb-2">
                {solutions[activeTab].title} CHARGING
              </h3>
              <p className="text-gray-300 font-sans text-sm max-w-xl leading-relaxed">
                {solutions[activeTab].description}
              </p>
            </div>
            <Link
              to={`/solutions/${solutions[activeTab].id}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#00FF00] text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,0,0.3)] flex-shrink-0 cursor-pointer"
            >
              Explore Solution
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop: Smooth sticky cinematic visual sequence (screens >= 1280px) */}
      <div className="hidden xl:block relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-t border-white/5 pt-[88px]">
        
        {/* Background Textures */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,0,0.03)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full relative z-10 flex flex-col xl:flex-row gap-8 xl:gap-16 items-center min-h-[480px] h-[calc(100vh-110px)] max-h-[700px]">
          
          {/* Left Column: Header + Interactive Selector */}
          <div className="w-full xl:w-5/12 flex flex-col z-20 h-full justify-center">
            
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[1px] bg-[#00FF00]" />
                <span className="text-[#00FF00] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Solutions Overview</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] xl:text-[3.2rem] font-display font-bold text-white uppercase tracking-tight leading-[1.1]">
                CHARGING FOR <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-[#00C800]">EVERY JOURNEY.</span>
              </h2>
            </div>

            {/* Selector List */}
            <div className="flex flex-col gap-1 md:gap-1.5">
              {solutions.map((sol, index) => {
                const isActive = activeTab === index;
                return (
                  <button 
                    key={sol.id}
                    onClick={() => handleTabClick(index)}
                    className={`relative p-3.5 lg:p-4 xl:p-5 border-l-[3px] text-left transition-all duration-300 ${
                      isActive 
                        ? 'border-[#00FF00] bg-[#0B0F12]' 
                        : 'border-transparent opacity-40 hover:opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-display font-bold text-[1rem] lg:text-[1.15rem] xl:text-[1.3rem] tracking-wide transition-colors duration-300 ${isActive ? 'text-[#00FF00]' : 'text-white'}`}>
                          {sol.title}
                        </h3>
                        {isActive && (
                          <p className="font-sans text-[0.75rem] lg:text-[0.8rem] text-[#F3F4F6] mt-0.5">
                            {sol.subtitle}
                          </p>
                        )}
                      </div>
                      {isActive && (
                        <motion.div layoutId="activeArrow" className="w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#00FF00]/30 flex items-center justify-center bg-[#00FF00]/10 text-[#00FF00] flex-shrink-0 ml-4">
                          <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        </motion.div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Large Cinematic Visual */}
          <div className="w-full xl:w-7/12 relative rounded-xl overflow-hidden bg-[#0B0F12] border border-white/5 aspect-video flex-shrink-0 shadow-2xl flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${videoEnded ? 'image' : 'video'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 bg-black flex items-center justify-center"
              >
                {/* Clean sequential play: video plays cleanly after scroll settles, on complete it sets the image without overlap */}
                {solutions[activeTab].video && !videoEnded && videoReady && isInView ? (
                  <video 
                    key={`vid-${solutions[activeTab].id}`}
                    src={solutions[activeTab].video}
                    poster={solutions[activeTab].image}
                    autoPlay 
                    muted 
                    playsInline
                    preload="none"
                    onEnded={() => setVideoEnded(true)}
                    onError={() => setVideoEnded(true)}
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        el.defaultMuted = true;
                        el.play().catch(() => {});
                      }
                    }}
                    className="w-full h-full object-contain object-center bg-black"
                  />
                ) : (
                  <img 
                    src={solutions[activeTab].image} 
                    alt={solutions[activeTab].title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain md:object-cover object-center brightness-[1.02] contrast-[1.02]"
                  />
                )}
                
                {/* Gradients for depth and legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050708]/30 via-transparent to-transparent pointer-events-none" />
                
                {/* HUD Overlay Elements */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 flex flex-col pointer-events-none z-10">
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      {React.createElement(solutions[activeTab].icon, { className: "text-[#00FF00] w-4 h-4 sm:w-5 sm:h-5" })}
                    </div>
                    <div>
                      <span className="block font-mono text-[0.6rem] sm:text-[0.65rem] text-[#00FF00] uppercase tracking-widest font-bold">Sector Active</span>
                      <span className="block font-sans text-white font-bold text-sm sm:text-base tracking-wide">{solutions[activeTab].title}</span>
                    </div>
                  </div>
                  
                  {/* Decorative Tech Grid overlay on the visual */}
                  <div className="hidden sm:block w-[120px] md:w-[180px] h-[20px] md:h-[30px] border-l-2 border-b-2 border-white/20 relative">
                     <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00FF00]" />
                     <div className="absolute top-0 left-[-2px] w-[2px] h-3 bg-[#00FF00]" />
                  </div>
                </div>

                {/* Media Toggle: Switch between Video and High-res Still */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoEnded(prev => !prev);
                  }}
                  className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-[#00FF00] text-xs font-mono text-white/90 hover:text-[#00FF00] transition-all cursor-pointer shadow-lg"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] animate-pulse" />
                  <span>{videoEnded ? 'WATCH VIDEO' : 'VIEW STILL'}</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
};

export default ChargingSolutionsSection;
