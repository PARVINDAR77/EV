import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MapPin, Zap, ShieldCheck } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import createGlobe from 'cobe';

const geoUrl = "/world-atlas-110m.json";

const FeatureItem = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start gap-5 group"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#00FF00]/20 bg-[#00FF00]/5 flex items-center justify-center group-hover:border-[#00FF00] transition-all duration-500 shadow-[0_0_15px_rgba(0,255,0,0.1)] group-hover:shadow-[0_0_25px_rgba(0,255,0,0.3)]">
      <Icon className="text-[#00FF00] w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="flex flex-col pt-1">
      <h4 className="text-white font-display font-bold text-[1.1rem] tracking-wide mb-1 group-hover:text-[#00FF00] transition-colors duration-300">{title}</h4>
      <p className="text-[#9CA3AF] font-sans text-[0.85rem] leading-relaxed max-w-[280px]">
        {description}
      </p>
    </div>
  </motion.div>
);

const cities = [
  { name: "DELHI", coordinates: [77.2090, 28.6139], isHub: true, delay: 0.1 },
  { name: "AHMEDABAD", coordinates: [72.5714, 23.0225], isHub: false, delay: 0.5 },
  { name: "MUMBAI", coordinates: [72.8777, 19.0760], isHub: true, delay: 0.9 },
  { name: "PUNE", coordinates: [73.8567, 18.5204], isHub: false, delay: 1.3 },
  { name: "BENGALURU", coordinates: [77.5946, 12.9716], isHub: true, delay: 1.7 },
  { name: "CHENNAI", coordinates: [80.2707, 13.0827], isHub: false, delay: 2.1 },
  { name: "HYDERABAD", coordinates: [78.4867, 17.3850], isHub: false, delay: 2.5 },
  { name: "KOLKATA", coordinates: [88.3639, 22.5726], isHub: false, delay: 3.0 }
];

// Sequential network line paths
const lines = [
  { from: "DELHI", to: "AHMEDABAD", delay: 0.2 },
  { from: "AHMEDABAD", to: "MUMBAI", delay: 0.6 },
  { from: "MUMBAI", to: "PUNE", delay: 1.0 },
  { from: "PUNE", to: "BENGALURU", delay: 1.4 },
  { from: "BENGALURU", to: "CHENNAI", delay: 1.8 },
  { from: "BENGALURU", to: "HYDERABAD", delay: 2.2 },
  { from: "HYDERABAD", to: "DELHI", delay: 2.7 },
  { from: "HYDERABAD", to: "KOLKATA", delay: 3.2 }
];

