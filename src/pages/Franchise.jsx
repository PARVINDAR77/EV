import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';
import { 
  TrendingUp, MapPin, DollarSign, ArrowRight, ShieldCheck, Zap, 
  Activity, Building, Briefcase, CheckCircle2, AlertCircle, Loader2, 
  ChevronDown, ChevronUp, Layers, Award, Calendar, HelpCircle, 
  PhoneCall, Users, FileText, Check, ArrowUpRight
} from 'lucide-react';
import { sendFranchiseApplication } from '../services/mailService';

// Images from assets
import heroBannerNight from '../assets/images/franchise_banner_night.jpg';
import fastChargerImg from '../assets/images/AXION 60 kW EV Wallbox Advertisement.webp';
import superChargerImg from '../assets/images/Axion 240 kW EV Charger Showcase.webp';
import webinarImg from '../assets/images/workplace.webp';
import plazaImg from '../assets/images/Phoenix Marketcity EV Charging Plaza.webp';

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
    a: "Yes. Through State Bank of India's (SBI) EV Mitra Scheme, franchise partners can finance up to ~75% of their total setup capital at competitive rates starting as low as 6.7%*. Our team also checks and applies for central PM E-DRIVE and state-specific EV policy capital subsidies on your behalf."
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
  "Volvo E-Bus", "BluSmart", "Delhivery", "State Bank of India", "Amazon Fleet"
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
    webinarInterest: true,
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
    if (prefill.webinar) {
      setFormData(prev => ({ ...prev, webinarInterest: true }));
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
      <main className="w-full min-h-screen bg-[#020403] pt-24 overflow-hidden relative font-sans text-gray-200">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 right-[-10%] w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute top-2/3 left-[-15%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />

        {/* ══════════════════════════════════════════════════════════════════════════
            1. TOP HERO BANNER (CHARGEZONE STYLE: NIGHT STATION PHOTO + RIGHT TEXT)
           ══════════════════════════════════════════════════════════════════════════ */}
        <div className="w-full relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center overflow-hidden border-b border-white/10">
          {/* Night Charging Station Background Asset */}
          <div 
            className="absolute inset-0 bg-cover bg-center sm:bg-left bg-no-repeat scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url("${heroBannerNight}")` }}
          />
          {/* Subtle directional dark gradient ensuring high text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/60 to-[#020403]/95 sm:via-black/70 sm:to-[#020403]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-transparent to-black/40" />

          {/* Banner Text Content (Aligned to right on desktop, matching screenshot) */}
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
            2. TWO-COLUMN SPLIT (INDIA IS CHARGING AHEAD + FLOATING PARTNER FORM)
               Matches exact layout from screenshot!
           ══════════════════════════════════════════════════════════════════════════ */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 -mt-12 sm:-mt-20 lg:-mt-32 relative z-20 pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* ── LEFT COLUMN (7 COLS): INDIA IS CHARGING AHEAD ── */}
            <div className="lg:col-span-7 pt-4 lg:pt-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight uppercase leading-[1.1]">
                  India is Charging Ahead. <br />
                  <span className="text-[#FF3B30] sm:text-accent font-black drop-shadow-[0_0_20px_rgba(255,59,48,0.4)]">
                    ARE YOU?
                  </span>
                </h2>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-6 max-w-xl font-sans">
                  With India targeting 30% EV penetration by 2030, the demand for fast, reliable and accessible charging infrastructure is skyrocketing. Now is the perfect time to ride the EV wave. Not just as a believer, but as an owner of the future.
                </p>

                {/* 2 Key Market Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-xl">
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="text-3xl sm:text-4xl font-display font-black text-white mb-1">
                        <span className="text-accent">₹</span>4,000+cr
                      </div>
                      <div className="text-gray-400 text-xs font-sans">
                        allocated to EV infra under PM E‑Drive Scheme
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-lg flex flex-col justify-between">
                    <div>
                      <div className="text-3xl sm:text-4xl font-display font-black text-white mb-1">
                        17.1% YoY
                      </div>
                      <div className="text-gray-400 text-xs font-sans">
                        growth across Indian commercial and passenger electric vehicles
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlight badges */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-accent" />
                    <span>Turnkey DOCO Model</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-2">
                    <DollarSign size={16} className="text-accent" />
                    <span>SBI EV Mitra Financing Up To 75%</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300 flex items-center gap-2">
                    <Zap size={16} className="text-accent" />
                    <span>2–4 Years Payback</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN (5 COLS): FLOATING PARTNER WITH US CARD ── */}
            <div id="franchise-form" ref={formRef} className="lg:col-span-5 scroll-mt-28">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full rounded-[2.2rem] bg-gradient-to-b from-[#09150C]/98 via-[#040A06]/98 to-[#020503]/98 border-2 border-[#FF3B30]/40 sm:border-accent/40 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,255,0,0.12)] relative z-20 backdrop-blur-2xl"
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-accent/10 rounded-full blur-[70px] pointer-events-none" />

                {/* Form Heading */}
                <div className="mb-6 relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                    Partner With Us
                  </h3>
                </div>

                {/* Stepper Header (Personal -> Investment -> Form Review) */}
                <div className="flex items-center justify-between mb-8 px-2 relative z-10">
                  {/* Connecting dashed line */}
                  <div className="absolute top-3.5 left-8 right-8 h-[1px] border-t-2 border-dashed border-white/20 pointer-events-none" />

                  {/* Dot 1: Personal */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      formStep === 1 
                        ? 'bg-[#FF3B30] sm:bg-accent text-black shadow-[0_0_12px_rgba(255,59,48,0.6)] sm:shadow-[0_0_12px_#00FF00]' 
                        : formStep > 1 
                        ? 'bg-accent/40 text-accent border border-accent' 
                        : 'bg-white/10 text-gray-400 border border-white/20'
                    }`}>
                      {formStep > 1 ? <Check size={13} strokeWidth={3} /> : <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                    </div>
                    <span className={`text-[0.68rem] font-mono mt-1.5 ${formStep === 1 ? 'text-accent font-bold' : 'text-gray-400'}`}>
                      Personal
                    </span>
                  </div>

                  {/* Dot 2: Investment */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      formStep === 2 
                        ? 'bg-[#FF3B30] sm:bg-accent text-black shadow-[0_0_12px_rgba(255,59,48,0.6)] sm:shadow-[0_0_12px_#00FF00]' 
                        : formStep > 2 
                        ? 'bg-accent/40 text-accent border border-accent' 
                        : 'bg-[#0a120c] text-gray-500 border border-white/20'
                    }`}>
                      {formStep > 2 ? <Check size={13} strokeWidth={3} /> : <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                    </div>
                    <span className={`text-[0.68rem] font-mono mt-1.5 ${formStep === 2 ? 'text-accent font-bold' : 'text-gray-400'}`}>
                      Investment
                    </span>
                  </div>

                  {/* Dot 3: Form Review */}
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      formStep === 3 
                        ? 'bg-[#FF3B30] sm:bg-accent text-black shadow-[0_0_12px_rgba(255,59,48,0.6)] sm:shadow-[0_0_12px_#00FF00]' 
                        : 'bg-[#0a120c] text-gray-500 border border-white/20'
                    }`}>
                      <div className="w-2.5 h-2.5 rounded-full bg-current" />
                    </div>
                    <span className={`text-[0.68rem] font-mono mt-1.5 ${formStep === 3 ? 'text-accent font-bold' : 'text-gray-400'}`}>
                      Form Review
                    </span>
                  </div>
                </div>

                {/* Status Message */}
                <AnimatePresence>
                  {status.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mb-5 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-sans ${
                        status.type === 'success'
                          ? 'bg-accent/10 border border-accent/40 text-accent shadow-[0_0_20px_rgba(0,255,0,0.2)]'
                          : 'bg-red-500/10 border border-red-500/40 text-red-400'
                      }`}
                    >
                      {status.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-accent" />
                      ) : (
                        <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                      )}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── STEP 1: PERSONAL CONTACT DETAILS ── */}
                {formStep === 1 && (
                  <form onSubmit={handleNextStep1} className="space-y-3.5 relative z-10">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[0.7rem] text-gray-300 font-medium mb-1">First Name*</label>
                        <input 
                          type="text" 
                          value={formData.firstName}
                          onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="eg. John"
                          className="w-full px-4 py-2.5 bg-black/60 border border-white/20 focus:border-accent rounded-full text-white text-xs focus:outline-none transition-colors"
                        />
                        {formErrors.firstName && <span className="text-red-400 text-[0.65rem] mt-0.5 block">{formErrors.firstName}</span>}
                      </div>
                      <div>
                        <label className="block text-[0.7rem] text-gray-300 font-medium mb-1">Last Name*</label>
                        <input 
                          type="text" 
                          value={formData.lastName}
                          onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="eg. Doe"
                          className="w-full px-4 py-2.5 bg-black/60 border border-white/20 focus:border-accent rounded-full text-white text-xs focus:outline-none transition-colors"
                        />
                        {formErrors.lastName && <span className="text-red-400 text-[0.65rem] mt-0.5 block">{formErrors.lastName}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[0.7rem] text-gray-300 font-medium mb-1">Email*</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eg. example@gmail.com"
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 focus:border-accent rounded-full text-white text-xs focus:outline-none transition-colors"
                      />
                      {formErrors.email && <span className="text-red-400 text-[0.65rem] mt-0.5 block">{formErrors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-[0.7rem] text-gray-300 font-medium mb-1">Mobile Number*</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="91 9876543210"
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 focus:border-accent rounded-full text-white text-xs focus:outline-none transition-colors"
                      />
                      {formErrors.phone && <span className="text-red-400 text-[0.65rem] mt-0.5 block">{formErrors.phone}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[0.7rem] text-gray-300 font-medium mb-1">City*</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Eg. Mumbai"
                          className="w-full px-4 py-2.5 bg-black/60 border border-white/20 focus:border-accent rounded-full text-white text-xs focus:outline-none transition-colors"
                        />
                        {formErrors.city && <span className="text-red-400 text-[0.65rem] mt-0.5 block">{formErrors.city}</span>}
                      </div>
                      <div>
                        <label className="block text-[0.7rem] text-gray-300 font-medium mb-1">State*</label>
                        <select 
                          value={formData.state}
                          onChange={e => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-2.5 bg-black/60 border border-white/20 focus:border-accent rounded-full text-white text-xs focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Enter your state</option>
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st} className="bg-[#020403] text-white">{st}</option>
                          ))}
                        </select>
                        {formErrors.state && <span className="text-red-400 text-[0.65rem] mt-0.5 block">{formErrors.state}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[0.7rem] text-gray-300 font-medium mb-1">PinCode*</label>
                      <input 
                        type="text" 
                        maxLength={6}
                        value={formData.pincode}
                        onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="400097"
                        className="w-full px-4 py-2.5 bg-black/60 border border-white/20 focus:border-accent rounded-full text-white text-xs focus:outline-none transition-colors"
                      />
                      {formErrors.pincode && <span className="text-red-400 text-[0.65rem] mt-0.5 block">{formErrors.pincode}</span>}
                    </div>

                    {/* Proceed As */}
                    <div className="pt-1">
                      <label className="block text-[0.7rem] text-gray-300 font-medium mb-1.5">Proceed as*</label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {['Business', 'Individual'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, proceedAs: type })}
                            className={`py-2 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                              formData.proceedAs === type
                                ? 'bg-accent/20 border-accent text-accent shadow-[0_0_12px_rgba(0,255,0,0.25)]'
                                : 'bg-black/40 border-white/15 text-gray-400 hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full py-3 bg-[#FF3B30] sm:bg-accent text-white sm:text-black font-mono font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_20px_#00FF00] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        Next
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </form>
                )}

                {/* ── STEP 2: INVESTMENT BUDGET & LAND SCOPE ── */}
                {formStep === 2 && (
                  <form onSubmit={handleNextStep2} className="space-y-4 relative z-10">
                    {/* Turnover (only if Business) */}
                    {formData.proceedAs === 'Business' && (
                      <div>
                        <label className="block text-[0.7rem] text-gray-300 font-medium mb-1.5">
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
                                  ? 'bg-accent/20 border-accent text-accent'
                                  : 'bg-black/40 border-white/15 text-gray-400 hover:text-white'
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
                      <label className="block text-[0.7rem] text-gray-300 font-medium mb-1.5">
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
                                ? 'bg-accent/20 border-accent text-accent'
                                : 'bg-black/40 border-white/15 text-gray-400 hover:text-white'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Land Availability */}
                    <div>
                      <label className="block text-[0.7rem] text-gray-300 font-medium mb-1.5">
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
                                ? 'bg-accent/20 border-accent text-accent'
                                : 'bg-black/40 border-white/15 text-gray-400 hover:text-white'
                            }`}
                          >
                            {ans}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Environment */}
                    {formData.landAvailability === 'Yes' && (
                      <div>
                        <label className="block text-[0.7rem] text-gray-300 font-medium mb-1.5">
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
                                  ? 'bg-accent/20 border-accent text-accent'
                                  : 'bg-black/40 border-white/15 text-gray-400 hover:text-white'
                              }`}
                            >
                              {loc}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="w-1/3 py-2.5 rounded-full border border-white/20 text-gray-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-2.5 bg-[#FF3B30] sm:bg-accent text-white sm:text-black font-mono font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        Next
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </form>
                )}

                {/* ── STEP 3: SUMMARY VERIFICATION & SUBMISSION ── */}
                {formStep === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div className="p-4 rounded-2xl bg-black/60 border border-white/15 space-y-2 text-xs">
                      <div className="text-[0.68rem] font-mono text-accent font-bold uppercase border-b border-white/10 pb-1">
                        Check your details and Submit
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[0.72rem]">
                        <div><span className="text-gray-400">Name:</span> <span className="text-white font-medium">{formData.firstName} {formData.lastName}</span></div>
                        <div><span className="text-gray-400">Phone:</span> <span className="text-white font-medium">+91 {formData.phone}</span></div>
                        <div className="col-span-2"><span className="text-gray-400">Email:</span> <span className="text-white font-medium break-all">{formData.email}</span></div>
                        <div><span className="text-gray-400">Location:</span> <span className="text-white font-medium">{formData.city}, {formData.state}</span></div>
                        <div><span className="text-gray-400">Pincode:</span> <span className="text-white font-medium">{formData.pincode}</span></div>
                        <div><span className="text-gray-400">Budget:</span> <span className="text-accent font-bold">{formData.investmentBudget}</span></div>
                        <div><span className="text-gray-400">Land:</span> <span className="text-white font-medium">{formData.landAvailability} ({formData.locationType})</span></div>
                      </div>
                    </div>

                    {/* Webinar checkbox */}
                    <div className="flex items-start gap-2.5 pt-1 cursor-pointer">
                      <input 
                        type="checkbox"
                        id="webinarCheck2"
                        checked={formData.webinarInterest}
                        onChange={e => setFormData({ ...formData, webinarInterest: e.target.checked })}
                        className="mt-0.5 accent-accent w-3.5 h-3.5 cursor-pointer"
                      />
                      <label htmlFor="webinarCheck2" className="text-[0.7rem] text-gray-300 cursor-pointer leading-tight">
                        Webinar session on franchise opportunity: <strong>Interested</strong>
                      </label>
                    </div>

                    {/* Privacy policy checkbox */}
                    <div className="flex items-start gap-2.5 cursor-pointer">
                      <input 
                        type="checkbox"
                        id="privacyCheck2"
                        checked={formData.privacyAccepted}
                        onChange={e => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                        className="mt-0.5 accent-accent w-3.5 h-3.5 cursor-pointer"
                      />
                      <label htmlFor="privacyCheck2" className="text-[0.68rem] text-gray-400 cursor-pointer leading-tight">
                        I agree to the use of my info for communication and support.
                      </label>
                    </div>

                    <div className="pt-2 flex justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="w-1/3 py-2.5 rounded-full border border-white/20 text-gray-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 py-2.5 bg-[#FF3B30] sm:bg-accent text-white sm:text-black font-mono font-bold text-xs uppercase tracking-wider rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_20px_#00FF00] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
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
              </motion.div>
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════════
            3. WHY PARTNER WITH US? (DOCO MODEL EXPLAINED)
           ══════════════════════════════════════════════════════════════════════════ */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pb-32 relative z-10">
          <section className="mb-28">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Turnkey EV Infrastructure</span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mt-2 mb-4">
                Why Partner With Axion?
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed font-sans">
                Our Franchise Model, formerly known as the Dealer Owned Company Operated (DOCO) Model, is a turnkey investment opportunity that plugs you directly into India’s largest EV charging network, complete with tech, operations, and marketing support for long-term ROI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-accent/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <MapPin size={22} />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-black text-white mb-2">15,000+</div>
                <h4 className="text-lg font-bold text-white mb-2">Charging Points Across India</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Established presence spanning major national expressways, key state transit corridors, high-density residential complexes, and premium commercial malls.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-accent/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={22} />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-black text-white mb-2">24x7 Support</div>
                <h4 className="text-lg font-bold text-white mb-2">98% Network Uptime</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Continuous IoT telemetry, remote automated firmware self-healing, dedicated regional field service engineers, and an in-house round-the-clock helpline.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 hover:border-accent/40 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={22} />
                </div>
                <div className="text-3xl sm:text-4xl font-display font-black text-white mb-2">Solar + BESS</div>
                <h4 className="text-lg font-bold text-white mb-2">Green Energy Options</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Architectural integration with rooftop Solar PV arrays and Battery Energy Storage Systems (BESS) for zero-emission operations and peak-tariff shaving.
                </p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════════════
              4. DUAL INVESTMENT MODELS (FAST VS SUPER CHARGING)
             ══════════════════════════════════════════════════════════════════════════ */}
          <section id="investment-plans" className="mb-32 scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Tailored Investment Portfolios</span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mt-2 mb-4">
                Choose Your Investment Plan. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">We’ll Power the Rest.</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether you're entering the EV space for the first time or expanding a larger energy portfolio, we offer a scalable, high-ROI franchise model built for the future. Two tailored investment models designed to suit different scales of ambition for landowners, retail entrepreneurs, and institutional investors.
              </p>

              {/* Tab Switcher */}
              <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 mt-8">
                <button
                  onClick={() => setActiveModelTab('fast')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    activeModelTab === 'fast'
                      ? 'bg-accent text-black shadow-[0_0_15px_#00FF00]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Fast Charging Stations
                </button>
                <button
                  onClick={() => setActiveModelTab('super')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                    activeModelTab === 'super'
                      ? 'bg-accent text-black shadow-[0_0_15px_#00FF00]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Super Charging Stations
                </button>
              </div>
            </div>

            {/* Model Card Display */}
            <div className="w-full max-w-5xl mx-auto">
              {activeModelTab === 'fast' ? (
                <motion.div 
                  key="fast"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-gradient-to-b from-[#06140A] to-[#020503] border border-accent/40 p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-10">
                    <div className="w-full lg:w-1/2">
                      <div className="inline-block px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent font-mono text-[0.7rem] uppercase font-bold mb-3">
                        Model 01 • Passenger Vehicle Hubs
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase mb-2">
                        Fast Charging Stations
                      </h3>
                      <div className="text-2xl sm:text-3xl font-display font-black text-accent mb-6">
                        Starting at ₹25 Lakhs*
                      </div>

                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Charger Options:</strong> 30, 60, 120 kW DC (Single/Dual Gun)</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Vehicle Type:</strong> 4-wheeler passenger EVs (CCS2 compatible)</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Space Needed:</strong> ~550 sq. ft. (2 car parking bays)</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Power Connection:</strong> 50–150 kVA sanctioned load, plug-and-play setup</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Ideal Locations:</strong> Highways, office parks, malls, residential societies, hotels</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Support Includes:</strong> CMS dashboard, 24x7 tech support, marketing assistance</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Typical Payback:</strong> 2 to 4 Years</span>
                        </li>
                      </ul>

                      <div className="mt-8">
                        <button
                          onClick={() => scrollToForm({ model: 'fast' })}
                          className="px-8 py-3.5 bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_25px_#00FF00] transition-all flex items-center gap-2 cursor-pointer"
                        >
                          Apply For Fast Charging Station
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
                      <img src={fastChargerImg} alt="Fast Charging Station" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                        <span className="text-accent font-mono font-bold uppercase">Plug & Play Setup</span>
                        <p className="text-gray-300 text-[0.72rem] mt-0.5">Compatible with 100% of Indian passenger EVs including Tata, MG, Mahindra, BYD, and Hyundai.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="super"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-3xl bg-gradient-to-b from-[#0A1810] to-[#020503] border border-accent/40 p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex flex-col lg:flex-row items-center gap-10">
                    <div className="w-full lg:w-1/2">
                      <div className="inline-block px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent font-mono text-[0.7rem] uppercase font-bold mb-3">
                        Model 02 • High-Throughput & Commercial Fleets
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase mb-2">
                        Super Charging Stations
                      </h3>
                      <div className="text-2xl sm:text-3xl font-display font-black text-accent mb-6">
                        Starting at ₹1 Crore*
                      </div>

                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Charger Options:</strong> 240 kW & 360 kW DC Ultra-Fast Dispensers</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Scalability:</strong> Modular expansion up to 1.2 MW with multi-gun array</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Vehicle Compatibility:</strong> 4-wheelers, e-buses, and heavy commercial trucks</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Space Requirement:</strong> Larger footprint accommodating commercial & fleet vehicles</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Power Infrastructure:</strong> 250–1,200 kVA load with optional Solar + BESS integration</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Ideal Locations:</strong> National highways, logistics hubs, bus depots, city expressways</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                          <span><strong>Typical Payback:</strong> 3 to 5 Years</span>
                        </li>
                      </ul>

                      <div className="mt-8">
                        <button
                          onClick={() => scrollToForm({ model: 'super' })}
                          className="px-8 py-3.5 bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_25px_#00FF00] transition-all flex items-center gap-2 cursor-pointer"
                        >
                          Apply For Super Charging Hub
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 h-[340px] sm:h-[400px] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
                      <img src={superChargerImg} alt="Super Charging Hub" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                        <span className="text-accent font-mono font-bold uppercase">Mega-Watt Class Depot</span>
                        <p className="text-gray-300 text-[0.72rem] mt-0.5">Liquid-cooled heavy duty architecture delivering 200 km range in under 12 minutes.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════════════
              5. SBI EV MITRA SCHEME FINANCING HUB
             ══════════════════════════════════════════════════════════════════════════ */}
          <section className="mb-32">
            <div className="p-8 sm:p-12 lg:p-16 rounded-[2.5rem] bg-gradient-to-b from-[#05140A] via-[#020804] to-[#010402] border border-accent/30 relative overflow-hidden">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Banking Enablement</span>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mt-2 mb-3">
                  Powered by Axion. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300">
                    Enabled by SBI’s EV Mitra Scheme.
                  </span>
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Whether you're stepping into your first smart investment or looking to expand into future-ready infrastructure, the Axion Franchise program is backed by India's most trusted financial institution, State Bank of India, and powered by Axion’s market-leading EV tech ecosystem.
                </p>
                <div className="mt-3 text-accent font-mono font-bold text-sm">
                  From ₹25 Lakhs to ₹10 Cr, you can build your station without breaking the bank.
                </div>
              </div>

              {/* 4 Pillars of Finance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 hover:border-accent/40 transition-colors">
                  <div className="text-accent font-mono text-xs font-bold uppercase mb-2">Low Cost Borrowing</div>
                  <div className="text-3xl font-display font-black text-white mb-2">6.7%*</div>
                  <p className="text-gray-400 text-xs">Special green concession rates under public sustainable lending schemes.</p>
                </div>

                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 hover:border-accent/40 transition-colors">
                  <div className="text-accent font-mono text-xs font-bold uppercase mb-2">Low Equity Required</div>
                  <div className="text-3xl font-display font-black text-white mb-2">75% Funded</div>
                  <p className="text-gray-400 text-xs">Finance up to 75% of your total hardware and turnkey installation cost.</p>
                </div>

                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 hover:border-accent/40 transition-colors">
                  <div className="text-accent font-mono text-xs font-bold uppercase mb-2">Flexible Repayment</div>
                  <div className="text-3xl font-display font-black text-white mb-2">Up to 7 Yrs*</div>
                  <p className="text-gray-400 text-xs">Comfortable loan amortization tenure aligned with site cashflow ramp-up.</p>
                </div>

                <div className="p-6 rounded-2xl bg-black/60 border border-white/10 hover:border-accent/40 transition-colors">
                  <div className="text-accent font-mono text-xs font-bold uppercase mb-2">Security Terms</div>
                  <div className="text-3xl font-display font-black text-white mb-2">Collateral-Free</div>
                  <p className="text-gray-400 text-xs">No personal guarantees required for qualifying business profiles and locations.</p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <button
                  onClick={() => scrollToForm()}
                  className="px-8 py-3.5 bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_25px_#00FF00] transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  Inquire About SBI Financing
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════════════
              6. BRAND & OEM PARTNERS MARQUEE
             ══════════════════════════════════════════════════════════════════════════ */}
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

          {/* ══════════════════════════════════════════════════════════════════════════
              7. WEBINAR / MASTERCLASS REGISTRATION MODULE
             ══════════════════════════════════════════════════════════════════════════ */}
          <section className="mb-32">
            <div className="p-8 sm:p-12 lg:p-16 rounded-[2.5rem] bg-gradient-to-br from-[#06140B] via-[#030905] to-[#010402] border border-accent/30 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-7/12">
                  <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">
                    Masterclass Series
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white uppercase mt-2 mb-4">
                    Curious, but have questions? <br/>
                    <span className="text-accent">Join Our Next Webinar.</span>
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
                    Focusing on the Franchise Opportunity, this session covers how EV charging networks are revolutionizing infrastructure in India. Discover innovative site selection strategies, technological integration, tariff economics, and SBI financing options.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {[
                      "End-to-end walkthrough of owning an Axion franchise",
                      "Exclusive insights on expected ROI by industry experts",
                      "Strategic guidance on investment models & site selection",
                      "Live Q&A with EV charging engineers and finance specialists"
                    ].map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollToForm({ webinar: true })}
                    className="px-8 py-4 bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_30px_#00FF00] transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    Reserve Seat for Next Webinar
                    <ArrowRight size={16} />
                  </button>
                </div>

                <div className="w-full lg:w-5/12 h-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
                  <img src={webinarImg} alt="EV Masterclass Webinar" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-white text-xs font-bold">Upcoming Live Session</div>
                      <div className="text-accent font-mono text-[0.7rem]">Held Every Alternate Thursday • 4:00 PM IST</div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-accent animate-ping" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════════════
              8. COMPREHENSIVE FAQS ACCORDION (ALL 7 QUESTIONS)
             ══════════════════════════════════════════════════════════════════════════ */}
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

          {/* ══════════════════════════════════════════════════════════════════════════
              9. STATUTORY DISCLAIMER & PM E-DRIVE COMPLIANCE
             ══════════════════════════════════════════════════════════════════════════ */}
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
