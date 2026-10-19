import React from 'react';
import { AlertTriangle, CheckCircle2, Info, Zap } from 'lucide-react';
import { formatNumberIN } from '../../services/financialCalculator';

const CapacityAlertBanner = ({ capacityLimits, currentDailyKwh = 0, isExceeded = false }) => {
  if (!capacityLimits) return null;

  const maxDaily = capacityLimits.maxDeliverableEnergyPerDay || 1;
  const utilization = Math.min(250, Math.round((currentDailyKwh / maxDaily) * 100));

  return (
    <div className={`rounded-2xl p-4 sm:p-5 border transition-all ${
      isExceeded 
        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200' 
        : 'bg-white/[0.02] border-white/10 text-gray-300'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          {isExceeded ? (
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 flex-shrink-0 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center text-accent flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
          )}
          <div>
            <h4 className="text-xs sm:text-sm font-bold font-sans flex items-center gap-2 text-white">
              Physical Charger Capacity Validation
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                isExceeded ? 'bg-amber-500/30 text-amber-300' : 'bg-accent/20 text-accent'
              }`}>
                {utilization}% Max Bound
              </span>
            </h4>
            <p className="text-[11px] text-gray-400 font-sans mt-0.5">
              Theoretical upper bound: <strong className="text-white font-mono">{formatNumberIN(maxDaily)} kWh/day</strong> ({formatNumberIN(capacityLimits.maxDeliverableEnergyPerMonth)} kWh/mo) based on {capacityLimits.chargerQuantity} × {capacityLimits.chargerRatingKw} kW across {capacityLimits.operatingHoursPerDay} hrs/day at {capacityLimits.uptimePct}% uptime.
            </p>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <span className="text-[11px] font-mono text-gray-400 block">Projected Daily Demand</span>
          <span className={`text-sm sm:text-base font-bold font-mono ${
            isExceeded ? 'text-amber-400' : 'text-white'
          }`}>
            {formatNumberIN(currentDailyKwh)} kWh/day
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10 mb-2">
        <div 
          className={`h-full transition-all duration-500 rounded-full ${
            isExceeded ? 'bg-amber-400' : 'bg-gradient-to-r from-accent to-[#00C800]'
          }`}
          style={{ width: `${Math.min(100, utilization)}%` }}
        />
      </div>

      {isExceeded && (
        <div className="pt-2 text-xs text-amber-200/90 leading-relaxed border-t border-amber-500/20 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Capacity Warning:</strong> Your projected charging demand ({formatNumberIN(currentDailyKwh)} kWh/day) exceeds the deliverable physical throughput of this hardware ({formatNumberIN(maxDaily)} kWh/day). Consider adding additional charger units or configuring a higher kW rating to realistically serve this demand without bottlenecks.
          </span>
        </div>
      )}
    </div>
  );
};

export default CapacityAlertBanner;