// Premium High-Tech Holographic WebGL Earth
const CyberHoloEarth = ({ onFocusIndia }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 3.3; // Starting rotation
    const targetPhi = 4.88; // Rotation angle facing India directly
    let animationFrameId;
    let globe;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 600;

    globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: phi,
      theta: 0.35,
      dark: 1,
      diffuse: 1.6,
      mapSamples: 28000, // Ultra-high density of digital points
      mapBrightness: 8.5, // Vibrant electric neon green landmasses
      mapBaseBrightness: 0.08, // Subtle cyber dots over the oceans for complete 3D depth
      baseColor: [0.03, 0.09, 0.04],
      markerColor: [0, 1, 0],
      glowColor: [0, 0.95, 0.15],
      opacity: 0.95,
      scale: 1.05,
      markers: [
        // Pinpoint satellite beacon over India (subtle & precise, not oversized)
        { location: [20.5937, 78.9629], size: 0.035, color: [0, 1, 0] },
        { location: [28.6139, 77.2090], size: 0.025, color: [0, 1, 0] },
        { location: [19.0760, 72.8777], size: 0.025, color: [0, 1, 0] },
        { location: [12.9716, 77.5946], size: 0.025, color: [0, 1, 0] }
      ],
      arcs: [
        { from: [28.6139, 77.2090], to: [12.9716, 77.5946], color: [0, 1, 0] }
      ],
      arcColor: [0, 1, 0],
      arcWidth: 1.0,
      arcHeight: 0.25
    });

    const startTime = performance.now();
    let transitionFired = false;

    const renderLoop = (timestamp) => {
      const elapsed = (timestamp - startTime) / 1000;

      if (elapsed < 2.5) {
        // Continuous orbit around the globe
        phi += 0.012;
      } else {
        // Smoothly home into India's exact longitude
        phi += (targetPhi - phi) * 0.07;
        if (!transitionFired && Math.abs(targetPhi - phi) < 0.06) {
          transitionFired = true;
          setTimeout(() => {
            if (onFocusIndia) onFocusIndia();
          }, 300);
        }
      }

      globe.update({ phi });
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (globe) globe.destroy();
    };
  }, [onFocusIndia]);

  return (
    <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
      
      {/* Deep Space Radial Atmosphere */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,255,0,0.12)_0%,rgba(0,255,0,0.03)_50%,transparent_75%)] pointer-events-none filter blur-2xl" />

      {/* 3D Angled Gyroscope Tech Ring 1 */}
      <div 
        className="absolute inset-[-10px] rounded-full border border-[#00FF00]/25 pointer-events-none animate-[spin_35s_linear_infinite]"
        style={{ transform: "rotateX(72deg) rotateY(-15deg)" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00FF00] shadow-[0_0_10px_#00FF00]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00FF00]/50" />
      </div>

      {/* 3D Angled Dashed Tech Ring 2 */}
      <div 
        className="absolute inset-[15px] rounded-full border border-dashed border-[#00FF00]/20 pointer-events-none animate-[spin_50s_linear_infinite_reverse]"
        style={{ transform: "rotateX(60deg) rotateY(25deg)" }}
      />

      {/* Thin Outer Coordinate Ring */}
      <div className="absolute inset-[-25px] rounded-full border border-white/5 pointer-events-none">
        <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#00FF00]/40 tracking-widest">000°</span>
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#00FF00]/40 tracking-widest">180°</span>
        <span className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-[#00FF00]/40 tracking-widest">270°</span>
        <span className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-[#00FF00]/40 tracking-widest">090°</span>
      </div>

      {/* WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' }}
        className="w-full h-full drop-shadow-[0_0_40px_rgba(0,255,0,0.35)] pointer-events-none relative z-10" 
      />

      {/* Sci-Fi HUD Corner Elements */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#00FF00]/30 shadow-[0_0_10px_rgba(0,255,0,0.15)] pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00FF00] animate-pulse" />
        <span className="font-mono text-[9px] text-[#00FF00] uppercase tracking-widest font-bold">Scanning Global Network</span>
      </div>

      <div className="absolute bottom-4 left-4 z-20 flex flex-col font-mono text-[8px] text-gray-400 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-md border border-white/10 pointer-events-none">
        <span className="text-[#00FF00] font-bold">TARGET: INDIA SECTOR</span>
        <span>LAT: 20.59° N // LON: 78.96° E</span>
      </div>

      {/* Target Reticle in Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-40">
        <div className="w-24 h-24 border border-dashed border-[#00FF00]/40 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-2 h-2 text-[#00FF00] flex items-center justify-center font-mono text-xs">+</div>
      </div>

    </div>
  );
};

// Accurate Cyber-Grid India Map with Sequential Line Tracing
const AccurateIndiaMap = ({ animKey = 0 }) => {
  return (
    <div className="relative w-full h-[400px] md:h-[650px] flex items-center justify-center">
      
      {/* Intense Core Glow behind map */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.09)_0%,transparent_60%)] pointer-events-none" />

      {/* Map Container */}
      <div className="w-full h-full relative">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1250,
            center: [80, 22.5]
          }}
          className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,255,0,0.3)]"
        >
          {/* SVG Definitions for Map Fill Pattern and Sequential Animations */}
          <defs>
            <style>
              {`
                @keyframes drawLineSeq {
                  0% { stroke-dasharray: 0 1000; }
                  100% { stroke-dasharray: 1000 1000; }
                }
                @keyframes fadeLineSeq {
                  0% { stroke-opacity: 0; }
                  100% { stroke-opacity: 0.25; }
                }
              `}
            </style>
            <pattern id="techGrid" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(0,255,0,0.15)" strokeWidth="0.5" />
            </pattern>
            {/* Gradient for Lines */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00C800" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Base Geography */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter(geo => geo.properties.name === "India")
                .map((geo) => (
                  <Geography
                    key={`${geo.rsmKey}-${animKey}`}
                    geography={geo}
                    fill="url(#techGrid)"
                    stroke="#00FF00"
                    strokeWidth={1.5}
                    strokeOpacity={0.7}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "url(#techGrid)", strokeOpacity: 1, outline: "none" },
                      pressed: { outline: "none" },
                    }}
                    className="transition-colors duration-500"
                  />
              ))
            }
          </Geographies>

          {/* Glowing Network Lines: Sequentially Traced One by One */}
          {lines.map((line, i) => {
            const fromCity = cities.find(c => c.name === line.from);
            const toCity = cities.find(c => c.name === line.to);
            return (
              <g key={`seq-line-${i}-${animKey}`}>
                {/* Thick glow line behind */}
                <Line
                  from={fromCity.coordinates}
                  to={toCity.coordinates}
                  stroke="#00FF00"
                  strokeWidth={4}
                  strokeOpacity={0}
                  className="filter blur-[2px]"
                  style={{
                    animation: `fadeLineSeq 0.8s ease-out ${line.delay + 0.3}s forwards`
                  }}
                />
                {/* Solid Laser Tracing Line (animates one by one) */}
                <Line
                  from={fromCity.coordinates}
                  to={toCity.coordinates}
                  stroke="url(#lineGradient)"
                  strokeWidth={1.8}
                  strokeDasharray="0 1000"
                  style={{
                    animation: `drawLineSeq 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${line.delay}s forwards`
                  }}
                />
              </g>
            );
          })}

          {/* City Nodes */}
          {cities.map(({ name, coordinates, isHub, delay }) => (
            <Marker key={`${name}-${animKey}`} coordinates={coordinates}>
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay, type: "spring", bounce: 0.5, duration: 0.7 }}
              >
                {/* Radar Pulse for Hubs */}
                {isHub && (
                  <>
                    <circle r={25} fill="none" stroke="#00FF00" strokeWidth="0.5" className="animate-[ping_3s_ease-out_infinite]" />
                    <circle r={15} fill="none" stroke="#00FF00" strokeWidth="0.5" className="animate-[ping_3s_ease-out_infinite_1s]" />
                  </>
                )}
                
                {/* Pulsing Aura */}
                <circle r={12} fill="#00FF00" opacity={0.2} className="animate-pulse" />
                <circle r={6} fill="#00FF00" opacity={0.4} />
                
                {/* Core Dot (White center for hubs) */}
                <circle r={2.5} fill={isHub ? "#FFFFFF" : "#00FF00"} />
                
                {/* Label */}
                <text
                  textAnchor="start"
                  x={12}
                  y={4}
                  className="fill-[#F3F4F6] font-mono text-[9px] tracking-[0.25em] uppercase font-bold"
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,1))' }}
                >
                  {name}
                </text>
              </motion.g>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

