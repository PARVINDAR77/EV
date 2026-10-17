import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, Zap, TrendingUp, IndianRupee, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';

const CHARGER_MODELS = [
  // ── AC Charging Wallboxes ──
  {
    id: 'ac-3-3kw',
    name: 'Axion 3.3 kW AC (Entry Wallbox)',
    category: 'AC Chargers',
    price: 18000,
    defaultKwh: 5,
  },
  {
    id: 'ac-7-4kw',
    name: 'Axion 7.4 kW AC (Axion Pro)',
    category: 'AC Chargers',
    price: 24999,
    defaultKwh: 10,
  },
  {
    id: 'ac-11kw',
    name: 'Axion 11 kW AC (Commercial 3-Phase)',
    category: 'AC Chargers',
    price: 38000,
    defaultKwh: 15,
  },
  {
    id: 'ac-22kw',
    name: 'Axion 22 kW AC (Axion Ultra)',
    category: 'AC Chargers',
    price: 45000,
    defaultKwh: 20,
  },

  // ── DC Fast Chargers ──
  {
    id: 'dc-30kw',
    name: 'Axion DC Fast (30kW)',
    category: 'DC Fast Chargers',
    price: 350000,
    defaultKwh: 25,
  },
  {
    id: 'dc-60kw',
    name: 'Axion DC Fast (60kW Dual Gun)',
    category: 'DC Fast Chargers',
    price: 650000,
    defaultKwh: 35,
  },
  {
    id: 'dc-120kw',
    name: 'Axion DC Ultra-Fast (120kW Highway Dual)',
    category: 'DC Fast Chargers',
    price: 1200000,
    defaultKwh: 50,
  },
  {
    id: 'dc-240kw',
    name: 'Axion DC Hyper-Fast (240kW Heavy Duty)',
    category: 'DC Fast Chargers',
    price: 2200000,
    defaultKwh: 70,
  },
];

