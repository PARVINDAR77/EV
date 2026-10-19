import React from 'react';
import { DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle, ArrowUpRight, Zap, PiggyBank } from 'lucide-react';
import { formatINR, formatNumberIN } from '../../services/financialCalculator';

const FinancialSummaryCards = ({ projectionData }) => {
  if (!projectionData) return null;

  const {
    investment,
    annualTotals,
    paybackMonth,
    paybackStatus,
    isPaybackAchieved,
    firstYearRoiPct,
    initialCashContribution,
    monthlyResults
  } = projectionData;

  // Weighted average break-even price across 12 months
  const validBreakEvens = monthlyResults.filter(m => m.breakEven && m.breakEven.pricePerKwh !== null);
  const avgBreakEvenPrice = validBreakEvens.length > 0 
    ? (validBreakEvens.reduce((sum, m) => sum + m.breakEven.pricePerKwh, 0) / validBreakEvens.length).toFixed(2)
    : 'N/A';

  const profitMargin = annualTotals.revenue > 0 
    ? ((annualTotals.operatingProfit / annualTotals.revenue) * 100).toFixed(1) 
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      
      {/* Card 1: Total Initial Investment */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-150 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold">
            Total Project CAPEX
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
            <PiggyBank className="w-4 h-4" />
          </div>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-gray-900 tracking-tight">
            {formatINR(investment.totalProjectInvestment)}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 font-sans">
            {investment.financing.enabled 
              ? `Client upfront cash: ${formatINR(initialCashContribution)} (${100 - investment.financing.loanPercentage}% equity)`
              : `100% equity funded across ${investment.chargerQuantity} chargers`}
          </p>
        </div>
      </div>

      {/* Card 2: Annual Revenue */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-150 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#00A300] font-bold">
            Year-1 Gross Revenue
          </span>
          <div className="w-8 h-8 rounded-full bg-[#00FF00]/15 flex items-center justify-center text-[#00A300]">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-gray-900 tracking-tight">
            {formatINR(annualTotals.revenue)}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 font-sans">
            Billed across <strong className="text-gray-700 font-mono">{formatNumberIN(annualTotals.energyKwh)} kWh</strong> delivered
          </p>
        </div>
      </div>

      {/* Card 3: Annual Operating Profit */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-150 shadow-md flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 font-bold">
            Year-1 Operating Profit
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div>
          <h3 className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${
            annualTotals.operatingProfit >= 0 ? 'text-[#008800]' : 'text-rose-600'
          }`}>
            {formatINR(annualTotals.operatingProfit)}
          </h3>
          <p className="text-[11px] text-gray-500 mt-1 font-sans">
            Operating margin: <strong className="text-gray-700 font-mono">{profitMargin}%</strong> (after all OPEX)
          </p>
        </div>
      </div>

      {/* Card 4: Estimated Payback */}
      <div className={`p-5 sm:p-6 rounded-3xl border shadow-md flex flex-col justify-between ${
        isPaybackAchieved 
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          : 'bg-amber-50/70 border-amber-200 text-amber-950'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider font-bold">
            Payback Status
          </span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isPaybackAchieved ? 'bg-emerald-200/60 text-emerald-800' : 'bg-amber-200/60 text-amber-800'
          }`}>
            {isPaybackAchieved ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
          </div>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold font-sans tracking-tight leading-snug">
            {isPaybackAchieved ? `Payback: Month ${paybackMonth}` : 'Not within 12 months'}
          </h3>
          <p className="text-[11px] mt-1 font-sans opacity-85 leading-relaxed">
            {isPaybackAchieved 
              ? `Initial investment fully recovered in month ${paybackMonth}.`
              : 'Cumulative cash flow remains in recovery phase at month 12.'}
          </p>
        </div>
      </div>

    </div>
  );
};

export default FinancialSummaryCards;
