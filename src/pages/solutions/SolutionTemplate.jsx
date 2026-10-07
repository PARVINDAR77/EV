import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { ArrowRight, SkipForward, Zap } from 'lucide-react';

// Static imports — Vite bundles these correctly
import imgResidential from '../../assets/images/residential.jpg';
import imgWorkplace   from '../../assets/images/workplace.jpg';
import imgCommercial  from '../../assets/images/commercial.jpg';
import imgFleet       from '../../assets/images/fleet.jpg';
import imgHighway     from '../../assets/images/WhatsApp Image 2026-10-05 at 4.24.45 PM (1).jpeg';

// Maps each solution to its dedicated intro video (served from /public)
const videoMap = {
  residential: '/videos/highway.mp4',     // EV charging at night — calm home feel
  workplace:   '/videos/workplace.mp4',   // Corporate office EV charging
  commercial:  '/videos/commercial.mp4',  // AXION CHARGE commercial video
  fleet:       '/videos/fleet.mp4',       // Electric fleet vans at depot
  highway:     '/videos/residential.mp4', // Blue SUV at fast charging station
};

// Maps each solution to its imported hero image
const imageMap = {
  residential: imgResidential,
  workplace:   imgWorkplace,
  commercial:  imgCommercial,
  fleet:       imgFleet,
  highway:     imgHighway,
};

// Per-section content data
const sectionData = {
  residential: {
    badge: "Home Charging",
    color: "var(--color-accent)",
    tagline: "CHARGE WHERE YOU LIVE.",
    features: [
      { title: "Smart Home Integration", desc: "Works seamlessly with solar panels and home energy management systems." },
      { title: "Overnight Scheduling", desc: "Automatically charges during off-peak hours to save on electricity costs." },
      { title: "Compact Wall Design", desc: "Sleek, weatherproof unit that mounts to any wall, indoor or outdoor." },
      { title: "App-Controlled", desc: "Monitor, schedule and share access from your smartphone, anytime." },
    ]
  },
  workplace: {
    badge: "Workplace EV",
    tagline: "CHARGE WHERE YOU WORK.",
    features: [
      { title: "Employee Benefit", desc: "Attract and retain top talent with a premium, subsidized charging perk." },
      { title: "Fleet Compatible", desc: "Handles mixed fleets of EVs and PHEVs simultaneously with smart load sharing." },
      { title: "Usage Reporting", desc: "Full audit-ready energy and cost reporting per employee or vehicle." },
      { title: "Scalable from 2 to 200", desc: "Start small and expand your charging capacity as your workforce grows." },
    ]
  },
  commercial: {
    badge: "Retail & Hospitality",
    tagline: "CHARGE YOUR CUSTOMERS' LOYALTY.",
    features: [
      { title: "Dwell Time Increases", desc: "EV drivers who charge spend significantly more time (and money) in-store." },
      { title: "Revenue Generation", desc: "Set your own public tariffs and turn chargers into a direct revenue stream." },
      { title: "Brand Visibility", desc: "Custom-branded charger skins and on-screen media to promote your business." },
      { title: "Network Listing", desc: "Your location is added to all major EV routing apps automatically." },
    ]
  },
  fleet: {
    badge: "Fleet Operations",
    tagline: "KEEP YOUR FLEET ALWAYS MOVING.",
    features: [
      { title: "Depot Management", desc: "Automated overnight charging sequences designed for van and truck depots." },
      { title: "Dynamic Load Control", desc: "Prevents grid overloads by intelligently staggering charging across vehicles." },
      { title: "Vehicle-Level Tracking", desc: "Real-time state-of-charge per vehicle via our fleet management dashboard." },
      { title: "Lowest Cost per Mile", desc: "Optimised overnight charging slashes your operational energy costs." },
    ]
  },
  highway: {
    badge: "Highway Corridors",
    tagline: "CHARGE AT THE SPEED OF THE ROAD.",
    features: [
      { title: "DC Ultra-Fast Charging", desc: "Up to 360kW output per port, adding 200km of range in under 15 minutes." },
      { title: "Always-On Reliability", desc: "Redundant power feeds and on-site UPS backup guarantee 99.9% uptime." },
      { title: "Multi-Protocol Support", desc: "CCS2, CHAdeMO, and Type 2 AC — compatible with every EV on the market." },
      { title: "Contactless Payments", desc: "Built-in POS terminal accepts cards, contactless, and app payments instantly." },
    ]
  }
};

