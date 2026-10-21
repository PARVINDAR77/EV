import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator as CalcIcon, 
  Zap, 
  TrendingUp, 
  Plus, 
  Minus, 
  Trash2, 
  PlusCircle, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';

// The identical AXION Charger Models catalog from the original ROI Calculator
export const CHARGER_MODELS = [
  // ── AC Charging Wallboxes ──
  {
    id: 'ac-3-3kw',
    name: 'Axion 3.3 kW AC (AXION 3 Multi-Socket)',
    shortName: '3.3 kW Multi-Socket AC',
    category: 'AC Chargers',
    powerKw: 3.3,
    price: 14900,
    defaultKwh: 20,
    defaultSessions: 6,
  },
  {
    id: 'ac-7-4kw',
    name: 'Axion 7.4 kW AC (Axion Pro)',
    shortName: '7.4 kW Axion Pro AC',
    category: 'AC Chargers',
    powerKw: 7.4,
    price: 59900,
    defaultKwh: 20,
    defaultSessions: 6,
  },
  {
    id: 'ac-7-4kw-compact',
    name: 'Axion 7.4 kW AC (Axion Compact)',
    shortName: '7.4 kW Axion Compact AC',
    category: 'AC Chargers',
    powerKw: 7.4,
    price: 49900,
    defaultKwh: 20,
    defaultSessions: 6,
  },
  {
    id: 'ac-11kw',
    name: 'Axion 11 kW AC (Commercial 3-Phase)',
    shortName: '11 kW 3-Phase AC',
    category: 'AC Chargers',
    powerKw: 11,
    price: 74900,
    defaultKwh: 20,
    defaultSessions: 7,
  },
  {
    id: 'ac-22kw',
    name: 'Axion 22 kW AC (Axion Ultra)',
    shortName: '22 kW Axion Ultra AC',
    category: 'AC Chargers',
    powerKw: 22,
    price: 89900,
    defaultKwh: 20,
    defaultSessions: 8,
  },

  // ── DC Fast Chargers ──
  {
    id: 'dc-30kw',
    name: 'Axion DC Fast (30kW)',
    shortName: '30 kW DC Fast',
    category: 'DC Fast Chargers',
    powerKw: 30,
    price: 499900,
    defaultKwh: 20,
    defaultSessions: 10,
  },
  {
    id: 'dc-60kw',
    name: 'Axion DC Fast (60kW Dual Gun)',
    shortName: '60 kW DC Dual Gun',
    category: 'DC Fast Chargers',
    powerKw: 60,
    price: 699900,
    defaultKwh: 20,
    defaultSessions: 14,
  },
  {
    id: 'dc-120kw',
    name: 'Axion DC Ultra-Fast (120kW Highway Dual)',
    shortName: '120 kW DC Highway Dual',
    category: 'DC Fast Chargers',
    powerKw: 120,
    price: 999900,
    defaultKwh: 20,
    defaultSessions: 18,
  },
  {
    id: 'dc-240kw',
    name: 'Axion DC Hyper-Fast (240kW Heavy Duty)',
    shortName: '240 kW DC Hyper-Fast',
    category: 'DC Fast Chargers',
    powerKw: 240,
    price: 1899900,
    defaultKwh: 20,
    defaultSessions: 20,
  },
];

