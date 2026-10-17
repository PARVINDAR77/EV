import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition/PageTransition';
import Footer from '../../components/Footer/Footer';
import { ArrowRight, CheckCircle2, FileText, Printer, X, Download, ShieldCheck, Zap } from 'lucide-react';
import acImage from '../../assets/images/Modern Home EV Charging Showcase.webp';
import dcImage from '../../assets/images/Phoenix Marketcity EV Charging Plaza.webp';
import accImage from '../../assets/images/AXION Charge Logistics Hub.webp';

// AC Images
import ac3kwImg from '../../assets/images/Modern Green EV Charger Garage Display.webp';
import ac7kwImg from '../../assets/images/Black Axion Logo on White EV Charger-2.webp';
import ac11kwImg from '../../assets/images/Black AXION logo on white charger-3.webp';
import ac22kwImg from '../../assets/images/22 kW EV charger, black AXION logo-4.webp';

// DC Images
import dc30kwImg from '../../assets/images/AXION DC charger with black cables-1.webp';
import dc60kwImg from '../../assets/images/AXION 60 kW EV Wallbox Advertisement.webp';
import dc120kwImg from '../../assets/images/AXION 120 kW EV Charging Station.webp';
import dc240kwImg from '../../assets/images/Axion 240 kW EV Charger Showcase.webp';

// Accessory Images
import cableImg from '../../assets/images/AXION Type 1 Charging Cable.webp';
import rfidKeyfobImg from '../../assets/images/Axion RFID Card and Keyfob.webp';

