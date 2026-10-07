import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import acImage from '../../assets/images/residential.jpg';
import dcImage from '../../assets/images/commercial.jpg';
import accImage from '../../assets/images/fleet.jpg';

// AC Images
import ac3kwImg from '../../assets/images/Black AXION logo on EV charger-1.png';
import ac7kwImg from '../../assets/images/Black Axion Logo on White EV Charger-2.png';
import ac11kwImg from '../../assets/images/Black AXION logo on white charger-3.png';
import ac22kwImg from '../../assets/images/22 kW EV charger, black AXION logo-4.png';

// DC Images
import dc30kwImg from '../../assets/images/AXION DC charger with black cables-1.png';
import dc60kwImg from '../../assets/images/60 kW AXION charger with black cables-2.png';
import dc120kwImg from '../../assets/images/AXION charger with matte black cables-3.png';
import dc240kwImg from '../../assets/images/Matte Black EV Charging Cable.png';

// Accessory Images
import cableImg from '../../assets/images/AXION Type 1 Charging Cable.png';
import pedestalImg from '../../assets/images/Axion pedestal stand product advertisement.png';
import rfidKeyfobImg from '../../assets/images/Axion RFID Card and Keyfob.png';

// Software Images
import appImg from '../../assets/images/why_smarttech.jpg';
import cmsImg from '../../assets/images/software_dashboard.jpg';
import apiImg from '../../assets/images/ecosystem_diagram.png';