const MultiChargerCalculator = () => {
  const location = useLocation();

  // Selected chargers list: each item has { id, modelId, quantity, customPrice }
  const [selectedChargers, setSelectedChargers] = useState([
    { id: 'item-1', modelId: 'ac-7-4kw', quantity: 2, customPrice: 59900 },
    { id: 'item-2', modelId: 'dc-60kw', quantity: 1, customPrice: 699900 }
  ]);

  // Overall sessions per charger per day (traffic slider)
  const [sessionsPerCharger, setSessionsPerCharger] = useState(6);
  const [timeHorizon, setTimeHorizon] = useState('monthly'); // 'daily' | 'monthly' | 'yearly'
  const [breakEvenUnit, setBreakEvenUnit] = useState('months'); // 'months' | 'years'

  // Assumptions matching original ROI Calculator:
  // Box 1 = Tariff to driver (₹20/kWh)
  // Box 2 = Power cost (₹10/kWh)
  // Box 3 = kWh per vehicle (20 kWh)
  // Box 4 = Total Hardware Investment (dynamically calculated from all selected chargers)
  const [tariff, setTariff] = useState(20);
  const [powerCost, setPowerCost] = useState(10);
  const [kwhPerVehicle, setKwhPerVehicle] = useState(20);

  // Sync if URL search params provide an initial charger
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawId = params.get('model') || params.get('charger');
    if (rawId) {
      const match = CHARGER_MODELS.find(c => c.id === rawId);
      if (match) {
        setSelectedChargers([
          { id: `item-${Date.now()}`, modelId: match.id, quantity: 2, customPrice: match.price }
        ]);
      }
    }
  }, [location.search]);

  // Helper to add a new charger row
  const handleAddCharger = () => {
    const usedModelIds = selectedChargers.map(c => c.modelId);
    const nextModel = CHARGER_MODELS.find(m => !usedModelIds.includes(m.id)) || CHARGER_MODELS[0];
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      modelId: nextModel.id,
      quantity: 1,
      customPrice: nextModel.price
    };
    setSelectedChargers(prev => [...prev, newItem]);
  };

  // Helper to remove a charger row
  const handleRemoveCharger = (id) => {
    if (selectedChargers.length <= 1) return;
    setSelectedChargers(prev => prev.filter(item => item.id !== id));
  };

  // Helper to change charger model in a row
  const handleChangeModel = (id, newModelId) => {
    const model = CHARGER_MODELS.find(m => m.id === newModelId);
    if (!model) return;
    setSelectedChargers(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          modelId: newModelId,
          customPrice: model.price
        };
      }
      return item;
    }));
  };

  // Helper to update quantity for a row
  const handleUpdateQuantity = (id, newQty) => {
    const qty = Math.max(1, Math.min(100, Number(newQty) || 1));
    setSelectedChargers(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: qty };
      }
      return item;
    }));
  };

  // Helper to adjust quantity with +/- buttons
  const handleAdjustQuantity = (id, delta) => {
    setSelectedChargers(prev => prev.map(item => {
      if (item.id === id) {
        const next = Math.max(1, Math.min(100, item.quantity + delta));
        return { ...item, quantity: next };
      }
      return item;
    }));
  };

  // Calculate Aggregates
  const totalChargersCount = selectedChargers.reduce((acc, curr) => acc + (Number(curr.quantity) || 1), 0);
  
  // Total Hardware Pricing = Sum(price of each charger * its quantity)
  const totalHardwareInvestment = selectedChargers.reduce((acc, curr) => {
    const model = CHARGER_MODELS.find(m => m.id === curr.modelId);
    const unitPrice = curr.customPrice ?? (model ? model.price : 0);
    const qty = Number(curr.quantity) || 1;
    return acc + (unitPrice * qty);
  }, 0);

  const numTariff = Number(tariff) || 0;
  const numPowerCost = Number(powerCost) || 0;
  const numKwh = Number(kwhPerVehicle) || 0;
  const numSessionsPerCharger = Number(sessionsPerCharger) || 0;

  // 1. Daily Metrics (1 Day across all selected chargers)
  const dailySessions = numSessionsPerCharger * totalChargersCount;
  const dailyKwh = dailySessions * numKwh;
  const dailyRevenue = dailyKwh * numTariff;
  const dailyPowerCost = dailyKwh * numPowerCost;
  const dailyNetProfit = dailyRevenue - dailyPowerCost;

  // 2. Monthly Metrics (30 Days)
  const monthlySessions = dailySessions * 30;
  const monthlyKwh = dailyKwh * 30;
  const grossRevenueMonthly = dailyRevenue * 30;
  const powerCostMonthly = dailyPowerCost * 30;
  const netProfitMonthly = dailyNetProfit * 30;

  // 3. Yearly Metrics (360 Days / 12 Months)
  const yearlySessions = monthlySessions * 12;
  const yearlyKwh = monthlyKwh * 12;
  const grossRevenueYearly = grossRevenueMonthly * 12;
  const powerCostYearly = powerCostMonthly * 12;
  const netProfitYearly = netProfitMonthly * 12;

  // Traffic scenario chart calculations
  const calculateNetProfit = (vehicles) => {
    const s = vehicles * 30 * totalChargersCount;
    const rev = numKwh * numTariff * s;
    const cost = numKwh * numPowerCost * s;
    return rev - cost;
  };

  const breakEvenMonths = netProfitMonthly > 0 ? (totalHardwareInvestment / netProfitMonthly) : 0;
  const breakEvenYears = breakEvenMonths / 12;
  const netMarginPerKwh = numTariff - numPowerCost;

  const breakEvenDisplay = () => {
    if (netProfitMonthly <= 0) return 'N/A';
    if (breakEvenUnit === 'years') {
      if (breakEvenYears < 0.1) return '< 0.1 Yr';
      return `${breakEvenYears.toFixed(1)} ${breakEvenYears === 1 ? 'Year' : 'Years'}`;
    }
    if (breakEvenMonths < 1) return '< 1 Mo';
    return `${breakEvenMonths.toFixed(1)} ${breakEvenMonths === 1 ? 'Month' : 'Months'}`;
  };

  const breakEvenSecondary = () => {
    if (netProfitMonthly <= 0) return '';
    if (breakEvenUnit === 'years') {
      return breakEvenMonths < 1 ? '(< 1 Mo)' : `(≈ ${breakEvenMonths.toFixed(1)} Mo)`;
    }
    return breakEvenYears < 0.1 ? '(< 0.1 Yr)' : `(≈ ${breakEvenYears.toFixed(1)} Yr)`;
  };

  // Active Time Horizon Display Helper
  const activeMetrics = {
    daily: {
      label: 'Daily',
      periodUnit: 'day',
      revenue: dailyRevenue,
      powerCost: dailyPowerCost,
      profit: dailyNetProfit,
      subText: `Based on ${dailySessions} total sessions/day (${numSessionsPerCharger}/charger) across ${totalChargersCount} chargers`
    },
    monthly: {
      label: 'Monthly',
      periodUnit: 'month',
      revenue: grossRevenueMonthly,
      powerCost: powerCostMonthly,
      profit: netProfitMonthly,
      subText: `≈ ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(grossRevenueYearly)} a year across ${totalChargersCount} chargers`
    },
    yearly: {
      label: 'Annual',
      periodUnit: 'year',
      revenue: grossRevenueYearly,
      powerCost: powerCostYearly,
      profit: netProfitYearly,
      subText: `Total annual throughput: ${yearlySessions.toLocaleString('en-IN')} sessions (${yearlyKwh.toLocaleString('en-IN')} kWh) across ${totalChargersCount} units`
    }
  }[timeHorizon];

  // Chart Calculations
  const quietVehicles = Math.max(1, Math.floor(numSessionsPerCharger * 0.5));
  const busyVehicles = Math.floor(numSessionsPerCharger * 1.5);
  
  const quietProfit = calculateNetProfit(quietVehicles);
  const busyProfit = calculateNetProfit(busyVehicles);

  const maxProfit = Math.max(quietProfit, netProfitMonthly, busyProfit, 1);
  const quietHeight = Math.max(10, (quietProfit / maxProfit) * 100);
  const likelyHeight = Math.max(10, (netProfitMonthly / maxProfit) * 100);
  const busyHeight = Math.max(10, (busyProfit / maxProfit) * 100);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatShortCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`;
    return `₹${Math.floor(amount)}`;
  };

  const handleAdjust = (setter, value, min, max, step) => {
    setter(prev => {
      const current = typeof prev === 'number' && !isNaN(prev) ? prev : min;
      const newVal = Math.round((current + (value * step)) * 10) / 10;
      if (newVal < min) return min;
      if (newVal > max) return max;
      return newVal;
    });
  };

  return (
    <PageTransition locationKey="multi-charger-calculator">
      <main className="w-full min-h-screen bg-[#020403] pt-24 sm:pt-28 md:pt-32 overflow-x-hidden relative font-sans">
        
        {/* Background Ambience */}
        <div className="absolute top-0 right-[-10%] w-[320px] sm:w-[500px] md:w-[700px] h-[320px] sm:h-[500px] md:h-[700px] bg-accent/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-[-10%] w-[280px] sm:w-[450px] md:w-[600px] h-[280px] sm:h-[450px] md:h-[600px] bg-accent/5 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-3.5 sm:px-6 lg:px-12 relative z-10 pb-20 sm:pb-32">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-[0.68rem] sm:text-xs font-mono tracking-widest font-bold mb-3 sm:mb-5"
            >
              <Layers size={13} className="text-accent" />
              MULTI-CHARGER ROI CALCULATOR
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tight mb-2.5 sm:mb-4 px-1"
            >
              Calculate Your <span className="text-accent">Multiple Charger</span> Revenue.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#A0A0A0] text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2 leading-relaxed"
            >
              Add any combination of Axion AC and DC chargers, scale their quantities, and calculate combined station pricing, total power cost, and ROI break-even timeline.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12">
            
            {/* Left Column: Inputs */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-7 flex flex-col gap-5 sm:gap-8 min-w-0"
            >
              {/* Primary Inputs Box: Multiple Chargers Selection */}
              <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 sm:pb-6 mb-4 sm:mb-6 border-b border-white/10 gap-2 sm:gap-3">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-display font-bold text-white">Select Your Chargers</h2>
                    <p className="text-[#888] text-xs sm:text-sm mt-0.5">Add and combine multiple AC and DC models to configure your station.</p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                    <span className="text-[0.65rem] sm:text-xs font-mono px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-bold">
                      {totalChargersCount} {totalChargersCount === 1 ? 'Unit' : 'Units'} Selected
                    </span>
                  </div>
                </div>

                {/* ── List of Selected Chargers ── */}
                <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <AnimatePresence initial={false}>
                    {selectedChargers.map((item, index) => {
                      const model = CHARGER_MODELS.find(m => m.id === item.modelId) || CHARGER_MODELS[0];
                      const lineTotal = (item.customPrice || model.price) * item.quantity;

                      return (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-[#050A07]/90 border border-white/10 hover:border-white/20 transition-all flex flex-col gap-3 min-w-0"
                        >
                          {/* Top Row: Charger Tag & Unit Price */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[0.62rem] sm:text-[0.68rem] font-mono uppercase tracking-wider text-accent font-bold truncate">
                              Charger #{index + 1} · {model.category}
                            </span>
                            <span className="text-[0.68rem] sm:text-xs font-mono text-white/50 flex-shrink-0">
                              ₹{model.price.toLocaleString('en-IN')} / unit
                            </span>
                          </div>

                          {/* Model Select Dropdown (With generous right padding so arrow never overlaps text) */}
                          <div className="relative w-full">
                            <select 
                              value={item.modelId}
                              onChange={(e) => handleChangeModel(item.id, e.target.value)}
                              className="w-full bg-[#020403] border border-white/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-white appearance-none focus:outline-none focus:border-accent text-xs sm:text-sm font-medium cursor-pointer pr-10 truncate"
                            >
                              <optgroup label="⚡ AC Charging Wallboxes" className="bg-[#050A07] text-accent font-bold py-1">
                                {CHARGER_MODELS.filter(m => m.category === 'AC Chargers').map(m => (
                                  <option key={m.id} value={m.id} className="bg-[#0b140e] text-white">
                                    {m.shortName} (₹{m.price.toLocaleString('en-IN')})
                                  </option>
                                ))}
                              </optgroup>
                              <optgroup label="⚡ DC Fast Chargers" className="bg-[#050A07] text-accent font-bold py-1">
                                {CHARGER_MODELS.filter(m => m.category === 'DC Fast Chargers').map(m => (
                                  <option key={m.id} value={m.id} className="bg-[#0b140e] text-white">
                                    {m.shortName} (₹{m.price.toLocaleString('en-IN')})
                                  </option>
                                ))}
                              </optgroup>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-accent text-xs">
                              ▼
                            </div>
                          </div>

                          {/* Bottom Row: Quantity Controls & Subtotal & Delete */}
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                            {/* Quantity Stepper */}
                            <div className="flex items-center gap-1 bg-[#020403] border border-white/15 rounded-xl p-1 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => handleAdjustQuantity(item.id, -1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>

                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={item.quantity}
                                onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
                                className="w-8 sm:w-10 text-center font-mono text-white font-bold text-xs sm:text-base bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />

                              <button
                                type="button"
                                onClick={() => handleAdjustQuantity(item.id, 1)}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
                              </button>
                            </div>

                            {/* Subtotal & Delete */}
                            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                              <div className="text-right">
                                <span className="block text-[0.58rem] sm:text-[0.62rem] text-white/40 uppercase font-mono">Subtotal</span>
                                <span className="text-xs sm:text-sm font-mono font-bold text-accent">
                                  ₹{lineTotal.toLocaleString('en-IN')}
                                </span>
                              </div>

                              {selectedChargers.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCharger(item.id)}
                                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                                  title="Remove this charger"
                                  aria-label="Remove charger"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* ── Add Another Charger Button ── */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-dashed border-white/15">
                  <button
                    type="button"
                    onClick={handleAddCharger}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-accent text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.3)] cursor-pointer"
                  >
                    <PlusCircle size={15} />
                    Add Another Charger
                  </button>

                  <div className="text-center sm:text-right text-xs font-mono text-white/60">
                    Combined Hardware Total:{' '}
                    <span className="text-accent font-bold text-sm block sm:inline mt-0.5 sm:mt-0">
                      ₹{totalHardwareInvestment.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* ── Expected Daily Traffic Slider ── */}
                <div className="mt-5 sm:mt-8 pt-5 sm:pt-8 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-3.5 sm:mb-4">
                    <div>
                      <label className="block text-white/70 text-xs sm:text-sm font-bold uppercase tracking-wider">
                        Sessions per charger / day
                      </label>
                      <p className="text-[0.68rem] sm:text-xs text-white/40 mt-0.5">
                        {dailySessions} total daily charging sessions across all {totalChargersCount} chargers
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleAdjust(setSessionsPerCharger, -1, 1, 100, 1)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-all cursor-pointer"
                        aria-label="Decrease sessions per day"
                      >
                        <Minus size={14} />
                      </button>

                      <div className="flex items-center bg-black/60 border border-white/20 focus-within:border-accent rounded-lg px-2 sm:px-3 h-8 sm:h-10">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={sessionsPerCharger === 0 ? 0 : sessionsPerCharger || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '') setSessionsPerCharger('');
                            else {
                              const num = parseInt(val, 10);
                              if (!isNaN(num)) setSessionsPerCharger(num);
                            }
                          }}
                          onBlur={() => {
                            const num = parseInt(sessionsPerCharger, 10);
                            if (isNaN(num) || num < 1) setSessionsPerCharger(1);
                            else if (num > 100) setSessionsPerCharger(100);
                          }}
                          className="w-8 sm:w-10 bg-transparent text-center font-mono text-accent font-bold text-sm sm:text-lg focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-text selection:bg-accent selection:text-black"
                        />
                        <span className="text-[0.65rem] sm:text-xs text-accent/70 font-semibold ml-1 whitespace-nowrap">sessions/day</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdjust(setSessionsPerCharger, 1, 1, 100, 1)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-all cursor-pointer"
                        aria-label="Increase sessions per day"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={Number(sessionsPerCharger) || 1}
                    onChange={(e) => setSessionsPerCharger(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                    style={{
                      background: `linear-gradient(to right, var(--color-accent) ${Number(sessionsPerCharger) || 0}%, rgba(255,255,255,0.1) ${Number(sessionsPerCharger) || 0}%)`
                    }}
                  />
                  <div className="flex justify-between mt-2 text-[0.65rem] sm:text-xs text-[#666] font-mono uppercase tracking-widest">
                    <span>Quiet</span>
                    <span>Moderate</span>
                    <span>Busy</span>
                  </div>
                </div>
              </div>

              {/* Assumptions Box: Uniform Grid */}
              <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col gap-5 sm:gap-8">
                <div>
                  <h3 className="text-xs sm:text-sm font-mono font-bold text-white/50 uppercase tracking-widest mb-3 sm:mb-5">Assumptions</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-6">
                    <InputStepper 
                      label="Tariff to driver (₹/kWh)" 
                      value={tariff} 
                      onChange={setTariff}
                      onAdjust={(dir) => handleAdjust(setTariff, dir, 1, 100, 1)} 
                      min={1}
                      max={100}
                      step={0.5}
                    />
                    
                    <InputStepper 
                      label="Your power cost (₹/kWh)" 
                      value={powerCost} 
                      onChange={setPowerCost}
                      onAdjust={(dir) => handleAdjust(setPowerCost, dir, 1, 50, 0.5)} 
                      min={1}
                      max={50}
                      step={0.5}
                    />
                    
                    <InputStepper 
                      label="kWh per vehicle" 
                      value={kwhPerVehicle} 
                      onChange={setKwhPerVehicle}
                      onAdjust={(dir) => handleAdjust(setKwhPerVehicle, dir, 1, 250, 1)} 
                      min={1}
                      max={250}
                      step={1}
                    />

                    {/* Calculated Hardware Capex Display */}
                    <div className="flex flex-col justify-between">
                      <label className="block text-white/50 text-[0.68rem] sm:text-[0.7rem] font-bold mb-1.5 uppercase tracking-wider">
                        Combined Chargers Capex (₹)
                      </label>
                      <div className="flex items-center justify-between bg-[#050A07] border border-accent/40 rounded-xl px-3 sm:px-4 h-12 sm:h-14">
                        <span className="text-white/60 text-[0.68rem] sm:text-xs font-mono">
                          {totalChargersCount} {totalChargersCount === 1 ? 'Unit' : 'Units'} Total
                        </span>
                        <span className="text-accent font-mono font-bold text-sm sm:text-lg truncate pl-2">
                          ₹{totalHardwareInvestment.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Margin */}
                <div className="pt-3.5 sm:pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-white/50">Net electricity margin per kWh</span>
                  <span className="text-base sm:text-xl font-bold text-accent">₹{netMarginPerKwh.toFixed(1)}</span>
                </div>
              </div>

              {/* Itemized Charger Pricing Table */}
              <div className="p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-display font-bold text-white">Station Hardware Composition</h3>
                    <p className="text-[0.65rem] sm:text-xs text-white/50">Pricing breakdown of all selected units</p>
                  </div>
                </div>
                
                <div className="w-full overflow-x-auto [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]">
                  <table className="w-full min-w-[300px] text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 text-[0.62rem] sm:text-[0.7rem] uppercase tracking-wider">
                        <th className="py-2 px-1.5 sm:px-2 w-[45%]">Model</th>
                        <th className="py-2 px-1 text-center w-[12%]">Qty</th>
                        <th className="py-2 px-1 text-right w-[20%]">Unit Price</th>
                        <th className="py-2 px-1.5 text-right text-accent font-bold w-[23%]">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[0.7rem] sm:text-xs">
                      {selectedChargers.map((item) => {
                        const m = CHARGER_MODELS.find(x => x.id === item.modelId) || CHARGER_MODELS[0];
                        const lineTotal = (item.customPrice || m.price) * item.quantity;
                        return (
                          <tr key={item.id} className="hover:bg-white/[0.02]">
                            <td className="py-2 px-1.5 sm:px-2 text-white font-sans truncate max-w-[130px] sm:max-w-none" title={m.name}>
                              {m.shortName}
                            </td>
                            <td className="py-2 px-1 text-center text-white/80">{item.quantity}</td>
                            <td className="py-2 px-1 text-right text-white/70 whitespace-nowrap">₹{m.price.toLocaleString('en-IN')}</td>
                            <td className="py-2 px-1.5 text-right text-accent font-bold whitespace-nowrap">₹{lineTotal.toLocaleString('en-IN')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-accent/30 font-bold text-xs sm:text-sm">
                        <td className="py-2.5 px-1.5 sm:px-2 text-white font-sans">Total Capex</td>
                        <td className="py-2.5 px-1 text-center text-accent">{totalChargersCount}</td>
                        <td className="py-2.5 px-1 text-right text-white/40 hidden sm:table-cell">—</td>
                        <td className="py-2.5 px-1.5 text-right text-accent whitespace-nowrap">₹{totalHardwareInvestment.toLocaleString('en-IN')}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Results Dashboard */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-5 relative flex flex-col gap-5 sm:gap-6 min-w-0"
            >
              {/* Main Results Card */}
              <div className="w-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-2xl sm:rounded-[2rem] p-4 sm:p-7 lg:p-9 shadow-[0_0_50px_rgba(var(--color-accent-rgb),0.1)] overflow-hidden relative">
                <Zap className="absolute -right-10 -bottom-10 w-40 sm:w-64 h-40 sm:h-64 text-accent/10 rotate-12 pointer-events-none" />

                {/* Period Selector Tabs (Responsive Grid) */}
                <div className="grid grid-cols-3 sm:inline-flex items-center gap-1 sm:gap-1.5 p-1 bg-[#020403]/80 border border-white/10 rounded-xl mb-4 sm:mb-6 backdrop-blur-md w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setTimeHorizon('daily')}
                    className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${
                      timeHorizon === 'daily'
                        ? 'bg-accent text-black shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.4)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Per Day
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeHorizon('monthly')}
                    className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${
                      timeHorizon === 'monthly'
                        ? 'bg-accent text-black shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.4)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Per Month
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeHorizon('yearly')}
                    className={`px-2 sm:px-3.5 py-1.5 rounded-lg text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer text-center ${
                      timeHorizon === 'yearly'
                        ? 'bg-accent text-black shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.4)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Per Year
                  </button>
                </div>

                <h4 className="text-white/80 text-[0.72rem] sm:text-sm font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between gap-2 flex-wrap">
                  <span>Estimated {activeMetrics.label} Earnings</span>
                  <span className="text-[0.62rem] sm:text-xs font-mono text-accent bg-black/40 px-2 py-0.5 rounded-full border border-accent/30 font-normal">
                    {totalChargersCount} Units Combined
                  </span>
                </h4>
                
                {/* Big Currency Headline with Fluid Responsive Typography */}
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-1.5 tracking-tight break-words">
                  {formatCurrency(activeMetrics.revenue)}
                </div>
                <p className="text-accent text-[0.68rem] sm:text-xs font-mono mb-5 sm:mb-7 border-b border-accent/20 pb-4 sm:pb-6 leading-relaxed">
                  {activeMetrics.subText}
                </p>

                <div className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-7">
                  <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-3.5 sm:p-5 border border-white/10 flex flex-col">
                    <span className="text-white/60 text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider mb-1">
                      Total Net profit (All Chargers Combined)
                    </span>
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <span className="text-lg sm:text-2xl font-bold text-accent">
                        {formatCurrency(activeMetrics.profit)}
                      </span>
                      {totalChargersCount > 1 && (
                        <span className="text-[0.65rem] sm:text-xs font-mono text-white/50">
                          ≈ {formatCurrency(activeMetrics.profit / totalChargersCount)} / unit avg
                        </span>
                      )}
                    </div>
                    <span className="text-white/40 text-[0.6rem] sm:text-[0.65rem] uppercase mt-0.5">
                      per {activeMetrics.periodUnit}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-3.5 sm:p-5 border border-white/10 flex flex-col justify-between">
                      <span className="text-white/60 text-[0.62rem] sm:text-[0.65rem] font-bold uppercase tracking-wider mb-1">
                        Grid power cost
                      </span>
                      <div>
                        <span className="text-base sm:text-xl font-bold text-white block truncate">
                          {formatCurrency(activeMetrics.powerCost)}
                        </span>
                        <span className="text-white/40 text-[0.6rem] sm:text-[0.65rem] uppercase">
                          per {activeMetrics.periodUnit}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-3.5 sm:p-5 border border-accent/30 flex flex-col justify-between shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.1)] min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1 flex-wrap">
                        <span className="text-white/60 text-[0.62rem] sm:text-[0.65rem] font-bold uppercase tracking-wider">
                          Break-even
                        </span>
                        <div className="inline-flex items-center bg-black/60 border border-white/15 rounded-lg p-0.5">
                          <button
                            type="button"
                            onClick={() => setBreakEvenUnit('months')}
                            className={`px-1.5 py-0.5 rounded text-[0.58rem] sm:text-[0.62rem] font-mono font-bold transition-all cursor-pointer ${
                              breakEvenUnit === 'months'
                                ? 'bg-accent text-black shadow-sm'
                                : 'text-white/50 hover:text-white'
                            }`}
                          >
                            Mo
                          </button>
                          <button
                            type="button"
                            onClick={() => setBreakEvenUnit('years')}
                            className={`px-1.5 py-0.5 rounded text-[0.58rem] sm:text-[0.62rem] font-mono font-bold transition-all cursor-pointer ${
                              breakEvenUnit === 'years'
                                ? 'bg-accent text-black shadow-sm'
                                : 'text-white/50 hover:text-white'
                            }`}
                          >
                            Yr
                          </button>
                        </div>
                      </div>

                      <div className="mt-1">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-base sm:text-xl font-bold text-accent">
                            {breakEvenDisplay()}
                          </span>
                          {breakEvenSecondary() && (
                            <span className="text-[0.65rem] sm:text-xs font-mono text-accent/60">
                              {breakEvenSecondary()}
                            </span>
                          )}
                        </div>

                        <span className="text-white/40 text-[0.58rem] sm:text-[0.65rem] uppercase block mt-0.5 leading-tight truncate">
                          on ₹{totalHardwareInvestment.toLocaleString('en-IN')} ({totalChargersCount} units)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
                  <Link 
                    to="/contact" 
                    className="flex-1 text-center bg-accent text-black font-bold uppercase tracking-widest text-xs sm:text-sm py-3 sm:py-3.5 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.5)] transition-all duration-300"
                  >
                    Buy Now
                  </Link>
                  <Link 
                    to="/contact" 
                    className="flex-1 text-center bg-transparent border border-accent text-accent font-bold uppercase tracking-widest text-xs sm:text-sm py-3 sm:py-3.5 rounded-xl hover:bg-accent/10 transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    Talk to an Expert
                  </Link>
                </div>
              </div>

              {/* Detailed Multi-Period Economics Comparison Table */}
              <div className="w-full bg-[#050A07]/90 border border-white/10 rounded-2xl sm:rounded-[2rem] p-3.5 sm:p-6 backdrop-blur-md shadow-2xl min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 pb-2.5 border-b border-white/10 gap-1.5">
                  <div>
                    <h4 className="text-sm sm:text-base font-display font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      Detailed Period Breakdown
                    </h4>
                    <p className="text-[0.65rem] sm:text-xs text-white/50">
                      Side-by-side comparison across all operating timeframes
                    </p>
                  </div>
                  <span className="text-[0.62rem] sm:text-[0.68rem] font-mono text-accent uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 w-fit whitespace-nowrap font-bold">
                    {totalChargersCount} Combined
                  </span>
                </div>

                <div className="w-full overflow-x-auto [scrollbar-width:thin] [-webkit-overflow-scrolling:touch]">
                  <table className="w-full min-w-[340px] text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 text-[0.62rem] sm:text-[0.7rem] uppercase tracking-wider font-bold">
                        <th className="py-2 px-1 sm:px-2 w-[34%]">Metric</th>
                        <th className="py-2 px-1 sm:px-2 text-right w-[22%]">Daily</th>
                        <th className="py-2 px-1 sm:px-2 text-right w-[22%]">Monthly</th>
                        <th className="py-2 px-1 sm:px-2 text-right w-[22%] text-accent font-bold">Annual</th>
                      </tr>
                    </thead>
                    <tbody className="text-[0.68rem] sm:text-xs divide-y divide-white/5">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 px-1 sm:px-2 text-white/70 font-sans">Sessions</td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold">{dailySessions}</td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold">{monthlySessions.toLocaleString('en-IN')}</td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold">{yearlySessions.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 px-1 sm:px-2 text-white/70 font-sans">
                          Energy Delivered
                        </td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold whitespace-nowrap">
                          {dailyKwh.toFixed(0)} <span className="text-[0.6rem] text-white/40">kWh</span>
                        </td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold whitespace-nowrap">
                          {monthlyKwh.toLocaleString('en-IN', { maximumFractionDigits: 0 })} <span className="text-[0.6rem] text-white/40">kWh</span>
                        </td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold whitespace-nowrap">
                          {yearlyKwh.toLocaleString('en-IN', { maximumFractionDigits: 0 })} <span className="text-[0.6rem] text-white/40">kWh</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 px-1 sm:px-2 text-white/70 font-sans">Gross Tariff</td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold whitespace-nowrap">{formatCurrency(dailyRevenue)}</td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold whitespace-nowrap">{formatCurrency(grossRevenueMonthly)}</td>
                        <td className="py-2 px-1 sm:px-2 text-right text-white font-bold whitespace-nowrap">{formatCurrency(grossRevenueYearly)}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2 px-1 sm:px-2 text-white/70 font-sans">Power Cost</td>
                        <td className="py-2 px-1 sm:px-2 text-right text-amber-400 font-semibold font-mono whitespace-nowrap">
                          −₹{Math.round(dailyPowerCost).toLocaleString('en-IN')}
                        </td>
                        <td className="py-2 px-1 sm:px-2 text-right text-amber-400 font-semibold font-mono whitespace-nowrap">
                          −₹{Math.round(powerCostMonthly).toLocaleString('en-IN')}
                        </td>
                        <td className="py-2 px-1 sm:px-2 text-right text-amber-400 font-semibold font-mono whitespace-nowrap">
                          −₹{Math.round(powerCostYearly).toLocaleString('en-IN')}
                        </td>
                      </tr>
                      <tr className="bg-gradient-to-r from-accent/15 via-accent/20 to-accent/15 border-y border-accent/40">
                        <td className="py-2.5 px-1 sm:px-2 rounded-l-lg border-l border-accent/40 text-accent font-bold font-sans">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-accent flex-shrink-0" />
                            <span>Net Earnings</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-1 sm:px-2 text-right text-accent font-bold font-mono text-[0.68rem] sm:text-xs whitespace-nowrap">
                          {formatCurrency(dailyNetProfit)}
                        </td>
                        <td className="py-2.5 px-1 sm:px-2 text-right text-accent font-bold font-mono text-[0.68rem] sm:text-xs whitespace-nowrap">
                          {formatCurrency(netProfitMonthly)}
                        </td>
                        <td className="py-2.5 px-1 sm:px-2 rounded-r-lg border-r border-accent/40 text-right text-accent font-bold font-mono text-[0.68rem] sm:text-xs whitespace-nowrap">
                          {formatCurrency(netProfitYearly)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[0.62rem] sm:text-[0.68rem] text-white/40 font-mono">
                  <span>* {totalChargersCount} units @ ₹{tariff}/kWh tariff & ₹{powerCost}/kWh cost</span>
                  <span className="text-accent/90 font-semibold">100% Direct Margins</span>
                </div>
              </div>

              {/* Traffic Changes Chart */}
              <div className="w-full bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-[2rem] p-4 sm:p-7 backdrop-blur-md">
                <h4 className="text-base sm:text-lg font-display font-bold text-white mb-1">When Traffic Changes</h4>
                <p className="text-[0.68rem] sm:text-xs text-[#888] mb-4 sm:mb-6">Combined net profit per month on quieter or busier days:</p>
                
                <div className="flex items-end justify-between h-32 sm:h-44 gap-2.5 sm:gap-4 pb-4 sm:pb-6 border-b border-white/10">
                  {/* Quiet Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-[0.68rem] sm:text-xs font-bold text-white mb-1 opacity-100">
                      {formatShortCurrency(quietProfit)}
                    </span>
                    <div 
                      className="w-full bg-accent/30 rounded-t-lg transition-all duration-500 ease-out hover:bg-accent/50"
                      style={{ height: `${quietHeight}%` }}
                    />
                  </div>
                  
                  {/* Likely Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-[0.68rem] sm:text-xs font-bold text-white mb-1 opacity-100">
                      {formatShortCurrency(netProfitMonthly)}
                    </span>
                    <div 
                      className="w-full bg-accent/70 rounded-t-lg transition-all duration-500 ease-out shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)]"
                      style={{ height: `${likelyHeight}%` }}
                    />
                  </div>
                  
                  {/* Busy Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-[0.68rem] sm:text-xs font-bold text-white mb-1 opacity-100">
                      {formatShortCurrency(busyProfit)}
                    </span>
                    <div 
                      className="w-full bg-accent rounded-t-lg transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)]"
                      style={{ height: `${busyHeight}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-2.5 text-[0.62rem] sm:text-xs font-mono uppercase tracking-widest text-[#888]">
                  <span className="flex-1 text-center">Quiet</span>
                  <span className="flex-1 text-center text-accent">Likely</span>
                  <span className="flex-1 text-center">Busy</span>
                </div>
              </div>

            </motion.div>

          </div>
        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

// Reusable stepper component with responsive padding & sizing
const InputStepper = ({ label, value, onChange, onAdjust, min = 0, max = 10000000, step = 1 }) => (
  <div className="flex flex-col justify-between">
    <label className="block text-white/50 text-[0.68rem] sm:text-[0.7rem] font-bold mb-1.5 uppercase tracking-wider">
      {label}
    </label>
    <div className="flex items-center justify-between bg-[#050A07] border border-white/10 focus-within:border-accent/50 rounded-xl p-1.5 sm:p-2 h-12 sm:h-14 transition-colors">
      <button 
        type="button"
        onClick={() => onAdjust(-1)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-colors flex-shrink-0 cursor-pointer"
        aria-label="Decrease"
      >
        <Minus size={14} />
      </button>

      <input 
        type="number"
        value={value === 0 ? 0 : value || ''}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '') {
            onChange('');
          } else {
            const num = parseFloat(raw);
            if (!isNaN(num)) onChange(num);
          }
        }}
        onBlur={(e) => {
          const raw = e.target.value;
          const num = parseFloat(raw);
          if (raw === '' || isNaN(num) || num < min) {
            onChange(min);
          } else if (num > max) {
            onChange(max);
          }
        }}
        className="w-full bg-transparent text-center font-mono text-white font-bold text-sm sm:text-lg focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-text px-1 sm:px-2 selection:bg-accent selection:text-black"
      />

      <button 
        type="button"
        onClick={() => onAdjust(1)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-colors flex-shrink-0 cursor-pointer"
        aria-label="Increase"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);

export default MultiChargerCalculator;
