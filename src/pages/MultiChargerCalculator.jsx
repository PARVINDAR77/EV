import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator as CalcIcon, 
  Zap, 
  TrendingUp, 
  IndianRupee, 
  ShieldCheck, 
  ArrowRight, 
  Minus, 
  Plus, 
  Trash2, 
  Layers, 
  PlusCircle, 
  RotateCcw,
  Sparkles,
  Check,
  Building2,
  Sliders,
  DollarSign,
  Info
} from 'lucide-react';
import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';

// All AXION Charger Models available for multi-charger hub modeling
export const AVAILABLE_CHARGERS = [
  // ── DC Fast Chargers ──
  {
    id: 'dc-240kw',
    name: 'Axion DC 240 kW Hypercharger',
    shortName: 'DC 240 kW Hyper',
    category: 'DC Fast Chargers',
    powerKw: 240,
    guns: '2 × CCS2 Liquid Cooled',
    price: 1899900,
    defaultSessions: 20,
    defaultKwh: 45,
    tagline: 'Heavy-duty electric bus depots & commercial truck stops'
  },
  {
    id: 'dc-120kw',
    name: 'Axion DC 120 kW Highway Dual',
    shortName: 'DC 120 kW Dual',
    category: 'DC Fast Chargers',
    powerKw: 120,
    guns: '2 × CCS2 High-Power',
    price: 999900,
    defaultSessions: 18,
    defaultKwh: 35,
    tagline: 'Ultra-fast highway travel plaza & corridor charging'
  },
  {
    id: 'dc-60kw',
    name: 'Axion DC 60 kW Dual-Gun',
    shortName: 'DC 60 kW Dual',
    category: 'DC Fast Chargers',
    powerKw: 60,
    guns: '2 × CCS2 Dynamic',
    price: 699900,
    defaultSessions: 14,
    defaultKwh: 28,
    tagline: 'High-turnaround fast charging for shopping malls & fleets'
  },
  {
    id: 'dc-30kw',
    name: 'Axion DC 30 kW Urban Fast',
    shortName: 'DC 30 kW Urban',
    category: 'DC Fast Chargers',
    powerKw: 30,
    guns: '1 × CCS2',
    price: 499900,
    defaultSessions: 10,
    defaultKwh: 25,
    tagline: 'Car dealerships, quick-service retail & urban fleet bays'
  },

  // ── AC Commercial Wallboxes ──
  {
    id: 'ac-22kw',
    name: 'Axion AC 22 kW Ultra (Focal 22)',
    shortName: 'AC 22 kW Ultra',
    category: 'AC Chargers',
    powerKw: 22,
    guns: '1 × Type 2',
    price: 89900,
    defaultSessions: 7,
    defaultKwh: 25,
    tagline: '3-phase fast destination charger for hotels & premium lots'
  },
  {
    id: 'ac-11kw',
    name: 'Axion AC 11 kW Commercial',
    shortName: 'AC 11 kW Com.',
    category: 'AC Chargers',
    powerKw: 11,
    guns: '1 × Type 2',
    price: 74900,
    defaultSessions: 6,
    defaultKwh: 22,
    tagline: 'Workplaces, fleet depots & residential societies'
  },
  {
    id: 'ac-7-4kw',
    name: 'Axion AC 7.4 kW Pro (Axion Pro)',
    shortName: 'AC 7.4 kW Pro',
    category: 'AC Chargers',
    powerKw: 7.4,
    guns: '1 × Type 2',
    price: 59900,
    defaultSessions: 6,
    defaultKwh: 20,
    tagline: 'Heavy-duty commercial single-phase smart wallbox'
  },
  {
    id: 'ac-7-4kw-compact',
    name: 'Axion AC 7.4 kW Compact',
    shortName: 'AC 7.4 kW Compact',
    category: 'AC Chargers',
    powerKw: 7.4,
    guns: '1 × Type 2 Tethered',
    price: 49900,
    defaultSessions: 6,
    defaultKwh: 20,
    tagline: 'Ultra-slim minimalist smart wallbox for urban bays'
  },
  {
    id: 'ac-3-3kw',
    name: 'Axion AC 3.3 kW (AXION 3)',
    shortName: 'AC 3.3 kW Multi',
    category: 'AC Chargers',
    powerKw: 3.3,
    guns: '3-Pin Multi-Socket',
    price: 14900,
    defaultSessions: 6,
    defaultKwh: 12,
    tagline: '3-socket slow charging for 2W, 3W & overnight EVs'
  }
];