const PRODUCT_DB = {
  'ac-3-3kw': {
    title: 'Axion 3.3 kW AC',
    category: 'AC Wallboxes',
    description: 'Compact and cost-effective. Ideal for long-duration residential charging and plug-in hybrids.',
    image: ac3kwImg,
    features: [
      { title: "Ultra-Compact Design", desc: "Sleek and minimalistic, fitting perfectly into any residential garage." },
      { title: "App Connectivity", desc: "Monitor charging sessions and set schedules via the AXION app." },
      { title: "Weatherproof IP65", desc: "Built to withstand harsh weather conditions indoors or outdoors." },
      { title: "Over-the-Air Updates", desc: "Stay up-to-date with the latest software and security improvements." }
    ]
  },
  'ac-7-4kw': {
    title: 'Axion 7.4 kW AC',
    category: 'AC Wallboxes',
    description: 'The standard for home use. Delivers a full overnight charge for most EVs on a single-phase connection.',
    image: ac7kwImg,
    features: [
      { title: "Smart Load Balancing", desc: "Automatically adjusts power output to prevent residential grid overload." },
      { title: "App Connectivity", desc: "Monitor and control charging sessions remotely." },
      { title: "RFID Authentication", desc: "Secure access control for shared driveways or multi-user environments." },
      { title: "Solar Integration", desc: "Compatible with home solar systems for eco-friendly charging." }
    ]
  },
  'ac-11kw': {
    title: 'Axion 11 kW AC',
    category: 'AC Wallboxes',
    description: 'Faster 3-phase charging perfect for workplaces, fleet depots, and multi-unit dwellings.',
    image: ac11kwImg,
    features: [
      { title: "3-Phase Power", desc: "Delivers up to 11 kW of power for significantly faster charging times." },
      { title: "Fleet Management", desc: "Integrates seamlessly with AXION's backend for multi-charger monitoring." },
      { title: "Dynamic Load Management", desc: "Distributes available power evenly across multiple active chargers." },
      { title: "MID Certified Metering", desc: "Accurate energy measurement for automated billing and reporting." }
    ]
  },
  'ac-22kw': {
    title: 'Axion 22 kW AC',
    category: 'AC Wallboxes',
    description: 'Maximum AC charging speed. Designed for destination charging at hotels, malls, and public parking.',
    image: ac22kwImg,
    features: [
      { title: "Maximum AC Speed", desc: "Provides the highest possible AC charging rate for compatible vehicles." },
      { title: "Dual-Socket Options", desc: "Available in configurations supporting two simultaneous vehicles." },
      { title: "Commercial Billing", desc: "Full OCPP 1.6J compliance for seamless integration with payment gateways." },
      { title: "Vandal-Resistant", desc: "Ruggedized IK10 casing designed specifically for public deployments." }
    ]
  },
  'dc-30kw': {
    title: 'Axion DC 30kW',
    category: 'DC Fast Chargers',
    description: 'Compact DC charging for car dealerships, quick-service retail, and urban fleet depots.',
    image: dc30kwImg,
    features: [
      { title: "Compact Footprint", desc: "Smallest in its class, perfectly fitting into space-constrained urban environments." },
      { title: "Plug-and-Charge", desc: "ISO 15118 ready for seamless authorization and automated billing." },
      { title: "Whisper Quiet", desc: "Optimized thermal management keeps noise levels below 55dB." },
      { title: "Low Maintenance", desc: "Modular power core designed for easy servicing and high uptime." }
    ]
  },
  'dc-60kw': {
    title: 'Axion DC 60kW',
    category: 'DC Fast Chargers',
    description: 'Versatile fast charging for commercial parking, hospitality, and longer stops.',
    image: dc60kwImg,
    features: [
      { title: "Simultaneous Charging", desc: "Dynamically splits power to charge two vehicles at once." },
      { title: "Interactive Display", desc: "10-inch daylight-readable touch screen for easy user guidance." },
      { title: "Credit Card Terminal", desc: "Integrated POS module for instant contactless payments." },
      { title: "Remote Diagnostics", desc: "24/7 cloud monitoring to predict and prevent hardware faults." }
    ]
  },
  'dc-120kw': {
    title: 'Axion DC 120kW',
    category: 'DC Fast Chargers',
    description: 'High-power dual-charging solution engineered for highway corridors and rapid transit.',
    image: dc120kwImg,
    features: [
      { title: "Highway Ready", desc: "Adds up to 100 miles of range in just 15 minutes of charging." },
      { title: "Liquid-Cooled Cables", desc: "Maintains optimal temperature during continuous high-power delivery." },
      { title: "Dynamic Power Allocation", desc: "Automatically shifts full 120kW to a single vehicle if needed." },
      { title: "Vandalism Protection", desc: "IK10 rated enclosure and reinforced glass display for extreme durability." }
    ]
  },
  'dc-240kw': {
    title: 'Axion DC 240kW',
    category: 'DC Fast Chargers',
    description: 'Ultra-fast hyper-charging for heavy-duty fleets and next-generation EVs.',
    image: dc240kwImg,
    features: [
      { title: "Hyper-Fast Speed", desc: "The ultimate power solution for 800V architectures and electric trucks." },
      { title: "Scalable Architecture", desc: "Easily upgrades to 360kW by adding internal power modules." },
      { title: "Retractable Cable System", desc: "Keeps heavy cables off the ground, reducing wear and improving usability." },
      { title: "Grid Integration", desc: "Supports battery buffering to reduce peak demand charges." }
    ]
  },
  'charging-cables': {
    title: 'Charging Cables',
    category: 'Accessories & Cables',
    description: 'High-quality, durable Type 2 and CCS2 cables designed for reliable and fast charging.',
    image: cableImg,
    features: [
      { title: "Premium Build", desc: "Constructed with advanced materials to withstand heavy daily use." },
      { title: "High Flexibility", desc: "Easy to handle and coil even in extreme cold temperatures." },
      { title: "Universal Compatibility", desc: "Designed to work flawlessly with all standard EV inlets." },
      { title: "Safety Certified", desc: "Meets global safety standards for high-power electrical transmission." }
    ]
  },
  'pedestal-stand': {
    title: 'Pedestal Stand',
    category: 'Accessories & Cables',
    description: 'Sleek, weather-resistant mounting poles for freestanding charger installations.',
    image: pedestalImg,
    features: [
      { title: "Robust Design", desc: "Heavy-duty steel construction for maximum stability and durability." },
      { title: "Corrosion Resistant", desc: "Powder-coated finish protects against harsh outdoor environments." },
      { title: "Clean Aesthetics", desc: "Internal cable routing keeps wiring hidden and protected." },
      { title: "Single or Dual Mount", desc: "Configurations available for mounting one or two chargers per stand." }
    ]
  },
  'rfid-access': {
    title: 'RFID Card & Keyfob',
    category: 'Accessories & Cables',
    description: 'Custom-branded RFID cards and compact keyfobs for secure, quick-tap charging authorization and fleet access control.',
    image: rfidKeyfobImg,
    features: [
      { title: "Quick Authorization", desc: "Tap-to-charge functionality for instant charging session start." },
      { title: "Secure Access", desc: "Advanced encryption ensures only authorized users can initiate charging." },
      { title: "Custom Branding", desc: "Personalize the cards and keyfobs with your company logo and design." },
      { title: "Ultra-Portable", desc: "Cards fit perfectly in your wallet, while keyfobs easily attach to any keychain." }
    ]
  },
  'charge-app': {
    title: 'Axion Charge App',
    category: 'Software',
    description: 'The ultimate driver companion. Locate, reserve, and pay for charging sessions seamlessly across the entire Axion network.',
    image: appImg,
    features: [
      { title: "Live Availability", desc: "See which chargers are available in real-time before you arrive." },
      { title: "Smart Routing", desc: "Automatically plan long trips with optimized charging stops along the route." },
      { title: "Seamless Payment", desc: "Integrated wallet allows you to pay instantly without swiping cards." },
      { title: "Session Tracking", desc: "Monitor charging speed, energy delivered, and cost right from your phone." }
    ]
  },
  'cms': {
    title: 'Charger Management System',
    category: 'Software',
    description: 'A comprehensive cloud-based dashboard for monitoring, monetization, and maintenance of your entire charging network.',
    image: cmsImg,
    features: [
      { title: "Real-Time Analytics", desc: "Monitor energy consumption, revenue, and station health instantly from a unified dashboard." },
      { title: "Automated Billing", desc: "Set custom dynamic tariffs and handle all payments automatically." },
      { title: "Over-The-Air Updates", desc: "Remotely deploy firmware updates to thousands of chargers simultaneously." },
      { title: "White-Label Option", desc: "Brand the entire platform and driver-facing app with your own company identity." }
    ]
  },
  'enterprise-api': {
    title: 'Enterprise API',
    category: 'Software',
    description: 'Deep integration capabilities for fleet operators and energy providers to sync Axion chargers with their existing software stack.',
    image: apiImg,
    features: [
      { title: "OCPI Compliant", desc: "Built on open standards for seamless roaming and interoperability." },
      { title: "Fleet Integration", desc: "Sync charging data directly into your existing fleet management software." },
      { title: "Smart Energy Sync", desc: "Connect with building energy management systems (BEMS) for dynamic load balancing." },
      { title: "Webhooks & Events", desc: "Receive real-time push notifications for hardware alerts and session events." }
    ]
  }
};

