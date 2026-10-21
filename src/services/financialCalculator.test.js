import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateInitialInvestment,
  calculateCapacityLimits,
  calculateMonthlyFinancials,
  calculate12MonthProjection,
  calculateScenarios,
  calculatePlanComparison,
  formatINR,
  DC_CHARGER_MODELS,
  DC_VEHICLE_ENERGY_PRESETS
} from './financialCalculator.js';

test('Initial Investment Calculation - Equipment, Setup, Contingency', () => {
  const result = calculateInitialInvestment({
    chargerQuantity: 2,
    costPerCharger: 699900,
    installationPerCharger: 75000,
    infrastructureFixed: 250000,
    otherSetupCosts: 60000,
    contingencyPct: 5,
    financing: { enabled: false }
  });

  // Equipment: 2 * 699900 = 1399800
  assert.equal(result.equipmentCost, 1399800);
  // Install: 2 * 75000 = 150000
  assert.equal(result.installationCost, 150000);
  // Subtotal: 1399800 + 150000 + 250000 + 60000 = 1859800
  assert.equal(result.subtotalBeforeContingency, 1859800);
  // Contingency: 1859800 * 0.05 = 92990
  assert.equal(result.contingencyAmount, 92990);
  // Total: 1859800 + 92990 = 1952790
  assert.equal(result.totalProjectInvestment, 1952790);
  assert.equal(result.financing.upfrontEquity, 1952790);
});

test('Financing Amortization Calculation', () => {
  const result = calculateInitialInvestment({
    chargerQuantity: 2,
    costPerCharger: 500000,
    installationPerCharger: 50000,
    infrastructureFixed: 200000,
    otherSetupCosts: 50000,
    contingencyPct: 0,
    financing: {
      enabled: true,
      loanPercentage: 70, // 70% of 1350000 = 945000
      annualInterestRate: 12, // 1% per month
      tenureMonths: 12
    }
  });

  assert.equal(result.totalProjectInvestment, 1350000);
  assert.equal(result.financing.financedAmount, 945000);
  assert.equal(result.financing.upfrontEquity, 405000);
  assert.ok(result.financing.monthlyEmi >= 83000 && result.financing.monthlyEmi <= 85000);
});

test('Capacity Limit Calculation - High-Power DC Charger (60 kW)', () => {
  const cap = calculateCapacityLimits({
    chargerQuantity: 1,
    chargerRatingKw: 60,
    operatingHoursPerDay: 16,
    uptimePct: 96,
    powerSharingRatioPct: 100,
    sitePowerLimitKw: null,
    operatingDaysPerMonth: 30
  });

  // Nameplate: 1 * 60 = 60 kW
  assert.equal(cap.theoreticalNameplateKw, 60);
  // Deliverable per day: 60 * 16 * 0.96 = 921.6 kWh/day
  assert.equal(cap.maxDeliverableEnergyPerDay, 921.6);
  // Monthly deliverable: 921.6 * 30 = 27648 kWh/month
  assert.equal(cap.maxDeliverableEnergyPerMonth, 27648);
});

test('Break-Even Formula with Percentage Payment Gateway Fee', () => {
  // Formula: P_be = (C + F/E) / (1 - g)
  // Let:
  // C = 8.5 (power) + 1.0 (platform) = 9.5
  // F = 12000 (fixed OPEX)
  // E = 6000 kWh
  // g = 0.02 (2% gateway)
  // C + F/E = 9.5 + (12000 / 6000) = 9.5 + 2.0 = 11.5
  // P_be = 11.5 / (1 - 0.02) = 11.5 / 0.98 ≈ 11.73469... -> 11.73
  const result = calculateMonthlyFinancials({
    monthIndex: 1,
    dailySessions: 8,
    demandMode: 'site-wide',
    chargerQuantity: 1,
    operatingDays: 30,
    avgKwhPerSession: 25, // 8 * 30 * 1.0 * 25 = 6000 kWh
    uptimePct: 100,
    customerSellingPricePerKwh: 21,
    electricityCostPerKwh: 8.5,
    platformFeePerKwh: 1.0,
    paymentGatewayFeePct: 2.0,
    fixedPlatformFeeMonthly: 1000,
    fixedPlatformFeePerCharger: true,
    monthlyMaintenanceCost: 6000,
    siteRentMonthly: 0,
    otherFixedOpexMonthly: 5000 // Total F = 1000 + 6000 + 5000 = 12000
  });

  assert.equal(result.breakEven.status, 'normal');
  assert.ok(Math.abs(result.breakEven.pricePerKwh - 11.73) <= 0.05);
});

