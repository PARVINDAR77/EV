import React, { useState } from 'react';
import { X, Printer, Download, FileText, CheckCircle2, ShieldCheck, Building2, Calendar } from 'lucide-react';
import AxionLogo from '../common/AxionLogo';
import { formatINR, formatNumberIN } from '../../services/financialCalculator';

const ProposalReportModal = ({
  isOpen,
  onClose,
  projectionData,
  investmentConfig,
  tariffConfig,
  demandConfig
}) => {
  const [clientName, setClientName] = useState('Commercial Property / Highway Fleet Host');
  const [siteLocation, setSiteLocation] = useState('Ahmedabad, Gujarat');
  const [preparedBy, setPreparedBy] = useState('AXION CHARGE Solutions Team');

  if (!isOpen || !projectionData) return null;

  const { investment, annualTotals, paybackStatus, isPaybackAchieved, monthlyResults, capacityLimits } = projectionData;
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:border-none print:rounded-none">
        
        {/* Action Bar (Hidden on Print) */}
        <div className="px-6 py-4 bg-gray-900 text-white flex items-center justify-between print:hidden flex-shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            <span className="text-sm font-bold font-sans">
              DC Fast Charging Infrastructure Proposal & Financial Report
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-black text-xs font-bold font-sans uppercase rounded-full hover:bg-white transition-all cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Proposal Body */}
        <div className="p-6 sm:p-10 overflow-y-auto print:overflow-visible print:p-8 space-y-8 font-sans text-gray-900">
          
          {/* Proposal Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b-2 border-gray-900 gap-6">
            <div>
              <AxionLogo className="h-8 sm:h-9 w-auto text-black mb-3" fill="#000000" />
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                DC Fast Charging Commercial Infrastructure Proposal
              </p>
            </div>

            <div className="text-left sm:text-right text-xs space-y-1">
              <div className="flex sm:justify-end items-center gap-1.5 text-gray-500 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date: <strong>{today}</strong></span>
              </div>
              <div className="text-gray-600">
                Prepared By: <strong>{preparedBy}</strong>
              </div>
              <div className="text-gray-400 text-[11px]">
                Valid for 30 days from date of issue
              </div>
            </div>
          </div>

          {/* Client & Site Metadata (Editable in UI) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
            <div>
              <span className="text-gray-400 block font-mono text-[10px] uppercase">Client / Enterprise Host:</span>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="font-bold text-gray-900 text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none w-full"
                placeholder="Client Name"
              />
            </div>
            <div>
              <span className="text-gray-400 block font-mono text-[10px] uppercase">Proposed Site Location:</span>
              <input
                type="text"
                value={siteLocation}
                onChange={(e) => setSiteLocation(e.target.value)}
                className="font-bold text-gray-900 text-sm bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-500 focus:outline-none w-full"
                placeholder="Site Location"
              />
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-gray-400 tracking-wider mb-3">
              1. Project Configuration & Investment Summary
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono mb-4">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px]">DC Fast Chargers</span>
                <strong className="text-sm text-gray-900">{investment.chargerQuantity} × {investmentConfig.chargerRatingKw} kW</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px]">Total Initial CAPEX</span>
                <strong className="text-sm text-gray-900">{formatINR(investment.totalProjectInvestment)}</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px]">Year-1 Revenue</span>
                <strong className="text-sm text-gray-900">{formatINR(annualTotals.revenue)}</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px]">Year-1 Operating Profit</span>
                <strong className="text-sm text-[#008800]">{formatINR(annualTotals.operatingProfit)}</strong>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
              <span><strong>Estimated Investment Payback Status:</strong> {paybackStatus}</span>
              <span className="font-mono font-bold text-[11px]">Operating Margin: {annualTotals.revenue > 0 ? ((annualTotals.operatingProfit / annualTotals.revenue) * 100).toFixed(1) : 0}%</span>
            </div>
          </div>

          {/* Section 2: Detailed Cost Breakdown */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-gray-400 tracking-wider mb-3">
              2. Initial Capital Expenditure (CAPEX) Itemization
            </h4>

            <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-100 font-mono text-[11px] text-gray-700">
                  <tr>
                    <th className="py-2.5 px-3">Expense Head</th>
                    <th className="py-2.5 px-3">Basis / Rate</th>
                    <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 font-mono">
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium">DC Fast Charger Hardware Equipment</td>
                    <td className="py-2 px-3 text-gray-500">{investment.chargerQuantity} units @ {formatINR(investment.costPerCharger)}</td>
                    <td className="py-2 px-3 text-right font-bold">{formatINR(investment.equipmentCost)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium">Civil Plinth & Foundation Works</td>
                    <td className="py-2 px-3 text-gray-500">{investment.chargerQuantity} units @ {formatINR(investmentConfig.installationPerCharger)}</td>
                    <td className="py-2 px-3 text-right font-bold">{formatINR(investment.installationCost)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium">HT Substation, Transformer & Cabling</td>
                    <td className="py-2 px-3 text-gray-500">Step-down transformer, breaker, busbar & earthing</td>
                    <td className="py-2 px-3 text-right font-bold">{formatINR(investment.infrastructureCost)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium">Canopy, Illuminated Totem & Signage</td>
                    <td className="py-2 px-3 text-gray-500">Weather canopy, pylon totem, bay painting & decals</td>
                    <td className="py-2 px-3 text-right font-bold">{formatINR(investment.otherSetupCosts)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium">Contingency Buffer ({investmentConfig.contingencyPct}%)</td>
                    <td className="py-2 px-3 text-gray-500">Unforeseen civil/electrical DISCOM variance</td>
                    <td className="py-2 px-3 text-right font-bold">{formatINR(investment.contingencyAmount)}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-gray-50 font-mono font-bold border-t border-gray-200">
                  <tr>
                    <td className="py-2.5 px-3" colSpan="2">Total Initial Project Investment</td>
                    <td className="py-2.5 px-3 text-right text-sm text-gray-900">{formatINR(investment.totalProjectInvestment)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Section 3: Operating Tariffs & Unit Economics */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-gray-400 tracking-wider mb-3">
              3. Tariffs & Operational Economics
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px]">Selling Price</span>
                <strong className="text-gray-900">₹{tariffConfig.customerSellingPricePerKwh} / kWh</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px]">Power Cost</span>
                <strong className="text-gray-900">₹{tariffConfig.electricityCostPerKwh} / kWh</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px]">CMS Fee</span>
                <strong className="text-gray-900">₹{tariffConfig.platformFeePerKwh} / kWh</strong>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-gray-400 block text-[10px]">Payment Fee</span>
                <strong className="text-gray-900">{tariffConfig.paymentGatewayFeePct}%</strong>
              </div>
            </div>
          </div>

          {/* Section 4: 12-Month Projections Table */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-gray-400 tracking-wider mb-3">
              4. 12-Month Financial Reconciliation Forecast
            </h4>

            <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left font-mono">
                <thead className="bg-gray-100 text-[10px] text-gray-700 uppercase">
                  <tr>
                    <th className="py-2 px-2">Month</th>
                    <th className="py-2 px-2 text-right">Daily Sessions</th>
                    <th className="py-2 px-2 text-right">Energy (kWh)</th>
                    <th className="py-2 px-2 text-right">Revenue (₹)</th>
                    <th className="py-2 px-2 text-right">OPEX (₹)</th>
                    <th className="py-2 px-2 text-right">Operating Profit (₹)</th>
                    <th className="py-2 px-2 text-right font-bold">Cumulative Cash Flow (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150 text-[11px]">
                  {monthlyResults.map((m) => (
                    <tr key={m.monthIndex}>
                      <td className="py-1.5 px-2 font-bold">M{m.monthIndex}</td>
                      <td className="py-1.5 px-2 text-right text-gray-600">{m.dailySessions}</td>
                      <td className="py-1.5 px-2 text-right text-gray-800">{formatNumberIN(m.energyKwh, 0)}</td>
                      <td className="py-1.5 px-2 text-right">{formatINR(m.grossRevenue)}</td>
                      <td className="py-1.5 px-2 text-right text-rose-600">-{formatINR(m.totalOperatingExpenses)}</td>
                      <td className={`py-1.5 px-2 text-right font-bold ${m.operatingProfit >= 0 ? 'text-[#008800]' : 'text-rose-600'}`}>
                        {formatINR(m.operatingProfit)}
                      </td>
                      <td className={`py-1.5 px-2 text-right font-bold ${m.cumulativeCashFlow >= 0 ? 'text-[#008800]' : 'text-rose-600'}`}>
                        {formatINR(m.cumulativeCashFlow)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-bold border-t border-gray-200 text-gray-900">
                  <tr>
                    <td className="py-2 px-2 font-bold">12-Mo Total</td>
                    <td className="py-2 px-2 text-right">—</td>
                    <td className="py-2 px-2 text-right">{formatNumberIN(annualTotals.energyKwh, 0)}</td>
                    <td className="py-2 px-2 text-right">{formatINR(annualTotals.revenue)}</td>
                    <td className="py-2 px-2 text-right text-rose-600">-{formatINR(annualTotals.totalOperatingExpenses)}</td>
                    <td className="py-2 px-2 text-right text-[#008800]">{formatINR(annualTotals.operatingProfit)}</td>
                    <td className="py-2 px-2 text-right text-gray-900">{formatINR(projectionData.cumulativeCashFlowMonth12)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Section 5: Capacity Safeguards & Legal Disclaimers */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-[11px] text-gray-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <ShieldCheck className="w-4 h-4 text-[#00A300]" />
              Physical Capacity Validation & Professional Engineering Standards
            </div>
            <p className="leading-relaxed">
              Based on the specified hardware configuration of {investment.chargerQuantity} × {investmentConfig.chargerRatingKw} kW DC units operating {capacityLimits.operatingHoursPerDay} hrs/day at {capacityLimits.uptimePct}% uptime, the site deliverable capacity limit is <strong>{formatNumberIN(capacityLimits.maxDeliverableEnergyPerDay)} kWh/day</strong> ({formatNumberIN(capacityLimits.maxDeliverableEnergyPerMonth)} kWh/month). Actual revenue depends on vehicle battery sizes, grid availability, DISCOM sanction load, and local footfall.
            </p>
            <p className="text-[10px] text-gray-400">
              AXION CHARGE commercial proposals are estimates based on user-provided operational assumptions and standard equipment tariffs.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProposalReportModal;