// One-Click Popular Station Archetype Presets
const STATION_PRESETS = [
  {
    id: 'highway-hub',
    name: 'Highway Superhub',
    desc: 'Ultra-fast corridor mix: 1× 120kW DC + 2× 60kW DC + 2× 22kW AC',
    basket: [
      { modelId: 'dc-120kw', quantity: 1, sessionsPerDay: 18, kwhPerVehicle: 35, unitPrice: 999900 },
      { modelId: 'dc-60kw', quantity: 2, sessionsPerDay: 14, kwhPerVehicle: 28, unitPrice: 699900 },
      { modelId: 'ac-22kw', quantity: 2, sessionsPerDay: 6, kwhPerVehicle: 22, unitPrice: 89900 }
    ]
  },
  {
    id: 'commercial-mall',
    name: 'Retail Mall Plaza',
    desc: 'Commercial shopping hub: 2× 60kW DC Fast + 4× 7.4kW AC Compact',
    basket: [
      { modelId: 'dc-60kw', quantity: 2, sessionsPerDay: 14, kwhPerVehicle: 25, unitPrice: 699900 },
      { modelId: 'ac-7-4kw-compact', quantity: 4, sessionsPerDay: 6, kwhPerVehicle: 20, unitPrice: 49900 }
    ]
  },
  {
    id: 'fleet-depot',
    name: 'Commercial Fleet Depot',
    desc: 'Logistics delivery hub: 4× 30kW DC Fast + 4× 11kW AC Commercial',
    basket: [
      { modelId: 'dc-30kw', quantity: 4, sessionsPerDay: 12, kwhPerVehicle: 30, unitPrice: 499900 },
      { modelId: 'ac-11kw', quantity: 4, sessionsPerDay: 6, kwhPerVehicle: 22, unitPrice: 74900 }
    ]
  },
  {
    id: 'workplace-hub',
    name: 'Corporate Campus',
    desc: 'Office tech park: 1× 60kW DC Visitor + 6× 7.4kW AC Pro + 2× 22kW AC',
    basket: [
      { modelId: 'dc-60kw', quantity: 1, sessionsPerDay: 10, kwhPerVehicle: 25, unitPrice: 699900 },
      { modelId: 'ac-7-4kw', quantity: 6, sessionsPerDay: 4, kwhPerVehicle: 20, unitPrice: 59900 },
      { modelId: 'ac-22kw', quantity: 2, sessionsPerDay: 5, kwhPerVehicle: 22, unitPrice: 89900 }
    ]
  }
];

// Initial default station mix (1× DC 60kW + 2× AC 7.4kW Pro)
const INITIAL_BASKET = [
  {
    modelId: 'dc-60kw',
    quantity: 1,
    sessionsPerDay: 14,
    kwhPerVehicle: 28,
    unitPrice: 699900
  },
  {
    modelId: 'ac-7-4kw',
    quantity: 2,
    sessionsPerDay: 6,
    kwhPerVehicle: 20,
    unitPrice: 59900
  }
];

