import React, { useState } from 'react';
import { BarChart3, LineChart, TrendingUp } from 'lucide-react';
import { formatINR } from '../../services/financialCalculator';

const FinancialCharts = ({ monthlyResults = [], initialCashInvestment = 0 }) => {
  const [activeTab, setActiveTab] = useState('cashflow'); // 'cashflow' | 'pl'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!monthlyResults || monthlyResults.length === 0) return null;

  // Values for P&L chart
  const maxRevenue = Math.max(...monthlyResults.map(m => m.grossRevenue), 1000);
  const maxOpex = Math.max(...monthlyResults.map(m => m.totalOperatingExpenses), 1000);
  const chartMaxPL = Math.max(maxRevenue, maxOpex) * 1.1;

  // Values for Cumulative Cash Flow chart
  const cashFlows = [
    { month: 0, label: 'Start', cash: -initialCashInvestment },
    ...monthlyResults.map(m => ({ month: m.monthIndex, label: `M${m.monthIndex}`, cash: m.cumulativeCashFlow }))
  ];

  const minCash = Math.min(...cashFlows.map(c => c.cash), -10000);
  const maxCash = Math.max(...cashFlows.map(c => c.cash), 10000);
  const range = maxCash - minCash || 1;
  const zeroYPercent = ((maxCash - 0) / range) * 100;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-150 text-gray-900 mb-8">
      
      {/* Header with Chart Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-150 gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-display font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00A300]" />
            12-Month Financial Trajectory Analytics
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Visualizing cash flow recovery curve and monthly operating performance
          </p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('cashflow')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cashflow' ? 'bg-white text-gray-900 font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            Cumulative Cash Flow
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pl')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pl' ? 'bg-white text-gray-900 font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Monthly Revenue vs OPEX
          </button>
        </div>
      </div>

      {/* Chart 1: Cumulative Cash Flow Curve */}
      {activeTab === 'cashflow' && (
        <div>
          <div className="flex items-center justify-between mb-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#00A300]" />
                Cumulative Cash Flow
              </span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <span className="w-3 h-0.5 bg-gray-400 border-t border-dashed" />
                Zero Break-Even Threshold
              </span>
            </div>
            {hoveredIndex !== null && cashFlows[hoveredIndex] && (
              <span className="font-mono font-bold text-xs bg-gray-100 px-2.5 py-1 rounded-lg">
                {cashFlows[hoveredIndex].label}: {formatINR(cashFlows[hoveredIndex].cash)}
              </span>
            )}
          </div>

          <div className="relative h-64 sm:h-72 w-full pt-4 pb-8">
            {/* Zero Break-Even Line */}
            <div 
              className="absolute left-0 right-0 border-t border-dashed border-gray-400 z-0 pointer-events-none"
              style={{ top: `${Math.min(95, Math.max(5, zeroYPercent))}%` }}
            >
              <span className="absolute right-0 -top-3.5 text-[10px] font-mono text-gray-400 bg-white px-1">
                ₹0 Break-Even
              </span>
            </div>

            {/* SVG Trajectory Line */}
            <svg className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="cashGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00C800" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00C800" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area fill */}
              <polygon
                points={`
                  0,${(maxCash / range) * 100}%
                  ${cashFlows.map((c, i) => {
                    const x = (i / (cashFlows.length - 1)) * 100;
                    const y = ((maxCash - c.cash) / range) * 100;
                    return `${x}%,${y}%`;
                  }).join(' ')}
                  100%,${(maxCash / range) * 100}%
                `}
                fill="url(#cashGrad)"
              />

              {/* Line */}
              <polyline
                fill="none"
                stroke="#008800"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={cashFlows.map((c, i) => {
                  const x = (i / (cashFlows.length - 1)) * 100;
                  const y = ((maxCash - c.cash) / range) * 100;
                  return `${x}%,${y}%`;
                }).join(' ')}
              />

              {/* Data points */}
              {cashFlows.map((c, i) => {
                const x = (i / (cashFlows.length - 1)) * 100;
                const y = ((maxCash - c.cash) / range) * 100;
                const isPositive = c.cash >= 0;
                return (
                  <g 
                    key={i} 
                    onMouseEnter={() => setHoveredIndex(i)} 
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r={hoveredIndex === i ? 6 : 4}
                      fill={isPositive ? '#00C800' : '#E11D48'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="transition-all"
                    />
                  </g>
                );
              })}
            </svg>

            {/* X-Axis Labels */}
            <div className="absolute left-0 right-0 bottom-0 flex justify-between text-[10px] font-mono text-gray-500 pt-2 border-t border-gray-150">
              {cashFlows.map((c, i) => (
                <span key={i} className="text-center">{c.label}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chart 2: Monthly Revenue vs OPEX Bar Chart */}
      {activeTab === 'pl' && (
        <div>
          <div className="flex items-center justify-between mb-4 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#00C800]" />
                Customer Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-400" />
                Total OPEX
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-gray-900" />
                Operating Profit
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full flex items-end justify-between gap-1.5 sm:gap-3 pt-6 pb-6 border-b border-gray-150">
            {monthlyResults.map((m, i) => {
              const revHeight = Math.max(4, (m.grossRevenue / chartMaxPL) * 100);
              const opexHeight = Math.max(4, (m.totalOperatingExpenses / chartMaxPL) * 100);
              const profitHeight = Math.max(2, (Math.abs(m.operatingProfit) / chartMaxPL) * 100);

              return (
                <div 
                  key={i} 
                  className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col bg-gray-900 text-white text-[10px] font-mono p-2 rounded-lg shadow-xl z-20 whitespace-nowrap">
                    <span className="font-bold border-b border-white/20 pb-0.5 mb-1">Month {m.monthIndex}</span>
                    <span>Revenue: {formatINR(m.grossRevenue)}</span>
                    <span className="text-rose-300">OPEX: {formatINR(m.totalOperatingExpenses)}</span>
                    <span className="text-[#00FF00]">Profit: {formatINR(m.operatingProfit)}</span>
                  </div>

                  <div className="w-full flex items-end justify-center gap-0.5 sm:gap-1 h-full">
                    {/* Revenue Bar */}
                    <div 
                      className="w-1/3 bg-[#00C800] rounded-t-sm transition-all group-hover:brightness-110"
                      style={{ height: `${revHeight}%` }}
                    />
                    {/* OPEX Bar */}
                    <div 
                      className="w-1/3 bg-rose-400 rounded-t-sm transition-all group-hover:brightness-110"
                      style={{ height: `${opexHeight}%` }}
                    />
                    {/* Operating Profit Bar */}
                    <div 
                      className={`w-1/3 rounded-t-sm transition-all ${
                        m.operatingProfit >= 0 ? 'bg-gray-900' : 'bg-rose-700'
                      }`}
                      style={{ height: `${profitHeight}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-gray-500 mt-2">
                    M{m.monthIndex}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default FinancialCharts;
