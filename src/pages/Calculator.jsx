import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator as CalcIcon, Zap, TrendingUp, IndianRupee, ShieldCheck, ArrowRight, Minus, Plus } from 'lucide-react';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';

const CHARGER_MODELS = [
  { id: 'pro', name: 'Axion Pro (AC 7.4kW)', price: 24999, defaultKwh: 5 },
  { id: 'ultra', name: 'Axion Ultra (AC 22kW)', price: 45000, defaultKwh: 15 },
  { id: 'dc-fast', name: 'Axion DC Fast (30kW)', price: 350000, defaultKwh: 20 },
];

const SOFTWARE_PLANS = [
  { id: 'basic', name: 'Basic', commission: 15, desc: 'Up to 3 chargers' },
  { id: 'premium', name: 'Premium', commission: 20, desc: '3+ chargers - CMS' },
  { id: 'enterprise', name: 'Enterprise', commission: 2.5, desc: 'Large deployments' },
];

const Calculator = () => {
  const [selectedCharger, setSelectedCharger] = useState(CHARGER_MODELS[0]);
  const [selectedPlan, setSelectedPlan] = useState(SOFTWARE_PLANS[0]);
  const [vehiclesPerDay, setVehiclesPerDay] = useState(15);
  
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

  // Calculations for current selection
  const calculateNetProfit = (vehicles) => {
    const monthlySessions = vehicles * 30;
    const revenuePerSession = kwhPerVehicle * tariff;
    const costPerSession = kwhPerVehicle * powerCost;
    
    const grossRevenueMonthly = revenuePerSession * monthlySessions;
    const commissionMonthly = grossRevenueMonthly * (selectedPlan.commission / 100);
    const powerCostMonthly = costPerSession * monthlySessions;
    
    return grossRevenueMonthly - commissionMonthly - powerCostMonthly;
  };

  const monthlySessions = vehiclesPerDay * 30;
  const revenuePerSession = kwhPerVehicle * tariff;
  const costPerSession = kwhPerVehicle * powerCost;
  
  const grossRevenueMonthly = revenuePerSession * monthlySessions;
  const grossRevenueYearly = grossRevenueMonthly * 12;
  
  const commissionMonthly = grossRevenueMonthly * (selectedPlan.commission / 100);
  const powerCostMonthly = costPerSession * monthlySessions;
  
  const netProfitMonthly = grossRevenueMonthly - commissionMonthly - powerCostMonthly;
  const breakEvenMonths = netProfitMonthly > 0 ? (chargerPrice / netProfitMonthly) : 0;
  
  const netMarginPerKwh = tariff - powerCost - (tariff * (selectedPlan.commission / 100));
  
  // Chart Calculations
  const quietVehicles = Math.max(1, Math.floor(vehiclesPerDay * 0.5));
  const busyVehicles = Math.floor(vehiclesPerDay * 1.5);
  
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
      const newVal = prev + (value * step);
      if (newVal < min) return min;
      if (newVal > max) return max;
      return newVal;
    });
  };

  return (
    <PageTransition locationKey="calculator">
      <main className="w-full min-h-screen bg-[#020403] pt-32 overflow-hidden relative font-sans">
        
        {/* Background Ambience */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-[#00FF3C]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-[-10%] w-[600px] h-[600px] bg-[#00FF3C]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 pb-32">
          
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF3C]/10 border border-[#00FF3C]/30 text-[#00FF3C] text-xs font-mono tracking-widest font-bold mb-6"
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
              Calculate Your <span className="text-[#00FF3C]">Revenue.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#A0A0A0] text-lg max-w-2xl mx-auto"
            >
              Pick a charger, tell us how busy your location is, and instantly see your projected monthly earnings, net profit, and break-even timeline.
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
                <h2 className="text-2xl font-display font-bold text-white mb-2">Just two quick inputs</h2>
                <p className="text-[#888] text-sm mb-8">That's all it takes to see your potential.</p>

                <div className="mb-8">
                  <label className="block text-white/70 text-sm font-bold mb-4 uppercase tracking-wider">Choose Your Charger</label>
                  <div className="relative">
                    <select 
                      value={selectedCharger.id}
                      onChange={(e) => setSelectedCharger(CHARGER_MODELS.find(c => c.id === e.target.value))}
                      className="w-full bg-[#050A07] border border-white/20 rounded-xl px-5 py-4 text-white appearance-none focus:outline-none focus:border-[#00FF3C]/50 transition-colors cursor-pointer"
                    >
                      {CHARGER_MODELS.map(model => (
                        <option key={model.id} value={model.id}>{model.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#00FF3C]">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-end mb-4">
                    <label className="block text-white/70 text-sm font-bold uppercase tracking-wider">How busy is your location?</label>
                    <span className="text-[#00FF3C] font-bold text-xl">{vehiclesPerDay} <span className="text-sm text-[#00FF3C]/70">vehicles/day</span></span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={vehiclesPerDay}
                    onChange={(e) => setVehiclesPerDay(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00FF3C]"
                    style={{
                      background: `linear-gradient(to right, #00FF3C ${vehiclesPerDay}%, rgba(255,255,255,0.1) ${vehiclesPerDay}%)`
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
                      onAdjust={(dir) => handleAdjust(setTariff, dir, 5, 50, 1)} 
                    />
                    
                    <InputStepper 
                      label="Your power cost (₹/kWh)" 
                      value={powerCost} 
                      onAdjust={(dir) => handleAdjust(setPowerCost, dir, 2, 30, 1)} 
                    />
                    
                    <InputStepper 
                      label="kWh per vehicle" 
                      value={kwhPerVehicle} 
                      onAdjust={(dir) => handleAdjust(setKwhPerVehicle, dir, 1, 100, 0.5)} 
                    />
                    
                    <InputStepper 
                      label="Charger price (₹)" 
                      value={chargerPrice} 
                      onAdjust={(dir) => handleAdjust(setChargerPrice, dir, 5000, 1000000, 1000)} 
                    />
                  </div>
                </div>

                {/* Software Plan */}
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-sm font-bold text-white/70 mb-4">Software plan <span className="text-[#888] font-normal">— commission comes off your earnings</span></h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {SOFTWARE_PLANS.map(plan => (
                      <div 
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan)}
                        className={`cursor-pointer rounded-xl p-4 transition-all duration-300 border ${
                          selectedPlan.id === plan.id 
                            ? 'bg-[#00FF3C]/10 border-[#00FF3C]' 
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="text-sm font-bold text-white mb-1">{plan.name}</div>
                        <div className={`text-xl font-bold mb-1 ${selectedPlan.id === plan.id ? 'text-[#00FF3C]' : 'text-white/80'}`}>
                          {plan.commission}%
                        </div>
                        <div className="text-[0.65rem] text-white/50">{plan.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Net Margin */}
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-sm text-white/50">Net margin per kWh, after power & commission</span>
                  <span className="text-xl font-bold text-[#00FF3C]">₹{netMarginPerKwh.toFixed(1)}</span>
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
              <div className="w-full bg-gradient-to-br from-[#00FF3C]/20 to-[#00FF3C]/5 border border-[#00FF3C]/30 rounded-[2rem] p-8 lg:p-10 shadow-[0_0_50px_rgba(0,255,60,0.1)] overflow-hidden relative">
                <Zap className="absolute -right-10 -bottom-10 w-64 h-64 text-[#00FF3C]/10 rotate-12 pointer-events-none" />

                <h4 className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">Estimated Monthly Earnings</h4>
                <div className="text-5xl lg:text-6xl font-display font-bold text-white mb-2 tracking-tight">
                  {formatCurrency(grossRevenueMonthly)}
                </div>
                <p className="text-[#00FF3C] text-sm font-mono mb-8 border-b border-[#00FF3C]/20 pb-8">
                  ≈ {formatCurrency(grossRevenueYearly)} a year in gross revenue
                </p>

                <div className="flex flex-col gap-4 mb-8">
                  <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-5 border border-white/10 flex flex-col">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">Net profit per charger</span>
                    <span className="text-2xl font-bold text-[#00FF3C] mb-1">{formatCurrency(netProfitMonthly)}</span>
                    <span className="text-white/40 text-[0.65rem] uppercase">per month</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-5 border border-white/10 flex flex-col">
                      <span className="text-white/60 text-[0.65rem] font-bold uppercase tracking-wider mb-1">Platform comm.</span>
                      <span className="text-xl font-bold text-white mb-1">{formatCurrency(commissionMonthly)}</span>
                      <span className="text-white/40 text-[0.65rem] uppercase">{selectedPlan.name} - {selectedPlan.commission}%</span>
                    </div>

                    <div className="bg-[#020403]/60 backdrop-blur-md rounded-xl p-5 border border-[#00FF3C]/30 flex flex-col shadow-[0_0_15px_rgba(0,255,60,0.1)]">
                      <span className="text-white/60 text-[0.65rem] font-bold uppercase tracking-wider mb-1">Break-even</span>
                      <span className="text-xl font-bold text-[#00FF3C] mb-1">
                        {breakEvenMonths < 1 ? '< 1 Month' : `${breakEvenMonths.toFixed(1)} Months`}
                      </span>
                      <span className="text-white/40 text-[0.65rem] uppercase">on charger price</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-[#00FF3C] text-black font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,60,0.5)] transition-all duration-300">
                    Buy Now
                  </button>
                  <button className="flex-1 bg-transparent border border-[#00FF3C] text-[#00FF3C] font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-[#00FF3C]/10 transition-all duration-300 flex items-center justify-center gap-2">
                    Talk to an Expert
                  </button>
                </div>
              </div>

              {/* Traffic Changes Chart */}
              <div className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 backdrop-blur-md">
                <h4 className="text-xl font-display font-bold text-white mb-2">When Traffic Changes</h4>
                <p className="text-sm text-[#888] mb-8">Net profit per charger, per month, on quieter or busier days:</p>
                
                <div className="flex items-end justify-between h-48 gap-4 pb-8 border-b border-white/10">
                  {/* Quiet Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-sm font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{formatShortCurrency(quietProfit)}</span>
                    <div 
                      className="w-full bg-[#00FF3C]/30 rounded-t-lg transition-all duration-500 ease-out hover:bg-[#00FF3C]/50"
                      style={{ height: `${quietHeight}%` }}
                    />
                  </div>
                  
                  {/* Likely Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-sm font-bold text-white mb-2 opacity-100 transition-opacity">{formatShortCurrency(netProfitMonthly)}</span>
                    <div 
                      className="w-full bg-[#00FF3C]/70 rounded-t-lg transition-all duration-500 ease-out shadow-[0_0_20px_rgba(0,255,60,0.2)]"
                      style={{ height: `${likelyHeight}%` }}
                    />
                  </div>
                  
                  {/* Busy Bar */}
                  <div className="flex flex-col items-center flex-1 h-full justify-end group">
                    <span className="text-sm font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{formatShortCurrency(busyProfit)}</span>
                    <div 
                      className="w-full bg-[#00FF3C] rounded-t-lg transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(0,255,60,0.4)]"
                      style={{ height: `${busyHeight}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 text-xs font-mono uppercase tracking-widest text-[#888]">
                  <span className="flex-1 text-center">Quiet</span>
                  <span className="flex-1 text-center text-[#00FF3C]">Likely</span>
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

// Reusable component for the +/- number inputs
const InputStepper = ({ label, value, onAdjust }) => (
  <div>
    <label className="block text-white/50 text-[0.7rem] font-bold mb-2 uppercase tracking-wider h-8">{label}</label>
    <div className="flex items-center justify-between bg-[#050A07] border border-white/10 rounded-xl p-2 h-14">
      <button 
        onClick={() => onAdjust(-1)}
        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#00FF3C] transition-colors"
      >
        <Minus size={16} />
      </button>
      <span className="font-mono text-white font-bold">{value}</span>
      <button 
        onClick={() => onAdjust(1)}
        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#00FF3C] transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  </div>
);

export default Calculator;
