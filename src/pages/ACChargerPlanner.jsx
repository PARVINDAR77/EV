import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Cpu, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Table, 
  FileText, 
  Sparkles, 
  Layers, 
  RotateCcw,
  Zap,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

import PageTransition from '../components/PageTransition/PageTransition';
import Footer from '../components/Footer/Footer';

import {
  calculate12MonthProjection,
  calculateCapacityLimits,
  calculateInitialInvestment,
  formatINR
} from '../services/financialCalculator';

import CapacityAlertBanner from '../components/calculator/CapacityAlertBanner';
import ChargerInvestmentForm, { AC_CHARGER_MODELS } from '../components/calculator/ChargerInvestmentForm';
import TariffExpenseForm from '../components/calculator/TariffExpenseForm';
import DemandGrowthEditor, { DEFAULT_QUARTERLY_RAMP } from '../components/calculator/DemandGrowthEditor';
import FinancialSummaryCards from '../components/calculator/FinancialSummaryCards';
import FinancialCharts from '../components/calculator/FinancialCharts';
import MonthlyProjectionTable from '../components/calculator/MonthlyProjectionTable';
import PlanComparisonView from '../components/calculator/PlanComparisonView';
import ScenarioComparison from '../components/calculator/ScenarioComparison';
import ProposalReportModal from '../components/calculator/ProposalReportModal';

const INITIAL_INVESTMENT_STATE = {
  selectedModelId: 'ac-7kw-compact',
  chargerRatingKw: 7.4,
  chargerQuantity: 2,
  costPerCharger: 49900,
  installationPerCharger: 15000,
  infrastructureFixed: 25000,
  otherSetupCosts: 10000,
  contingencyPct: 5,
  financing: {
    enabled: false,
    loanPercentage: 70,
    annualInterestRate: 10.5,
    tenureMonths: 36
  }
};

const INITIAL_TARIFF_STATE = {
  customerSellingPricePerKwh: 20.0,
  electricityCostPerKwh: 9.5,
  platformFeePerKwh: 0.5,
  paymentGatewayFeePct: 1.8,
  fixedPlatformFeeMonthly: 500,
  fixedPlatformFeePerCharger: true,
  monthlyMaintenanceCost: 1000,
  siteRentMonthly: 0,
  otherFixedOpexMonthly: 0
};

const INITIAL_DEMAND_STATE = {
  demandMode: 'site-wide', // 'site-wide' | 'per-charger'
  avgKwhPerSession: 20.0,
  operatingDays: 30,
  uptimePct: 98,
  demandSchedule: [...DEFAULT_QUARTERLY_RAMP]
};

const STAGES = [
  { id: 'stage1', label: '1. Hardware & CAPEX', icon: Cpu },
  { id: 'stage2', label: '2. Tariffs & OPEX', icon: DollarSign },
  { id: 'stage3', label: '3. Demand Forecast', icon: Calendar },
  { id: 'stage4', label: '4. Financial Results', icon: TrendingUp },
  { id: 'stage5', label: '5. Compare & Proposal', icon: Layers }
];

