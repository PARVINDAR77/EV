/**
 * AXION CHARGE — AC Charger Investment & Financial Calculation Engine
 * 
 * Pure mathematical functions for:
 * 1. Initial CAPEX and optional debt financing amortization.
 * 2. Real-world deliverable energy upper bounds (capacity validation).
 * 3. 12-Month revenue, variable costs, contribution, fixed OPEX, operating profit.
 * 4. Net cash flow and cumulative cash flow with honest payback detection.
 * 5. Mathematically verified break-even selling price and session volume.
 * 6. Multi-plan comparison and sensitivity scenarios.
 */

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
 * Calculate Initial Project Investment and Optional Financing
 */
export const calculateInitialInvestment = ({
  chargerQuantity = 2,
  costPerCharger = 49900,
  installationPerCharger = 15000,
  infrastructureFixed = 25000,
  otherSetupCosts = 10000,
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
 * - Charger uptime factor (e.g. 98%)
 * - Power sharing ratio / diversity factor (default 100%)
 * - Site power limit in kW (e.g. grid connection limit)
 */
export const calculateCapacityLimits = ({
  chargerQuantity = 2,
  chargerRatingKw = 7.4,
  operatingHoursPerDay = 16,
  uptimePct = 98,
  powerSharingRatioPct = 100,
  sitePowerLimitKw = null,
  operatingDaysPerMonth = 30
} = {}) => {
  const qty = Math.max(1, Number(chargerQuantity) || 1);
  const ratingKw = Math.max(0, Number(chargerRatingKw) || 0);
  const hours = Math.min(24, Math.max(1, Number(operatingHoursPerDay) || 16));
  const uptimeFactor = Math.min(1, Math.max(0, (Number(uptimePct) || 98) / 100));
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
 *   g = payment gateway fee as decimal (e.g. 0.018 for 1.8%)
 */
export const calculateMonthlyFinancials = ({
  monthIndex = 1, // 1 to 12
  dailySessions = 2,
  demandMode = 'site-wide', // 'site-wide' | 'per-charger'
  chargerQuantity = 2,
  operatingDays = 30,
  avgKwhPerSession = 20,
  uptimePct = 98,
  customerSellingPricePerKwh = 20,
  electricityCostPerKwh = 9.5,
  platformFeePerKwh = 0.5,
  paymentGatewayFeePct = 1.8,
  fixedPlatformFeeMonthly = 500, // per charger or total
  fixedPlatformFeePerCharger = true,
  monthlyMaintenanceCost = 1000,
  siteRentMonthly = 0,
  otherFixedOpexMonthly = 0,
  capacityLimits = null,
  financingEmi = 0
} = {}) => {
  const qty = Math.max(1, Number(chargerQuantity) || 1);
  const rawDaily = Math.max(0, Number(dailySessions) || 0);
  
  // Calculate effective daily sessions
  // Site-wide mode does NOT multiply by charger quantity!
  const effectiveDailySessions = demandMode === 'per-charger' ? rawDaily * qty : rawDaily;
  
  const uptimeFactor = Math.min(1, Math.max(0, (Number(uptimePct) || 98) / 100));
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
 * Default demand schedule:
 * Months 1-3: 1 car/day
 * Months 4-6: 2 cars/day
 * Months 7-9: 3 cars/day
 * Months 10-12: 4 cars/day
 */
export const calculate12MonthProjection = ({
  investmentConfig = {},
  tariffConfig = {},
  demandSchedule = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4], // 12 elements
  demandMode = 'site-wide',
  operatingDays = 30,
  avgKwhPerSession = 20,
  uptimePct = 98,
  operatingHoursPerDay = 16,
  sitePowerLimitKw = null
} = {}) => {
  const investment = calculateInitialInvestment(investmentConfig);
  const capacityLimits = calculateCapacityLimits({
    chargerQuantity: investment.chargerQuantity,
    chargerRatingKw: investmentConfig.chargerRatingKw || 7.4,
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
    const dailySessions = demandSchedule[m] !== undefined ? demandSchedule[m] : 2;

    const monthResult = calculateMonthlyFinancials({
      monthIndex: monthNum,
      dailySessions,
      demandMode,
      chargerQuantity: investment.chargerQuantity,
      operatingDays,
      avgKwhPerSession,
      uptimePct,
      customerSellingPricePerKwh: tariffConfig.customerSellingPricePerKwh ?? 20,
      electricityCostPerKwh: tariffConfig.electricityCostPerKwh ?? 9.5,
      platformFeePerKwh: tariffConfig.platformFeePerKwh ?? 0.5,
      paymentGatewayFeePct: tariffConfig.paymentGatewayFeePct ?? 1.8,
      fixedPlatformFeeMonthly: tariffConfig.fixedPlatformFeeMonthly ?? 500,
      fixedPlatformFeePerCharger: tariffConfig.fixedPlatformFeePerCharger ?? true,
      monthlyMaintenanceCost: tariffConfig.monthlyMaintenanceCost ?? 1000,
      siteRentMonthly: tariffConfig.siteRentMonthly ?? 0,
      otherFixedOpexMonthly: tariffConfig.otherFixedOpexMonthly ?? 0,
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
export const calculateScenarios = (baseConfig, conservativeMult = 0.7, optimisticMult = 1.3) => {
  const baseSchedule = baseConfig.demandSchedule || [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];
  
  const conservativeSchedule = baseSchedule.map(s => Math.max(0.5, Math.round(s * conservativeMult * 10) / 10));
  const expectedSchedule = [...baseSchedule];
  const optimisticSchedule = baseSchedule.map(s => Math.round(s * optimisticMult * 10) / 10);

  const conservative = calculate12MonthProjection({ ...baseConfig, demandSchedule: conservativeSchedule });
  const expected = calculate12MonthProjection({ ...baseConfig, demandSchedule: expectedSchedule });
  const optimistic = calculate12MonthProjection({ ...baseConfig, demandSchedule: optimisticSchedule });

  return {
    conservative: {
      label: 'Conservative',
      multiplier: conservativeMult,
      projection: conservative
    },
    expected: {
      label: 'Expected',
      multiplier: 1.0,
      projection: expected
    },
    optimistic: {
      label: 'Optimistic',
      multiplier: optimisticMult,
      projection: optimistic
    }
  };
};

/**
 * Multi-Tier Plan Comparison (Starter 2 units, Growth 5 units, Expansion 10 units)
 * Uses the exact same demand forecast across all plans to demonstrate capacity vs actual utilization.
 */
export const calculatePlanComparison = (baseConfig) => {
  const plans = [
    { id: 'starter', name: 'Starter Plan', qty: 2 },
    { id: 'growth', name: 'Growth Plan', qty: 5 },
    { id: 'expansion', name: 'Expansion Plan', qty: 10 }
  ];

  return plans.map(plan => {
    const planInvestmentConfig = {
      ...baseConfig.investmentConfig,
      chargerQuantity: plan.qty
    };

    const projection = calculate12MonthProjection({
      ...baseConfig,
      investmentConfig: planInvestmentConfig
    });

    return {
      planId: plan.id,
      planName: plan.name,
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
