/**
 * AXION CHARGE — DC Fast Charger Investment & Financial Calculation Engine
 * 
 * Pure mathematical functions for:
 * 1. Initial DC CAPEX (Hardware, Civil Plinth, HT Substation/Transformer) and optional debt financing amortization.
 * 2. Real-world deliverable energy upper bounds (high-power DC capacity validation).
 * 3. 12-Month revenue, variable costs, contribution, fixed OPEX, operating profit.
 * 4. Net cash flow and cumulative cash flow with honest payback detection.
 * 5. Mathematically verified break-even selling price and session volume.
 * 6. Multi-plan DC hub comparison and sensitivity scenarios.
 */

/**
 * Official AXION DC Fast Charger Hardware Models
 */
export const DC_CHARGER_MODELS = [
  {
    id: 'dc-30kw',
    name: 'Axion DC 30 kW',
    ratingKw: 30,
    guns: '1 × CCS2',
    gunsCount: 1,
    defaultPrice: 499900,
    tagline: 'Rapid urban DC charger for dealerships, shopping plazas & commercial fleets'
  },
  {
    id: 'dc-60kw',
    name: 'Axion DC 60 kW Dual-Gun',
    ratingKw: 60,
    guns: '2 × CCS2 Dynamic',
    gunsCount: 2,
    defaultPrice: 699900,
    tagline: 'Commercial fast charging hub with dynamic power sharing for malls & depots'
  },
  {
    id: 'dc-120kw',
    name: 'Axion DC 120 kW High-Power',
    ratingKw: 120,
    guns: '2 × CCS2 High-Power',
    gunsCount: 2,
    defaultPrice: 999900,
    tagline: 'Ultra-fast highway corridor transit charging station for rapid turnaround'
  },
  {
    id: 'dc-240kw',
    name: 'Axion DC 240 kW Hypercharger',
    ratingKw: 240,
    guns: '2 × CCS2 Liquid Cooled',
    gunsCount: 2,
    defaultPrice: 1899900,
    tagline: 'Liquid-cooled hypercharger engineered for heavy electric bus fleets & trucks'
  }
];

// Backward-compatibility alias
export const AC_CHARGER_MODELS = DC_CHARGER_MODELS;

/**
 * Real-world DC Fast Charging Vehicle Energy Presets
 */
export const DC_VEHICLE_ENERGY_PRESETS = [
  { label: 'Passenger EV (22 kWh)', kwh: 22.0, desc: 'Tiago / Nexon EV / Windsor top-up (30-40 min)' },
  { label: 'Highway SUV (38 kWh)', kwh: 38.0, desc: 'ZS EV / BYD Atto 3 / Ioniq 5 corridor fast turnaround' },
  { label: 'Fleet Van (32 kWh)', kwh: 32.0, desc: 'Commercial logistics depot fast charge (Tata Ace EV)' },
  { label: 'Heavy Bus (90 kWh)', kwh: 90.0, desc: 'Electric transit bus / heavy carrier refill' }
];

export const VEHICLE_ENERGY_PRESETS = DC_VEHICLE_ENERGY_PRESETS;

/**
 * Format number in Indian Rupee format (e.g. ₹1,25,000)
 */
export const formatINR = (amount, maximumFractionDigits = 0) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits
  }).format(amount);
};

export const formatNumberIN = (val, maxDecimals = 1) => {
  if (val === null || val === undefined || isNaN(val)) return '0';
  return Number(val).toLocaleString('en-IN', { maximumFractionDigits: maxDecimals });
};

/**
 * Calculate Initial DC Project Investment and Optional Financing
 */