const ACChargerPlanner = () => {
  const [activeStage, setActiveStage] = useState('stage1');
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  const [investmentConfig, setInvestmentConfig] = useState(INITIAL_INVESTMENT_STATE);
  const [tariffConfig, setTariffConfig] = useState(INITIAL_TARIFF_STATE);
  const [demandConfig, setDemandConfig] = useState(INITIAL_DEMAND_STATE);
  const [operatingHoursPerDay, setOperatingHoursPerDay] = useState(16);
  const [sitePowerLimitKw, setSitePowerLimitKw] = useState(null);

  // Real-time calculation engine execution
  const baseConfig = useMemo(() => ({
    investmentConfig,
    tariffConfig,
    demandSchedule: demandConfig.demandSchedule,
    demandMode: demandConfig.demandMode,
    operatingDays: demandConfig.operatingDays,
    avgKwhPerSession: demandConfig.avgKwhPerSession,
    uptimePct: demandConfig.uptimePct,
    operatingHoursPerDay,
    sitePowerLimitKw
  }), [investmentConfig, tariffConfig, demandConfig, operatingHoursPerDay, sitePowerLimitKw]);

  const projectionData = useMemo(() => {
    return calculate12MonthProjection(baseConfig);
  }, [baseConfig]);

  // Current projected daily kWh based on Month 1 demand
  const currentDailyKwh = useMemo(() => {
    const dailySessions = demandConfig.demandSchedule[0] || 1;
    const effSessions = demandConfig.demandMode === 'per-charger' 
      ? dailySessions * investmentConfig.chargerQuantity 
      : dailySessions;
    return effSessions * demandConfig.avgKwhPerSession;
  }, [demandConfig, investmentConfig.chargerQuantity]);

  const handleResetAll = () => {
    setInvestmentConfig(INITIAL_INVESTMENT_STATE);
    setTariffConfig(INITIAL_TARIFF_STATE);
    setDemandConfig(INITIAL_DEMAND_STATE);
    setOperatingHoursPerDay(16);
    setSitePowerLimitKw(null);
  };

  return (
    <PageTransition locationKey="ac-charger-planner">
      <main className="w-full min-h-screen bg-[#050708] pt-28 sm:pt-32 pb-20 overflow-hidden relative font-sans text-gray-100">
        
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 left-[-15%] w-[700px] h-[700px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-accent/15 border border-accent/40 rounded-full text-accent font-mono text-[11px] uppercase tracking-wider font-bold shadow-[0_0_12px_rgba(0,255,0,0.2)]">
                  Enterprise Financial Planner
                </span>
                <span className="text-gray-400 font-mono text-xs hidden sm:inline">
                  · 12-Month Cash Flow Model
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight leading-tight">
                AC Charger Investment & <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#00C800]">
                  Revenue Growth Calculator
                </span>
              </h1>
              <p className="text-sm sm:text-base text-gray-400 font-sans max-w-[720px] mt-3 leading-relaxed">
                Model realistic hardware and infrastructure CAPEX, forecast non-linear customer demand, validate physical charger capacity limits, and project 12-month cash flows with honest payback detection.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={handleResetAll}
                className="px-4 py-2.5 rounded-full border border-white/15 hover:border-white/30 text-gray-400 hover:text-white text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset all assumptions to initial defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>

              <button
                type="button"
                onClick={() => setIsProposalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-accent text-black text-xs font-bold font-sans uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,0,0.35)] flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Generate Proposal
              </button>
            </div>
          </div>

          {/* Real-Time Physical Capacity Safety Banner */}
          <div className="mb-8">
            <CapacityAlertBanner
              capacityLimits={projectionData.capacityLimits}
              currentDailyKwh={currentDailyKwh}
              isExceeded={projectionData.hasCapacityWarning}
            />
          </div>

          {/* Guided Stage Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {STAGES.map((s) => {
              const Icon = s.icon;
              const isActive = activeStage === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStage(s.id)}
                  className={`px-3.5 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-sans font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-accent text-black border-accent shadow-[0_0_15px_rgba(0,255,0,0.3)]'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-gray-300 border-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Active Stage Body */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              
              {/* STAGE 1: Charger & CAPEX */}
              {activeStage === 'stage1' && (
                <div className="space-y-6">
                  <ChargerInvestmentForm
                    investmentConfig={investmentConfig}
                    onChange={setInvestmentConfig}
                    calculatedInvestment={projectionData.investment}
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveStage('stage2')}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg"
                    >
                      Next: Configure Tariffs & OPEX
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 2: Tariffs & OPEX */}
              {activeStage === 'stage2' && (
                <div className="space-y-6">
                  <TariffExpenseForm
                    tariffConfig={tariffConfig}
                    onChange={setTariffConfig}
                    chargerQuantity={investmentConfig.chargerQuantity}
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStage('stage1')}
                      className="px-5 py-2.5 rounded-full border border-white/20 text-gray-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      ← Back to Hardware CAPEX
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStage('stage3')}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg"
                    >
                      Next: Forecast Customer Demand
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 3: Demand Forecast */}
              {activeStage === 'stage3' && (
                <div className="space-y-6">
                  <DemandGrowthEditor
                    demandConfig={demandConfig}
                    onChange={setDemandConfig}
                    chargerQuantity={investmentConfig.chargerQuantity}
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setActiveStage('stage2')}
                      className="px-5 py-2.5 rounded-full border border-white/20 text-gray-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      ← Back to Tariffs & OPEX
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStage('stage4')}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg"
                    >
                      Next: View 12-Month Financial Results
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 4: Financial Results Dashboard */}
              {activeStage === 'stage4' && (
                <div className="space-y-6">
                  <FinancialSummaryCards projectionData={projectionData} />

                  <FinancialCharts 
                    monthlyResults={projectionData.monthlyResults}
                    initialCashInvestment={projectionData.initialCashContribution}
                  />

                  <MonthlyProjectionTable projectionData={projectionData} />

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStage('stage3')}
                      className="px-5 py-2.5 rounded-full border border-white/20 text-gray-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      ← Back to Demand Growth
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStage('stage5')}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg"
                    >
                      Next: Plan Comparison & Proposal
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 5: Multi-Plan Comparison & Proposal */}
              {activeStage === 'stage5' && (
                <div className="space-y-6">
                  <PlanComparisonView baseConfig={baseConfig} />

                  <ScenarioComparison baseConfig={baseConfig} />

                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-150 text-gray-900 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <h4 className="text-lg font-display font-bold text-gray-900 mb-1">
                        Ready to Present to Stakeholders?
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Generate an executive client proposal complete with your branding, site details, and print/PDF report.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsProposalOpen(true)}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-black font-sans text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-900 hover:text-white transition-all shadow-lg cursor-pointer flex-shrink-0"
                    >
                      <FileText className="w-4 h-4" />
                      Open Full Client Proposal
                    </button>
                  </div>

                  <div className="flex justify-start pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveStage('stage4')}
                      className="px-5 py-2.5 rounded-full border border-white/20 text-gray-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      ← Back to Financial Results
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Modal: Client Proposal Print View */}
        <ProposalReportModal
          isOpen={isProposalOpen}
          onClose={() => setIsProposalOpen(false)}
          projectionData={projectionData}
          investmentConfig={investmentConfig}
          tariffConfig={tariffConfig}
          demandConfig={demandConfig}
        />

      </main>

      <Footer />
    </PageTransition>
  );
};

export default ACChargerPlanner;