const SolutionTemplate = ({ title, subtitle, description, id }) => {
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = React.useRef(null);
  const data = sectionData[id] || {};
  const heroImage = imageMap[id];

  // Always play the video on every visit — no sessionStorage skipping
  useEffect(() => {
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // If autoplay blocked by browser, skip to page directly
        setShowVideo(false);
      });
    }
  }, [id]);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  const handleVideoError = () => {
    // If video fails to load, skip gracefully
    setShowVideo(false);
  };

  return (
    <PageTransition locationKey={`solution-${id}`}>

      {/* ── Full-Screen Cinematic Video Intro ── */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <video
              key={id}
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              className="w-full h-full object-cover"
              src={videoMap[id]}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 pointer-events-none" />

            {/* Bottom-left title overlay */}
            <div className="absolute bottom-12 md:bottom-16 left-6 md:left-20 z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-mono text-xs uppercase tracking-[0.25em]">{data.badge}</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white tracking-widest uppercase"
              >
                {title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100px' }}
                transition={{ delay: 1.2, duration: 1 }}
                className="h-[2px] bg-accent mt-4"
              />
            </div>

            {/* Skip button */}
            <button
              onClick={handleVideoEnd}
              className="absolute top-8 right-4 md:right-8 z-20 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all text-[0.7rem] md:text-sm font-mono tracking-widest border border-white/10"
            >
              SKIP <SkipForward size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Page Content ── */}
      <main className="w-full min-h-screen bg-[#020403] pt-24 md:pt-32 overflow-hidden relative">

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 pt-10 pb-24 relative z-10">

          {/* ── Hero Split Layout ── */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20 md:mb-32">

            {/* Left – Text */}
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6 md:mb-8 px-4 py-2 rounded-full bg-white/5 border border-accent/30 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
                <span className="text-accent font-mono text-[0.65rem] md:text-xs uppercase tracking-[0.2em] font-bold">{data.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white uppercase tracking-tighter mb-4 md:mb-6 leading-[0.95]"
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-accent font-mono text-[0.7rem] md:text-sm uppercase tracking-widest mb-4"
              >
                {subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg lg:text-xl text-[#B0B0B0] font-sans max-w-xl leading-relaxed mb-8 md:mb-10 border-l-2 border-accent/40 pl-4 md:pl-6"
              >
                {description}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative overflow-hidden flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-accent text-black font-sans text-xs md:text-sm font-bold uppercase rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.5)] group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  GET A QUOTE
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
                <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
              </motion.button>
            </div>

            {/* Right – Hero Image */}
            <div className="w-full lg:w-1/2 relative h-[350px] sm:h-[450px] lg:h-[650px] flex items-center justify-center mt-4 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(var(--color-accent-rgb),0.15)] z-10"
              >
                <img src={heroImage} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#020403]/80 via-transparent to-transparent" />
              </motion.div>

              {/* Decorative floating rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-16 -right-16 w-[380px] h-[380px] border border-dashed border-accent/15 rounded-full z-0 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-8 -left-8 w-[260px] h-[260px] border border-accent/10 rounded-full z-0 pointer-events-none"
              />
            </div>
          </div>

          {/* ── Feature Grid ── */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          >
            {(data.features || []).map((feature, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
                }}
                className="group flex items-start gap-4 p-6 bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 hover:border-accent/30 rounded-2xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.08)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="w-10 h-10 rounded-full bg-[#020403] border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:border-accent/60 group-hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)] transition-all duration-300 z-10">
                  <Zap className="text-accent w-4 h-4" />
                </div>
                <div className="z-10">
                  <h4 className="text-white font-display font-bold text-[0.95rem] tracking-wide mb-1.5 group-hover:text-accent transition-colors duration-300">{feature.title}</h4>
                  <p className="text-[#888888] text-[0.82rem] leading-relaxed font-sans">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default SolutionTemplate;
