import React from 'react';
import { DollarSign, ShieldAlert, Sparkles, TrendingUp, Info } from 'lucide-react';
import { formatINR } from '../../services/financialCalculator';

const TariffExpenseForm = ({
  tariffConfig,
  onChange,
  chargerQuantity = 1
}) => {
  const updateField = (field, val) => {
    onChange({
      ...tariffConfig,
      [field]: val
    });
  };

  const sellPrice = Number(tariffConfig.customerSellingPricePerKwh) || 0;
  const powerCost = Number(tariffConfig.electricityCostPerKwh) || 0;
  const cmsFee = Number(tariffConfig.platformFeePerKwh) || 0;
  const gatewayPct = (Number(tariffConfig.paymentGatewayFeePct) || 0) / 100;
  const gatewayAmt = sellPrice * gatewayPct;
  const variableTotal = powerCost + cmsFee + gatewayAmt;
  const unitContribution = sellPrice - variableTotal;
  const unitMarginPct = sellPrice > 0 ? (unitContribution / sellPrice) * 100 : 0;

  const fixedCms = (Number(tariffConfig.fixedPlatformFeeMonthly) || 0) * (tariffConfig.fixedPlatformFeePerCharger ? chargerQuantity : 1);
  const maintenance = Number(tariffConfig.monthlyMaintenanceCost) || 0;
  const rent = Number(tariffConfig.siteRentMonthly) || 0;
  const other = Number(tariffConfig.otherFixedOpexMonthly) || 0;
  const totalFixedOpex = fixedCms + maintenance + rent + other;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-gray-150 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-3 mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-1">
            Stage 2 of 5
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900">
            DC Charging Tariffs & Operating Expenses (OPEX)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure commercial DC fast charging rates, grid electricity costs, variable platform fees, and fixed monthly OPEX.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-2 text-right">
          <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Fixed Monthly OPEX</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-gray-900">
            {formatINR(totalFixedOpex)} <span className="text-xs font-normal text-gray-400">/ mo</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Fields (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <h3 className="text-xs uppercase font-mono font-bold text-gray-400 tracking-wider">
            1. Per-kWh Tariffs & Variable Costs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Customer Selling Price */}
            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
              <label className="text-xs font-bold text-gray-800 block mb-1">
                Customer Selling Price (₹/kWh)
              </label>
              <p className="text-[11px] text-gray-500 mb-2">DC fast charging tariff billed to drivers (₹18–₹25)</p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  max="60"
                  step="0.5"
                  value={tariffConfig.customerSellingPricePerKwh}
                  onChange={(e) => updateField('customerSellingPricePerKwh', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-12 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">/ kWh</span>
              </div>
            </div>

            {/* Electricity Purchase Cost */}
            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
              <label className="text-xs font-bold text-gray-800 block mb-1">
                Grid Power Purchase Cost (₹/kWh)
              </label>
              <p className="text-[11px] text-gray-500 mb-2">Commercial DISCOM HT EV tariff</p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  max="40"
                  step="0.25"
                  value={tariffConfig.electricityCostPerKwh}
                  onChange={(e) => updateField('electricityCostPerKwh', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-12 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">/ kWh</span>
              </div>
            </div>

            {/* Platform CMS Variable Fee */}
            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
              <label className="text-xs font-bold text-gray-800 block mb-1">
                Cloud CMS Software Fee (₹/kWh)
              </label>
              <p className="text-[11px] text-gray-500 mb-2">OCPP 1.6J/2.0.1 smart telemetry & billing</p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={tariffConfig.platformFeePerKwh}
                  onChange={(e) => updateField('platformFeePerKwh', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-12 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">/ kWh</span>
              </div>
            </div>

            {/* Payment Gateway Fee */}
            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
              <label className="text-xs font-bold text-gray-800 block mb-1">
                Payment Processing Fee (%)
              </label>
              <p className="text-[11px] text-gray-500 mb-2">UPI / card processing gateway fee</p>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={tariffConfig.paymentGatewayFeePct}
                  onChange={(e) => updateField('paymentGatewayFeePct', Math.max(0, Math.min(15, parseFloat(e.target.value) || 0)))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">%</span>
              </div>
            </div>

          </div>

          <h3 className="text-xs uppercase font-mono font-bold text-gray-400 tracking-wider pt-2">
            2. Fixed Monthly Operating Costs (OPEX)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Monthly Maintenance */}
            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
              <label className="text-xs font-bold text-gray-800 block mb-1">
                Monthly Maintenance SLA (₹/mo)
              </label>
              <p className="text-[11px] text-gray-500 mb-2">DC AMC, filter cleaning, cooling & support</p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={tariffConfig.monthlyMaintenanceCost}
                  onChange={(e) => updateField('monthlyMaintenanceCost', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
              </div>
            </div>

            {/* Fixed SIM / Connectivity */}
            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-800">
                  Fixed SIM / Connectivity Fee
                </label>
                <button
                  type="button"
                  onClick={() => updateField('fixedPlatformFeePerCharger', !tariffConfig.fixedPlatformFeePerCharger)}
                  className="text-[10px] font-mono text-[#00A300] hover:underline"
                >
                  {tariffConfig.fixedPlatformFeePerCharger ? 'Per Unit' : 'Total Site'}
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mb-2">
                Industrial 4G IoT SIM & static IP ({tariffConfig.fixedPlatformFeePerCharger ? `× ${chargerQuantity} units` : 'flat'})
              </p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  value={tariffConfig.fixedPlatformFeeMonthly}
                  onChange={(e) => updateField('fixedPlatformFeeMonthly', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
              </div>
            </div>

            {/* Site Rent */}
            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
              <label className="text-xs font-bold text-gray-800 block mb-1">
                Site Lease / Parking Bay Rent (₹/mo)
              </label>
              <p className="text-[11px] text-gray-500 mb-2">Commercial land lease / revenue-share base</p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={tariffConfig.siteRentMonthly}
                  onChange={(e) => updateField('siteRentMonthly', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
              </div>
            </div>

            {/* Other Fixed Costs */}
            <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
              <label className="text-xs font-bold text-gray-800 block mb-1">
                Site Operations & Housekeeping (₹/mo)
              </label>
              <p className="text-[11px] text-gray-500 mb-2">Canopy lighting, housekeeping & security</p>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={tariffConfig.otherFixedOpexMonthly}
                  onChange={(e) => updateField('otherFixedOpexMonthly', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Real-Time Unit Economics Card (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-gradient-to-b from-gray-900 to-black text-white p-6 rounded-3xl border border-white/10 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                  DC Fast Charging Unit Margin
                </span>
                <Sparkles className="w-4 h-4 text-accent" />
              </div>

              <div className="mb-6">
                <span className="text-xs text-gray-400 block mb-1">Gross Contribution per kWh:</span>
                <div className="text-3xl font-display font-bold text-white flex items-baseline gap-2">
                  <span className={unitContribution >= 0 ? 'text-accent' : 'text-rose-500'}>
                    {formatINR(unitContribution, 2)}
                  </span>
                  <span className="text-xs font-mono text-gray-400 font-normal">/ kWh</span>
                </div>
                <span className="text-xs font-mono text-gray-400 block mt-1">
                  Margin: <strong className="text-white">{unitMarginPct.toFixed(1)}%</strong> of selling tariff
                </span>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Driver Selling Tariff:</span>
                  <strong className="text-white">{formatINR(sellPrice, 2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">DISCOM Grid Power:</span>
                  <span className="text-rose-400">-{formatINR(powerCost, 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cloud CMS Platform:</span>
                  <span className="text-rose-400">-{formatINR(cmsFee, 2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Gateway Fee ({tariffConfig.paymentGatewayFeePct}%):</span>
                  <span className="text-rose-400">-{formatINR(gatewayAmt, 2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 bg-white/5 -mx-6 -mb-6 p-5 rounded-b-3xl">
              <div className="flex items-center gap-2 text-[11px] text-gray-300">
                <Info className="w-4 h-4 text-accent flex-shrink-0" />
                <span>
                  Fixed OPEX of <strong>{formatINR(totalFixedOpex)}/mo</strong> is distributed across monthly DC sessions.
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TariffExpenseForm;