const MultiChargerCalculator = () => {
  const [basket, setBasket] = useState(INITIAL_BASKET);
  const [timeHorizon, setTimeHorizon] = useState('monthly'); // 'daily' | 'monthly' | 'yearly'
  const [breakEvenUnit, setBreakEvenUnit] = useState('months'); // 'months' | 'years'
  const [tariffMode, setTariffMode] = useState('unified'); // 'unified' | 'split'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Unified Tariffs
  const [unifiedTariff, setUnifiedTariff] = useState(20.0); // ₹/kWh billed to driver
  const [unifiedPowerCost, setUnifiedPowerCost] = useState(9.5); // ₹/kWh DISCOM power cost

  // Split Category Tariffs
  const [dcTariff, setDcTariff] = useState(21.0);
  const [dcPowerCost, setDcPowerCost] = useState(8.5);
  const [acTariff, setAcTariff] = useState(15.0);
  const [acPowerCost, setAcPowerCost] = useState(9.5);

  // Optional Monthly Fixed Overhead (Maintenance, SIMs, cleaning)
  const [monthlyFixedOpex, setMonthlyFixedOpex] = useState(5000);

  // Helper formatting functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatShortCurrency = (amount) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}k`;
    return `₹${Math.floor(amount || 0)}`;
  };

  // Adjust item in basket
  const updateBasketItem = (index, field, value) => {
    setBasket(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // Adjust quantity
  const handleQuantityAdjust = (index, delta) => {
    setBasket(prev => {
      const copy = [...prev];
      const newQty = Math.max(1, Math.min(50, (copy[index].quantity || 1) + delta));
      copy[index] = { ...copy[index], quantity: newQty };
      return copy;
    });
  };

  // Remove charger from basket
  const removeBasketItem = (index) => {
    if (basket.length <= 1) return; // Keep at least one charger
    setBasket(prev => prev.filter((_, i) => i !== index));
  };

  // Add charger to basket
  const addChargerToBasket = (model) => {
    const existingIndex = basket.findIndex(item => item.modelId === model.id);
    if (existingIndex >= 0) {
      handleQuantityAdjust(existingIndex, 1);
    } else {
      setBasket(prev => [
        ...prev,
        {
          modelId: model.id,
          quantity: 1,
          sessionsPerDay: model.defaultSessions || 6,
          kwhPerVehicle: model.defaultKwh || 20,
          unitPrice: model.price
        }
      ]);
    }
    setIsAddModalOpen(false);
  };

  // Load a preset
  const loadPreset = (preset) => {
    setBasket(preset.basket.map(item => ({ ...item })));
  };

  const resetToDefault = () => {
    setBasket(INITIAL_BASKET.map(item => ({ ...item })));
    setUnifiedTariff(20.0);
    setUnifiedPowerCost(9.5);
    setMonthlyFixedOpex(5000);
  };

  // ── Core Aggregated Mathematical Engine ──
  const calculationResults = useMemo(() => {
    let totalCapex = 0;
    let totalConnectedKw = 0;
    let totalDailySessions = 0;
    let totalDailyKwh = 0;
    let dailyGrossRevenue = 0;
    let dailyPowerCost = 0;

    const perItemBreakdown = basket.map((item, idx) => {
      const model = AVAILABLE_CHARGERS.find(c => c.id === item.modelId) || AVAILABLE_CHARGERS[0];
      const qty = Math.max(1, Number(item.quantity) || 1);
      const unitPrice = Math.max(0, Number(item.unitPrice) || model.price);
      const itemCapex = qty * unitPrice;
      const powerKw = (model.powerKw || 0) * qty;

      const sessionsPerDay = Math.max(0, Number(item.sessionsPerDay) || 0);
      const totalItemDailySessions = qty * sessionsPerDay;
      const kwhPerVehicle = Math.max(0, Number(item.kwhPerVehicle) || 0);
      const itemDailyKwh = totalItemDailySessions * kwhPerVehicle;

      // Determine tariff for this item
      const isDc = model.category === 'DC Fast Chargers';
      const sellTariff = tariffMode === 'split' 
        ? (isDc ? dcTariff : acTariff) 
        : unifiedTariff;
      const gridCost = tariffMode === 'split' 
        ? (isDc ? dcPowerCost : acPowerCost) 
        : unifiedPowerCost;

      const itemDailyRevenue = itemDailyKwh * sellTariff;
      const itemDailyPowerCost = itemDailyKwh * gridCost;
      const itemDailyProfit = itemDailyRevenue - itemDailyPowerCost;

      const itemMonthlyRevenue = itemDailyRevenue * 30;
      const itemMonthlyPowerCost = itemDailyPowerCost * 30;
      const itemMonthlyProfit = itemDailyProfit * 30;

      // Single item break-even (approximate)
      const itemPaybackMonths = itemMonthlyProfit > 0 ? (itemCapex / itemMonthlyProfit) : null;

      totalCapex += itemCapex;
      totalConnectedKw += powerKw;
      totalDailySessions += totalItemDailySessions;
      totalDailyKwh += itemDailyKwh;
      dailyGrossRevenue += itemDailyRevenue;
      dailyPowerCost += itemDailyPowerCost;

      return {
        basketIndex: idx,
        model,
        qty,
        unitPrice,
        itemCapex,
        powerKw,
        sessionsPerDay,
        totalItemDailySessions,
        kwhPerVehicle,
        itemDailyKwh,
        sellTariff,
        gridCost,
        itemDailyRevenue,
        itemDailyPowerCost,
        itemDailyProfit,
        itemMonthlyRevenue,
        itemMonthlyPowerCost,
        itemMonthlyProfit,
        itemPaybackMonths
      };
    });

    // Station Hub Summaries across periods
    const dailyFixedOpex = (Number(monthlyFixedOpex) || 0) / 30;
    const dailyNetProfit = dailyGrossRevenue - dailyPowerCost - dailyFixedOpex;

    const monthlyGrossRevenue = dailyGrossRevenue * 30;
    const monthlyPowerCost = dailyPowerCost * 30;
    const monthlyNetProfit = dailyNetProfit * 30;
    const monthlySessions = totalDailySessions * 30;
    const monthlyKwh = totalDailyKwh * 30;

    const annualGrossRevenue = monthlyGrossRevenue * 12;
    const annualPowerCost = monthlyPowerCost * 12;
    const annualNetProfit = monthlyNetProfit * 12;
    const annualSessions = monthlySessions * 12;
    const annualKwh = monthlyKwh * 12;

    // Blended Break-Even Payback Period
    const breakEvenMonths = monthlyNetProfit > 0 ? (totalCapex / monthlyNetProfit) : 0;
    const breakEvenYears = breakEvenMonths / 12;

    // Blended Electricity Margin per kWh
    const blendedMarginPerKwh = totalDailyKwh > 0 ? (dailyGrossRevenue - dailyPowerCost) / totalDailyKwh : 0;

    // Total chargers count
    const totalChargersCount = basket.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

    return {
      perItemBreakdown,
      totalCapex,
      totalConnectedKw,
      totalChargersCount,
      totalDailySessions,
      totalDailyKwh,
      daily: {
        revenue: dailyGrossRevenue,
        powerCost: dailyPowerCost,
        profit: dailyNetProfit,
        sessions: totalDailySessions,
        kwh: totalDailyKwh
      },
      monthly: {
        revenue: monthlyGrossRevenue,
        powerCost: monthlyPowerCost,
        profit: monthlyNetProfit,
        sessions: monthlySessions,
        kwh: monthlyKwh
      },
      yearly: {
        revenue: annualGrossRevenue,
        powerCost: annualPowerCost,
        profit: annualNetProfit,
        sessions: annualSessions,
        kwh: annualKwh
      },
      breakEvenMonths,
      breakEvenYears,
      blendedMarginPerKwh
    };
  }, [basket, tariffMode, unifiedTariff, unifiedPowerCost, dcTariff, dcPowerCost, acTariff, acPowerCost, monthlyFixedOpex]);

  const activeMetrics = {
    daily: {
      label: 'Daily',
      periodUnit: 'day',
      revenue: calculationResults.daily.revenue,
      powerCost: calculationResults.daily.powerCost,
      profit: calculationResults.daily.profit,
      subText: `Total ${calculationResults.totalDailySessions} sessions / day (${calculationResults.totalDailyKwh.toFixed(0)} kWh) across ${calculationResults.totalChargersCount} chargers`
    },
    monthly: {
      label: 'Monthly',
      periodUnit: 'month',
      revenue: calculationResults.monthly.revenue,
      powerCost: calculationResults.monthly.powerCost,
      profit: calculationResults.monthly.profit,
      subText: `≈ ${formatCurrency(calculationResults.yearly.revenue)} annual revenue across ${calculationResults.totalChargersCount} units (${calculationResults.totalConnectedKw} kW load)`
    },
    yearly: {
      label: 'Annual',
      periodUnit: 'year',
      revenue: calculationResults.yearly.revenue,
      powerCost: calculationResults.yearly.powerCost,
      profit: calculationResults.yearly.profit,
      subText: `Throughput: ${calculationResults.yearly.sessions.toLocaleString('en-IN')} sessions (${calculationResults.yearly.kwh.toLocaleString('en-IN', { maximumFractionDigits: 0 })} kWh) delivered`
    }
  }[timeHorizon];

  const breakEvenDisplay = () => {
    if (calculationResults.monthly.profit <= 0) return 'N/A';
    if (breakEvenUnit === 'years') {
      if (calculationResults.breakEvenYears < 0.1) return '< 0.1 Year';
      return `${calculationResults.breakEvenYears.toFixed(1)} ${calculationResults.breakEvenYears === 1 ? 'Year' : 'Years'}`;
    }
    if (calculationResults.breakEvenMonths < 1) return '< 1 Month';
    return `${calculationResults.breakEvenMonths.toFixed(1)} ${calculationResults.breakEvenMonths === 1 ? 'Month' : 'Months'}`;
  };

  const breakEvenSecondary = () => {
    if (calculationResults.monthly.profit <= 0) return '';
    if (breakEvenUnit === 'years') {
      return calculationResults.breakEvenMonths < 1 ? '(< 1 Mo)' : `(≈ ${calculationResults.breakEvenMonths.toFixed(1)} Mo)`;
    }
    return calculationResults.breakEvenYears < 0.1 ? '(< 0.1 Yr)' : `(≈ ${calculationResults.breakEvenYears.toFixed(1)} Yr)`;
  };

  return (
    <PageTransition locationKey="multi-charger-calculator">
      <main className="w-full min-h-screen bg-[#020403] pt-28 sm:pt-32 pb-24 overflow-hidden relative font-sans text-gray-100">
        
        {/* Background Ambience */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 left-[-15%] w-[700px] h-[700px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          
          {/* Header & Sub-navigation Breadcrumb */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-accent/15 border border-accent/40 rounded-full text-accent font-mono text-[11px] uppercase tracking-wider font-bold shadow-[0_0_12px_rgba(0,255,0,0.2)] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Commercial Hub Modeler
                </span>
                <span className="text-gray-400 font-mono text-xs hidden sm:inline">
                  · Station Mix & Portfolio ROI
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight leading-tight">
                Multi-Charger Hub ROI & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00C800]">
                  Station Mix Calculator
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 font-sans max-w-[760px] mt-3 leading-relaxed">
                Combine an unlimited mix of AC wallboxes and DC fast chargers in a single station, customize per-unit sessions and battery consumption, and calculate aggregated CAPEX, revenue, and blended break-even payback.
              </p>
            </div>

            {/* Quick Actions & Calculator Switcher */}
            <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
              <Link
                to="/calculator"
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white/30 text-gray-400 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5"
                title="Switch to Single Charger ROI Calculator"
              >
                <CalcIcon className="w-3.5 h-3.5" />
                Single Charger ROI
              </Link>

              <button
                type="button"
                onClick={resetToDefault}
                className="px-4 py-2 rounded-full border border-white/15 hover:border-white/30 text-gray-400 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset assumptions to initial defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Mix
              </button>

              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-full bg-accent text-black text-xs font-bold font-sans uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,0,0.35)] flex items-center gap-2"
              >
                Get Turnkey Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Preset Station Archetypes */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                One-Click Popular Station Archetypes
              </span>
              <span className="text-[11px] text-gray-400 font-sans">
                Click any preset to load a pre-configured station mix
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {STATION_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-accent/40 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className="text-xs font-bold text-white group-hover:text-accent transition-colors">
                      {preset.name}
                    </h4>
                    <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">
                      {preset.basket.reduce((s, i) => s + i.quantity, 0)} Units
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">
                    {preset.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Calculator Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ════════════════════════════════════════════════════════════════════════
                LEFT COLUMN (7 COLS): STATION MIX INVENTORY & TARIFF CONFIGURATION
            ════════════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Station Inventory Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-150 text-gray-900">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-150 gap-3 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-0.5">
                      Station Fleet Mix
                    </span>
                    <h2 className="text-lg sm:text-xl font-display font-bold text-gray-900 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#00A300]" />
                      Configured Chargers in Station Hub ({calculationResults.totalChargersCount} Units)
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#00A300] text-black text-xs font-bold font-sans uppercase rounded-full hover:bg-black hover:text-white transition-all shadow-md cursor-pointer flex-shrink-0"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Another Charger
                  </button>
                </div>

                {/* List of Configured Chargers in Basket */}
                <div className="space-y-4">
                  {basket.map((item, idx) => {
                    const model = AVAILABLE_CHARGERS.find(c => c.id === item.modelId) || AVAILABLE_CHARGERS[0];
                    const isDc = model.category === 'DC Fast Chargers';
                    const itemCapex = (Number(item.quantity) || 1) * (Number(item.unitPrice) || model.price);

                    return (
                      <div
                        key={`${item.modelId}-${idx}`}
                        className="p-4 sm:p-5 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-gray-50 transition-all shadow-sm"
                      >
                        {/* Top row: Model title, badges, and delete button */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                                isDc ? 'bg-black text-accent' : 'bg-gray-200 text-gray-800'
                              }`}>
                                {isDc ? '⚡ DC Fast' : '🔌 AC Destination'}
                              </span>
                              <span className="text-xs font-mono font-bold text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">
                                {model.powerKw} kW
                              </span>
                              <span className="text-[11px] font-mono text-gray-500">
                                {model.guns}
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                              {model.name}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeBasketItem(idx)}
                            disabled={basket.length <= 1}
                            className={`p-2 rounded-xl transition-colors cursor-pointer ${
                              basket.length <= 1 
                                ? 'text-gray-300 cursor-not-allowed' 
                                : 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                            }`}
                            title={basket.length <= 1 ? 'Station requires at least 1 charger' : 'Remove this charger model'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Middle row: Quantity, Sessions, kWh, and Unit Price Controls */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-200/80">
                          
                          {/* 1. Unit Quantity */}
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block mb-1">
                              Quantity
                            </label>
                            <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-xl p-1">
                              <button
                                type="button"
                                onClick={() => handleQuantityAdjust(idx, -1)}
                                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                max="50"
                                value={item.quantity}
                                onChange={(e) => updateBasketItem(idx, 'quantity', Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-full text-center font-mono font-bold text-xs bg-transparent focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleQuantityAdjust(idx, 1)}
                                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          {/* 2. Sessions / Day / Charger */}
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block mb-1">
                              Sessions / Day
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                min="1"
                                max="60"
                                value={item.sessionsPerDay}
                                onChange={(e) => updateBasketItem(idx, 'sessionsPerDay', Math.max(1, parseFloat(e.target.value) || 1))}
                                className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs text-gray-900 focus:outline-none focus:border-[#00C800]"
                              />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-gray-400">/unit</span>
                            </div>
                          </div>

                          {/* 3. kWh per Session */}
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block mb-1">
                              kWh / Vehicle
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                min="1"
                                max="150"
                                value={item.kwhPerVehicle}
                                onChange={(e) => updateBasketItem(idx, 'kwhPerVehicle', Math.max(1, parseFloat(e.target.value) || 1))}
                                className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs text-gray-900 focus:outline-none focus:border-[#00C800]"
                              />
                              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-gray-400">kWh</span>
                            </div>
                          </div>

                          {/* 4. Unit Price (Editable) */}
                          <div>
                            <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block mb-1">
                              Unit Price (₹)
                            </label>
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-[10px]">₹</span>
                              <input
                                type="number"
                                min="1000"
                                step="1000"
                                value={item.unitPrice}
                                onChange={(e) => updateBasketItem(idx, 'unitPrice', Math.max(0, parseFloat(e.target.value) || 0))}
                                className="w-full pl-5 pr-2 py-1.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs text-gray-900 focus:outline-none focus:border-[#00C800]"
                              />
                            </div>
                          </div>

                        </div>

                        {/* Bottom row summary for this item */}
                        <div className="mt-3 pt-2.5 border-t border-gray-200/50 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-gray-600">
                          <div>
                            <span>Subtotal CAPEX: </span>
                            <strong className="text-gray-900">{formatCurrency(itemCapex)}</strong>
                            <span className="text-gray-400"> ({item.quantity} × {formatCurrency(item.unitPrice)})</span>
                          </div>

                          <div className="text-[#008800] font-bold">
                            {(item.quantity * item.sessionsPerDay).toFixed(0)} sessions/day · {(item.quantity * item.sessionsPerDay * item.kwhPerVehicle).toFixed(0)} kWh/day
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add Charger Button Bottom Bar */}
                <div className="mt-5 pt-4 border-t border-gray-150 flex items-center justify-between flex-wrap gap-3">
                  <div className="text-xs text-gray-500 font-sans">
                    Total Station Connected Grid Power: <strong className="font-mono text-gray-900">{calculationResults.totalConnectedKw} kW</strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 rounded-xl border border-dashed border-gray-300 hover:border-gray-500 text-xs font-mono text-gray-700 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#00A300]" />
                    Add More Chargers to Mix
                  </button>
                </div>
              </div>

              {/* Station Tariff & Operational Assumptions Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-150 text-gray-900">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-150 gap-3 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-0.5">
                      Tariff & Operating Economics
                    </span>
                    <h3 className="text-lg font-display font-bold text-gray-900 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#00A300]" />
                      Revenue Tariffs & DISCOM Power Costs
                    </h3>
                  </div>

                  {/* Mode switcher: Unified vs Split */}
                  <div className="flex bg-gray-150 p-1 rounded-xl text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setTariffMode('unified')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        tariffMode === 'unified' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      Unified Tariff
                    </button>
                    <button
                      type="button"
                      onClick={() => setTariffMode('split')}
                      className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        tariffMode === 'split' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      Split AC / DC Tariffs
                    </button>
                  </div>
                </div>

                {tariffMode === 'unified' ? (
                  /* Unified Tariffs */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                      <label className="text-xs font-bold text-gray-800 block mb-1">
                        Driver Selling Price (₹/kWh)
                      </label>
                      <p className="text-[11px] text-gray-500 mb-2">Flat price billed per unit across all chargers</p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          step="0.5"
                          value={unifiedTariff}
                          onChange={(e) => setUnifiedTariff(Math.max(1, parseFloat(e.target.value) || 1))}
                          className="w-full pl-7 pr-12 py-2 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">/ kWh</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                      <label className="text-xs font-bold text-gray-800 block mb-1">
                        DISCOM Electricity Cost (₹/kWh)
                      </label>
                      <p className="text-[11px] text-gray-500 mb-2">Grid power tariff cost paid to DISCOM</p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          step="0.25"
                          value={unifiedPowerCost}
                          onChange={(e) => setUnifiedPowerCost(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full pl-7 pr-12 py-2 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">/ kWh</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Split Tariffs */
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* DC Tariffs */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                      <span className="text-[11px] font-mono font-bold uppercase text-accent bg-black px-2 py-0.5 rounded">
                        DC Fast Charging Tariffs
                      </span>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">DC Selling Rate (₹/kWh)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={dcTariff}
                          onChange={(e) => setDcTariff(Math.max(1, parseFloat(e.target.value) || 1))}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">DC Grid Cost (₹/kWh)</label>
                        <input
                          type="number"
                          step="0.25"
                          value={dcPowerCost}
                          onChange={(e) => setDcPowerCost(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs"
                        />
                      </div>
                    </div>

                    {/* AC Tariffs */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                      <span className="text-[11px] font-mono font-bold uppercase text-gray-800 bg-gray-200 px-2 py-0.5 rounded">
                        AC Destination Tariffs
                      </span>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">AC Selling Rate (₹/kWh)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={acTariff}
                          onChange={(e) => setAcTariff(Math.max(1, parseFloat(e.target.value) || 1))}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">AC Grid Cost (₹/kWh)</label>
                        <input
                          type="number"
                          step="0.25"
                          value={acPowerCost}
                          onChange={(e) => setAcPowerCost(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Fixed Monthly Overhead */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-800 block">
                      Station Fixed Monthly Overhead (₹/mo)
                    </label>
                    <p className="text-[11px] text-gray-500">
                      Site housekeeping, 4G SIM connectivity & preventive maintenance
                    </p>
                  </div>
                  <div className="relative w-40">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={monthlyFixedOpex}
                      onChange={(e) => setMonthlyFixedOpex(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-full pl-7 pr-3 py-1.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs text-gray-900"
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* ════════════════════════════════════════════════════════════════════════
                RIGHT COLUMN (5 COLS): AGGREGATED EARNINGS & BLENDED PAYBACK DASHBOARD
            ════════════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-28">
              
              {/* Primary Glowing Earnings Box */}
              <div className="w-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30 rounded-[2rem] p-6 sm:p-8 shadow-[0_0_50px_rgba(var(--color-accent-rgb),0.12)] relative overflow-hidden">
                <Zap className="absolute -right-8 -bottom-8 w-56 h-56 text-accent/10 rotate-12 pointer-events-none" />

                {/* Period Selector Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-[#020403]/80 border border-white/10 rounded-2xl mb-6 backdrop-blur-md w-fit">
                  {['daily', 'monthly', 'yearly'].map((period) => (
                    <button
                      key={period}
                      type="button"
                      onClick={() => setTimeHorizon(period)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                        timeHorizon === period
                          ? 'bg-accent text-black shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.4)]'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      Per {period === 'yearly' ? 'Year' : period === 'monthly' ? 'Month' : 'Day'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-xs font-mono uppercase tracking-widest font-bold">
                    Estimated {activeMetrics.label} Earnings
                  </span>
                  <span className="text-[11px] font-mono text-accent bg-black/40 px-2.5 py-0.5 rounded-full border border-accent/30">
                    {calculationResults.totalChargersCount} Units Combined
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-2 tracking-tight">
                  {formatCurrency(activeMetrics.revenue)}
                </div>

                <p className="text-accent text-xs font-mono mb-6 pb-6 border-b border-accent/20">
                  {activeMetrics.subText}
                </p>

                {/* Key Metric Cards */}
                <div className="space-y-3 mb-6">
                  {/* Net Operating Profit */}
                  <div className="bg-[#020403]/70 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-white/60 text-[10px] uppercase font-mono tracking-wider block">
                        Net Operating Profit ({activeMetrics.label})
                      </span>
                      <span className="text-2xl font-bold font-mono text-accent">
                        {formatCurrency(activeMetrics.profit)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-white/40 text-[10px] block font-mono">Per Unit Average</span>
                      <span className="text-xs font-mono text-gray-300">
                        ≈ {formatCurrency(activeMetrics.profit / Math.max(1, calculationResults.totalChargersCount))} / unit
                      </span>
                    </div>
                  </div>

                  {/* Grid Power Cost & CAPEX Cards in 2 cols */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#020403]/60 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
                      <span className="text-white/50 text-[10px] uppercase font-mono block mb-0.5">Grid Power Cost</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-white">
                        {formatCurrency(activeMetrics.powerCost)}
                      </span>
                      <span className="text-white/40 text-[9px] block">per {activeMetrics.periodUnit}</span>
                    </div>

                    <div className="bg-[#020403]/60 backdrop-blur-md rounded-2xl p-3.5 border border-white/10">
                      <span className="text-white/50 text-[10px] uppercase font-mono block mb-0.5">Total Hardware CAPEX</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-white">
                        {formatCurrency(calculationResults.totalCapex)}
                      </span>
                      <span className="text-white/40 text-[9px] block">{calculationResults.totalChargersCount} units total</span>
                    </div>
                  </div>

                  {/* Blended Break-Even Card */}
                  <div className="bg-[#020403]/70 backdrop-blur-md rounded-2xl p-4 border border-accent/40 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/70 text-[10px] uppercase font-mono font-bold">
                        Blended Station Break-Even
                      </span>
                      <div className="inline-flex items-center bg-black/60 border border-white/15 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => setBreakEvenUnit('months')}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            breakEvenUnit === 'months' ? 'bg-accent text-black' : 'text-white/50'
                          }`}
                        >
                          Mo
                        </button>
                        <button
                          type="button"
                          onClick={() => setBreakEvenUnit('years')}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            breakEvenUnit === 'years' ? 'bg-accent text-black' : 'text-white/50'
                          }`}
                        >
                          Yr
                        </button>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold font-mono text-accent">
                        {breakEvenDisplay()}
                      </span>
                      {breakEvenSecondary() && (
                        <span className="text-xs font-mono text-accent/60">
                          {breakEvenSecondary()}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-white/40 font-mono block">
                      Payback across {formatCurrency(calculationResults.totalCapex)} hardware investment
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/contact"
                    className="flex-1 text-center bg-accent text-black font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl hover:bg-white transition-all shadow-md"
                  >
                    Request Station Quote
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 text-center bg-transparent border border-accent text-accent font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl hover:bg-accent/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    Talk to Hub Expert
                  </Link>
                </div>
              </div>

              {/* Detailed Multi-Period Economics Breakdown Table */}
              <div className="w-full bg-[#050A07]/90 border border-white/10 rounded-[2rem] p-5 backdrop-blur-md shadow-xl text-xs font-mono">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                    Full Period Reconciliation
                  </h4>
                  <span className="text-[10px] text-accent font-bold">
                    {calculationResults.totalConnectedKw} kW Connected
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-white/50 text-[10px] uppercase border-b border-white/10">
                        <th className="py-2">Metric</th>
                        <th className="py-2 text-right">Per Day</th>
                        <th className="py-2 text-right">Per Month</th>
                        <th className="py-2 text-right text-accent">Per Year</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[11px]">
                      <tr>
                        <td className="py-2 text-gray-400 font-sans">Sessions</td>
                        <td className="py-2 text-right text-white">{calculationResults.daily.sessions}</td>
                        <td className="py-2 text-right text-white">{calculationResults.monthly.sessions.toLocaleString('en-IN')}</td>
                        <td className="py-2 text-right text-white">{calculationResults.yearly.sessions.toLocaleString('en-IN')}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-400 font-sans">Energy (kWh)</td>
                        <td className="py-2 text-right text-white">{calculationResults.daily.kwh.toFixed(0)}</td>
                        <td className="py-2 text-right text-white">{calculationResults.monthly.kwh.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="py-2 text-right text-white">{calculationResults.yearly.kwh.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-400 font-sans">Tariff Revenue</td>
                        <td className="py-2 text-right text-white font-bold">{formatCurrency(calculationResults.daily.revenue)}</td>
                        <td className="py-2 text-right text-white font-bold">{formatCurrency(calculationResults.monthly.revenue)}</td>
                        <td className="py-2 text-right text-white font-bold">{formatCurrency(calculationResults.yearly.revenue)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-400 font-sans">Grid Power Cost</td>
                        <td className="py-2 text-right text-rose-400">-{formatCurrency(calculationResults.daily.powerCost)}</td>
                        <td className="py-2 text-right text-rose-400">-{formatCurrency(calculationResults.monthly.powerCost)}</td>
                        <td className="py-2 text-right text-rose-400">-{formatCurrency(calculationResults.yearly.powerCost)}</td>
                      </tr>
                      <tr className="text-accent font-bold bg-accent/10">
                        <td className="py-2 px-1 rounded-l-lg font-sans">Net Operator Earnings</td>
                        <td className="py-2 text-right">{formatCurrency(calculationResults.daily.profit)}</td>
                        <td className="py-2 text-right">{formatCurrency(calculationResults.monthly.profit)}</td>
                        <td className="py-2 px-1 rounded-r-lg text-right">{formatCurrency(calculationResults.yearly.profit)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 pt-2 text-[10px] text-gray-400 flex justify-between items-center">
                  <span>Blended Margin: <strong>₹{calculationResults.blendedMarginPerKwh.toFixed(1)} / kWh</strong></span>
                  <span className="text-accent">100% Direct Retained</span>
                </div>
              </div>

            </div>

          </div>

          {/* ════════════════════════════════════════════════════════════════════════
              BOTTOM SECTION: ITEMIZED PER-CHARGER CONTRIBUTION TABLE
          ════════════════════════════════════════════════════════════════════════ */}
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-150 text-gray-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-150 gap-2 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-0.5">
                  Portfolio Contribution Analysis
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900">
                  Itemized Revenue & Payback Share by Charger Model
                </h3>
              </div>
              <span className="text-xs text-gray-500 font-mono">
                {calculationResults.perItemBreakdown.length} Model Types Configured
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono min-w-[700px]">
                <thead className="bg-gray-100 text-gray-700 uppercase text-[10px] border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Charger Model</th>
                    <th className="py-2.5 px-2 text-center">Qty</th>
                    <th className="py-2.5 px-2 text-right">Daily Sessions</th>
                    <th className="py-2.5 px-2 text-right">Daily kWh</th>
                    <th className="py-2.5 px-3 text-right">CAPEX (₹)</th>
                    <th className="py-2.5 px-3 text-right">Monthly Revenue</th>
                    <th className="py-2.5 px-3 text-right">Monthly Profit</th>
                    <th className="py-2.5 px-2 text-right">Revenue Share</th>
                    <th className="py-2.5 px-3 text-right">Payback (Mo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 text-[11px]">
                  {calculationResults.perItemBreakdown.map((item, i) => {
                    const revShare = calculationResults.monthly.revenue > 0 
                      ? ((item.itemMonthlyRevenue / calculationResults.monthly.revenue) * 100).toFixed(1) 
                      : 0;

                    return (
                      <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-3 font-sans font-bold text-gray-900">
                          {item.model.name}
                          <span className="block text-[10px] text-gray-400 font-mono font-normal">
                            {item.model.guns} · {item.powerKw} kW
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center font-bold text-gray-900">{item.qty}</td>
                        <td className="py-3 px-2 text-right text-gray-700">{item.totalItemDailySessions}</td>
                        <td className="py-3 px-2 text-right text-gray-700">{item.itemDailyKwh.toFixed(0)}</td>
                        <td className="py-3 px-3 text-right font-bold text-gray-900">{formatCurrency(item.itemCapex)}</td>
                        <td className="py-3 px-3 text-right font-bold text-[#008800]">{formatCurrency(item.itemMonthlyRevenue)}</td>
                        <td className="py-3 px-3 text-right font-bold text-[#008800]">{formatCurrency(item.itemMonthlyProfit)}</td>
                        <td className="py-3 px-2 text-right font-bold text-gray-800">{revShare}%</td>
                        <td className="py-3 px-3 text-right font-bold text-gray-900">
                          {item.itemPaybackMonths ? `${item.itemPaybackMonths.toFixed(1)} mo` : 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-gray-100 font-bold border-t-2 border-gray-300 text-gray-900">
                  <tr>
                    <td className="py-3 px-3">Total Station Hub</td>
                    <td className="py-3 px-2 text-center">{calculationResults.totalChargersCount}</td>
                    <td className="py-3 px-2 text-right">{calculationResults.totalDailySessions}</td>
                    <td className="py-3 px-2 text-right">{calculationResults.totalDailyKwh.toFixed(0)}</td>
                    <td className="py-3 px-3 text-right">{formatCurrency(calculationResults.totalCapex)}</td>
                    <td className="py-3 px-3 text-right text-[#008800]">{formatCurrency(calculationResults.monthly.revenue)}</td>
                    <td className="py-3 px-3 text-right text-[#008800]">{formatCurrency(calculationResults.monthly.profit)}</td>
                    <td className="py-3 px-2 text-right">100%</td>
                    <td className="py-3 px-3 text-right">{calculationResults.breakEvenMonths.toFixed(1)} mo</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════════════════════
            ADD CHARGER MODAL
        ════════════════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-gray-200 overflow-hidden text-gray-900"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-150 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00A300] font-bold block">
                      AXION Hardware Lineup
                    </span>
                    <h3 className="text-xl font-display font-bold text-gray-900">
                      Add a Charger to Station Mix
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body: Available Chargers Grid */}
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                  {/* DC Section */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider mb-3">
                      ⚡ DC Fast Chargers (High-Turnaround Highway & Commercial)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {AVAILABLE_CHARGERS.filter(c => c.category === 'DC Fast Chargers').map((charger) => {
                        const inBasket = basket.find(item => item.modelId === charger.id);
                        return (
                          <div
                            key={charger.id}
                            className="p-4 rounded-2xl border border-gray-200 hover:border-[#00C800] bg-gray-50/50 hover:bg-white transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-mono font-bold bg-black text-accent px-2 py-0.5 rounded">
                                  {charger.powerKw} kW
                                </span>
                                <span className="text-xs font-mono font-bold text-[#008800]">
                                  {formatCurrency(charger.price)}
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-gray-900 mb-1">{charger.name}</h5>
                              <p className="text-xs text-gray-500 mb-3">{charger.tagline}</p>
                            </div>

                            <button
                              type="button"
                              onClick={() => addChargerToBasket(charger)}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-bold font-sans uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                                inBasket 
                                  ? 'bg-gray-200 hover:bg-[#00C800] text-gray-900 hover:text-black' 
                                  : 'bg-[#00A300] hover:bg-black text-black hover:text-white shadow-sm'
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              {inBasket ? `Add Another (Currently ${inBasket.quantity})` : 'Add to Station Mix'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AC Section */}
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-gray-400 tracking-wider mb-3">
                      🔌 AC Commercial Wallboxes (Workplaces, Hotels & Overnight)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {AVAILABLE_CHARGERS.filter(c => c.category === 'AC Chargers').map((charger) => {
                        const inBasket = basket.find(item => item.modelId === charger.id);
                        return (
                          <div
                            key={charger.id}
                            className="p-4 rounded-2xl border border-gray-200 hover:border-[#00C800] bg-gray-50/50 hover:bg-white transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-mono font-bold bg-gray-200 text-gray-800 px-2 py-0.5 rounded">
                                  {charger.powerKw} kW
                                </span>
                                <span className="text-xs font-mono font-bold text-[#008800]">
                                  {formatCurrency(charger.price)}
                                </span>
                              </div>
                              <h5 className="text-xs font-bold text-gray-900 mb-1">{charger.name}</h5>
                              <p className="text-[11px] text-gray-500 mb-3">{charger.tagline}</p>
                            </div>

                            <button
                              type="button"
                              onClick={() => addChargerToBasket(charger)}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-bold font-sans uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                                inBasket 
                                  ? 'bg-gray-200 hover:bg-[#00C800] text-gray-900 hover:text-black' 
                                  : 'bg-[#00A300] hover:bg-black text-black hover:text-white shadow-sm'
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                              {inBasket ? `Add Another (${inBasket.quantity})` : 'Add to Station'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-xs font-mono hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
    </PageTransition>
  );
};

export default MultiChargerCalculator;