const Calculator = () => {
  const [selectedCharger, setSelectedCharger] = useState(CHARGER_MODELS[1]); // Default to Axion 7.4kW Pro
  const [chargerQuantity, setChargerQuantity] = useState(1);
  const [vehiclesPerDay, setVehiclesPerDay] = useState(15);
  const [timeHorizon, setTimeHorizon] = useState('monthly'); // 'daily' | 'monthly' | 'yearly'
  
  // Assumptions
  const [tariff, setTariff] = useState(18); // ₹/kWh
  const [powerCost, setPowerCost] = useState(8); // ₹/kWh
  const [kwhPerVehicle, setKwhPerVehicle] = useState(selectedCharger.defaultKwh);
  const [chargerPrice, setChargerPrice] = useState(selectedCharger.price);

  // Update assumptions when charger changes
  useEffect(() => {
    setKwhPerVehicle(selectedCharger.defaultKwh);
    setChargerPrice(selectedCharger.price);
  }, [selectedCharger]);

  const numTariff = Number(tariff) || 0;
  const numPowerCost = Number(powerCost) || 0;
  const numKwh = Number(kwhPerVehicle) || 0;
  const numPrice = Number(chargerPrice) || 0;
  const numVehicles = Number(vehiclesPerDay) || 0;
  const numChargers = Math.max(1, Number(chargerQuantity) || 1);
  const totalHardwareInvestment = numPrice * numChargers;

  // 1. Daily Metrics (1 Day)
  const dailySessionsPerCharger = numVehicles;
  const dailySessions = dailySessionsPerCharger * numChargers;
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

  // Calculations for traffic scenario chart
  const calculateNetProfit = (vehicles) => {
    const s = vehicles * 30 * numChargers;
    const rev = numKwh * numTariff * s;
    const cost = numKwh * numPowerCost * s;
    return rev - cost;
  };

  const breakEvenMonths = netProfitMonthly > 0 ? (totalHardwareInvestment / netProfitMonthly) : 0;
  const netMarginPerKwh = numTariff - numPowerCost;

  // Active Time Horizon Display Helper
  const activeMetrics = {
    daily: {
      label: 'Daily',
      periodUnit: 'day',
      revenue: dailyRevenue,
      powerCost: dailyPowerCost,
      profit: dailyNetProfit,
      subText: numChargers > 1
        ? `Based on ${dailySessions} total sessions/day (${dailySessionsPerCharger}/charger) across ${numChargers} chargers`
        : `Based on ${dailySessions} charging sessions / day (${dailyKwh.toFixed(0)} kWh)`
    },
    monthly: {
      label: 'Monthly',
      periodUnit: 'month',
      revenue: grossRevenueMonthly,
      powerCost: powerCostMonthly,
      profit: netProfitMonthly,
      subText: numChargers > 1
        ? `≈ ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(grossRevenueYearly)} a year across ${numChargers} chargers`
        : `≈ ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(grossRevenueYearly)} a year in gross revenue`
    },
    yearly: {
      label: 'Annual',
      periodUnit: 'year',
      revenue: grossRevenueYearly,
      powerCost: powerCostYearly,
      profit: netProfitYearly,
      subText: `Total annual throughput: ${yearlySessions.toLocaleString('en-IN')} sessions (${yearlyKwh.toLocaleString('en-IN')} kWh) across ${numChargers} ${numChargers === 1 ? 'unit' : 'units'}`
    }
  }[timeHorizon];
  
  // Chart Calculations
  const quietVehicles = Math.max(1, Math.floor(numVehicles * 0.5));
  const busyVehicles = Math.floor(numVehicles * 1.5);
  
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
    <PageTransition locationKey="calculator">
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative font-sans">
        
        {/* Background Ambience */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 pb-32">
          
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono tracking-widest font-bold mb-6"
            >
              <CalcIcon size={14} />
              ROI CALCULATOR
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tight mb-4"
            >
              Calculate Your <span className="text-accent">Revenue.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#A0A0A0] text-lg max-w-2xl mx-auto"
            >
              Pick any Axion AC or DC Fast charger from our lineup, set your location traffic, and instantly see your projected revenue, profit margins, and ROI break-even timeline.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Inputs */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-7 flex flex-col gap-8"
            >
              {/* Primary Inputs Box */}
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md">
                <h2 className="text-2xl font-display font-bold text-white mb-2">Configure Station Setup</h2>
                <p className="text-[#888] text-sm mb-8">Choose your charger model, number of units, and expected daily traffic.</p>

                {/* ── Choose Your Charger Dropdown ── */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-white/70 text-sm font-bold uppercase tracking-wider">
                      Choose Your Charger
                    </label>
                    <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                      ₹{selectedCharger.price.toLocaleString('en-IN')} / unit
                    </span>
                  </div>
                  <div className="relative">
                    <select 
                      value={selectedCharger.id}
                      onChange={(e) => setSelectedCharger(CHARGER_MODELS.find(c => c.id === e.target.value))}
                      className="w-full bg-[#050A07] border border-white/20 rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-accent/50 transition-colors cursor-pointer text-base font-medium"
                    >
                      <optgroup label="⚡ AC Charging Stations (Home & Workplace)" className="bg-[#050A07] text-accent font-bold py-2">
                        {CHARGER_MODELS.filter(m => m.category === 'AC Chargers').map(model => (
                          <option key={model.id} value={model.id} className="bg-[#0b140e] text-white py-2">
                            {model.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="⚡ DC Fast Charging Stations (Highway & Commercial Hubs)" className="bg-[#050A07] text-accent font-bold py-2">
                        {CHARGER_MODELS.filter(m => m.category === 'DC Fast Chargers').map(model => (
                          <option key={model.id} value={model.id} className="bg-[#0b140e] text-white py-2">
                            {model.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-accent text-sm">
                      ▼
                    </div>
                  </div>
                </div>

                {/* ── Number of Chargers / Units Selector ── */}
                <div className="mb-8 p-5 rounded-2xl bg-[#050A07]/80 border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <label className="block text-white/90 text-sm font-bold uppercase tracking-wider">
                        Number of Chargers / Units
                      </label>
                      <p className="text-xs text-white/40 mt-0.5">Scale station deployment size</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAdjust(setChargerQuantity, -1, 1, 100, 1)}
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={chargerQuantity === 0 ? 0 : chargerQuantity || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') setChargerQuantity('');
                          else {
                            const num = parseInt(val, 10);
                            if (!isNaN(num)) setChargerQuantity(num);
                          }
                        }}
                        onBlur={() => {
                          const num = parseInt(chargerQuantity, 10);
                          if (isNaN(num) || num < 1) setChargerQuantity(1);
                          else if (num > 100) setChargerQuantity(100);
                        }}
                        className="w-16 h-10 bg-black/60 border border-white/20 focus:border-accent text-center font-mono text-white font-bold text-lg rounded-lg focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-text selection:bg-accent selection:text-black"
                      />
                      <button
                        type="button"
                        onClick={() => handleAdjust(setChargerQuantity, 1, 1, 100, 1)}
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── How busy is your location ── */}
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <label className="block text-white/70 text-sm font-bold uppercase tracking-wider">
                        Sessions per charger / day
                      </label>
                      {numChargers > 1 && (
                        <p className="text-xs text-white/40 mt-0.5">
                          {dailySessions} total sessions across all {numChargers} chargers
                        </p>
                      )}
                    </div>
                    <span className="text-accent font-bold text-xl">{vehiclesPerDay} <span className="text-sm text-accent/70">sessions/day</span></span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={vehiclesPerDay}
                    onChange={(e) => setVehiclesPerDay(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                    style={{
                      background: `linear-gradient(to right, var(--color-accent) ${vehiclesPerDay}%, rgba(255,255,255,0.1) ${vehiclesPerDay}%)`
                    }}
                  />
                  <div className="flex justify-between mt-3 text-xs text-[#666] font-mono uppercase tracking-widest">
                    <span>Quiet</span>
                    <span>Moderate</span>
                    <span>Busy</span>
                  </div>
                </div>
              </div>

              {/* Assumptions Box */}
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col gap-8">
                <div>
                  <h3 className="text-sm font-mono font-bold text-white/50 uppercase tracking-widest mb-6">Assumptions</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    
                    <InputStepper 
                      label="Charger price (₹)" 
                      value={chargerPrice} 
                      onChange={setChargerPrice}
                      onAdjust={(dir) => handleAdjust(setChargerPrice, dir, 1000, 5000000, chargerPrice >= 100000 ? 10000 : 1000)} 
                      min={1000}
                      max={5000000}
                      step={1000}
                    />
                  </div>
                </div>

                {/* Net Margin */}
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm text-white/50">Net electricity margin per kWh</span>
                  <span className="text-xl font-bold text-accent">₹{netMarginPerKwh.toFixed(1)}</span>
                </div>

              </div>
            </motion.div>

            {/* Right Column: Results Dashboard */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-5 relative flex flex-col gap-6"
            >
              {/* Main Results */}
              <div className="w-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-[2rem] p-8 lg:p-10 shadow-[0_0_50px_rgba(var(--color-accent-rgb),0.1)] overflow-hidden relative">
                <Zap className="absolute -right-10 -bottom-10 w-64 h-64 text-accent/10 rotate-12 pointer-events-none" />

                {/* Period Selector Tabs */}
                <div className="flex items-center gap-2 p-1.5 bg-[#020403]/80 border border-white/10 rounded-2xl mb-6 backdrop-blur-md w-fit">
                  <button
                    type="button"
                    onClick={() => setTimeHorizon('daily')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      timeHorizon === 'yearly'
                        ? 'bg-accent text-black shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.4)]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Per Year
                  </button>
                </div>

                <h4 className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Estimated {activeMetrics.label} Earnings</span>
                  {numChargers > 1 && (
                    <span className="text-xs font-mono text-accent bg-black/40 px-2.5 py-0.5 rounded-full border border-accent/30 font-normal">
                      {numChargers} Chargers Combined
                    </span>
                  )}
                </h4>
                <div className="text-5xl lg:text-6xl font-display font-bold text-white mb-2 tracking-tight">
                  {formatCurrency(activeMetrics.revenue)}
                </div>
                <p className="text-accent text-sm font-mono mb-8 border-b border-accent/20 pb-8">
                  {activeMetrics.subText}
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-5 border border-white/10 flex flex-col">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">
                      {numChargers > 1 ? 'Total Net profit (All Chargers)' : 'Net profit per charger'}
                    </span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-accent mb-1">
                        {formatCurrency(activeMetrics.profit)}
                      </span>
                      {numChargers > 1 && (
                        <span className="text-xs font-mono text-white/50">
                          ≈ {formatCurrency(activeMetrics.profit / numChargers)} / unit
                        </span>
                      )}
                    </div>
                    <span className="text-white/40 text-[0.65rem] uppercase">
                      per {activeMetrics.periodUnit}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-5 border border-white/10 flex flex-col">
                      <span className="text-white/60 text-[0.65rem] font-bold uppercase tracking-wider mb-1">
                        Grid power cost
                      </span>
                      <span className="text-xl font-bold text-white mb-1">
                        {formatCurrency(activeMetrics.powerCost)}
                      </span>
                      <span className="text-white/40 text-[0.65rem] uppercase">
                        per {activeMetrics.periodUnit}
                      </span>
                    </div>

                    <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-5 border border-accent/30 flex flex-col shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.1)]">
                      <span className="text-white/60 text-[0.65rem] font-bold uppercase tracking-wider mb-1">
                        Break-even
                      </span>
                      <span className="text-xl font-bold text-accent mb-1">
                        {breakEvenMonths < 1 ? '< 1 Month' : `${breakEvenMonths.toFixed(1)} Months`}
                      </span>
                      <span className="text-white/40 text-[0.65rem] uppercase">
                        on ₹{totalHardwareInvestment.toLocaleString('en-IN')} capex ({numChargers} {numChargers === 1 ? 'unit' : 'units'})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/contact" 
                    className="flex-1 text-center bg-accent text-black font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.5)] transition-all duration-300"
                  >
                    Buy Now
                  </Link>
                  <Link 
                    to="/contact" 
                    className="flex-1 text-center bg-transparent border border-accent text-accent font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-accent/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Talk to an Expert
                  </Link>
                </div>
              </div>

              {/* Detailed Multi-Period Economics Comparison Table */}
              <div className="w-full bg-[#050A07]/90 border border-white/10 rounded-[2rem] p-5 sm:p-7 backdrop-blur-md shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 pb-4 border-b border-white/10 gap-3">
                  <div>
                    <h4 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      Detailed Period Breakdown
                    </h4>
                    <p className="text-xs text-white/50 mt-1">
                      Direct side-by-side comparison across all operating timeframes
                    </p>
                  </div>
                  <span className="text-[0.68rem] font-mono text-accent uppercase tracking-wider px-3 py-1 rounded-full bg-accent/10 border border-accent/25 w-fit whitespace-nowrap font-bold">
                    {numChargers > 1 ? `${numChargers} Units Combined` : '100% Direct Margins'}
                  </span>
                </div>

                <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
                  <table className="w-full text-left font-mono text-xs sm:text-sm min-w-[420px]">
                    <thead>
                      <tr className="border-b border-white/10 text-white/50 text-[0.7rem] uppercase tracking-wider font-bold">
                        <th className="py-3 px-3 w-[34%] whitespace-nowrap">Metric</th>
                        <th className="py-3 px-3 text-right w-[22%] whitespace-nowrap">Per Day</th>
                        <th className="py-3 px-3 text-right w-[22%] whitespace-nowrap">Per Month</th>
                        <th className="py-3 px-3 text-right w-[22%] text-accent font-bold whitespace-nowrap">Per Year</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm divide-y divide-white/5">
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3 text-white/70 font-sans whitespace-nowrap">Charging Sessions</td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">{dailySessions}</td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">{monthlySessions.toLocaleString('en-IN')}</td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">{yearlySessions.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3 text-white/70 font-sans whitespace-nowrap">
                          Energy Delivered <span className="text-white/40 text-[0.7rem] font-normal">(kWh)</span>
                        </td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">
                          {dailyKwh.toFixed(0)} <span className="text-white/40 text-[0.7rem] font-normal">kWh</span>
                        </td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">
                          {monthlyKwh.toLocaleString('en-IN', { maximumFractionDigits: 0 })} <span className="text-white/40 text-[0.7rem] font-normal">kWh</span>
                        </td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">
                          {yearlyKwh.toLocaleString('en-IN', { maximumFractionDigits: 0 })} <span className="text-white/40 text-[0.7rem] font-normal">kWh</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3 text-white/70 font-sans whitespace-nowrap">Gross Tariff Collection</td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">{formatCurrency(dailyRevenue)}</td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">{formatCurrency(grossRevenueMonthly)}</td>
                        <td className="py-3 px-3 text-right text-white font-bold whitespace-nowrap">{formatCurrency(grossRevenueYearly)}</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-3 text-white/70 font-sans whitespace-nowrap">DISCOM Power Cost</td>
                        <td className="py-3 px-3 text-right text-amber-400 font-semibold font-mono whitespace-nowrap">
                          −₹{Math.round(dailyPowerCost).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 text-right text-amber-400 font-semibold font-mono whitespace-nowrap">
                          −₹{Math.round(powerCostMonthly).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 text-right text-amber-400 font-semibold font-mono whitespace-nowrap">
                          −₹{Math.round(powerCostYearly).toLocaleString('en-IN')}
                        </td>
                      </tr>
                      <tr className="bg-gradient-to-r from-accent/15 via-accent/20 to-accent/15 border-y border-accent/40 shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.08)]">
                        <td className="py-3.5 px-3 rounded-l-xl border-l border-accent/40 text-accent font-bold font-sans whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-accent flex-shrink-0" />
                            <span>Net Operator Earnings</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-right text-accent font-bold font-mono whitespace-nowrap text-xs sm:text-sm">
                          {formatCurrency(dailyNetProfit)}
                        </td>
                        <td className="py-3.5 px-3 text-right text-accent font-bold font-mono whitespace-nowrap text-xs sm:text-sm">
                          {formatCurrency(netProfitMonthly)}
                        </td>
                        <td className="py-3.5 px-3 rounded-r-xl border-r border-accent/40 text-right text-accent font-bold font-mono whitespace-nowrap text-sm sm:text-base">
                          {formatCurrency(netProfitYearly)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[0.7rem] text-white/40 font-mono">
                  <span>* Calculated for {numChargers} {numChargers === 1 ? 'charger' : 'chargers'} @ ₹{tariff}/kWh tariff & ₹{powerCost}/kWh grid cost</span>
                  <span className="text-accent/90 font-semibold">Zero Commission · 100% Retained</span>
                </div>
              </div>

              {/* Traffic Changes Chart */}
              <div className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 backdrop-blur-md">
                <h4 className="text-xl font-display font-bold text-white mb-2">When Traffic Changes</h4>
                <p className="text-sm text-[#888] mb-8">Net profit per charger, per month, on quieter or busier days:</p>
                
                <div className="flex items-end justify-between h-48 gap-4 pb-8 border-b border-white/10">
                  {/* Quiet Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-sm font-bold text-white mb-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">{formatShortCurrency(quietProfit)}</span>
                    <div 
                      className="w-full bg-accent/30 rounded-t-lg transition-all duration-500 ease-out hover:bg-accent/50"
                      style={{ height: `${quietHeight}%` }}
                    />
                  </div>
                  
                  {/* Likely Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-sm font-bold text-white mb-2 opacity-100 transition-opacity">{formatShortCurrency(netProfitMonthly)}</span>
                    <div 
                      className="w-full bg-accent/70 rounded-t-lg transition-all duration-500 ease-out shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.2)]"
                      style={{ height: `${likelyHeight}%` }}
                    />
                  </div>
                  
                  {/* Busy Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-sm font-bold text-white mb-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">{formatShortCurrency(busyProfit)}</span>
                    <div 
                      className="w-full bg-accent rounded-t-lg transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)]"
                      style={{ height: `${busyHeight}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 text-xs font-mono uppercase tracking-widest text-[#888]">
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

// Reusable component for the +/- number inputs with direct manual editing
const InputStepper = ({ label, value, onChange, onAdjust, min = 0, max = 10000000, step = 1 }) => (
  <div>
    <label className="block text-white/50 text-[0.7rem] font-bold mb-2 uppercase tracking-wider h-8">{label}</label>
    <div className="flex items-center justify-between bg-[#050A07] border border-white/10 focus-within:border-accent/50 rounded-xl p-2 h-14 transition-colors">
      <button 
        type="button"
        onClick={() => onAdjust(-1)}
        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-colors flex-shrink-0 cursor-pointer"
        aria-label="Decrease"
      >
        <Minus size={16} />
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
        className="w-full bg-transparent text-center font-mono text-white font-bold text-lg focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none cursor-text px-2 selection:bg-accent selection:text-black"
      />

      <button 
        type="button"
        onClick={() => onAdjust(1)}
        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/20 flex items-center justify-center text-accent transition-colors flex-shrink-0 cursor-pointer"
        aria-label="Increase"
      >
        <Plus size={16} />
      </button>
    </div>
  </div>
);

export default Calculator;