const ProductPage = (props) => {
  const { id } = useParams();
  
  // If props are passed directly (e.g. from the category pages), use them.
  // Otherwise, look up the product from the DB using the URL parameter.
  const product = props.title ? props : (PRODUCT_DB[id] || {
    title: 'Product Not Found',
    category: 'Error',
    description: 'The requested product could not be found.',
    image: acImage,
    features: []
  });

  const { title, category, description, image, features } = product;

  return (
    <PageTransition locationKey={`product-${title}`}>
      <main className="w-full min-h-screen bg-[#020403] pt-48 overflow-hidden relative">
        
        {/* Background ambient glow */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 pt-10 pb-24 relative z-10">
          
          {/* Top category label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-accent font-mono text-[0.8rem] uppercase tracking-[0.3em] font-bold">{category}</span>
          </motion.div>

          <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left Content (Text & Features) */}
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 uppercase tracking-tight mb-6 leading-[1.1] drop-shadow-lg"
              >
                {title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg lg:text-xl text-[#A0A0A0] font-sans mb-10 max-w-xl leading-relaxed tracking-wide"
              >
                {description}
              </motion.p>
              
              {/* Feature Grid */}
              {features.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
                >
                  {features.map((feature, idx) => {
                    const CardWrapper = feature.link ? Link : 'div';
                    return (
                    <CardWrapper 
                      key={idx} 
                      to={feature.link}
                      className={`group flex items-start gap-4 p-5 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-accent/30 rounded-2xl backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 relative overflow-hidden ${feature.link ? 'cursor-pointer hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.15)] hover:-translate-y-1.5' : 'hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.1)] hover:-translate-y-1'}`}
                    >
                      {/* Subtle hover glow inside card */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="w-10 h-10 rounded-full bg-[#020403] border border-accent/20 shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.1)] flex items-center justify-center flex-shrink-0 group-hover:border-accent/60 group-hover:shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)] transition-all duration-300 z-10">
                        <CheckCircle2 className="text-accent w-5 h-5" />
                      </div>
                      
                      <div className="z-10 flex-1">
                        <h4 className="text-white font-display font-bold text-[0.95rem] tracking-wide mb-1.5 group-hover:text-accent transition-colors duration-300">{feature.title}</h4>
                        <p className="text-[#888888] text-[0.8rem] leading-relaxed font-sans">{feature.desc}</p>
                      </div>
                      
                      {feature.link && (
                        <div className="z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 self-center">
                          <ArrowRight className="text-accent w-5 h-5" />
                        </div>
                      )}
                    </CardWrapper>
                  )})}
                </motion.div>
              )}

              <motion.button 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-accent text-black font-sans text-sm font-bold uppercase rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.5)] group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  DOWNLOAD DATASHEET
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </span>
                <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
              </motion.button>
            </div>

            {/* Right Content (Image) */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-black/20"
              >
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
              </motion.div>
              
              {/* Floating decorative elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-32 h-32 border border-accent/30 rounded-full z-0 blur-[2px]"
              />
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-48 h-48 border border-white/10 rounded-full z-20 blur-[1px]"
              />
            </div>

          </div>
        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default ProductPage;
