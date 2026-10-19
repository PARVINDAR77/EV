import React from 'react';
import { Sliders, TrendingUp, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { calculateScenarios, formatINR, formatNumberIN } from '../../services/financialCalculator';

const ScenarioComparison = ({ baseConfig }) => {
  const scenarios = calculateScenarios(baseConfig, 0.7, 1.3);

  const scenarioList = [
    { key: 'conservative', data: scenarios.conservative, tagColor: 'bg-amber-100 text-amber-800' },
    { key: 'expected', data: scenarios.expected, tagColor: 'bg-[#00C800] text-black font-bold' },
    { key: 'optimistic', data: scenarios.optimistic, tagColor: 'bg-blue-100 text-blue-800' }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-150 text-gray-900 mb-8">
      
      <div className="pb-6 border-b border-gray-150 mb-6">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-1">
          Stage 5B · Uncertainty Sensitivity
        </span>
        <h3 className="text-base sm:text-lg font-display font-bold text-gray-900 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#00A300]" />
          Demand Sensitivity Scenarios
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Evaluating potential revenue and investment recovery under Conservative (-30%), Expected (Baseline), and Optimistic (+30%) traffic scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {scenarioList.map(({ key, data, tagColor }) => {
          const isExpected = key === 'expected';
          const proj = data.projection;

          return (
            <div
              key={key}
              className={`rounded-2xl p-5 border flex flex-col justify-between ${
                isExpected 
                  ? 'border-[#00C800] bg-gradient-to-b from-[#00FF00]/5 to-white ring-2 ring-[#00C800]/20 shadow-md' 
                  : 'border-gray-200 bg-gray-50/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full ${tagColor}`}>
                    {data.label} ({Math.round(data.multiplier * 100)}%)
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-700">
                    {formatNumberIN(proj.annualTotals.sessions, 0)} Sessions
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] text-gray-500 block">Annual Operating Profit</span>
                  <span className={`text-xl font-bold font-mono block mt-0.5 ${
                    proj.annualTotals.operatingProfit >= 0 ? 'text-[#008800]' : 'text-rose-600'
                  }`}>
                    {formatINR(proj.annualTotals.operatingProfit)}
                  </span>
                </div>

                <div className="space-y-2 text-xs border-t border-gray-200 pt-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Delivered Energy:</span>
                    <strong className="font-mono text-gray-900">{formatNumberIN(proj.annualTotals.energyKwh, 0)} kWh</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gross Revenue:</span>
                    <strong className="font-mono text-gray-900">{formatINR(proj.annualTotals.revenue)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Month 12 Cumulative:</span>
                    <strong className={`font-mono ${proj.cumulativeCashFlowMonth12 >= 0 ? 'text-[#008800]' : 'text-rose-600'}`}>
                      {formatINR(proj.cumulativeCashFlowMonth12)}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs">
                  {proj.isPaybackAchieved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  )}
                  <span className="font-sans font-medium text-gray-800">
                    {proj.paybackStatus}
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

export default ScenarioComparison;
