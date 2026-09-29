import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, ShieldCheck } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FeatureItem = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start gap-5 group"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#00E32C]/20 bg-[#00E32C]/5 flex items-center justify-center group-hover:border-[#00E32C] transition-all duration-500 shadow-[0_0_15px_rgba(0,227,44,0.1)] group-hover:shadow-[0_0_25px_rgba(0,227,44,0.3)]">
      <Icon className="text-[#00E32C] w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="flex flex-col pt-1">
      <h4 className="text-white font-display font-bold text-[1.1rem] tracking-wide mb-1 group-hover:text-[#00E32C] transition-colors duration-300">{title}</h4>
      <p className="text-[#9CA3AF] font-sans text-[0.85rem] leading-relaxed max-w-[280px]">
        {description}
      </p>
    </div>
  </motion.div>
);

const cities = [
  { name: "DELHI", coordinates: [77.2090, 28.6139], isHub: true },
  { name: "MUMBAI", coordinates: [72.8777, 19.0760], isHub: true },
  { name: "BENGALURU", coordinates: [77.5946, 12.9716], isHub: true },
  { name: "CHENNAI", coordinates: [80.2707, 13.0827], isHub: false },
  { name: "KOLKATA", coordinates: [88.3639, 22.5726], isHub: false },
  { name: "AHMEDABAD", coordinates: [72.5714, 23.0225], isHub: false },
  { name: "HYDERABAD", coordinates: [78.4867, 17.3850], isHub: false },
  { name: "PUNE", coordinates: [73.8567, 18.5204], isHub: false }
];

const lines = [
  { from: "DELHI", to: "AHMEDABAD" },
  { from: "AHMEDABAD", to: "MUMBAI" },
  { from: "MUMBAI", to: "PUNE" },
  { from: "PUNE", to: "BENGALURU" },
  { from: "BENGALURU", to: "CHENNAI" },
  { from: "BENGALURU", to: "HYDERABAD" },
  { from: "HYDERABAD", to: "DELHI" },
  { from: "HYDERABAD", to: "KOLKATA" }
];

const AccurateIndiaMap = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center">
      
      {/* Intense Core Glow behind map */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,227,44,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Map Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full h-full relative"
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1250,
            center: [80, 22.5]
          }}
          className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,227,44,0.3)]"
        >
          {/* SVG Definitions for Map Fill Pattern */}
          <defs>
            <pattern id="techGrid" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M 6 0 L 0 0 0 6" fill="none" stroke="rgba(0,227,44,0.15)" strokeWidth="0.5" />
            </pattern>
            {/* Gradient for Lines */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E32C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00B523" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Base Geography */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies
                .filter(geo => geo.properties.name === "India")
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="url(#techGrid)"
                    stroke="#00E32C"
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

          {/* Glowing Network Lines */}
          {lines.map((line, i) => {
            const fromCity = cities.find(c => c.name === line.from);
            const toCity = cities.find(c => c.name === line.to);
            return (
              <motion.g key={`line-${i}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 + (i * 0.1), duration: 1 }}>
                {/* Thick glow line behind */}
                <Line
                  from={fromCity.coordinates}
                  to={toCity.coordinates}
                  stroke="#00E32C"
                  strokeWidth={4}
                  strokeOpacity={0.1}
                  className="filter blur-[2px]"
                />
                {/* Dashed tech line */}
                <Line
                  from={fromCity.coordinates}
                  to={toCity.coordinates}
                  stroke="url(#lineGradient)"
                  strokeWidth={1.5}
                  strokeDasharray="4 6"
                  className="animate-[dash_20s_linear_infinite]"
                />
              </motion.g>
            );
          })}

          {/* City Nodes */}
          {cities.map(({ name, coordinates, isHub }, i) => (
            <Marker key={name} coordinates={coordinates}>
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1), type: "spring", bounce: 0.5 }}
              >
                {/* Radar Pulse for Hubs */}
                {isHub && (
                  <>
                    <circle r={25} fill="none" stroke="#00E32C" strokeWidth="0.5" className="animate-[ping_3s_ease-out_infinite]" />
                    <circle r={15} fill="none" stroke="#00E32C" strokeWidth="0.5" className="animate-[ping_3s_ease-out_infinite_1s]" />
                  </>
                )}
                
                {/* Pulsing Aura */}
                <circle r={12} fill="#00E32C" opacity={0.2} className="animate-pulse" />
                <circle r={6} fill="#00E32C" opacity={0.4} />
                
                {/* Core Dot (White center for hubs) */}
                <circle r={2.5} fill={isHub ? "#FFFFFF" : "#00E32C"} />
                
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
              <div className="w-8 h-[1px] bg-[#00E32C]" />
              <span className="text-[#00E32C] font-mono text-[0.7rem] uppercase tracking-[0.3em] font-bold">Network Vision</span>
            </div>
            
            <h2 className="text-[2rem] sm:text-[3rem] md:text-[4rem] font-display font-bold text-white uppercase tracking-tight mb-6 leading-[1.1]">
              BUILT FOR A <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E32C] to-[#00B523] drop-shadow-[0_0_15px_rgba(0,227,44,0.2)]">CONNECTED INDIA.</span>
            </h2>
            
            <div className="flex items-stretch gap-4 max-w-[450px]">
              <div className="w-[3px] bg-gradient-to-b from-[#00E32C] to-transparent rounded-full shadow-[0_0_10px_#00E32C]" />
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

        {/* Right Column - Accurate India Map Visual */}
        <div className="w-full lg:w-7/12 relative flex items-center justify-center mt-10 lg:mt-0">
          <AccurateIndiaMap />
        </div>

      </div>
    </section>
  );
};

export default ConnectedIndiaSection;