export const calculateInitialInvestment = ({
  chargerQuantity = 1,
  costPerCharger = 699900,
  installationPerCharger = 75000,
  infrastructureFixed = 250000,
  otherSetupCosts = 60000,
  contingencyPct = 5,
  financing = {
    enabled: false,
    loanPercentage: 70, // % of total project cost
    annualInterestRate: 10.5, // % per annum
    tenureMonths: 36 // months
  }
} = {}) => {
  const qty = Math.max(1, Number(chargerQuantity) || 1);
  const unitCost = Math.max(0, Number(costPerCharger) || 0);
  const installCost = Math.max(0, Number(installationPerCharger) || 0) * qty;
  const infraCost = Math.max(0, Number(infrastructureFixed) || 0);
  const otherCost = Math.max(0, Number(otherSetupCosts) || 0);
  
  const equipmentCost = qty * unitCost;
  const subtotalBeforeContingency = equipmentCost + installCost + infraCost + otherCost;
  const contingencyAmount = subtotalBeforeContingency * (Math.max(0, Number(contingencyPct) || 0) / 100);
  const totalProjectInvestment = subtotalBeforeContingency + contingencyAmount;

  let financedAmount = 0;
  let upfrontEquity = totalProjectInvestment;
  let monthlyEmi = 0;
  let totalLoanInterest = 0;

  if (financing && financing.enabled) {
    const loanPct = Math.min(100, Math.max(0, Number(financing.loanPercentage) || 0));
    financedAmount = Math.round(totalProjectInvestment * (loanPct / 100));
    upfrontEquity = totalProjectInvestment - financedAmount;

    const annualRate = Math.max(0, Number(financing.annualInterestRate) || 0);
    const tenure = Math.max(1, Math.round(Number(financing.tenureMonths) || 12));

    if (annualRate > 0 && financedAmount > 0) {
      const monthlyRate = annualRate / 1200;
      monthlyEmi = Math.round(
        (financedAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1)
      );
      totalLoanInterest = (monthlyEmi * tenure) - financedAmount;
    } else if (financedAmount > 0) {
      monthlyEmi = Math.round(financedAmount / tenure);
      totalLoanInterest = 0;
    }
  }

  return {
    chargerQuantity: qty,
    costPerCharger: unitCost,
    equipmentCost,
    installationCost: installCost,
    infrastructureCost: infraCost,
    otherSetupCosts: otherCost,
    subtotalBeforeContingency,
    contingencyAmount,
    totalProjectInvestment,
    financing: {
      enabled: Boolean(financing?.enabled),
      financedAmount,
      upfrontEquity,
      monthlyEmi,
      totalLoanInterest,
      tenureMonths: financing?.tenureMonths || 36,
      annualInterestRate: financing?.annualInterestRate || 10.5
    }
  };
};

/**
 * Realistic Physical Capacity Validation Engine
 * 
 * Evaluates the upper bound of deliverable energy based on:
 * - Charger power rating (kW)
 * - Number of chargers
 * - Operating hours per day (default 16 or 24)
 * - Charger uptime factor (e.g. 96%)
 * - Power sharing ratio / diversity factor (default 100%)
 * - Site power limit in kW (e.g. grid connection limit)
 */
export const calculateCapacityLimits = ({
  chargerQuantity = 1,
  chargerRatingKw = 60,
  operatingHoursPerDay = 16,
  uptimePct = 96,
  powerSharingRatioPct = 100,
  sitePowerLimitKw = null,
  operatingDaysPerMonth = 30
} = {}) => {
  const qty = Math.max(1, Number(chargerQuantity) || 1);
  const ratingKw = Math.max(0, Number(chargerRatingKw) || 0);
  const hours = Math.min(24, Math.max(1, Number(operatingHoursPerDay) || 16));
  const uptimeFactor = Math.min(1, Math.max(0, (Number(uptimePct) || 96) / 100));
  const sharingFactor = Math.min(1, Math.max(0.1, (Number(powerSharingRatioPct) || 100) / 100));

  const theoreticalNameplateKw = qty * ratingKw;
  let effectiveMaxKw = theoreticalNameplateKw * sharingFactor;

  if (sitePowerLimitKw !== null && sitePowerLimitKw !== undefined && Number(sitePowerLimitKw) > 0) {
    effectiveMaxKw = Math.min(effectiveMaxKw, Number(sitePowerLimitKw));
  }

  // Realistic maximum deliverable energy per day (accounting for uptime)
  const maxDeliverableEnergyPerDay = effectiveMaxKw * hours * uptimeFactor;
  const maxDeliverableEnergyPerMonth = maxDeliverableEnergyPerDay * operatingDaysPerMonth;

  return {
    chargerQuantity: qty,
    chargerRatingKw: ratingKw,
    theoreticalNameplateKw,
    effectiveMaxKw,
    operatingHoursPerDay: hours,
    uptimePct,
    maxDeliverableEnergyPerDay: Math.round(maxDeliverableEnergyPerDay * 10) / 10,
    maxDeliverableEnergyPerMonth: Math.round(maxDeliverableEnergyPerMonth)
  };
};