// Orchestrator: Earth Orbit -> Zooming Into India -> Sequential Trace -> Seamless Infinite Loop
const ConnectedIndiaSequence = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: false, amount: 0.3 });

  // sequence phase: 'idle' -> 'spinning' -> 'zooming' -> 'map'
  const [phase, setPhase] = useState('idle');
  const [animKey, setAnimKey] = useState(0);

  // Trigger sequence when section enters viewport
  useEffect(() => {
    if (inView && phase === 'idle') {
      setPhase('spinning');
    }
  }, [inView, phase]);

  const handleFocusIndia = useCallback(() => {
    setPhase('zooming');
    // Zoom duration 1.1s, then switch into map
    setTimeout(() => {
      setPhase('map');
    }, 1100);
  }, []);

  // Automatic Smooth Infinite Loop:
  // After lines finish tracing and stay visible for 4.5 seconds, automatically loop back to the Earth!
  useEffect(() => {
    if (phase === 'map') {
      const loopTimer = setTimeout(() => {
        // Fade out map and restart the Earth sequence cleanly
        setAnimKey(prev => prev + 1);
        setPhase('spinning');
      }, 8200);

      return () => clearTimeout(loopTimer);
    }
  }, [phase]);

  return (
    <div ref={containerRef} className="relative w-full h-[450px] md:h-[650px] flex items-center justify-center overflow-hidden">
      
      {/* Phase 1 & 2: Holographic Earth Orbit with Smooth Zoom Transition */}
      <AnimatePresence>
        {(phase === 'spinning' || phase === 'zooming') && (
          <motion.div
            key={`globe-wrapper-${animKey}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: phase === 'spinning' ? 1 : 4.5,
              opacity: phase === 'spinning' ? 1 : 0
            }}
            exit={{ opacity: 0, scale: 5, transition: { duration: 0.6 } }}
            transition={{ 
              scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: phase === 'zooming' ? 0.9 : 0.6 }
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <CyberHoloEarth onFocusIndia={handleFocusIndia} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Detailed India Map with Sequential Line Tracing */}
      <motion.div
        key={`map-layer-${animKey}`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ 
          opacity: phase === 'map' ? 1 : (phase === 'zooming' ? 0.5 : 0),
          scale: phase === 'map' ? 1 : (phase === 'zooming' ? 0.85 : 0.7)
        }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-full h-full relative z-10"
      >
        {(phase === 'zooming' || phase === 'map') && (
          <AccurateIndiaMap animKey={animKey} />
        )}
      </motion.div>

    </div>
  );
};

const ConnectedIndiaSection = () => {
  return (
    <section className="relative w-full bg-[#050708] py-24 md:py-32 z-20 overflow-hidden border-t border-white/5">
      
      {/* Background Depth layer */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Column - Content */}
        <div className="w-full lg:w-5/12 flex flex-col z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-[#00FF00]" />
              <span className="text-[#00FF00] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Network Vision</span>
            </div>
            
            <h2 className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-display font-bold text-white uppercase tracking-tight mb-6 leading-[1.1]">
              BUILT FOR A <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF00] to-[#00C800] drop-shadow-[0_0_15px_rgba(0,255,0,0.2)]">CONNECTED INDIA.</span>
            </h2>
            
            <div className="flex items-stretch gap-4 max-w-[450px]">
              <div className="w-[3px] bg-gradient-to-b from-[#00FF00] to-transparent rounded-full shadow-[0_0_10px_#00FF00]" />
              <p className="text-[1.1rem] text-[#9CA3AF] font-sans py-1 leading-relaxed">
                Strategic locations. Wider reach.<br/>
                <span className="text-[#F3F4F6] font-medium">A stronger tomorrow.</span>
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8 pl-4">
            <FeatureItem 
              icon={MapPin} 
              title="Pan-India Deployment" 
              description="Rapidly expanding EV charging network across highways, cities, and residential hubs." 
              delay={0.2} 
            />
            <FeatureItem 
              icon={Zap} 
              title="Smart Locations" 
              description="Data-driven placement in high-impact zones ensures chargers are exactly where you need them." 
              delay={0.3} 
            />
            <FeatureItem 
              icon={ShieldCheck} 
              title="Future Ready" 
              description="Infrastructure built to support the massive growing demand of electric mobility." 
              delay={0.4} 
            />
          </div>
        </div>

        {/* Right Column - Holographic Earth Orbit -> Zoom into India -> Sequential Line Tracing Visual */}
        <div className="w-full lg:w-7/12 relative flex items-center justify-center mt-10 lg:mt-0">
          <ConnectedIndiaSequence />
        </div>

      </div>
    </section>
  );
};

export default ConnectedIndiaSection;
