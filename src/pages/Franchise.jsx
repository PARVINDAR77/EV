import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';
import { 
  TrendingUp, MapPin, DollarSign, ArrowRight, ShieldCheck, Zap, 
  Activity, Building, Briefcase, CheckCircle2, AlertCircle, Loader2, 
  ChevronDown, ChevronUp, Layers, Award, Calendar, HelpCircle, 
  PhoneCall, Users, FileText, Check, ArrowUpRight, Percent, Clock, Landmark, TrendingDown
} from 'lucide-react';
import { sendFranchiseApplication } from '../services/mailService';

// Reference Images
import heroBannerNight from '../assets/images/franchise_banner_night.jpg';
import fastChargerCanopy from '../assets/images/Axion Charge Highway Stop.webp';
import superChargerCanopy from '../assets/images/AXION Charge Logistics Hub.webp';
import evPlugImg from '../assets/images/ev_plug_charging.jpg';
import evSupportCableImg from '../assets/images/ev_support_cable.jpg';
import solarBessImg from '../assets/images/solar_bess_canopy.jpg';
import isometricCarImg from '../assets/images/isometric_ev_car.jpg';

const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const FAQS = [
  {
    q: "What are the investment options and who is this for?",
    a: "We offer two models: Fast Charging (₹25L–₹1Cr) for passenger EVs, and Super Charging (₹1Cr–₹10Cr) for high-throughput sites serving passenger cars, electric buses, and commercial trucks. Ideal for landowners, retail entrepreneurs, commercial real estate developers, and institutional investors."
  },
  {
    q: "What kind of space and power connection do I need?",
    a: "• Fast Charging: ~550 sq. ft. (2 car parking bays) with 50–150 kVA sanctioned grid load.\n• Super Charging: Larger footprint for commercial EVs with 250–1,200 kVA dedicated transformer load.\nWe assist end-to-end with site layouts, DISCOM power approvals, and can integrate Solar + BESS (Battery Energy Storage Systems) for round-the-clock reliability."
  },
  {
    q: "How much can I earn and what’s the ROI timeline?",
    a: "Earnings depend on location, daily footfall, highway proximity, and tariff margins. The typical ROI payback is 2–4 years for Fast Charging and 3–5 years for Super Charging. Franchise partners track real-time charging revenues and machine uptime 24x7 via our Axion CMS dashboard."
  },
  {
    q: "How does Axion Charge support me after setup?",
    a: "We provide end-to-end turnkey support: civil and electrical installation, 24×7 technical monitoring, nationwide customer support, dedicated marketing & highway signage campaigns, CMS software access, remote diagnostics, and preventative on-site maintenance."
  },
  {
    q: "Can I get financing or subsidies?",
    a: "Yes. Through the National Green Mobility Capital Scheme and our institutional banking consortium, franchise partners can finance up to ~75% of their total setup capital at competitive green concession rates starting as low as 6.7%*. Our team also checks and applies for central PM E-DRIVE and state-specific EV policy capital subsidies on your behalf."
  },
  {
    q: "What is the setup timeline?",
    a: "From initial agreement to commercial commissioning: 12–20 weeks for Fast Charging Stations and 20–24 weeks for Super Charging Hubs, subject to local DISCOM grid connection clearances and municipal permits."
  },
  {
    q: "Why should I choose Axion Charge over others?",
    a: "Axion Charge provides market-leading European-standard DC hardware (30 kW to 360 kW), 98%+ guaranteed network uptime, deep integrations with leading automotive OEMs, integrated Solar + BESS architecture, and an established nationwide driver app network."
  }
];

const BRAND_PARTNERS = [
  "Tata Motors", "Mahindra Electric", "Hyundai", "MG Motor", "BYD", 
  "Volvo E-Bus", "BluSmart", "Delhivery", "National Green Capital", "Amazon Fleet"
];