/**
 * Single-Month Financial Reconciliation
 * 
 * Correct Break-even formula incorporating percentage payment gateway fee (g):
 * P_break-even = (C + F / E) / (1 - g)
 * Where:
 *   C = electricity purchase cost + per-kWh platform fee
 *   F = fixed monthly operating cost
 *   E = monthly energy delivered in kWh
 *   g = payment gateway fee as decimal (e.g. 0.02 for 2%)
 */
export const calculateMonthlyFinancials = ({
  monthIndex = 1, // 1 to 12
  dailySessions = 6,
  demandMode = 'site-wide', // 'site-wide' | 'per-charger'
  chargerQuantity = 1,
  operatingDays = 30,
  avgKwhPerSession = 25,
  uptimePct = 96,
  customerSellingPricePerKwh = 21.0,
  electricityCostPerKwh = 8.5,
  platformFeePerKwh = 1.0,
  paymentGatewayFeePct = 2.0,
  fixedPlatformFeeMonthly = 1000, // per charger IoT SIM & connectivity
  fixedPlatformFeePerCharger = true,
  monthlyMaintenanceCost = 6000, // DC AMC maintenance SLA
  siteRentMonthly = 0,
  otherFixedOpexMonthly = 5000,
  capacityLimits = null,
  financingEmi = 0
} = {}) => {
  const qty = Math.max(1, Number(chargerQuantity) || 1);
  const rawDaily = Math.max(0, Number(dailySessions) || 0);
  
  // Calculate effective daily sessions
  // Site-wide mode does NOT multiply by charger quantity!
  const effectiveDailySessions = demandMode === 'per-charger' ? rawDaily * qty : rawDaily;
  
  const uptimeFactor = Math.min(1, Math.max(0, (Number(uptimePct) || 96) / 100));
  const days = Math.max(1, Math.min(31, Number(operatingDays) || 30));
  
  const expectedMonthlySessions = effectiveDailySessions * days * uptimeFactor;
  const energyKwh = expectedMonthlySessions * Math.max(0, Number(avgKwhPerSession) || 0);

  // Capacity validation
  let isCapacityExceeded = false;
  let capacityUtilizationPct = 0;
  if (capacityLimits && capacityLimits.maxDeliverableEnergyPerDay > 0) {
    const projectedDailyKwh = effectiveDailySessions * (Number(avgKwhPerSession) || 0);
    capacityUtilizationPct = Math.round((projectedDailyKwh / capacityLimits.maxDeliverableEnergyPerDay) * 100);
    if (projectedDailyKwh > capacityLimits.maxDeliverableEnergyPerDay) {
      isCapacityExceeded = true;
    }
  }

  // Tariffs & Revenues
  const sellPrice = Math.max(0, Number(customerSellingPricePerKwh) || 0);
  const grossRevenue = energyKwh * sellPrice;

  // Variable Expenses
  const powerCostPerKwh = Math.max(0, Number(electricityCostPerKwh) || 0);
  const cmsPerKwh = Math.max(0, Number(platformFeePerKwh) || 0);
  const gatewayPct = Math.max(0, Number(paymentGatewayFeePct) || 0) / 100;

  const electricityExpense = energyKwh * powerCostPerKwh;
  const platformVariableFee = energyKwh * cmsPerKwh;
  const paymentGatewayExpense = grossRevenue * gatewayPct;
  const totalVariableCosts = electricityExpense + platformVariableFee + paymentGatewayExpense;

  // Contribution Margin (Revenue - Variable Costs)
  const contributionMargin = grossRevenue - totalVariableCosts;
  const contributionMarginPct = grossRevenue > 0 ? (contributionMargin / grossRevenue) * 100 : 0;

  // Fixed Monthly Operating Expenses
  const fixedCms = (Number(fixedPlatformFeeMonthly) || 0) * (fixedPlatformFeePerCharger ? qty : 1);
  const maintenance = Math.max(0, Number(monthlyMaintenanceCost) || 0);
  const siteRent = Math.max(0, Number(siteRentMonthly) || 0);
  const otherFixed = Math.max(0, Number(otherFixedOpexMonthly) || 0);
  const totalFixedOpex = fixedCms + maintenance + siteRent + otherFixed;

  // Operating Profit (Contribution - Fixed OPEX)
  const totalOperatingExpenses = totalVariableCosts + totalFixedOpex;
  const operatingProfit = contributionMargin - totalFixedOpex;
  const operatingProfitMarginPct = grossRevenue > 0 ? (operatingProfit / grossRevenue) * 100 : 0;

  // Net Cash Flow (after loan EMI if any)
  const netOperatingCashFlow = operatingProfit - (Number(financingEmi) || 0);

  // Mathematically Correct Break-even Selling Price:
  // P_break-even = (C + F / E) / (1 - g)
  let breakEvenPricePerKwh = null;
  let breakEvenStatus = 'normal';

  const C = powerCostPerKwh + cmsPerKwh;
  const F = totalFixedOpex;
  const E = energyKwh;
  const g = gatewayPct;

  if (g >= 1) {
    breakEvenStatus = 'invalid_gateway_fee'; // Fee is 100% or greater
  } else if (E <= 0) {
    breakEvenStatus = 'zero_energy'; // No energy delivered to distribute fixed cost
  } else {
    const rawBreakEven = (C + (F / E)) / (1 - g);
    breakEvenPricePerKwh = Math.round(rawBreakEven * 100) / 100;
  }

  // Break-even session volume per month:
  // SellingPrice * (1 - g) - C = net per-kWh contribution
  const netUnitContribution = sellPrice * (1 - g) - C;
  let breakEvenMonthlyKwh = null;
  let breakEvenMonthlySessions = null;

  if (netUnitContribution > 0) {
    breakEvenMonthlyKwh = Math.round(F / netUnitContribution);
    if (avgKwhPerSession > 0) {
      breakEvenMonthlySessions = Math.round(breakEvenMonthlyKwh / avgKwhPerSession);
    }
  }

  return {
    monthIndex,
    dailySessions: rawDaily,
    effectiveDailySessions,
    demandMode,
    operatingDays: days,
    expectedMonthlySessions: Math.round(expectedMonthlySessions * 10) / 10,
    energyKwh: Math.round(energyKwh * 10) / 10,
    grossRevenue: Math.round(grossRevenue),
    electricityExpense: Math.round(electricityExpense),
    platformVariableFee: Math.round(platformVariableFee),
    paymentGatewayExpense: Math.round(paymentGatewayExpense),
    totalVariableCosts: Math.round(totalVariableCosts),
    contributionMargin: Math.round(contributionMargin),
    contributionMarginPct: Math.round(contributionMarginPct * 10) / 10,
    fixedOpex: {
      cms: fixedCms,
      maintenance,
      siteRent,
      otherFixed,
      total: Math.round(totalFixedOpex)
    },
    totalOperatingExpenses: Math.round(totalOperatingExpenses),
    operatingProfit: Math.round(operatingProfit),
    operatingProfitMarginPct: Math.round(operatingProfitMarginPct * 10) / 10,
    financingEmi: Math.round(financingEmi),
    netOperatingCashFlow: Math.round(netOperatingCashFlow),
    breakEven: {
      pricePerKwh: breakEvenPricePerKwh,
      status: breakEvenStatus,
      monthlyKwh: breakEvenMonthlyKwh,
      monthlySessions: breakEvenMonthlySessions,
      netUnitContribution: Math.round(netUnitContribution * 100) / 100
    },
    capacity: {
      isExceeded: isCapacityExceeded,
      utilizationPct: capacityUtilizationPct
    }
  };
};

