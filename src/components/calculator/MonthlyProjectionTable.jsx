import React from 'react';
import { Table, Download, Info } from 'lucide-react';
import { formatINR, formatNumberIN } from '../../services/financialCalculator';

const MonthlyProjectionTable = ({ projectionData }) => {
  if (!projectionData) return null;

  const { monthlyResults, annualTotals } = projectionData;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-150 text-gray-900 mb-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-150 gap-3 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-display font-bold text-gray-900 flex items-center gap-2">
            <Table className="w-5 h-5 text-[#00A300]" />
            12-Month Financial Reconciliation Table
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Full accounting breakdown distinguishing Revenue, Contribution, Fixed OPEX, and Cumulative Cash Flow
          </p>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full text-left text-xs font-sans min-w-[900px]">
          <thead className="bg-gray-100/80 text-gray-700 font-mono text-[11px] uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 px-3 font-bold sticky left-0 bg-gray-100 z-10">Month</th>
              <th className="py-3 px-3 text-right">Daily Sessions</th>
              <th className="py-3 px-3 text-right">Monthly Sessions</th>
              <th className="py-3 px-3 text-right">Energy (kWh)</th>
              <th className="py-3 px-3 text-right">Revenue</th>
              <th className="py-3 px-3 text-right">Power Cost</th>
              <th className="py-3 px-3 text-right">Var. Fees</th>
              <th className="py-3 px-3 text-right">Fixed OPEX</th>
              <th className="py-3 px-3 text-right font-bold">Operating Profit</th>
              <th className="py-3 px-3 text-right font-bold">Net Cash Flow</th>
              <th className="py-3 px-3 text-right font-bold">Cumulative Cash</th>
              <th className="py-3 px-3 text-right">Break-Even (₹/kWh)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-150 font-mono text-xs">
            {monthlyResults.map((m) => {
              const isProfitPositive = m.operatingProfit >= 0;
              const isCashPositive = m.cumulativeCashFlow >= 0;
              const beDisplay = m.breakEven.status === 'normal' 
                ? `₹${m.breakEven.pricePerKwh.toFixed(2)}` 
                : (m.breakEven.status === 'zero_energy' ? 'Zero kWh' : 'Invalid');

              return (
                <tr key={m.monthIndex} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-150">
                    Month {m.monthIndex}
                  </td>
                  <td className="py-2.5 px-3 text-right text-gray-600">{m.dailySessions}</td>
                  <td className="py-2.5 px-3 text-right text-gray-700">{formatNumberIN(m.expectedMonthlySessions, 0)}</td>
                  <td className="py-2.5 px-3 text-right text-gray-800">{formatNumberIN(m.energyKwh, 0)}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-gray-900">{formatINR(m.grossRevenue)}</td>
                  <td className="py-2.5 px-3 text-right text-rose-600">-{formatINR(m.electricityExpense)}</td>
                  <td className="py-2.5 px-3 text-right text-rose-600">-{formatINR(m.platformVariableFee + m.paymentGatewayExpense)}</td>
                  <td className="py-2.5 px-3 text-right text-gray-600">-{formatINR(m.fixedOpex.total)}</td>
                  <td className={`py-2.5 px-3 text-right font-bold ${isProfitPositive ? 'text-[#008800]' : 'text-rose-600'}`}>
                    {formatINR(m.operatingProfit)}
                  </td>
                  <td className={`py-2.5 px-3 text-right font-bold ${m.netOperatingCashFlow >= 0 ? 'text-gray-900' : 'text-rose-600'}`}>
                    {formatINR(m.netOperatingCashFlow)}
                  </td>
                  <td className={`py-2.5 px-3 text-right font-bold ${isCashPositive ? 'text-[#008800] bg-emerald-50/50' : 'text-rose-600'}`}>
                    {formatINR(m.cumulativeCashFlow)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-gray-500 font-sans text-[11px]">
                    {beDisplay}
                  </td>
                </tr>
              );
            })}
          </tbody>
          
          {/* Reconciled 12-Month Total Row */}
          <tfoot className="bg-gray-100 font-mono font-bold text-xs border-t-2 border-gray-300">
            <tr>
              <td className="py-3 px-3 text-gray-900 sticky left-0 bg-gray-100 z-10 border-r border-gray-200">
                12-Month Total
              </td>
              <td className="py-3 px-3 text-right text-gray-500">—</td>
              <td className="py-3 px-3 text-right text-gray-900">{formatNumberIN(annualTotals.sessions, 0)}</td>
              <td className="py-3 px-3 text-right text-gray-900">{formatNumberIN(annualTotals.energyKwh, 0)}</td>
              <td className="py-3 px-3 text-right text-gray-900">{formatINR(annualTotals.revenue)}</td>
              <td className="py-3 px-3 text-right text-rose-600">-{formatINR(annualTotals.electricityExpense)}</td>
              <td className="py-3 px-3 text-right text-rose-600">-{formatINR(annualTotals.platformVariableFee + annualTotals.paymentGatewayExpense)}</td>
              <td className="py-3 px-3 text-right text-gray-700">-{formatINR(annualTotals.fixedOpex)}</td>
              <td className={`py-3 px-3 text-right ${annualTotals.operatingProfit >= 0 ? 'text-[#008800]' : 'text-rose-600'}`}>
                {formatINR(annualTotals.operatingProfit)}
              </td>
              <td className="py-3 px-3 text-right text-gray-900">
                {formatINR(annualTotals.netCashFlow)}
              </td>
              <td className={`py-3 px-3 text-right ${projectionData.cumulativeCashFlowMonth12 >= 0 ? 'text-[#008800]' : 'text-rose-600'}`}>
                {formatINR(projectionData.cumulativeCashFlowMonth12)}
              </td>
              <td className="py-3 px-3 text-right text-gray-400 font-sans text-[11px]">—</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 font-sans">
        <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <span>Annual totals strictly equal the mathematical sum of the 12 individual monthly projections. Break-even formula accounts for customer price, variable electricity, CMS, and percentage gateway fees.</span>
      </div>

    </div>
  );
};

export default MonthlyProjectionTable;