const Franchise = () => {
  // Form State
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    proceedAs: 'Business', // 'Business' | 'Individual'
    businessTurnover: '50L - 1Cr',
    investmentBudget: '25L - 50L',
    landAvailability: 'Yes',
    locationType: 'City',
    privacyAccepted: true
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  // Tab & Accordion States
  const [activeModelTab, setActiveModelTab] = useState('fast'); // 'fast' | 'super'
  const [openFaq, setOpenFaq] = useState(0);

  const formRef = useRef(null);

  const scrollToForm = (prefill = {}) => {
    if (prefill.model) {
      if (prefill.model === 'super') {
        setFormData(prev => ({ ...prev, investmentBudget: '1Cr - 5 Cr' }));
      } else {
        setFormData(prev => ({ ...prev, investmentBudget: '25L - 50L' }));
      }
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = "Enter a valid 10-digit Indian mobile number";
    }

    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state) errors.state = "Select your state";
    
    if (!formData.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      errors.pincode = "Enter a valid 6-digit pincode";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep1 = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setFormStep(2);
    }
  };

  const handleNextStep2 = (e) => {
    e.preventDefault();
    setFormStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      alert("Please accept the communication policy to proceed.");
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await sendFranchiseApplication({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        location: `${formData.city}, ${formData.state} (${formData.pincode})`,
        model: `${formData.proceedAs} | Budget: ${formData.investmentBudget} | Land: ${formData.landAvailability} (${formData.locationType}) | Turnover: ${formData.businessTurnover}`,
        rawDetails: formData
      });

      setStatus({
        type: 'success',
        message: 'Franchise inquiry submitted successfully! Our expansion manager will reach out within 24 hours.'
      });
      setFormStep(1);
    } catch (err) {
      console.error('Franchise submit error:', err);
      setStatus({
        type: 'error',
        message: err.message || 'Unable to submit application. Please contact axion@vardaansmartsolutions.com directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition locationKey="franchise">
      <main className="w-full min-h-screen bg-[#020403] pt-24 relative font-sans text-gray-200">
        
        {/* Ambient Glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-[-10%] w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[200px]" />
          <div className="absolute top-2/3 left-[-15%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[180px]" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            1. TOP HERO BANNER (NIGHT CHARGING STATION PHOTO + RIGHT-ALIGNED TEXT)
           ══════════════════════════════════════════════════════════════════════════ */}
        <div className="w-full relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center overflow-hidden border-b border-white/10">
          <div 
            className="absolute inset-0 bg-cover bg-center sm:bg-left bg-no-repeat scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url("${heroBannerNight}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/60 to-[#020403]/95 sm:via-black/70 sm:to-[#020403]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-transparent to-black/40" />

          <div className="max-w-[1400px] w-full mx-auto px-4 md:px-8 lg:px-16 pt-12 pb-24 relative z-10 flex flex-col items-start lg:items-end text-left lg:text-right">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/40 mb-4 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent font-mono text-[0.7rem] uppercase tracking-widest font-bold">
                  B2B Franchise Opportunity
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight leading-[1.08] drop-shadow-2xl"
              >
                Build the Future <br />
                of E-Mobility
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-xl text-gray-300 mt-4 leading-relaxed font-sans max-w-xl lg:ml-auto drop-shadow-md"
              >
                Be a franchise partner with India's largest EV charging network. Starting at just <strong className="text-accent font-semibold">₹25 lakhs*</strong>
              </motion.p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            2. TWO-COLUMN SPLIT SECTION (EXACT REPLICA OF 5 SCREENSHOTS)
               - Left Column: India is Charging Ahead -> Why Partner -> Investment Plans
               - Right Column: Sticky "Partner With Us" card alongside all 5 steps!
           ══════════════════════════════════════════════════════════════════════════ */}
        <div className="w-full bg-[#F8F9FA] text-[#111827] pt-24 sm:pt-28 lg:pt-36 pb-24 relative z-20 border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* ────────────────────────────────────────────────────────────────
                  LEFT COLUMN (7 COLS): SCROLLING CONTENT
                 ──────────────────────────────────────────────────────────────── */}
              <div className="lg:col-span-7 space-y-24">

                {/* ── STEP 1: INDIA IS CHARGING AHEAD. ARE YOU? (SCREENSHOT 1) ── */}
                <section className="scroll-mt-36">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-display font-bold text-gray-900 tracking-tight leading-[1.12]">
                      India is Charging Ahead. <br />
                      <span className="text-[#FF3B30] font-bold">
                        ARE YOU?
                      </span>
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-5 max-w-2xl font-sans">
                      With India targeting 30% EV penetration by 2030, the demand for fast, reliable and accessible charging infrastructure is skyrocketing. Now is the perfect time to ride the EV wave. Not just as a believer, but as an owner of the future.
                    </p>

                    {/* Two Stat Cards matching Screenshot 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                      {/* Stat Card 1: ₹4,000+cr */}
                      <div className="p-6 rounded-2xl bg-white border border-red-200/90 shadow-sm flex flex-col justify-between h-[230px] relative overflow-hidden group hover:border-[#FF3B30]/60 transition-colors">
                        <div>
                          <div className="text-3xl sm:text-[2.2rem] font-display font-extrabold text-gray-900 tracking-tight">
                            ₹4,000+cr
                          </div>
                          <div className="text-gray-600 text-xs sm:text-[0.82rem] font-sans mt-1.5 leading-snug">
                            allocated to EV infra under PM E-Drive Scheme
                          </div>
                        </div>

                        {/* Graphic: Red Rupee + Upward Arrow (Screenshot 1) */}
                        <div className="relative w-full h-24 overflow-visible flex items-end">
                          <svg viewBox="0 0 260 100" className="w-full h-full" fill="none">
                            {/* Stylized Red Rupee Symbol */}
                            <text x="5" y="75" fontSize="62" fontWeight="700" fill="#FF5252" opacity="0.8">
                              ₹
                            </text>
                            {/* Trending Line */}
                            <path 
                              d="M60 82 L90 62 L120 74 L150 48 L185 60 L245 12" 
                              stroke="#FF5252" 
                              strokeWidth="4.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                            {/* Arrow Head */}
                            <path 
                              d="M220 12 L245 12 L245 37" 
                              stroke="#FF5252" 
                              strokeWidth="4.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Stat Card 2: 17.1% YoY */}
                      <div className="p-6 rounded-2xl bg-white border border-red-200/90 shadow-sm flex flex-col justify-between h-[230px] relative overflow-hidden group hover:border-[#FF3B30]/60 transition-colors">
                        <div>
                          <div className="text-3xl sm:text-[2.2rem] font-display font-extrabold text-gray-900 tracking-tight">
                            17.1% YoY
                          </div>
                          <div className="text-gray-600 text-xs sm:text-[0.82rem] font-sans mt-1.5 leading-snug">
                            growth
                          </div>
                        </div>

                        {/* Graphic: Shaded Area Chart with Plotted Dots (Screenshot 1) */}
                        <div className="relative w-full h-24 overflow-hidden flex items-end">
                          <svg viewBox="0 0 280 90" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF5252" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#FF5252" stopOpacity="0.03" />
                              </linearGradient>
                            </defs>
                            {/* Area fill */}
                            <path 
                              d="M0 90 L0 65 L40 25 L75 68 L115 42 L150 78 L190 40 L235 65 L280 10 L280 90 Z" 
                              fill="url(#areaGrad)" 
                            />
                            {/* Top stroke */}
                            <path 
                              d="M0 65 L40 25 L75 68 L115 42 L150 78 L190 40 L235 65 L280 10" 
                              stroke="#FF5252" 
                              strokeWidth="2.5" 
                              fill="none" 
                              strokeLinejoin="round"
                            />
                            {/* Points on peaks */}
                            <circle cx="40" cy="25" r="3.5" fill="#FF3B30" />
                            <circle cx="75" cy="68" r="3" fill="#FF3B30" />
                            <circle cx="115" cy="42" r="3.5" fill="#FF3B30" />
                            <circle cx="150" cy="78" r="3" fill="#FF3B30" />
                            <circle cx="190" cy="40" r="3.5" fill="#FF3B30" />
                            <circle cx="280" cy="10" r="3.5" fill="#FF3B30" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* ── STEP 2: WHY PARTNER WITH US + 3 PHOTO CARDS + DISCLAIMER (SCREENSHOT 2) ── */}
                <section>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-display font-bold text-gray-900 tracking-tight leading-[1.15]">
                      Why Partner With Axion Charge?
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl font-sans">
                      Our Franchise Model, formerly known as the Dealer Owned Company Operated (DOCO) Model, is a turnkey investment opportunity that plugs you directly into India's largest EV charging network, complete with tech, operations, and marketing support for long-term ROI.
                    </p>

                    {/* 3 Image Cards with Text Overlays matching Screenshot 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                      {/* Photo Card 1: 15000+ Charging Points */}
                      <div className="rounded-2xl overflow-hidden relative h-60 sm:h-64 shadow-md group">
                        <img 
                          src={evPlugImg} 
                          alt="15000+ Charging Points Across India" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-4">
                          <div className="text-2xl font-display font-extrabold text-white">
                            15000+
                          </div>
                          <div className="text-xs text-white/95 font-sans mt-0.5 leading-snug">
                            Charging Points Across India
                          </div>
                        </div>
                      </div>

                      {/* Photo Card 2: 24x7 Support */}
                      <div className="rounded-2xl overflow-hidden relative h-60 sm:h-64 shadow-md group">
                        <img 
                          src={evSupportCableImg} 
                          alt="24x7 Support with 98% Network Uptime" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-4">
                          <div className="text-2xl font-display font-extrabold text-white">
                            24x7
                          </div>
                          <div className="text-xs text-white/95 font-sans mt-0.5 leading-snug">
                            Support with 98% Network Uptime
                          </div>
                        </div>
                      </div>

                      {/* Photo Card 3: Solar + BESS */}
                      <div className="rounded-2xl overflow-hidden relative h-60 sm:h-64 shadow-md group">
                        <img 
                          src={solarBessImg} 
                          alt="Solar + BESS options for high-end sites" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-4">
                          <div className="text-2xl font-display font-extrabold text-white">
                            Solar + BESS
                          </div>
                          <div className="text-xs text-white/95 font-sans mt-0.5 leading-snug">
                            options for high-end sites
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer matching Screenshot 2 */}
                    <div className="mt-12">
                      <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#FF3B30] mb-3">
                        Disclaimer
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                        Certain social media accounts are misusing the name, logo and trademark of Axion Charge to spread false claims and rumours about EVCS investments under the PM E-DRIVE Scheme. Axion Charge has no association whatsoever with such claims and rumours and hereby disclaims any and all liabilities arising from them.
                      </p>
                    </div>
                  </motion.div>
                </section>

                {/* ── STEP 3: CHOOSE YOUR INVESTMENT PLAN (SCREENSHOTS 3, 4, 5) ── */}
                <section id="investment-plans" className="scroll-mt-28">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* 3D Isometric Car Banner Graphic (Screenshot 3) */}
                    <div className="w-full max-w-md mx-auto sm:ml-auto mb-6 rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100 p-2">
                      <img 
                        src={isometricCarImg} 
                        alt="Axion 3D EV Car & Charging Station" 
                        className="w-full h-auto object-contain max-h-[220px]" 
                      />
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-display font-bold text-gray-900 tracking-tight leading-[1.15]">
                      Choose Your Investment Plan. <br />
                      <span>We’ll Power the Rest.</span>
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl font-sans">
                      Whether you're entering the EV space for the first time or expanding a larger energy portfolio, Axion Charge offers a scalable, high-ROI franchise model built for the future. We offer two tailored investment models, each designed to suit a different scale of ambition. These are ideal for landowners, retail entrepreneurs, and institutional investors looking to power highways, cities, and logistics hubs across India.
                    </p>

                    {/* Navigation Tabs with Red Underline Indicator (Screenshots 3, 4, 5) */}
                    <div className="flex items-center gap-8 sm:gap-12 border-b border-gray-200 mt-10 mb-6">
                      <button
                        type="button"
                        onClick={() => setActiveModelTab('fast')}
                        className={`pb-3 font-display text-base sm:text-lg transition-all relative cursor-pointer ${
                          activeModelTab === 'fast'
                            ? 'text-gray-900 font-bold'
                            : 'text-gray-400 font-semibold hover:text-gray-700'
                        }`}
                      >
                        Fast Charging Stations
                        {activeModelTab === 'fast' && (
                          <motion.div 
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF3B30] rounded-full" 
                          />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveModelTab('super')}
                        className={`pb-3 font-display text-base sm:text-lg transition-all relative cursor-pointer ${
                          activeModelTab === 'super'
                            ? 'text-gray-900 font-bold'
                            : 'text-gray-400 font-semibold hover:text-gray-700'
                        }`}
                      >
                        Super Charging Stations
                        {activeModelTab === 'super' && (
                          <motion.div 
                            layoutId="activeTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-1 bg-[#FF3B30] rounded-full" 
                          />
                        )}
                      </button>
                    </div>

                    {/* Tab 1: Fast Charging Stations (Screenshot 4) */}
                    {activeModelTab === 'fast' && (
                      <motion.div
                        key="fast-tab"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-3xl border border-red-200/90 bg-white p-6 sm:p-8 shadow-sm"
                      >
                        {/* Big Canopy Photo */}
                        <div className="w-full h-[240px] sm:h-[320px] rounded-2xl overflow-hidden mb-7 shadow-inner bg-gray-100">
                          <img 
                            src={fastChargerCanopy} 
                            alt="Fast Charging Stations Canopy" 
                            className="w-full h-full object-cover" 
                          />
                        </div>

                        {/* Bullet Points with exact labels from Screenshot 4 */}
                        <ul className="space-y-3.5 text-sm sm:text-[0.95rem] text-gray-800 font-sans">
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Starting Investment:</strong> ₹25 Lakhs*</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Charger Options:</strong> 30, 60, 120 kW DC (Single/Dual Gun)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Vehicle Type:</strong> 4-wheeler passenger EVs (CCS2 compatible)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Space Needed:</strong> 550 sq. ft. (2 car parks)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Power:</strong> Direct grid connection, plug-and-play setup</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Ideal Locations:</strong> Highways, office parks, malls, residential societies</span>
                          </li>
                        </ul>
                      </motion.div>
                    )}

                    {/* Tab 2: Super Charging Stations (Screenshot 5) */}
                    {activeModelTab === 'super' && (
                      <motion.div
                        key="super-tab"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-3xl border border-red-200/90 bg-white p-6 sm:p-8 shadow-sm"
                      >
                        {/* Big Canopy Photo with Commercial Fleet */}
                        <div className="w-full h-[240px] sm:h-[320px] rounded-2xl overflow-hidden mb-7 shadow-inner bg-gray-100">
                          <img 
                            src={superChargerCanopy} 
                            alt="Super Charging Stations Mega Hub" 
                            className="w-full h-full object-cover" 
                          />
                        </div>

                        {/* Bullet Points with exact labels from Screenshot 5 */}
                        <ul className="space-y-3.5 text-sm sm:text-[0.95rem] text-gray-800 font-sans">
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Starting Investment:</strong> ₹1 Crore*</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Charger Options:</strong> 240 kW & 360 kW DC</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Scalability:</strong> Upto 1.2 MW with multi-gun setup</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Vehicle Compatibility:</strong> 4-wheelers, e-buses, and electric trucks</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Space Requirement:</strong> Larger footprint to accommodate commercial EVs</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                            <span><strong>Power Infrastructure:</strong> Direct grid connection with Solar + BESS integration for 24x7</span>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                </section>

              </div>

              {/* ────────────────────────────────────────────────────────────────
                  RIGHT COLUMN (5 COLS): STICKY "PARTNER WITH US" FORM
                  PINS ALONGSIDE ALL 5 STEPS AS SHOWN IN SCREENSHOTS 1, 2, 3, 4, 5
                 ──────────────────────────────────────────────────────────────── */}
              <div 
                id="franchise-form" 
                ref={formRef} 
                className="lg:col-span-5 sticky top-[105px] self-start z-30 scroll-mt-36"
              >
                <div className="w-full rounded-[2.2rem] bg-white border-2 border-red-200/90 p-5 sm:p-7 shadow-xl relative">
                  
                  {/* Title matching all 5 screenshots */}
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-[1.75rem] font-display font-bold text-gray-900 tracking-tight">
                      Partner With Us
                    </h3>
                  </div>

                  {/* Stepper Header (Personal -> Investment -> Form Review) */}
                  <div className="flex items-center justify-between mb-8 px-2 relative">
                    {/* Connecting dotted line */}
                    <div className="absolute top-2.5 left-7 right-7 h-[1px] border-t border-dotted border-gray-400 pointer-events-none" />

                    {/* Step 1: Personal */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        formStep === 1 
                          ? 'bg-[#FF3B30] shadow-[0_0_8px_rgba(255,59,48,0.5)]' 
                          : formStep > 1 
                          ? 'bg-[#FF3B30]' 
                          : 'bg-neutral-800'
                      }`}>
                        {formStep > 1 && <Check size={11} strokeWidth={3} className="text-white" />}
                      </div>
                      <span className="text-[0.68rem] font-sans font-medium text-gray-800 mt-2">
                        Personal
                      </span>
                    </div>

                    {/* Step 2: Investment */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        formStep === 2 
                          ? 'bg-[#FF3B30] shadow-[0_0_8px_rgba(255,59,48,0.5)]' 
                          : formStep > 2 
                          ? 'bg-[#FF3B30]' 
                          : 'bg-neutral-800'
                      }`}>
                        {formStep > 2 && <Check size={11} strokeWidth={3} className="text-white" />}
                      </div>
                      <span className="text-[0.68rem] font-sans font-medium text-gray-800 mt-2">
                        Investment
                      </span>
                    </div>

                    {/* Step 3: Form Review */}
                    <div className="flex flex-col items-center relative z-10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        formStep === 3 
                          ? 'bg-[#FF3B30] shadow-[0_0_8px_rgba(255,59,48,0.5)]' 
                          : 'bg-neutral-800'
                      }`} />
                      <span className="text-[0.68rem] font-sans font-medium text-gray-800 mt-2">
                        Form Review
                      </span>
                    </div>
                  </div>

                  {/* Status Notification */}
                  <AnimatePresence>
                    {status.type && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mb-5 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-sans ${
                          status.type === 'success'
                            ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                            : 'bg-red-50 border border-red-300 text-red-700'
                        }`}
                      >
                        {status.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                        )}
                        <span>{status.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── STEP 1: PERSONAL CONTACT DETAILS (SCREENSHOTS 1 TO 5) ── */}
                  {formStep === 1 && (
                    <form onSubmit={handleNextStep1} className="space-y-3.5">
                      {/* First Name & Last Name */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[0.7rem] text-gray-600 font-medium mb-1">First Name*</label>
                          <input 
                            type="text" 
                            value={formData.firstName}
                            onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="eg. John"
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] rounded-full text-gray-900 text-xs focus:outline-none transition-all placeholder:text-gray-400"
                          />
                          {formErrors.firstName && <span className="text-red-500 text-[0.65rem] mt-0.5 block">{formErrors.firstName}</span>}
                        </div>
                        <div>
                          <label className="block text-[0.7rem] text-gray-600 font-medium mb-1">Last Name*</label>
                          <input 
                            type="text" 
                            value={formData.lastName}
                            onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="eg. Doe"
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] rounded-full text-gray-900 text-xs focus:outline-none transition-all placeholder:text-gray-400"
                          />
                          {formErrors.lastName && <span className="text-red-500 text-[0.65rem] mt-0.5 block">{formErrors.lastName}</span>}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[0.7rem] text-gray-600 font-medium mb-1">Email*</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="eg. example@gmail.com"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] rounded-full text-gray-900 text-xs focus:outline-none transition-all placeholder:text-gray-400"
                        />
                        {formErrors.email && <span className="text-red-500 text-[0.65rem] mt-0.5 block">{formErrors.email}</span>}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-[0.7rem] text-gray-600 font-medium mb-1">Mobile Number*</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="91 9876543210"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] rounded-full text-gray-900 text-xs focus:outline-none transition-all placeholder:text-gray-400"
                        />
                        {formErrors.phone && <span className="text-red-500 text-[0.65rem] mt-0.5 block">{formErrors.phone}</span>}
                      </div>

                      {/* City & State */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[0.7rem] text-gray-600 font-medium mb-1">City*</label>
                          <input 
                            type="text" 
                            value={formData.city}
                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                            placeholder="Eg. Mumbai"
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] rounded-full text-gray-900 text-xs focus:outline-none transition-all placeholder:text-gray-400"
                          />
                          {formErrors.city && <span className="text-red-500 text-[0.65rem] mt-0.5 block">{formErrors.city}</span>}
                        </div>
                        <div>
                          <label className="block text-[0.7rem] text-gray-600 font-medium mb-1">State*</label>
                          <select 
                            value={formData.state}
                            onChange={e => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] rounded-full text-gray-900 text-xs focus:outline-none transition-all cursor-pointer"
                          >
                            <option value="">Enter your state</option>
                            {INDIAN_STATES.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                          {formErrors.state && <span className="text-red-500 text-[0.65rem] mt-0.5 block">{formErrors.state}</span>}
                        </div>
                      </div>

                      {/* PinCode */}
                      <div>
                        <label className="block text-[0.7rem] text-gray-600 font-medium mb-1">PinCode*</label>
                        <input 
                          type="text" 
                          maxLength={6}
                          value={formData.pincode}
                          onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                          placeholder="400097"
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30] rounded-full text-gray-900 text-xs focus:outline-none transition-all placeholder:text-gray-400"
                        />
                        {formErrors.pincode && <span className="text-red-500 text-[0.65rem] mt-0.5 block">{formErrors.pincode}</span>}
                      </div>

                      {/* Proceed As Radio Options */}
                      <div className="pt-2">
                        <label className="block text-[0.7rem] text-gray-600 font-medium mb-1.5">Proceed as*</label>
                        <div className="flex items-center gap-6">
                          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800">
                            <input 
                              type="radio" 
                              name="proceedAs" 
                              value="Business"
                              checked={formData.proceedAs === 'Business'}
                              onChange={() => setFormData({ ...formData, proceedAs: 'Business' })}
                              className="accent-[#FF3B30] w-4 h-4 cursor-pointer"
                            />
                            <span>Business</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800">
                            <input 
                              type="radio" 
                              name="proceedAs" 
                              value="Individual"
                              checked={formData.proceedAs === 'Individual'}
                              onChange={() => setFormData({ ...formData, proceedAs: 'Individual' })}
                              className="accent-[#FF3B30] w-4 h-4 cursor-pointer"
                            />
                            <span>Individual</span>
                          </label>
                        </div>
                      </div>

                      {/* Black Pill Next Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  )}

                  {/* ── STEP 2: INVESTMENT BUDGET & LAND SCOPE ── */}
                  {formStep === 2 && (
                    <form onSubmit={handleNextStep2} className="space-y-4">
                      {/* Business Turnover (if Business selected) */}
                      {formData.proceedAs === 'Business' && (
                        <div>
                          <label className="block text-[0.7rem] text-gray-600 font-medium mb-1.5">
                            Business Turnover*
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['1L - 50L', '50L - 1Cr', '1Cr - 5 Cr', '>5Cr'].map((to) => (
                              <button
                                key={to}
                                type="button"
                                onClick={() => setFormData({ ...formData, businessTurnover: to })}
                                className={`py-2 px-2.5 rounded-full text-[0.7rem] font-mono border transition-all cursor-pointer ${
                                  formData.businessTurnover === to
                                    ? 'bg-black border-black text-white font-bold'
                                    : 'bg-white border-gray-300 text-gray-700 hover:border-black'
                                }`}
                              >
                                {to}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Investment Budget */}
                      <div>
                        <label className="block text-[0.7rem] text-gray-600 font-medium mb-1.5">
                          Investment Budget*
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(formData.proceedAs === 'Business' 
                            ? ['25L - 50L', '50L - 1Cr', '1Cr - 5 Cr', '5Cr+'] 
                            : ['15L - 25L', '25L - 50L', '50L - 1Cr', '1Cr+']
                          ).map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setFormData({ ...formData, investmentBudget: b })}
                              className={`py-2 px-2.5 rounded-full text-[0.7rem] font-mono border transition-all cursor-pointer ${
                                formData.investmentBudget === b
                                  ? 'bg-black border-black text-white font-bold'
                                  : 'bg-white border-gray-300 text-gray-700 hover:border-black'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Land Availability */}
                      <div>
                        <label className="block text-[0.7rem] text-gray-600 font-medium mb-1.5">
                          Land Availability*
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Yes', 'No'].map((ans) => (
                            <button
                              key={ans}
                              type="button"
                              onClick={() => setFormData({ ...formData, landAvailability: ans })}
                              className={`py-2 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                                formData.landAvailability === ans
                                  ? 'bg-black border-black text-white'
                                  : 'bg-white border-gray-300 text-gray-700 hover:border-black'
                              }`}
                            >
                              {ans}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Location Type */}
                      {formData.landAvailability === 'Yes' && (
                        <div>
                          <label className="block text-[0.7rem] text-gray-600 font-medium mb-1.5">
                            Location Type*
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {['City', 'Highway'].map((loc) => (
                              <button
                                key={loc}
                                type="button"
                                onClick={() => setFormData({ ...formData, locationType: loc })}
                                className={`py-2 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                                  formData.locationType === loc
                                    ? 'bg-black border-black text-white'
                                    : 'bg-white border-gray-300 text-gray-700 hover:border-black'
                                }`}
                              >
                                {loc}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-3 flex justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="w-1/3 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:border-black text-xs font-mono font-bold transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 py-2.5 bg-black hover:bg-neutral-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                        >
                          Next
                        </button>
                      </div>
                    </form>
                  )}

                  {/* ── STEP 3: FORM REVIEW & SUBMISSION ── */}
                  {formStep === 3 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2 text-xs">
                        <div className="text-[0.68rem] font-mono text-[#FF3B30] font-bold uppercase border-b border-gray-200 pb-1">
                          Check your details and Submit
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[0.72rem]">
                          <div><span className="text-gray-500">Name:</span> <span className="text-gray-900 font-medium">{formData.firstName} {formData.lastName}</span></div>
                          <div><span className="text-gray-500">Phone:</span> <span className="text-gray-900 font-medium">+91 {formData.phone}</span></div>
                          <div className="col-span-2"><span className="text-gray-500">Email:</span> <span className="text-gray-900 font-medium break-all">{formData.email}</span></div>
                          <div><span className="text-gray-500">Location:</span> <span className="text-gray-900 font-medium">{formData.city}, {formData.state}</span></div>
                          <div><span className="text-gray-500">Pincode:</span> <span className="text-gray-900 font-medium">{formData.pincode}</span></div>
                          <div><span className="text-gray-500">Budget:</span> <span className="text-red-600 font-bold">{formData.investmentBudget}</span></div>
                          <div><span className="text-gray-500">Land:</span> <span className="text-gray-900 font-medium">{formData.landAvailability} ({formData.locationType})</span></div>
                        </div>
                      </div>

                      {/* Privacy policy checkbox */}
                      <div className="flex items-start gap-2.5 cursor-pointer">
                        <input 
                          type="checkbox" 
                          id="privacyCheck2"
                          checked={formData.privacyAccepted}
                          onChange={e => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                          className="mt-0.5 accent-[#FF3B30] w-3.5 h-3.5 cursor-pointer"
                        />
                        <label htmlFor="privacyCheck2" className="text-[0.68rem] text-gray-500 cursor-pointer leading-tight">
                          I agree to the use of my info for communication and support.
                        </label>
                      </div>

                      <div className="pt-2 flex justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setFormStep(2)}
                          className="w-1/3 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:border-black text-xs font-mono font-bold transition-all cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-2/3 py-2.5 bg-black hover:bg-neutral-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit
                              <Check size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            3. LOWER FULL-WIDTH SECTIONS (SBI FINANCING, BRANDS, WEBINAR, FAQS)
           ══════════════════════════════════════════════════════════════════════════ */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 py-24 relative z-10">

          {/* ── GREEN MOBILITY CAPITAL SCHEME FINANCING HUB ── */}
          <section className="mb-32">
            <div className="p-8 sm:p-12 lg:p-16 rounded-[2.5rem] bg-gradient-to-b from-[#07150C] via-[#040C07] to-[#010502] border border-emerald-500/30 relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
              {/* High-tech ambient lighting */}
              <div className="absolute -top-32 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
              <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
              
              {/* Subtle financial grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

              <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest font-semibold mb-5 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                  <span>Green Infrastructure Capital</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-display font-bold text-white tracking-tight leading-[1.12] mb-4">
                  Powered by Axion. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                    Enabled by Green Mobility Capital Scheme.
                  </span>
                </h2>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
                  Whether you're stepping into your first smart investment or looking to scale a commercial charging corridor, Axion franchise partners gain direct access to preferred green debt financing, low concession rates, and central PM E-DRIVE subsidies through our authorized institutional lending consortium.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-emerald-300 font-mono text-xs sm:text-sm font-semibold">
                  <Zap size={15} className="text-emerald-400 flex-shrink-0" />
                  <span>From ₹25 Lakhs to ₹10 Cr • Build your station with up to 75% funded capital</span>
                </div>
              </div>

              {/* 4 Pillars of Finance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
                {/* Pillar 1 */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all group backdrop-blur-md">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                    <TrendingDown size={22} />
                  </div>
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1.5">
                    Low Cost Borrowing
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
                    6.7%*
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Special green concession rates under national sustainable lending schemes and clean transport programs.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all group backdrop-blur-md">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                    <DollarSign size={22} />
                  </div>
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1.5">
                    Low Equity Required
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
                    75% Funded
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Finance up to 75% of your total project capital, covering DC fast chargers, transformer setup, and turnkey civil works.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all group backdrop-blur-md">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                    <Clock size={22} />
                  </div>
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1.5">
                    Flexible Repayment
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
                    Up to 7 Yrs*
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Comfortable loan amortization tenure with progressive grace periods structured to match station revenue ramp-up.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all group backdrop-blur-md">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={22} />
                  </div>
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1.5">
                    Security Terms
                  </div>
                  <div className="text-3xl sm:text-4xl font-display font-black text-white mb-2">
                    Collateral-Free*
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Zero personal collateral or third-party guarantees required for qualifying business entities and verified prime sites.
                  </p>
                </div>
              </div>

              {/* Institutional Consortium & CTA Footer */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-3 text-xs text-gray-400 text-center sm:text-left">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0 animate-ping" />
                  <span>
                    <strong className="text-gray-200">Supported Under:</strong> PM E-DRIVE Scheme • National Clean Energy Lending • SIDBI EV52 • Commercial Bank Consortium
                  </span>
                </div>

                <button
                  onClick={() => scrollToForm()}
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer shadow-md flex-shrink-0"
                >
                  Inquire About Green Capital Financing
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* ── BRAND & FLEET PARTNERS MARQUEE ── */}
          <section className="mb-32 text-center">
            <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Trusted Across the Industry</span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase mt-2 mb-8">
              Ecosystem & Fleet Partners
            </h2>

            <div className="w-full overflow-hidden relative py-4">
              <div className="flex gap-4 animate-marquee whitespace-nowrap">
                {[...BRAND_PARTNERS, ...BRAND_PARTNERS].map((brand, idx) => (
                  <div 
                    key={idx}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-accent/30 text-gray-300 font-sans text-sm font-semibold tracking-wider hover:text-white transition-all shadow-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── ALL 7 EXPANDABLE FAQS ── */}
          <section className="mb-32">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Clear Answers</span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mt-2 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-sm">
                Everything you need to know about setting up, funding, and running your EV charging station.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-white font-bold text-sm sm:text-base font-sans">{faq.q}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                        isOpen ? 'bg-accent text-black border-accent' : 'bg-white/5 text-gray-400 border-white/10'
                      }`}>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-gray-300 text-sm leading-relaxed whitespace-pre-line border-t border-white/5 pt-3 font-sans"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── STATUTORY ADVISORY ── */}
          <section className="p-6 sm:p-8 rounded-2xl bg-black/80 border border-white/10 text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto font-sans">
            <h4 className="text-white font-mono font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
              <ShieldCheck size={14} className="text-accent" />
              Statutory Compliance & Scheme Advisory
            </h4>
            <p className="mb-2">
              Certain social media accounts misuse the trademarks and corporate names of registered EV charging networks to make unrealistic claims regarding guaranteed government grants under the PM E-DRIVE Scheme. Axion Charge disclaims any unauthorized third-party liabilities.
            </p>
            <p>
              PM E-DRIVE capital subsidies and DISCOM connection incentives are approval-based and contingent upon respective state regulatory guidelines. For verified franchise proposals and technical documentation, always communicate exclusively through our official website and authorized email channels.
            </p>
          </section>

        </div>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Franchise;