/**
 * 12-Month Financial Reconciliation and Cumulative Cash Flow Projection
 * 
 * Default DC Fast Charging demand schedule (sessions/day):
 * Months 1-3: 4 sessions/day (Opening ramp)
 * Months 4-6: 8 sessions/day (Growth)
 * Months 7-9: 12 sessions/day (Maturity)
 * Months 10-12: 16 sessions/day (Peak utilization)
 */
export const calculate12MonthProjection = ({
  investmentConfig = {},
  tariffConfig = {},
  demandSchedule = [4, 4, 4, 8, 8, 8, 12, 12, 12, 16, 16, 16],
  demandMode = 'site-wide',
  operatingDays = 30,
  avgKwhPerSession = 25,
  uptimePct = 96,
  operatingHoursPerDay = 16,
  sitePowerLimitKw = null
} = {}) => {
  const investment = calculateInitialInvestment(investmentConfig);
  const capacityLimits = calculateCapacityLimits({
    chargerQuantity: investment.chargerQuantity,
    chargerRatingKw: investmentConfig.chargerRatingKw || 60,
    operatingHoursPerDay,
    uptimePct,
    sitePowerLimitKw,
    operatingDaysPerMonth: operatingDays
  });

  const upfrontOutflow = investment.financing.enabled 
    ? investment.financing.upfrontEquity 
    : investment.totalProjectInvestment;

  const monthlyResults = [];
  let cumulativeCashFlow = -upfrontOutflow;
  let paybackMonth = null;
  let hasAnyCapacityExceeded = false;

  for (let m = 0; m < 12; m++) {
    const monthNum = m + 1;
    const dailySessions = demandSchedule[m] !== undefined ? demandSchedule[m] : 6;

    const monthResult = calculateMonthlyFinancials({
      monthIndex: monthNum,
      dailySessions,
      demandMode,
      chargerQuantity: investment.chargerQuantity,
      operatingDays,
      avgKwhPerSession,
      uptimePct,
      customerSellingPricePerKwh: tariffConfig.customerSellingPricePerKwh ?? 21.0,
      electricityCostPerKwh: tariffConfig.electricityCostPerKwh ?? 8.5,
      platformFeePerKwh: tariffConfig.platformFeePerKwh ?? 1.0,
      paymentGatewayFeePct: tariffConfig.paymentGatewayFeePct ?? 2.0,
      fixedPlatformFeeMonthly: tariffConfig.fixedPlatformFeeMonthly ?? 1000,
      fixedPlatformFeePerCharger: tariffConfig.fixedPlatformFeePerCharger ?? true,
      monthlyMaintenanceCost: tariffConfig.monthlyMaintenanceCost ?? 6000,
      siteRentMonthly: tariffConfig.siteRentMonthly ?? 0,
      otherFixedOpexMonthly: tariffConfig.otherFixedOpexMonthly ?? 5000,
      capacityLimits,
      financingEmi: investment.financing.enabled ? investment.financing.monthlyEmi : 0
    });

    cumulativeCashFlow += monthResult.netOperatingCashFlow;
    monthResult.cumulativeCashFlow = Math.round(cumulativeCashFlow);

    if (cumulativeCashFlow >= 0 && paybackMonth === null) {
      paybackMonth = monthNum;
    }

    if (monthResult.capacity.isExceeded) {
      hasAnyCapacityExceeded = true;
    }

    monthlyResults.push(monthResult);
  }

  // Annual Totals Reconciliation (Subject to exact sum of 12 monthly values)
  const annualTotals = monthlyResults.reduce((acc, curr) => {
    acc.sessions += curr.expectedMonthlySessions;
    acc.energyKwh += curr.energyKwh;
    acc.revenue += curr.grossRevenue;
    acc.electricityExpense += curr.electricityExpense;
    acc.platformVariableFee += curr.platformVariableFee;
    acc.paymentGatewayExpense += curr.paymentGatewayExpense;
    acc.totalVariableCosts += curr.totalVariableCosts;
    acc.contributionMargin += curr.contributionMargin;
    acc.fixedOpex += curr.fixedOpex.total;
    acc.totalOperatingExpenses += curr.totalOperatingExpenses;
    acc.operatingProfit += curr.operatingProfit;
    acc.netCashFlow += curr.netOperatingCashFlow;
    return acc;
  }, {
    sessions: 0,
    energyKwh: 0,
    revenue: 0,
    electricityExpense: 0,
    platformVariableFee: 0,
    paymentGatewayExpense: 0,
    totalVariableCosts: 0,
    contributionMargin: 0,
    fixedOpex: 0,
    totalOperatingExpenses: 0,
    operatingProfit: 0,
    netCashFlow: 0
  });

  // Round annual sums
  Object.keys(annualTotals).forEach(key => {
    annualTotals[key] = Math.round(annualTotals[key]);
  });

  const paybackStatus = paybackMonth !== null 
    ? `Month ${paybackMonth}` 
    : 'Investment not recovered within the 12-month forecast.';

  const firstYearRoiPct = investment.totalProjectInvestment > 0 
    ? Math.round((annualTotals.operatingProfit / investment.totalProjectInvestment) * 1000) / 10 
    : 0;

  return {
    investment,
    capacityLimits,
    monthlyResults,
    annualTotals,
    cumulativeCashFlowMonth12: Math.round(cumulativeCashFlow),
    paybackMonth,
    paybackStatus,
    isPaybackAchieved: paybackMonth !== null,
    firstYearRoiPct,
    hasCapacityWarning: hasAnyCapacityExceeded,
    initialCashContribution: upfrontOutflow
  };
};

