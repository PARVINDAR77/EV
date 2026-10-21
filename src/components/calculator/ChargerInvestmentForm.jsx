import React, { useState } from 'react';
import { Cpu, DollarSign, Layers, Plus, Minus, HelpCircle, ShieldCheck, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { formatINR, DC_CHARGER_MODELS } from '../../services/financialCalculator';

export { DC_CHARGER_MODELS };
// Backward-compatibility alias
export const AC_CHARGER_MODELS = DC_CHARGER_MODELS;

const ChargerInvestmentForm = ({
  investmentConfig,
  onChange,
  calculatedInvestment
}) => {
  const [showFinancing, setShowFinancing] = useState(investmentConfig?.financing?.enabled || false);

  const selectedModel = DC_CHARGER_MODELS.find(m => m.id === investmentConfig.selectedModelId) || DC_CHARGER_MODELS[1];

  const handleModelSelect = (model) => {
    onChange({
      ...investmentConfig,
      selectedModelId: model.id,
      chargerRatingKw: model.ratingKw,
      costPerCharger: model.defaultPrice
    });
  };

  const updateField = (field, val) => {
    onChange({
      ...investmentConfig,
      [field]: val
    });
  };

  const updateFinancing = (field, val) => {
    onChange({
      ...investmentConfig,
      financing: {
        ...investmentConfig.financing,
        [field]: val
      }
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-gray-150 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-3 mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-1">
            Stage 1 of 5
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900">
            DC Fast Charger Hardware & Initial CAPEX
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure DC fast charger units, civil plinth construction, HT electrical substation, and equipment financing options.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-2 text-right">
          <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Total Initial CAPEX</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-[#009900]">
            {formatINR(calculatedInvestment?.totalProjectInvestment || 0)}
          </span>
        </div>
      </div>

      {/* Model Selector Cards (4 DC Models) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs sm:text-sm font-bold text-gray-800 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00A300]" />
            Select AXION DC Fast Charger Model
          </label>
          <span className="text-[11px] text-gray-400 font-sans italic">
            *Prices shown are standard baseline MSRP; customizable per project.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DC_CHARGER_MODELS.map((model) => {
            const isSelected = selectedModel.id === model.id;
            return (
              <button
                key={model.id}
                type="button"
                onClick={() => handleModelSelect(model)}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between h-full ${
                  isSelected 
                    ? 'border-[#00C800] bg-[#00FF00]/5 shadow-[0_0_20px_rgba(0,255,0,0.15)] ring-2 ring-[#00C800]/20' 
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-gray-900 text-accent">
                      {model.ratingKw} kW
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-150 text-gray-700 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#00A300]" />
                      {model.guns}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug mb-1.5">
                    {model.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {model.tagline}
                  </p>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-gray-150/70 flex items-center justify-between">
                  <span className="text-sm sm:text-base font-mono font-bold text-[#008800]">
                    {formatINR(model.defaultPrice)}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold text-[#00A300] bg-[#00A300]/10 px-2 py-0.5 rounded-full">
                      SELECTED
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Equipment Configuration Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Number of Chargers */}
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Number of DC Fast Chargers
          </label>
          <p className="text-[11px] text-gray-500 mb-3">Total physical DC charging units at site</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateField('chargerQuantity', Math.max(1, investmentConfig.chargerQuantity - 1))}
              className="w-10 h-10 rounded-xl bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              min="1"
              max="20"
              value={investmentConfig.chargerQuantity}
              onChange={(e) => updateField('chargerQuantity', Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center py-2 px-2 rounded-xl bg-white border border-gray-300 font-mono font-bold text-base text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
            <button
              type="button"
              onClick={() => updateField('chargerQuantity', investmentConfig.chargerQuantity + 1)}
              className="w-10 h-10 rounded-xl bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cost per Charger */}
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Hardware Cost per DC Unit (₹)
          </label>
          <p className="text-[11px] text-gray-500 mb-3">Unit purchase price (editable)</p>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
            <input
              type="number"
              min="0"
              step="5000"
              value={investmentConfig.costPerCharger}
              onChange={(e) => updateField('costPerCharger', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
          </div>
        </div>

        {/* Charger Rating in kW */}
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Charger Power Rating (kW)
          </label>
          <p className="text-[11px] text-gray-500 mb-3">Rated DC power output per unit</p>
          <div className="relative">
            <input
              type="number"
              min="10"
              max="500"
              step="5"
              value={investmentConfig.chargerRatingKw}
              onChange={(e) => updateField('chargerRatingKw', Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">kW</span>
          </div>
        </div>

        {/* Civil Plinth & Foundation per unit */}
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Civil Plinth & Foundation per Unit (₹)
          </label>
          <p className="text-[11px] text-gray-500 mb-3">RCC pedestal, cable trenches & crash bollards</p>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
            <input
              type="number"
              min="0"
              step="2500"
              value={investmentConfig.installationPerCharger}
              onChange={(e) => updateField('installationPerCharger', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
          </div>
        </div>

        {/* Electrical Infrastructure / Substation */}
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            HT Substation, Transformer & Cabling (₹)
          </label>
          <p className="text-[11px] text-gray-500 mb-3">HT step-down, breaker panel, earthing & busbars</p>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono font-bold">₹</span>
            <input
              type="number"
              min="0"
              step="10000"
              value={investmentConfig.infrastructureFixed}
              onChange={(e) => updateField('infrastructureFixed', Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
          </div>
        </div>

        {/* Canopy, Signage & Decals */}
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Canopy, Signage & Contingency
          </label>
          <p className="text-[11px] text-gray-500 mb-3">Illuminated totem, canopy + {investmentConfig.contingencyPct}% buffer</p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">₹</span>
              <input
                type="number"
                min="0"
                step="5000"
                value={investmentConfig.otherSetupCosts}
                onChange={(e) => updateField('otherSetupCosts', Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full pl-6 pr-2 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs text-gray-900 focus:outline-none focus:border-[#00C800]"
                placeholder="Canopy / Signage"
              />
            </div>
            <div className="relative w-24">
              <input
                type="number"
                min="0"
                max="30"
                value={investmentConfig.contingencyPct}
                onChange={(e) => updateField('contingencyPct', Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full pr-6 pl-3 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-xs text-gray-900 focus:outline-none focus:border-[#00C800]"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Optional Debt Financing Accordion */}
      <div className="border border-gray-200 rounded-2xl overflow-hidden mb-6">
        <button
          type="button"
          onClick={() => {
            const nextState = !showFinancing;
            setShowFinancing(nextState);
            updateFinancing('enabled', nextState);
          }}
          className="w-full px-5 py-4 bg-gray-50/80 hover:bg-gray-100 flex items-center justify-between text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
              showFinancing ? 'bg-[#00C800] text-black' : 'bg-gray-200 text-gray-600'
            }`}>
              {showFinancing ? '✓' : ''}
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 block">
                DC Infrastructure Debt Financing (Optional)
              </span>
              <span className="text-xs text-gray-500">
                Model commercial bank loan, interest rates, and upfront client equity vs debt amortization
              </span>
            </div>
          </div>
          {showFinancing ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </button>

        {showFinancing && (
          <div className="p-5 bg-white border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Loan Percentage (% of CAPEX)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="90"
                  value={investmentConfig.financing.loanPercentage}
                  onChange={(e) => updateFinancing('loanPercentage', Math.min(95, Math.max(5, parseFloat(e.target.value) || 0)))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-mono font-bold text-sm text-gray-900"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">%</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Annual Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.25"
                  value={investmentConfig.financing.annualInterestRate}
                  onChange={(e) => updateFinancing('annualInterestRate', Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-mono font-bold text-sm text-gray-900"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">%</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Tenure (Months)
              </label>
              <select
                value={investmentConfig.financing.tenureMonths}
                onChange={(e) => updateFinancing('tenureMonths', parseInt(e.target.value) || 36)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 font-mono font-bold text-sm text-gray-900 bg-white"
              >
                <option value={12}>12 Months (1 Year)</option>
                <option value={24}>24 Months (2 Years)</option>
                <option value={36}>36 Months (3 Years)</option>
                <option value={48}>48 Months (4 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
              </select>
            </div>

            {calculatedInvestment?.financing?.enabled && (
              <div className="sm:col-span-3 bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <span className="text-gray-500 block">Financed Debt</span>
                  <strong className="text-gray-900 text-sm">{formatINR(calculatedInvestment.financing.financedAmount)}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Client Upfront Cash</span>
                  <strong className="text-[#008800] text-sm">{formatINR(calculatedInvestment.financing.upfrontEquity)}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Monthly Repayment (EMI)</span>
                  <strong className="text-gray-900 text-sm">{formatINR(calculatedInvestment.financing.monthlyEmi)} / mo</strong>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Financial Breakdown Table Footer */}
      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/90 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <span className="text-gray-400 block font-mono">DC Hardware Cost:</span>
            <strong className="text-gray-800 font-mono">{formatINR(calculatedInvestment?.equipmentCost || 0)}</strong>
          </div>
          <div>
            <span className="text-gray-400 block font-mono">Civil Plinths:</span>
            <strong className="text-gray-800 font-mono">{formatINR(calculatedInvestment?.installationCost || 0)}</strong>
          </div>
          <div>
            <span className="text-gray-400 block font-mono">HT Substation:</span>
            <strong className="text-gray-800 font-mono">{formatINR(calculatedInvestment?.infrastructureCost || 0)}</strong>
          </div>
          <div>
            <span className="text-gray-400 block font-mono">Contingency ({investmentConfig.contingencyPct}%):</span>
            <strong className="text-gray-800 font-mono">{formatINR(calculatedInvestment?.contingencyAmount || 0)}</strong>
          </div>
        </div>

        <div className="text-right">
          <span className="text-gray-400 block font-mono text-[11px]">Upfront Cash Outflow:</span>
          <span className="text-base sm:text-lg font-bold font-mono text-gray-900">
            {formatINR(calculatedInvestment?.financing?.enabled ? calculatedInvestment.financing.upfrontEquity : calculatedInvestment?.totalProjectInvestment || 0)}
          </span>
        </div>
      </div>

    </div>
  );
};

export default ChargerInvestmentForm;
