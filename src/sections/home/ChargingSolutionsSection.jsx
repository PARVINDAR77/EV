import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowRight, Home, Briefcase, ShoppingBag, Truck, Map } from 'lucide-react';

// High-definition Solution Videos
import resVideo from '../../assets/images/EV_charging_at_night_20260929123844_gwr_video_mvp.mp4';
import workVideo from '../../assets/images/EV_charging_at_corporate_office_20260929124509_gwr_video_mvp.mp4';
import commVideo from '../../assets/images/commercial_video.mp4';
import fleetVideo from '../../assets/images/Electric_fleet_vans_charging_depot_20260929131411_gwr_video_mvp.mp4';
import highVideo from '../../assets/images/Blue_SUV_charging_at_station_20260929134507_gwr_video_mvp.mp4';

// High-resolution still images (displayed cleanly after video completes)
import resImg from '../../assets/images/residential.jpg';
import workImg from '../../assets/images/workplace.jpg';
import commImg from '../../assets/images/commercial.jpg';
import fleetImg from '../../assets/images/fleet.jpg';
import highImg from '../../assets/images/highway.jpg';

const solutions = [
  {
    id: 'residential',
    title: 'RESIDENTIAL',
    subtitle: 'Home / Villa / Apartment',
    description: 'Smart AC charging solutions designed for seamless home integration, overnight charging, and energy efficiency.',
    icon: Home,
    video: resVideo,
    image: resImg,
    imageClass: 'w-full h-full object-cover object-center'
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
    imageClass: 'w-full h-full object-cover object-center'
  },
  {
    id: 'fleet',
    title: 'FLEET',
    subtitle: 'Logistics / Transport',
    description: 'Ultra-fast DC charging hubs built for continuous operation, ensuring your logistics fleet is never grounded.',
    icon: Truck,
    video: fleetVideo,
    image: fleetImg,
    imageClass: 'w-full h-full object-cover object-center'
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
  const [activeTab, setActiveTab] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);

  // When active tab changes, reset so the new video plays cleanly
  useEffect(() => {
    setVideoEnded(false);
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
      setActiveTab(index);
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050708] z-20">

      {/* Mobile: stacked visual cards */}
      <div className="md:hidden px-4 pt-32 pb-20 border-t border-white/5">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#00FF00]" />
            <span className="text-[#00FF00] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Solutions Overview</span>
          </div>
          <h2 className="text-[2rem] font-display font-bold text-white uppercase tracking-tight leading-[1.1]">
            CHARGING FOR <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-[#00C800]">EVERY JOURNEY.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          {solutions.map((sol) => (
            <div key={sol.id} className="relative rounded-xl overflow-hidden h-[260px] border border-white/5 bg-[#0B0F12]">
              <img 
                src={sol.image} 
                alt={sol.title} 
                loading="lazy" 
                decoding="async"
                className={`absolute inset-0 ${sol.imageClass || "w-full h-full object-cover opacity-90"}`} 
              />
              
              {/* Darker gradient for crisp text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050708] via-[#050708]/60 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 p-5 w-full z-10">
                <span className="block font-mono font-bold text-[0.7rem] text-accent uppercase tracking-widest mb-1 drop-shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.6)]">{sol.subtitle}</span>
                <h3 className="text-white font-display font-bold text-[1.2rem]">{sol.title}</h3>
                <p className="text-white/80 font-sans text-[0.85rem] mt-2 max-w-[280px] leading-relaxed drop-shadow-md">{sol.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Smooth sticky cinematic visual sequence */}
      <div className="hidden md:block relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center border-t border-white/5 pt-[60px]">
        
        {/* Background Textures */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,0,0.03)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center h-[90vh] md:h-[80vh]">
          
          {/* Left Column: Header + Interactive Selector */}
          <div className="w-full lg:w-5/12 flex flex-col z-20 h-full justify-center">
            
            <div className="mb-8 md:mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-[#00FF00]" />
                <span className="text-[#00FF00] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Solutions Overview</span>
              </div>
              <h2 className="text-[2.5rem] md:text-[3.5rem] font-display font-bold text-white uppercase tracking-tight leading-[1.1]">
                CHARGING FOR <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-[#00C800]">EVERY JOURNEY.</span>
              </h2>
            </div>

            {/* Selector List */}
            <div className="flex flex-col gap-1 md:gap-2">
              {solutions.map((sol, index) => {
                const isActive = activeTab === index;
                return (
                  <button 
                    key={sol.id}
                    onClick={() => setActiveTab(index)}
                    className={`relative p-4 md:p-5 border-l-[3px] text-left transition-all duration-300 ${
                      isActive 
                        ? 'border-[#00FF00] bg-[#0B0F12]' 
                        : 'border-transparent opacity-40 hover:opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-display font-bold text-[1.1rem] md:text-[1.3rem] tracking-wide transition-colors duration-300 ${isActive ? 'text-[#00FF00]' : 'text-white'}`}>
                          {sol.title}
                        </h3>
                        {isActive && (
                          <p className="font-sans text-[0.8rem] text-[#F3F4F6] mt-1">
                            {sol.subtitle}
                          </p>
                        )}
                      </div>
                      {isActive && (
                        <motion.div layoutId="activeArrow" className="w-8 h-8 rounded-full border border-[#00FF00]/30 flex items-center justify-center bg-[#00FF00]/10 text-[#00FF00] flex-shrink-0 ml-4">
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Large Cinematic Visual */}
          <div className="w-full lg:w-7/12 relative rounded-xl overflow-hidden bg-[#0B0F12] border border-white/5 aspect-video flex-shrink-0 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${videoEnded ? 'image' : 'video'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Clean sequential play: video plays first, on complete it sets the image without overlap */}
                {solutions[activeTab].video && !videoEnded ? (
                  <video 
                    key={`vid-${solutions[activeTab].id}`}
                    src={solutions[activeTab].video}
                    autoPlay 
                    muted 
                    playsInline
                    preload="auto"
                    onEnded={() => setVideoEnded(true)}
                    className={solutions[activeTab].imageClass || "w-full h-full object-cover"}
                  />
                ) : (
                  <img 
                    src={solutions[activeTab].image} 
                    alt={solutions[activeTab].title} 
                    className={solutions[activeTab].imageClass || "w-full h-full object-cover brightness-[1.02] contrast-[1.02]"}
                  />
                )}
                
                {/* Gradients for depth and legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050708]/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050708]/30 via-transparent to-transparent pointer-events-none" />
                
                {/* HUD Overlay Elements */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col pointer-events-none">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      {React.createElement(solutions[activeTab].icon, { className: "text-[#00FF00] w-5 h-5 md:w-6 md:h-6" })}
                    </div>
                    <div>
                      <span className="block font-mono text-[0.6rem] md:text-[0.7rem] text-[#00FF00] uppercase tracking-widest">Sector Active</span>
                      <span className="block font-sans text-white font-bold text-[1rem] md:text-[1.1rem] tracking-wide">{solutions[activeTab].title}</span>
                    </div>
                  </div>
                  
                  {/* Decorative Tech Grid overlay on the visual */}
                  <div className="w-[200px] md:w-[300px] h-[40px] md:h-[60px] border-l-2 border-b-2 border-white/10 relative">
                     <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00FF00]" />
                     <div className="absolute top-0 left-[-2px] w-[2px] h-4 bg-[#00FF00]" />
                  </div>
                </div>
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
