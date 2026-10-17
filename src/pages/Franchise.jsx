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
import heroImg from '../assets/images/franchise_hero.webp';
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
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative font-sans text-gray-200">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />
        <div className="absolute top-1/3 left-[-15%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-[-10%] w-[700px] h-[700px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-24 relative z-10">
          
          {/* ══════════════════════════════════════════════════════════
              1. HERO SECTION (BUILD THE FUTURE OF E-MOBILITY)
             ══════════════════════════════════════════════════════════ */}
          <div className="flex flex-col xl:flex-row items-center justify-between gap-12 lg:gap-20 mb-28 relative">
            
            <div className="w-full xl:w-1/2 flex flex-col items-start relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 mb-6 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00FF00]" />
                <span className="text-accent font-mono text-[0.72rem] uppercase tracking-[0.2em] font-bold">
                  B2B FRANCHISE PROGRAM • PM E-DRIVE ENABLED
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white uppercase tracking-tight mb-6 leading-[1.08]"
              >
                Build the Future of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-300 to-white drop-shadow-sm">
                  E-Mobility.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed mb-8 border-l-2 border-accent/60 pl-5"
              >
                Be a franchise partner with India’s fastest-growing EV charging network. Start your station starting at just <strong className="text-accent font-mono">₹25 lakhs*</strong> with turnkey setup, SBI financing, and guaranteed tech support.
              </motion.p>

              {/* Stat Badges */}
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="grid grid-cols-3 gap-3 w-full max-w-xl mb-10"
              >
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                  <div className="text-accent font-mono text-xs font-bold uppercase tracking-wider mb-1">Starting</div>
                  <div className="text-white font-display text-xl sm:text-2xl font-black">₹25 Lakhs*</div>
                  <div className="text-gray-400 text-[0.65rem] mt-0.5">Fast DC Hubs</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                  <div className="text-accent font-mono text-xs font-bold uppercase tracking-wider mb-1">Bank Loan</div>
                  <div className="text-white font-display text-xl sm:text-2xl font-black">Up to 75%</div>
                  <div className="text-gray-400 text-[0.65rem] mt-0.5">SBI EV Mitra</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                  <div className="text-accent font-mono text-xs font-bold uppercase tracking-wider mb-1">Payback</div>
                  <div className="text-white font-display text-xl sm:text-2xl font-black">2–4 Yrs</div>
                  <div className="text-gray-400 text-[0.65rem] mt-0.5">Typical ROI</div>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full max-w-xl"
              >
                <button 
                  onClick={() => scrollToForm()}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-accent text-black text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_0_35px_rgba(0,255,0,0.5)] cursor-pointer"
                >
                  Partner With Us
                  <ArrowRight size={17} />
                </button>
                <button 
                  onClick={() => document.getElementById('investment-plans')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-accent text-white text-sm font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Explore Models
                  <ChevronDown size={17} />
                </button>
              </motion.div>
            </div>
            
            {/* Right Side Visual Showcase */}
            <div className="w-full xl:w-1/2 relative h-[440px] sm:h-[520px] lg:h-[600px] z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-accent/25 shadow-[0_20px_70px_rgba(0,0,0,0.9)] z-10"
              >
                <img 
                  src={plazaImg} 
                  alt="Axion Charging Station Plaza" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020403] via-black/40 to-transparent" />
              </motion.div>

              {/* Floating Widget 1: Revenue Graph */}
              <motion.div 
                initial={{ opacity: 0, x: 40, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-4 right-2 sm:-right-4 lg:bottom-10 lg:-right-6 w-64 sm:w-72 p-5 rounded-2xl bg-[#030805]/95 backdrop-blur-xl border border-accent/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/70 text-[0.68rem] font-mono uppercase tracking-wider">Projected Hub ROI</span>
                  <TrendingUp className="text-accent w-4 h-4" />
                </div>
                <div className="flex items-end gap-2 h-16 mb-3">
                  {[35, 55, 45, 75, 60, 85, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/5 rounded-t-sm h-full relative overflow-hidden">
                      <div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-accent to-accent/50 rounded-t-sm" 
                        style={{ height: `${h}%` }} 
                      />
                    </div>
                  ))}
                </div>
                <div className="text-white font-display text-2xl font-bold">
                  ₹18,40,000 <span className="text-accent text-xs font-mono font-normal">/ yr net</span>
                </div>
                <div className="text-gray-400 text-[0.65rem] font-mono mt-0.5">Based on 6-gun 60kW DC setup</div>
              </motion.div>

              {/* Floating Widget 2: Uptime Pill */}
              <motion.div 
                initial={{ opacity: 0, x: -30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute top-6 left-2 sm:-left-4 lg:top-12 lg:-left-6 px-5 py-3.5 rounded-xl bg-[#030805]/95 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-20 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50">
                  <ShieldCheck className="text-accent w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-xs">Turnkey DOCO Model</div>
                  <div className="text-accent text-[0.65rem] font-mono font-bold tracking-widest uppercase">98% Guaranteed Uptime</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              2. INTERACTIVE 3-STEP LEAD WIZARD ("PARTNER WITH US")
             ══════════════════════════════════════════════════════════ */}
          <section id="franchise-form" ref={formRef} className="mb-32 scroll-mt-24">
            <div className="w-full max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#051108] via-[#030905] to-[#020503] border border-accent/30 p-6 sm:p-10 md:p-14 shadow-[0_20px_80px_rgba(0,0,0,0.85)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Form Title & Stepper */}
              <div className="mb-8 relative z-10 text-center">
                <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Fast-Track Onboarding</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase mt-1 mb-3">Partner With Us</h2>
                <p className="text-gray-400 text-sm max-w-lg mx-auto">
                  Step into the future of clean energy. Fill out the 3 quick steps below to receive a personalized site assessment and ROI projection.
                </p>

                {/* Progress Indicators */}
                <div className="flex items-center justify-center gap-3 mt-6">
                  {[
                    { num: 1, label: "Basic Details" },
                    { num: 2, label: "Investment & Land" },
                    { num: 3, label: "Review & Submit" }
                  ].map((s) => (
                    <div key={s.num} className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        formStep === s.num
                          ? 'bg-accent text-black shadow-[0_0_12px_#00FF00]'
                          : formStep > s.num
                          ? 'bg-accent/30 text-accent border border-accent/60'
                          : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}>
                        {formStep > s.num ? <Check size={14} /> : s.num}
                      </div>
                      <span className="hidden sm:inline text-xs font-medium text-gray-300">{s.label}</span>
                      {s.num < 3 && <div className="w-6 sm:w-10 h-[1px] bg-white/10 mx-1" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Banner */}
              <AnimatePresence>
                {status.type && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-sans ${
                      status.type === 'success'
                        ? 'bg-accent/10 border border-accent/40 text-accent shadow-[0_0_20px_rgba(0,255,0,0.2)]'
                        : 'bg-red-500/10 border border-red-500/40 text-red-400'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-accent" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── STEP 1: CONTACT DETAILS & ENTITY ── */}
              {formStep === 1 && (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleNextStep1}
                  className="space-y-5 relative z-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">First Name *</label>
                      <input 
                        type="text" 
                        value={formData.firstName}
                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="eg. Rahul"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-accent rounded-xl text-white text-sm focus:outline-none transition-colors"
                      />
                      {formErrors.firstName && <span className="text-red-400 text-xs mt-1 block">{formErrors.firstName}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">Last Name *</label>
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="eg. Sharma"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-accent rounded-xl text-white text-sm focus:outline-none transition-colors"
                      />
                      {formErrors.lastName && <span className="text-red-400 text-xs mt-1 block">{formErrors.lastName}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">Email Address *</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rahul@example.com"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-accent rounded-xl text-white text-sm focus:outline-none transition-colors"
                      />
                      {formErrors.email && <span className="text-red-400 text-xs mt-1 block">{formErrors.email}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">Mobile Number *</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="9876543210"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-accent rounded-xl text-white text-sm focus:outline-none transition-colors"
                      />
                      {formErrors.phone && <span className="text-red-400 text-xs mt-1 block">{formErrors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">City *</label>
                      <input 
                        type="text" 
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        placeholder="eg. Mumbai"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-accent rounded-xl text-white text-sm focus:outline-none transition-colors"
                      />
                      {formErrors.city && <span className="text-red-400 text-xs mt-1 block">{formErrors.city}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">State *</label>
                      <select 
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-accent rounded-xl text-white text-sm focus:outline-none transition-colors"
                      >
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st} className="bg-[#020403] text-white">{st}</option>
                        ))}
                      </select>
                      {formErrors.state && <span className="text-red-400 text-xs mt-1 block">{formErrors.state}</span>}
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-1.5">PinCode *</label>
                      <input 
                        type="text" 
                        maxLength={6}
                        value={formData.pincode}
                        onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="400097"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-accent rounded-xl text-white text-sm focus:outline-none transition-colors"
                      />
                      {formErrors.pincode && <span className="text-red-400 text-xs mt-1 block">{formErrors.pincode}</span>}
                    </div>
                  </div>

                  {/* Proceed As */}
                  <div className="pt-2">
                    <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-2">Proceed as *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Business', 'Individual'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, proceedAs: type })}
                          className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                            formData.proceedAs === type
                              ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(0,255,0,0.25)]'
                              : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_25px_#00FF00] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ── STEP 2: SCOPE, BUDGET & LAND AVAILABILITY ── */}
              {formStep === 2 && (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleNextStep2}
                  className="space-y-6 relative z-10"
                >
                  {/* Turnover (only if Business) */}
                  {formData.proceedAs === 'Business' && (
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-2.5">
                        Business Annual Turnover *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {['1L - 50L', '50L - 1Cr', '1Cr - 5 Cr', '>5Cr'].map((to) => (
                          <button
                            key={to}
                            type="button"
                            onClick={() => setFormData({ ...formData, businessTurnover: to })}
                            className={`py-3 px-3 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                              formData.businessTurnover === to
                                ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(0,255,0,0.25)]'
                                : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
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
                    <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-2.5">
                      Investment Budget *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {(formData.proceedAs === 'Business' 
                        ? ['25L - 50L', '50L - 1Cr', '1Cr - 5 Cr', '5Cr+'] 
                        : ['15L - 25L', '25L - 50L', '50L - 1Cr', '1Cr+']
                      ).map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, investmentBudget: b })}
                          className={`py-3 px-3 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                            formData.investmentBudget === b
                              ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(0,255,0,0.25)]'
                              : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Land Availability */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-2.5">
                      Do you have available land/parking space? *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Yes', 'No'].map((ans) => (
                        <button
                          key={ans}
                          type="button"
                          onClick={() => setFormData({ ...formData, landAvailability: ans })}
                          className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                            formData.landAvailability === ans
                              ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(0,255,0,0.25)]'
                              : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                          }`}
                        >
                          {ans === 'Yes' ? 'Yes, I have space' : 'No, need site assistance'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location Type (if land available) */}
                  {formData.landAvailability === 'Yes' && (
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-300 font-bold mb-2.5">
                        Location Environment *
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['City', 'Highway'].map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => setFormData({ ...formData, locationType: loc })}
                            className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                              formData.locationType === loc
                                ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(0,255,0,0.25)]'
                                : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                            }`}
                          >
                            {loc === 'City' ? 'City (Mall, Society, Office)' : 'Highway Corridor / Transport Hub'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="px-6 py-3 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-mono font-bold transition-all cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_25px_#00FF00] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Next Step
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ── STEP 3: SUMMARY VERIFICATION & SUBMISSION ── */}
              {formStep === 3 && (
                <motion.form 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-accent border-b border-white/10 pb-2">
                      Application Summary
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-gray-400 block font-mono text-[0.7rem]">Applicant Name</span>
                        <span className="text-white font-semibold">{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-mono text-[0.7rem]">Email</span>
                        <span className="text-white font-semibold break-all">{formData.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-mono text-[0.7rem]">Phone</span>
                        <span className="text-white font-semibold">+91 {formData.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-mono text-[0.7rem]">Location</span>
                        <span className="text-white font-semibold">{formData.city}, {formData.state} ({formData.pincode})</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-mono text-[0.7rem]">Proceeding As</span>
                        <span className="text-white font-semibold">{formData.proceedAs}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-mono text-[0.7rem]">Investment Budget</span>
                        <span className="text-accent font-mono font-bold">{formData.investmentBudget}</span>
                      </div>
                      {formData.proceedAs === 'Business' && (
                        <div>
                          <span className="text-gray-400 block font-mono text-[0.7rem]">Annual Turnover</span>
                          <span className="text-white font-semibold">{formData.businessTurnover}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-400 block font-mono text-[0.7rem]">Land Available</span>
                        <span className="text-white font-semibold">{formData.landAvailability} ({formData.locationType})</span>
                      </div>
                    </div>
                  </div>

                  {/* Webinar Interest Checkbox */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      id="webinarCheck"
                      checked={formData.webinarInterest}
                      onChange={e => setFormData({ ...formData, webinarInterest: e.target.checked })}
                      className="mt-0.5 accent-accent w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="webinarCheck" className="text-xs text-gray-300 cursor-pointer">
                      <strong>Join next Franchise Masterclass Webinar:</strong> I would like to receive an invite for the live masterclass session on EV station economics and ROI strategy.
                    </label>
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex items-start gap-3">
                    <input 
                      type="checkbox"
                      id="privacyCheck"
                      checked={formData.privacyAccepted}
                      onChange={e => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      className="mt-0.5 accent-accent w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="privacyCheck" className="text-xs text-gray-400 cursor-pointer">
                      I agree to the use of my information for official communication, feasibility reports, and franchise onboarding support.
                    </label>
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="px-6 py-3 rounded-xl border border-white/15 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-mono font-bold transition-all cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white hover:shadow-[0_0_30px_#00FF00] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Franchise Application
                          <Check size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              3. MACRO MARKET STATS ("INDIA IS CHARGING AHEAD")
             ══════════════════════════════════════════════════════════ */}
          <section className="mb-32">
            <div className="p-8 sm:p-12 lg:p-16 rounded-[2.5rem] bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">National Momentum</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white uppercase mb-4 leading-tight">
                    India is Charging Ahead. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Are You?</span>
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    With India targeting 30% EV penetration across all vehicle segments by 2030, the demand for fast, reliable, and accessible commercial charging infrastructure is skyrocketing. Now is the perfect time to ride the EV wave — not just as a believer, but as an owner of the future.
                  </p>
                </div>

                <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-black/60 border border-accent/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                    <div>
                      <span className="text-accent font-mono text-[0.7rem] uppercase tracking-wider font-bold">Government Allocation</span>
                      <div className="text-3xl sm:text-4xl font-display font-black text-white mt-2 mb-1">₹4,000+ Cr</div>
                      <p className="text-gray-400 text-xs">Allocated to EV public charging infrastructure under the central PM E‑DRIVE Scheme.</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl bg-black/60 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                    <div>
                      <span className="text-emerald-400 font-mono text-[0.7rem] uppercase tracking-wider font-bold">Compound Growth</span>
                      <div className="text-3xl sm:text-4xl font-display font-black text-white mt-2 mb-1">17.1% YoY</div>
                      <p className="text-gray-400 text-xs">Annual electric vehicle sales growth across commercial fleets and passenger cars.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              4. WHY PARTNER WITH US? (DOCO MODEL EXPLAINED)
             ══════════════════════════════════════════════════════════ */}
          <section className="mb-32">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Turnkey EV Infrastructure</span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white uppercase mt-2 mb-4">
                Why Partner With Axion?
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our Franchise Model, formerly known as the Dealer Owned Company Operated (DOCO) Model, is a turnkey investment opportunity that plugs you directly into our national EV charging network, complete with tech, operations, and marketing support for long-term ROI.
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

          {/* ══════════════════════════════════════════════════════════
              5. DUAL INVESTMENT MODELS (FAST VS SUPER CHARGING)
             ══════════════════════════════════════════════════════════ */}
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

          {/* ══════════════════════════════════════════════════════════
              6. SBI EV MITRA SCHEME FINANCING HUB
             ══════════════════════════════════════════════════════════ */}
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

          {/* ══════════════════════════════════════════════════════════
              7. BRAND & OEM PARTNERS MARQUEE
             ══════════════════════════════════════════════════════════ */}
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

          {/* ══════════════════════════════════════════════════════════
              8. WEBINAR / MASTERCLASS REGISTRATION MODULE
             ══════════════════════════════════════════════════════════ */}
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
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
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

          {/* ══════════════════════════════════════════════════════════
              9. COMPREHENSIVE FAQS ACCORDION (ALL 7 QUESTIONS)
             ══════════════════════════════════════════════════════════ */}
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
                        className="px-5 pb-5 text-gray-300 text-sm leading-relaxed whitespace-pre-line border-t border-white/5 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
              10. STATUTORY DISCLAIMER & PM E-DRIVE COMPLIANCE
             ══════════════════════════════════════════════════════════ */}
          <section className="p-6 sm:p-8 rounded-2xl bg-black/80 border border-white/10 text-xs text-gray-400 leading-relaxed max-w-4xl mx-auto">
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
