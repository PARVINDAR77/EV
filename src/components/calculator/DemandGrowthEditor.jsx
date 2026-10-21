import React, { useState } from 'react';
import { Calendar, Car, Sliders, BatteryCharging, Zap, Info, RotateCcw } from 'lucide-react';
import { formatNumberIN, DC_VEHICLE_ENERGY_PRESETS } from '../../services/financialCalculator';

export { DC_VEHICLE_ENERGY_PRESETS };
export const VEHICLE_ENERGY_PRESETS = DC_VEHICLE_ENERGY_PRESETS;

export const DEFAULT_QUARTERLY_RAMP = [4, 4, 4, 8, 8, 8, 12, 12, 12, 16, 16, 16];

const DemandGrowthEditor = ({
  demandConfig,
  onChange,
  chargerQuantity = 1
}) => {
  const [scheduleMode, setScheduleMode] = useState('quarterly'); // 'quarterly' | 'monthly'

  const schedule = demandConfig.demandSchedule || DEFAULT_QUARTERLY_RAMP;
  const isSiteWide = demandConfig.demandMode !== 'per-charger';

  const updateConfig = (field, val) => {
    onChange({
      ...demandConfig,
      [field]: val
    });
  };

  const handleQuarterChange = (qIndex, val) => {
    const num = Math.max(0, Math.round(Number(val) * 10) / 10);
    const newSchedule = [...schedule];
    const startIndex = qIndex * 3;
    newSchedule[startIndex] = num;
    newSchedule[startIndex + 1] = num;
    newSchedule[startIndex + 2] = num;
    updateConfig('demandSchedule', newSchedule);
  };

  const handleMonthChange = (mIndex, val) => {
    const num = Math.max(0, Math.round(Number(val) * 10) / 10);
    const newSchedule = [...schedule];
    newSchedule[mIndex] = num;
    updateConfig('demandSchedule', newSchedule);
  };

  const resetToDefaultRamp = () => {
    updateConfig('demandSchedule', [...DEFAULT_QUARTERLY_RAMP]);
  };

  // Quick stats
  const totalAnnualSessions = schedule.reduce((sum, daily) => {
    const effDaily = isSiteWide ? daily : daily * chargerQuantity;
    return sum + (effDaily * (demandConfig.operatingDays || 30) * ((demandConfig.uptimePct || 96) / 100));
  }, 0);

  const totalAnnualKwh = totalAnnualSessions * (demandConfig.avgKwhPerSession || 25);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-gray-150 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-3 mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-1">
            Stage 3 of 5
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900">
            DC Fast Charging Demand & Growth Forecast
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Forecast expected customer traffic, EV vehicle battery top-up requirements, and month-by-month adoption ramp.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200/80 rounded-2xl px-4 py-2 text-right">
          <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Annual Energy Delivered</span>
          <span className="text-lg sm:text-xl font-bold font-mono text-[#009900]">
            {formatNumberIN(totalAnnualKwh)} <span className="text-xs font-normal text-gray-500">kWh</span>
          </span>
        </div>
      </div>

      {/* Row 1: Key Operational Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* Demand Counting Mode (Site-wide vs Per-Charger) */}
        <div className="lg:col-span-6 bg-gray-50/80 p-5 rounded-2xl border border-gray-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-gray-900 flex items-center gap-2">
                <Car className="w-4 h-4 text-[#00A300]" />
                Demand Counting Scope
              </label>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                {isSiteWide ? 'Hub Total' : 'Per Unit'}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              {isSiteWide 
                ? 'Site-Wide Hub: Total sessions per day across all installed DC guns.' 
                : 'Per-Charger: Sessions per day per DC unit (multiplied by total units).'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-gray-200/70 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => updateConfig('demandMode', 'site-wide')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isSiteWide ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Site-Wide Demand
            </button>
            <button
              type="button"
              onClick={() => updateConfig('demandMode', 'per-charger')}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !isSiteWide ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Per-Charger Demand
            </button>
          </div>
        </div>

        {/* Average Session Energy (kWh) */}
        <div className="lg:col-span-6 bg-gray-50/80 p-5 rounded-2xl border border-gray-200 flex flex-col justify-between">
          <div>
            <label className="text-xs font-bold text-gray-900 flex items-center justify-between mb-2">
              <span className="flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-[#00A300]" />
                Average Energy Delivered per DC Session (kWh)
              </span>
              <span className="font-mono text-xs font-bold text-[#008800]">
                {demandConfig.avgKwhPerSession} kWh
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
              {DC_VEHICLE_ENERGY_PRESETS.map((p) => (
                <button
                  key={p.kwh}
                  type="button"
                  onClick={() => updateConfig('avgKwhPerSession', p.kwh)}
                  className={`px-2 py-1.5 rounded-lg text-[10px] font-mono border transition-all text-center cursor-pointer ${
                    demandConfig.avgKwhPerSession === p.kwh
                      ? 'bg-[#00C800]/15 border-[#00C800] text-[#008800] font-bold'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                  title={p.desc}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <input
              type="number"
              min="5"
              max="250"
              step="1"
              value={demandConfig.avgKwhPerSession}
              onChange={(e) => updateConfig('avgKwhPerSession', Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">kWh / vehicle session</span>
          </div>
        </div>

      </div>

      {/* Row 2: Secondary Operation Settings (Days, Uptime) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Operating Days per Month
          </label>
          <p className="text-[11px] text-gray-500 mb-2">Days DC charging station is operational each month</p>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="31"
              value={demandConfig.operatingDays}
              onChange={(e) => updateConfig('operatingDays', Math.max(1, Math.min(31, parseInt(e.target.value) || 30)))}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">Days</span>
          </div>
        </div>

        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Expected Charger Uptime & Availability (%)
          </label>
          <p className="text-[11px] text-gray-500 mb-2">Hardware & grid reliability factor (96% standard)</p>
          <div className="relative">
            <input
              type="number"
              min="50"
              max="100"
              step="0.5"
              value={demandConfig.uptimePct}
              onChange={(e) => updateConfig('uptimePct', Math.max(50, Math.min(100, parseFloat(e.target.value) || 96)))}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">% Uptime</span>
          </div>
        </div>
      </div>

      {/* Row 3: 12-Month Demand Growth Schedule */}
      <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 bg-gray-50/40 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00A300]" />
              12-Month Non-Linear Adoption Ramp
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Specify expected charging sessions per day for each month or quarter.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-gray-200 p-0.5 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setScheduleMode('quarterly')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  scheduleMode === 'quarterly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Quarterly Ramp
              </button>
              <button
                type="button"
                onClick={() => setScheduleMode('monthly')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  scheduleMode === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Monthly Detail
              </button>
            </div>

            <button
              type="button"
              onClick={resetToDefaultRamp}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              title="Reset to default DC adoption curve"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quarterly Mode */}
        {scheduleMode === 'quarterly' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((qIndex) => {
              const qVal = schedule[qIndex * 3] || 0;
              const qTitles = ['Q1 (Months 1–3)', 'Q2 (Months 4–6)', 'Q3 (Months 7–9)', 'Q4 (Months 10–12)'];
              const qDescs = ['Opening Ramp', 'Growth Phase', 'Matured Network', 'Peak Utilization'];

              return (
                <div key={qIndex} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-800">{qTitles[qIndex]}</span>
                    <span className="text-[10px] font-mono text-gray-400">{qDescs[qIndex]}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="range"
                      min="0"
                      max="40"
                      step="0.5"
                      value={qVal}
                      onChange={(e) => handleQuarterChange(qIndex, e.target.value)}
                      className="flex-1 accent-[#00C800] cursor-pointer"
                    />
                    <span className="font-mono font-bold text-sm text-gray-900 w-12 text-right">
                      {qVal}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-1 text-right font-mono">
                    sessions/day
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          /* Monthly Mode */
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {schedule.slice(0, 12).map((dailyVal, mIndex) => (
              <div key={mIndex} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-[11px] font-bold text-gray-700 block mb-1">
                  Month {mIndex + 1}
                </span>
                <input
                  type="number"
                  min="0"
                  max="60"
                  step="0.5"
                  value={dailyVal}
                  onChange={(e) => handleMonthChange(mIndex, e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-gray-300 font-mono font-bold text-sm text-gray-900 text-center focus:outline-none focus:border-[#00C800]"
                />
                <span className="text-[9px] text-gray-400 block mt-1 text-center font-mono">
                  sessions/day
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DemandGrowthEditor;
