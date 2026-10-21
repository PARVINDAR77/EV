import React from 'react';
import { Layers, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { calculatePlanComparison, formatINR, formatNumberIN } from '../../services/financialCalculator';

const PlanComparisonView = ({ baseConfig }) => {
  const comparisonPlans = calculatePlanComparison(baseConfig);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-150 text-gray-900 mb-8">
      
      <div className="pb-6 border-b border-gray-150 mb-6">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-1">
          Stage 5A · Multi-Tier DC Fast Charging Hub Sizing
        </span>
        <h3 className="text-base sm:text-lg font-display font-bold text-gray-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#00A300]" />
          DC Fast Charging Infrastructure Sizing Comparison
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Evaluating Starter Hub (1× 60 kW), Highway Hub (2× 60 kW), and Expressway Superhub (2× 120 kW) under the <strong>exact same customer traffic</strong> to contrast deliverable capacity against capital recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {comparisonPlans.map((plan) => {
          const isStarter = plan.planId === 'starter';
          const isGrowth = plan.planId === 'growth';
          const isExpansion = plan.planId === 'expansion';

          return (
            <div
              key={plan.planId}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                isGrowth 
                  ? 'border-[#00C800] bg-gradient-to-b from-[#00FF00]/5 to-white ring-2 ring-[#00C800]/20 shadow-lg' 
                  : 'border-gray-200 bg-gray-50/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                    isGrowth ? 'bg-[#00C800] text-black' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {plan.planName}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-900">
                    {plan.chargerQuantity} {plan.chargerQuantity === 1 ? 'Unit' : 'Units'}
                  </span>
                </div>

                {plan.description && (
                  <p className="text-xs text-gray-600 mb-3 font-sans">
                    {plan.description}
                  </p>
                )}

                <div className="mb-4">
                  <span className="text-[11px] text-gray-500 block">Total Investment (CAPEX)</span>
                  <span className="text-xl font-bold font-mono text-gray-900 block mt-0.5">
                    {formatINR(plan.totalInvestment)}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs border-t border-gray-200 pt-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Daily Max Capacity:</span>
                    <strong className="font-mono text-gray-900">{formatNumberIN(plan.capacityDailyKw)} kWh/day</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Year-1 Revenue:</span>
                    <strong className="font-mono text-gray-900">{formatINR(plan.annualRevenue)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Year-1 Operating Profit:</span>
                    <strong className={`font-mono ${plan.annualOperatingProfit >= 0 ? 'text-[#008800]' : 'text-rose-600'}`}>
                      {formatINR(plan.annualOperatingProfit)}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs">
                  {plan.isPaybackAchieved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  )}
                  <span className="font-sans font-medium text-gray-800">
                    {plan.paybackStatus}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default PlanComparisonView;
