import React, { useState } from 'react';
import { Calendar, Car, Sliders, BatteryCharging, Zap, Info, RotateCcw } from 'lucide-react';
import { formatNumberIN } from '../../services/financialCalculator';

export const VEHICLE_ENERGY_PRESETS = [
  { label: '2W / 3W (3.5 kWh)', kwh: 3.5, desc: 'Scooters & E-Rickshaws' },
  { label: 'City 4W (20 kWh)', kwh: 20.0, desc: 'Tiago / Punch / Nexon standard top-up' },
  { label: 'Fleet Cab (30 kWh)', kwh: 30.0, desc: 'Commercial taxi depot charge' },
  { label: 'Long Range (45 kWh)', kwh: 45.0, desc: 'Full overnight battery refill' }
];

export const DEFAULT_QUARTERLY_RAMP = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];

const DemandGrowthEditor = ({
  demandConfig,
  onChange,
  chargerQuantity = 2
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
    return sum + (effDaily * (demandConfig.operatingDays || 30) * ((demandConfig.uptimePct || 98) / 100));
  }, 0);

  const totalAnnualKwh = totalAnnualSessions * (demandConfig.avgKwhPerSession || 20);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-gray-150 text-gray-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-3 mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#00A300] font-bold block mb-1">
            Stage 3 of 5
          </span>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900">
            Charging Demand & Growth Forecast
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Forecast expected customer traffic, vehicle battery consumption, and month-by-month adoption ramp.
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
                Demand Counting Method
              </label>
              <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                isSiteWide ? 'bg-[#00C800]/15 text-[#008800]' : 'bg-blue-100 text-blue-700'
              }`}>
                {isSiteWide ? 'Site-Wide (Realistic)' : 'Per-Charger'}
              </span>
            </div>

            <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
              {isSiteWide 
                ? 'Sessions are counted across the entire location regardless of charger count. Recommended because adding 5 chargers does not immediately bring 5x traffic.'
                : 'Sessions are multiplied by each individual installed charger unit.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-gray-200/60 p-1 rounded-xl">
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
                Average Energy Delivered per Session (kWh)
              </span>
              <span className="font-mono text-xs font-bold text-[#008800]">
                {demandConfig.avgKwhPerSession} kWh
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
              {VEHICLE_ENERGY_PRESETS.map((p) => (
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
              min="1"
              max="150"
              step="0.5"
              value={demandConfig.avgKwhPerSession}
              onChange={(e) => updateConfig('avgKwhPerSession', Math.max(0.5, parseFloat(e.target.value) || 1))}
              className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">kWh / vehicle</span>
          </div>
        </div>

      </div>

      {/* Row 2: Secondary Operation Settings (Days, Uptime) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <label className="text-xs font-bold text-gray-700 block mb-1">
            Operating Days per Month
          </label>
          <p className="text-[11px] text-gray-500 mb-2">Days station is operational each month</p>
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
          <p className="text-[11px] text-gray-500 mb-2">Network reliability factoring grid cuts or downtime</p>
          <div className="relative">
            <input
              type="number"
              min="50"
              max="100"
              step="0.5"
              value={demandConfig.uptimePct}
              onChange={(e) => updateConfig('uptimePct', Math.max(50, Math.min(100, parseFloat(e.target.value) || 98)))}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">% Uptime</span>
          </div>
        </div>
      </div>

      {/* Row 3: 12-Month Demand Growth Schedule */}
      <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 bg-gray-50/50">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3 mb-6">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00A300]" />
              12-Month Demand Growth Ramp
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Specify daily charging traffic as your location gains awareness across EV navigation apps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-gray-200/70 p-1 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setScheduleMode('quarterly')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  scheduleMode === 'quarterly' ? 'bg-white text-gray-900 font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Quarterly Template
              </button>
              <button
                type="button"
                onClick={() => setScheduleMode('monthly')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  scheduleMode === 'monthly' ? 'bg-white text-gray-900 font-bold shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                12-Month Granular
              </button>
            </div>

            <button
              type="button"
              onClick={resetToDefaultRamp}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              title="Reset to default ramp (1 -> 2 -> 3 -> 4 cars/day)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mode A: Quarterly Template */}
        {scheduleMode === 'quarterly' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { q: 'Q1 (M1 - M3)', index: 0, val: schedule[0], hint: 'Initial ramp & awareness' },
              { q: 'Q2 (M4 - M6)', index: 1, val: schedule[3], hint: 'Organic local adoption' },
              { q: 'Q3 (M7 - M9)', index: 2, val: schedule[6], hint: 'Steady repeat EV drivers' },
              { q: 'Q4 (M10 - M12)', index: 3, val: schedule[9], hint: 'Peak operational maturity' }
            ].map((q) => (
              <div key={q.q} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-700 block mb-0.5">{q.q}</span>
                <span className="text-[10px] text-gray-400 block mb-2">{q.hint}</span>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={q.val}
                    onChange={(e) => handleQuarterChange(q.index, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-300 font-mono font-bold text-sm text-gray-900 focus:outline-none focus:border-[#00C800]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-xs">cars/day</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Mode B: Full 12-Month Table */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {schedule.map((val, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 text-center">
                <span className="text-[11px] font-mono font-bold text-gray-500 block mb-1">
                  Month {idx + 1}
                </span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={val}
                  onChange={(e) => handleMonthChange(idx, e.target.value)}
                  className="w-full py-1 px-2 text-center rounded-lg bg-gray-50 border border-gray-300 font-mono font-bold text-xs text-gray-900 focus:outline-none focus:border-[#00C800]"
                />
                <span className="text-[9px] text-gray-400 font-mono block mt-1">cars/day</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Footer Notes */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500 font-sans">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>Default quarterly ramp provides an illustrative progression. Adjust values based on your site traffic.</span>
        </div>
        <div className="font-mono text-gray-600">
          Modeled 12-Month Sessions: <strong className="text-gray-900">{formatNumberIN(totalAnnualSessions)}</strong>
        </div>
      </div>

    </div>
  );
};

export default DemandGrowthEditor;