test('Break-Even Safety Fallbacks - Zero Energy and Invalid Gateway Fee', () => {
  // Zero energy delivered
  const zeroEnergy = calculateMonthlyFinancials({
    dailySessions: 0,
    customerSellingPricePerKwh: 21
  });
  assert.equal(zeroEnergy.breakEven.status, 'zero_energy');
  assert.equal(zeroEnergy.breakEven.pricePerKwh, null);

  // Gateway fee >= 100%
  const invalidFee = calculateMonthlyFinancials({
    dailySessions: 6,
    paymentGatewayFeePct: 100
  });
  assert.equal(invalidFee.breakEven.status, 'invalid_gateway_fee');
  assert.equal(invalidFee.breakEven.pricePerKwh, null);
});

test('Site-Wide vs Per-Charger Demand Logic', () => {
  const siteWide = calculateMonthlyFinancials({
    dailySessions: 10,
    demandMode: 'site-wide',
    chargerQuantity: 2,
    operatingDays: 30,
    uptimePct: 100,
    avgKwhPerSession: 30
  });
  // Site-wide: 10 sessions/day across site -> 10 * 30 = 300 sessions
  assert.equal(siteWide.expectedMonthlySessions, 300);

  const perCharger = calculateMonthlyFinancials({
    dailySessions: 10,
    demandMode: 'per-charger',
    chargerQuantity: 2,
    operatingDays: 30,
    uptimePct: 100,
    avgKwhPerSession: 30
  });
  // Per-charger: 10 sessions/day per charger * 2 chargers -> 20/day * 30 = 600 sessions
  assert.equal(perCharger.expectedMonthlySessions, 600);
});

test('Capacity Validation Alert when Demand Exceeds Limit', () => {
  const capLimits = calculateCapacityLimits({
    chargerQuantity: 1,
    chargerRatingKw: 30,
    operatingHoursPerDay: 10,
    uptimePct: 100
  });
  // Max deliverable: 1 * 30 * 10 = 300 kWh/day

  // Demand: 15 sessions * 25 kWh = 375 kWh/day > 300 kWh/day
  const result = calculateMonthlyFinancials({
    dailySessions: 15,
    avgKwhPerSession: 25,
    capacityLimits: capLimits
  });

  assert.equal(result.capacity.isExceeded, true);
  assert.ok(result.capacity.utilizationPct > 100);
});

test('12-Month Projection and Reconciliation', () => {
  const proj = calculate12MonthProjection({
    investmentConfig: {
      chargerQuantity: 1,
      costPerCharger: 699900,
      installationPerCharger: 75000,
      infrastructureFixed: 250000,
      otherSetupCosts: 60000,
      contingencyPct: 5
    },
    tariffConfig: {
      customerSellingPricePerKwh: 21,
      electricityCostPerKwh: 8.5,
      platformFeePerKwh: 1.0,
      paymentGatewayFeePct: 2.0,
      fixedPlatformFeeMonthly: 1000,
      fixedPlatformFeePerCharger: true,
      monthlyMaintenanceCost: 6000,
      otherFixedOpexMonthly: 5000
    },
    demandSchedule: [4, 4, 4, 8, 8, 8, 12, 12, 12, 16, 16, 16],
    demandMode: 'site-wide',
    operatingDays: 30,
    avgKwhPerSession: 25,
    uptimePct: 96
  });

  assert.equal(proj.monthlyResults.length, 12);
  const sumRevenue = proj.monthlyResults.reduce((sum, m) => sum + m.grossRevenue, 0);
  assert.equal(proj.annualTotals.revenue, sumRevenue);

  const sumProfit = proj.monthlyResults.reduce((sum, m) => sum + m.operatingProfit, 0);
  assert.equal(proj.annualTotals.operatingProfit, sumProfit);

  assert.equal(proj.monthlyResults[0].cumulativeCashFlow, -proj.investment.totalProjectInvestment + proj.monthlyResults[0].netOperatingCashFlow);
});

test('DC Charger Models Catalog Verification', () => {
  assert.equal(DC_CHARGER_MODELS.length, 4);
  assert.deepEqual(DC_CHARGER_MODELS.map(m => m.id), ['dc-30kw', 'dc-60kw', 'dc-120kw', 'dc-240kw']);
  assert.equal(DC_CHARGER_MODELS.find(m => m.id === 'dc-60kw').ratingKw, 60);
  assert.equal(DC_CHARGER_MODELS.find(m => m.id === 'dc-60kw').gunsCount, 2);
});

test('DC Plan Comparison Verification', () => {
  const comparison = calculatePlanComparison({
    investmentConfig: {
      selectedModelId: 'dc-60kw',
      chargerRatingKw: 60,
      costPerCharger: 699900
    }
  });

  assert.equal(comparison.length, 3);
  assert.equal(comparison[0].planId, 'starter');
  assert.equal(comparison[0].chargerQuantity, 1);
  assert.equal(comparison[1].planId, 'growth');
  assert.equal(comparison[1].chargerQuantity, 2);
  assert.equal(comparison[2].planId, 'expansion');
  assert.equal(comparison[2].chargerQuantity, 2);
});

test('Format INR Currency Utility', () => {
  assert.ok(formatINR(699900).includes('6,99,900'));
});