/**
 * Three Sensitivity Scenarios (Conservative, Expected, Optimistic)
 */
export const calculateScenarios = (baseConfig, conservativeMult = 0.8, optimisticMult = 1.2) => {
  const baseSchedule = baseConfig.demandSchedule || [4, 4, 4, 8, 8, 8, 12, 12, 12, 16, 16, 16];
  
  const conservativeSchedule = baseSchedule.map(s => Math.max(1, Math.round(s * conservativeMult * 10) / 10));
  const expectedSchedule = [...baseSchedule];
  const optimisticSchedule = baseSchedule.map(s => Math.round(s * optimisticMult * 10) / 10);

  const conservative = calculate12MonthProjection({ ...baseConfig, demandSchedule: conservativeSchedule });
  const expected = calculate12MonthProjection({ ...baseConfig, demandSchedule: expectedSchedule });
  const optimistic = calculate12MonthProjection({ ...baseConfig, demandSchedule: optimisticSchedule });

  return {
    conservative: {
      label: 'Conservative (-20%)',
      multiplier: conservativeMult,
      projection: conservative
    },
    expected: {
      label: 'Expected (Base)',
      multiplier: 1.0,
      projection: expected
    },
    optimistic: {
      label: 'Optimistic (+20%)',
      multiplier: optimisticMult,
      projection: optimistic
    }
  };
};