// Software Images
import appImg from '../../assets/images/why_smarttech.webp';
import cmsImg from '../../assets/images/Outdoor Axion Charge Dashboard Billboard.webp';
import apiImg from '../../assets/images/ecosystem_diagram.webp';

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
    ],
    datasheet: {
      model: 'AXION 3.3',
      powerRating: '3.3 KW',
      overview: 'AXION 3.3 is a high-efficiency AC residential wallbox designed for homes, apartments, and light commercial overnight charging with reliable single-phase performance.',
      featuresList: [
        'Compact and rugged weatherproof enclosure',
        'Easy to install on wall or dedicated mounting pole',
        'Built-in intelligent safety and voltage monitoring',
        'App Scan Code / QR Code / Bluetooth / RFID activation',
        'Available with Type 2 charging gun with 5-meter heavy duty cable'
      ],
      specs: {
        'Input Power': '1-Phase 230 VAC ± 10%, 50Hz',
        'Output': '3.3 kW @ 16A',
        'Display': 'LED Status Halo & Mobile App Interface',
        'Gun': 'Type 2 Gun (IEC 62196-2)',
        'Connectivity': 'Bluetooth / Wi-Fi & RFID',
        'Mounting': 'Wall / Pole Mounted',
        'Emergency Switch': 'Available (Push Cutoff)',
        'Protection': 'Over Voltage, Under Voltage, Over Current, Short Circuit, Ground Fault Protection, Residual Current, Surge Protection'
      }
    }
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
    ],
    datasheet: {
      model: 'AXION 7.4',
      powerRating: '7.4 KW',
      overview: 'AXION 7.4 is the benchmark smart AC home and commercial charger, delivering fast overnight charging speeds with dynamic load balancing on single-phase power.',
      featuresList: [
        'Compact and rugged architectural design',
        'Easy to install and use or retrofit across residential & commercial sites',
        'Compatible with Open Charge Point Protocol (OCPP 1.6J)',
        'App Scan Code / QR Code / RFID Authentication',
        'Available with Type 2 charging Gun & Integrated Holster'
      ],
      specs: {
        'Input Power': '1-Phase 230 VAC ± 10%, 50Hz',
        'Output': '7.4 kW @ 32A',
        'Display': '3.5" Color OLED Screen & Status Halo',
        'Gun': 'Type 2 Gun (5m / 7.5m Cable)',
        'Connectivity': 'OCPP v1.6J through Wi-Fi/GSM or RFID',
        'Mounting': 'Wall / Pole Mounted',
        'Emergency Switch': 'Available (Mushroom Red)',
        'Protection': 'Over Voltage, Under Voltage, Over Current, Short Circuit, Ground Fault Protection, Residual Current (Type A + 6mA DC), Emergency shutdown'
      }
    }
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
    ],
    datasheet: {
      model: 'AXION 11',
      powerRating: '11 KW',
      overview: 'AXION 11 delivers rapid 3-phase AC power designed for commercial workplaces, fleet depots, and high-density residential buildings.',
      featuresList: [
        'Compact and rugged commercial-grade enclosure',
        '3-Phase balanced power distribution with MID certified metering',
        'Compatible with Open Charge Point Protocol (OCPP 1.6J)',
        'App Scan Code / QR Code / RFID & Fleet Pass',
        'Available with Type 2 charging Gun / Shuttered Socket'
      ],
      specs: {
        'Input Power': '3-Phase 400 VAC ± 10%, 50Hz',
        'Output': '11 kW @ 16A per phase',
        'Display': '4.3" LCD Display',
        'Gun': 'Type 2 Gun',
        'Connectivity': 'OCPP v1.6 through Wi-Fi/GSM or RFID',
        'Mounting': 'Wall/ Pole Mounted',
        'Emergency Switch': 'Available (Mushroom Red)',
        'Protection': 'Over Voltage, Under Voltage, Over Current, Short Circuit, Ground Fault Protection, Residual Current, Emergency shutdown, Phase loss detection'
      }
    }
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
    ],
    datasheet: {
      model: 'FOCAL 22',
      powerRating: '22 KW',
      overview: 'FOCAL 22 is an AC Charging station for use at offices and other commercial Locations. This charger comes with AC type 2 gun for all Indian cars. Its system is simple and featured with small footprint, convenient installation an easy operation.',
      featuresList: [
        'Compact and rugged design',
        'Easy to install and use or retrofitted in various locations',
        'Compatible with Open Charge Point Protocol (OCPP).',
        'App Scan Code / QR Code / RFID',
        'Available with Type 2 charging Gun'
      ],
      specs: {
        'Input Power': '3-Phase 415 VAC',
        'Output': '22 Kw',
        'Display': '4.3" LCD Display',
        'Gun': 'Type 2 gun',
        'Connectivity': 'OCCP v1.6 through Wi-Fi/GSM or RFID',
        'Mounting': 'Wall/ Pole Mounted',
        'Emergency Switch': 'Available ( Mushroom Red)',
        'Protection': 'Over Voltage, Under Voltage, Over Current, Short Circuit, Ground Fault Protection, Residual Current, Emergency shutdown, Protection against electric shock'
      }
    }
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
    ],
    datasheet: {
      model: 'AXION DC 30',
      powerRating: '30 KW',
      overview: 'AXION DC 30 is a compact high-efficiency DC fast charger designed for dealerships, commercial fleets, and urban commercial hubs with rapid turnaround times.',
      featuresList: [
        'Compact footprint (<0.3 sq.m) with rugged all-weather casing',
        'Direct high-efficiency DC fast charge bypassing vehicle onboard converter',
        'Compatible with Open Charge Point Protocol (OCPP 1.6J / 2.0.1)',
        'App Scan Code / QR Code / RFID & Plug-and-Charge (ISO 15118)',
        'Available with CCS2 charging Gun with active thermal sensors'
      ],
      specs: {
        'Input Power': '3-Phase 415 VAC ± 10%, 50Hz',
        'Output': '30 kW (200V - 1000V DC, up to 100A)',
        'Display': '7" Daylight-Readable Touchscreen',
        'Gun': 'CCS2 Gun (5m Heavy Duty Cable)',
        'Connectivity': 'OCPP v1.6 through 4G GSM / Wi-Fi / RFID',
        'Mounting': 'Ground / Plinth Mounted',
        'Emergency Switch': 'Available (Mushroom Red)',
        'Protection': 'Over Voltage, Under Voltage, Over Current, Short Circuit, Insulation Monitor, Ground Fault, Surge Protection, Emergency shutdown'
      }
    }
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
    ],
    datasheet: {
      model: 'AXION DC 60',
      powerRating: '60 KW',
      overview: 'AXION DC 60 is a commercial dual-gun DC fast charging station engineered for highways, fuel stations, and fleet depots with intelligent dynamic power sharing.',
      featuresList: [
        'Rugged industrial IP55 & IK10 vandal-resistant construction',
        'Dual-Gun simultaneous charging with automatic power balancing (60kW or 30kW+30kW)',
        'Compatible with Open Charge Point Protocol (OCPP 1.6J / 2.0.1)',
        'App Scan Code / QR Code / RFID & Contactless POS Payment',
        'Available with Dual CCS2 fast charging Guns'
      ],
      specs: {
        'Input Power': '3-Phase 415 VAC ± 10%, 50Hz',
        'Output': '60 kW (200V - 1000V DC, up to 200A)',
        'Display': '10.1" Interactive HD Touchscreen',
        'Gun': 'Dual CCS2 Guns',
        'Connectivity': 'OCPP v1.6 through 4G LTE / Ethernet / RFID',
        'Mounting': 'Ground Plinth Mounted',
        'Emergency Switch': 'Available (Mushroom Red Push Button)',
        'Protection': 'Complete multi-tier industrial protection: Over/Under Voltage, Overcurrent, Short Circuit, Ground Fault, Insulation Detection, Lightning Surge, Auto Shutdown'
      }
    }
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
    ],
    datasheet: {
      model: 'AXION DC 120',
      powerRating: '120 KW',
      overview: 'AXION DC 120 is engineered for highway corridors and rapid transit, delivering up to 150+ km of EV driving range in under 15 minutes of charging.',
      featuresList: [
        'Heavy-duty industrial architecture with SiC high-efficiency power modules (>96%)',
        'Dynamic power allocation between dual vehicles (120kW single or 60kW x 2)',
        'Compatible with Open Charge Point Protocol (OCPP 1.6J & 2.0.1)',
        'App Scan Code / QR Code / RFID / POS Terminal',
        'Available with Dual CCS2 Heavy Duty charging Guns'
      ],
      specs: {
        'Input Power': '3-Phase 415 VAC, 50Hz (3P+N+PE)',
        'Output': '120 kW (200V - 1000V DC, up to 300A)',
        'Display': '10.1" Anti-Glare Outdoor Touchscreen',
        'Gun': 'Dual CCS2 Guns with Ergonomic Holsters',
        'Connectivity': 'OCPP v1.6 through 4G LTE / Dual LAN / RFID',
        'Mounting': 'Heavy-Duty Ground Anchor Plinth',
        'Emergency Switch': 'Available (Mushroom Red Industrial Switch)',
        'Protection': 'Full galvanic isolation, Over/Under Voltage, Short Circuit, Ground Fault, Residual Current, Thermal Derating, Emergency Cutoff'
      }
    }
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
    ],
    datasheet: {
      model: 'AXION DC 240',
      powerRating: '240 KW',
      overview: 'AXION DC 240 is the pinnacle of hyper-fast charging, engineered for 800V architectures, commercial electric buses, heavy trucks, and high-turnover corridors.',
      featuresList: [
        'Native 800V & 1000V high-voltage power conversion',
        'Modular expandable power cabinet upgradable to 360 kW',
        'Overhead retractable cable management for effortless handling',
        'Compatible with Open Charge Point Protocol (OCPP 1.6J / 2.0.1)',
        'Dual CCS2 liquid-cooled 500A charging guns'
      ],
      specs: {
        'Input Power': '3-Phase 415 VAC ± 10%, 50Hz',
        'Output': '240 kW (200V - 1000V DC, up to 500A Liquid Cooled)',
        'Display': '12" High-Brightness Industrial Touch Panel',
        'Gun': 'Dual CCS2 (Liquid Cooled 500A Cables)',
        'Connectivity': 'OCPP v1.6 through 4G/5G, Dual Ethernet, RFID',
        'Mounting': 'Concrete Plinth Mounted',
        'Emergency Switch': 'Available (Dual Industrial Red Mushroom Switches)',
        'Protection': 'Class 1 Surge, Insulation Monitoring, Overvoltage, Undervoltage, Short Circuit, Arc Fault Detection, Coolant Leakage Sensor, Auto Cutoff'
      }
    }
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
    ],
    datasheet: {
      model: 'AXION PRO-CABLE',
      powerRating: '22 KW / 32A',
      overview: 'High-durability Type 2 charging cable rated for up to 22 kW continuous power transmission across all Indian and international electric vehicles.',
      featuresList: [
        'TPU outer jacket with superior abrasion and oil resistance',
        'Ergonomic grip with silver-plated copper alloy pins',
        'IP55 weatherproof mated protection with rubber dust caps',
        'Tested for >10,000 mating cycles and 2-tonne drive-over resistance',
        'Compatible with all Type 2 AC EV charging points and cars'
      ],
      specs: {
        'Input Power': '3-Phase 415 VAC / 1-Phase 230 VAC',
        'Output': 'Up to 22 kW (32A 3-Phase)',
        'Display': 'Integrated Cable Status LED on Connector (Optional)',
        'Gun': 'Type 2 to Type 2 (IEC 62196-2)',
        'Connectivity': 'Passive High-Conductivity Wired Interface',
        'Mounting': 'In-Vehicle Trunk or Wall Holster',
        'Emergency Switch': 'Thermal Fuse inside Gun Body',
        'Protection': 'Flame retardant UL94 V-0, 2-Tonne Drive-Over Rated, Overheating cutoff'
      }
    }
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
    ],
    datasheet: {
      model: 'AXION RFID FLEET',
      powerRating: '13.56 MHz NFC',
      overview: 'High-security encrypted contactless RFID tokens and cards engineered for instant authorization on all Axion AC and DC commercial chargers.',
      featuresList: [
        'Mifare Classic / DesFire EV2 13.56 MHz cryptographic security',
        'Tap-to-start charging in less than 200 milliseconds',
        'Waterproof, shockproof, and scratch-resistant epoxy coating',
        'Cloud-synced with Axion CMS for instant driver permission management',
        'Custom corporate branding and fleet serial number engraving'
      ],
      specs: {
        'Input Power': 'Passive (No battery required)',
        'Output': 'NFC / RFID Contactless Telemetry',
        'Display': 'Laser-Engraved Serial / QR Code ID',
        'Gun': 'Compatible with all Axion Type 2 & CCS2 Chargers',
        'Connectivity': 'ISO/IEC 14443 Type A Standard',
        'Mounting': 'Pocket / Keychain / Lanyard',
        'Emergency Switch': 'Instant Remote Revocation via Cloud CMS',
        'Protection': 'AES-128 Bit Hardware Encryption, IP68 Waterproof'
      }
    }
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
  const navigate = useNavigate();
  const [isDatasheetOpen, setIsDatasheetOpen] = useState(false);
  const [selectedModelKey, setSelectedModelKey] = useState(null);
  const datasheetRef = useRef(null);
  
  // Resolve product
  const product = props.title ? props : (PRODUCT_DB[id] || {
    title: 'Product Not Found',
    category: 'Error',
    description: 'The requested product could not be found.',
    image: acImage,
    features: []
  });

  const { title, category, description, image, features } = product;

  // Determine active datasheet
  // If user navigated to a specific product (e.g. /product/ac-22kw), use that product's datasheet
  // If user is on category overview (/products/ac-chargers), allow switching or default to flagship 22kW
  const defaultKey = id && PRODUCT_DB[id]?.datasheet 
    ? id 
    : (title?.toLowerCase().includes('dc') ? 'dc-60kw' : 'ac-22kw');

  const activeKey = selectedModelKey || defaultKey;
  const activeDatasheet = PRODUCT_DB[activeKey]?.datasheet || PRODUCT_DB['ac-22kw'].datasheet;

  // Sync state if id changes
  useEffect(() => {
    if (id && PRODUCT_DB[id]?.datasheet) {
      setSelectedModelKey(id);
    }
  }, [id]);

  const handleGetQuoteClick = () => {
    navigate('/contact', {
      state: {
        type: 'quote',
        product: title,
        category: category,
        productId: id || activeKey,
        source: 'product_page'
      }
    });
  };

  const handleDownloadSheetClick = () => {
    setIsDatasheetOpen(true);
    setTimeout(() => {
      if (datasheetRef.current) {
        datasheetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Model switchers for Category overview pages
  const isCategoryPage = !id || !PRODUCT_DB[id];
  const isAcCategory = title?.toLowerCase().includes('ac');
  const isDcCategory = title?.toLowerCase().includes('dc');

  const acModels = [
    { key: 'ac-3-3kw', label: '3.3 kW' },
    { key: 'ac-7-4kw', label: '7.4 kW' },
    { key: 'ac-11kw', label: '11 kW' },
    { key: 'ac-22kw', label: '22 kW (Focal 22)' }
  ];

  const dcModels = [
    { key: 'dc-30kw', label: '30 kW' },
    { key: 'dc-60kw', label: '60 kW' },
    { key: 'dc-120kw', label: '120 kW' },
    { key: 'dc-240kw', label: '240 kW' }
  ];

  const activeSwitcherModels = isAcCategory ? acModels : (isDcCategory ? dcModels : []);

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
                      
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-white font-display font-semibold text-base mb-1 tracking-wide group-hover:text-accent transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-[#888888] font-sans text-xs leading-relaxed">
                          {feature.desc}
                        </p>
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

              {/* Action Buttons: Get Quote & Download Datasheet */}
              <div className="flex flex-wrap items-center gap-4">
                <motion.button 
                  type="button"
                  onClick={handleGetQuoteClick}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-accent text-black font-sans text-sm font-bold uppercase rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.5)] group cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    GET A QUOTE
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0" />
                </motion.button>

                <motion.button 
                  type="button"
                  onClick={handleDownloadSheetClick}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative overflow-hidden flex items-center gap-3 px-8 py-4 border border-white/20 text-white hover:border-accent hover:text-accent font-sans text-sm font-bold uppercase rounded-full transition-all duration-300 bg-white/5 hover:bg-accent/5 group cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    DOWNLOAD DATASHEET
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </motion.button>
              </div>
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

          {/* ══════════════════════════════════════════════════════════════════════════════════
              DATASHEET DOCUMENT SECTION (OPENS AT BOTTOM ON BUTTON CLICK)
              ══════════════════════════════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {isDatasheetOpen && (
              <motion.section
                ref={datasheetRef}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-24 pt-12 border-t border-white/15"
              >
                {/* Action Bar & Model Switchers */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-display font-bold text-xl uppercase tracking-wider">
                        Official Technical Datasheet
                      </h3>
                      <p className="text-xs text-white/50">
                        Detailed engineering specifications, features & protection metrics
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Model Switcher Pills for Category Pages */}
                    {activeSwitcherModels.length > 0 && (
                      <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
                        {activeSwitcherModels.map((m) => (
                          <button
                            key={m.key}
                            type="button"
                            onClick={() => setSelectedModelKey(m.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                              activeKey === m.key
                                ? 'bg-accent text-black font-bold shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.4)]'
                                : 'text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)] cursor-pointer"
                    >
                      <Printer size={15} />
                      Print / Save PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDatasheetOpen(false)}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-mono transition-colors cursor-pointer border border-white/10"
                      title="Close Datasheet"
                    >
                      <X size={16} />
                      Close
                    </button>
                  </div>
                </div>

                {/* ── PRINTABLE DATASHEET DOCUMENT (EXACT MATCH TO REFERENCE IMAGE) ── */}
                <div className="w-full max-w-4xl mx-auto bg-white text-[#111827] rounded-3xl p-6 sm:p-12 lg:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.7)] relative overflow-hidden font-sans border border-slate-200">
                  
                  {/* Concentric Branding Rings in Upper-Right Corner (Exact SVG Replica) */}
                  <div className="absolute -top-12 -right-12 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none opacity-85 select-none">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <circle cx="165" cy="35" r="105" fill="none" stroke="#A7D7E8" strokeWidth="14" />
                      <circle cx="165" cy="35" r="78" fill="none" stroke="#68B833" strokeWidth="15" />
                      <circle cx="165" cy="35" r="50" fill="none" stroke="#D1E8B8" strokeWidth="10" />
                    </svg>
                  </div>

                  {/* Header: Title & Overview */}
                  <div className="relative z-10 mb-8 max-w-xl">
                    <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#111827] uppercase">
                      {activeDatasheet.model}
                    </h1>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-sm font-black text-[#5EA82E] tracking-wider uppercase">
                        EV CHARGER
                      </span>
                      <span className="text-lg font-black text-[#1F2937]">
                        {activeDatasheet.powerRating}
                      </span>
                    </div>
                    <p className="mt-4 text-xs sm:text-sm text-[#4B5563] leading-relaxed font-medium">
                      {activeDatasheet.overview}
                    </p>
                  </div>

                  {/* FEATURES Section */}
                  <div className="relative z-10 mb-10">
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-[#111827] uppercase tracking-wide mb-4">
                      FEATURES
                    </h2>
                    <ul className="space-y-2.5">
                      {activeDatasheet.featuresList.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-[#374151]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#5EA82E] flex-shrink-0 mt-1.5 shadow-sm" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SPECIFICATION Section with Exact Circuit Line */}
                  <div className="relative z-10">
                    {/* Header with Circuit Line & Node */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="px-5 py-1.5 bg-[#DDEEEB] border border-[#BCE0D7] rounded-full text-xs sm:text-sm font-black text-[#1F2937] tracking-wider uppercase shadow-xs">
                        SPECIFICATION
                      </div>
                      <div className="flex-1 flex items-center">
                        <div className="h-[2px] bg-[#5EA82E] flex-1" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#5EA82E]" />
                      </div>
                    </div>

                    {/* Specification Pill Grid */}
                    <div className="space-y-3">
                      {Object.entries(activeDatasheet.specs).map(([label, val], idx) => (
                        <div 
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pb-1"
                        >
                          {/* Pill Label on Left */}
                          <div className="w-full sm:w-44 flex-shrink-0 bg-[#E2EDF0] text-[#111827] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs">
                            {label}
                          </div>
                          {/* Value Text on Right */}
                          <div className="text-xs sm:text-sm font-semibold text-[#1F2937] leading-relaxed flex-1 pl-2 sm:pl-0">
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Document Footnote */}
                    <div className="mt-12 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-[0.7rem] text-slate-500 font-mono">
                      <span>AXION ELECTRIC MOBILITY • OFFICIAL TECHNICAL SPECIFICATION SHEET</span>
                      <span className="text-[#5EA82E] font-bold">100% INDIGENOUSLY ENGINEERED IN INDIA</span>
                    </div>
                  </div>

                </div>
              </motion.section>
            )}
          </AnimatePresence>

        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default ProductPage;