/**
 * Multi-Tier DC Fast Charging Plan Comparison
 * Starter Hub (1 × 60 kW), Highway Hub (2 × 60 kW), Expressway Superhub (2 × 120 kW)
 * Evaluated under the exact same demand forecast to showcase capacity headroom & capital efficiency.
 */
export const calculatePlanComparison = (baseConfig) => {
  const plans = [
    { 
      id: 'starter', 
      name: 'Starter Hub (1× 60kW)', 
      qty: 1, 
      ratingKw: 60, 
      costPerCharger: 699900,
      description: '1 × 60 kW Dual-Gun DC Charger (2 Bays)' 
    },
    { 
      id: 'growth', 
      name: 'Highway Hub (2× 60kW)', 
      qty: 2, 
      ratingKw: 60, 
      costPerCharger: 699900,
      description: '2 × 60 kW Dual-Gun DC Chargers (4 Bays)' 
    },
    { 
      id: 'expansion', 
      name: 'Expressway Superhub (2× 120kW)', 
      qty: 2, 
      ratingKw: 120, 
      costPerCharger: 999900,
      description: '2 × 120 kW Ultra-Fast DC Chargers (4 Bays)' 
    }
  ];

  return plans.map(plan => {
    const planInvestmentConfig = {
      ...baseConfig.investmentConfig,
      chargerQuantity: plan.qty,
      chargerRatingKw: plan.ratingKw,
      costPerCharger: plan.costPerCharger
    };

    const projection = calculate12MonthProjection({
      ...baseConfig,
      investmentConfig: planInvestmentConfig
    });

    return {
      planId: plan.id,
      planName: plan.name,
      description: plan.description,
      chargerQuantity: plan.qty,
      totalInvestment: projection.investment.totalProjectInvestment,
      annualRevenue: projection.annualTotals.revenue,
      annualOperatingProfit: projection.annualTotals.operatingProfit,
      annualEnergyKwh: projection.annualTotals.energyKwh,
      paybackStatus: projection.paybackStatus,
      isPaybackAchieved: projection.isPaybackAchieved,
      capacityDailyKw: projection.capacityLimits.maxDeliverableEnergyPerDay,
      projection
    };
  });
};
