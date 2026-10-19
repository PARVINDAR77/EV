import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateInitialInvestment,
  calculateCapacityLimits,
  calculateMonthlyFinancials,
  calculate12MonthProjection,
  calculateScenarios,
  calculatePlanComparison,
  formatINR
} from './financialCalculator.js';

test('Initial Investment Calculation - Equipment, Setup, Contingency', () => {
  const result = calculateInitialInvestment({
    chargerQuantity: 2,
    costPerCharger: 49900,
    installationPerCharger: 15000,
    infrastructureFixed: 25000,
    otherSetupCosts: 10000,
    contingencyPct: 5,
    financing: { enabled: false }
  });

  // Equipment: 2 * 49900 = 99800
  assert.equal(result.equipmentCost, 99800);
  // Install: 2 * 15000 = 30000
  assert.equal(result.installationCost, 30000);
  // Subtotal: 99800 + 30000 + 25000 + 10000 = 164800
  assert.equal(result.subtotalBeforeContingency, 164800);
  // Contingency: 164800 * 0.05 = 8240
  assert.equal(result.contingencyAmount, 8240);
  // Total: 164800 + 8240 = 173040
  assert.equal(result.totalProjectInvestment, 173040);
  assert.equal(result.financing.upfrontEquity, 173040);
});

test('Financing Amortization Calculation', () => {
  const result = calculateInitialInvestment({
    chargerQuantity: 2,
    costPerCharger: 50000,
    installationPerCharger: 10000,
    infrastructureFixed: 20000,
    otherSetupCosts: 10000,
    contingencyPct: 0,
    financing: {
      enabled: true,
      loanPercentage: 70, // 70% of 150000 = 105000
      annualInterestRate: 12, // 1% per month
      tenureMonths: 12
    }
  });

  assert.equal(result.totalProjectInvestment, 150000);
  assert.equal(result.financing.financedAmount, 105000);
  assert.equal(result.financing.upfrontEquity, 45000);
  // EMI for 105000 at 12% annual (1% monthly) for 12 months:
  // EMI = 105000 * 0.01 * (1.01)^12 / ((1.01)^12 - 1) ≈ 9329
  assert.ok(result.financing.monthlyEmi >= 9300 && result.financing.monthlyEmi <= 9350);
});

test('Capacity Limit Calculation - Power, Operating Hours, Uptime', () => {
  const cap = calculateCapacityLimits({
    chargerQuantity: 2,
    chargerRatingKw: 7.4,
    operatingHoursPerDay: 16,
    uptimePct: 98,
    powerSharingRatioPct: 100,
    sitePowerLimitKw: null,
    operatingDaysPerMonth: 30
  });

  // Nameplate: 2 * 7.4 = 14.8 kW
  assert.equal(cap.theoreticalNameplateKw, 14.8);
  // Deliverable per day: 14.8 * 16 * 0.98 = 232.064 kWh/day
  assert.ok(Math.abs(cap.maxDeliverableEnergyPerDay - 232.1) < 0.2);
});

test('Break-Even Formula with Percentage Payment Gateway Fee', () => {
  // Formula: P_be = (C + F/E) / (1 - g)
  // Let:
  // C = 9.5 (power) + 0.5 (platform) = 10.0
  // F = 2000 (fixed OPEX)
  // E = 1000 kWh
  // g = 0.02 (2% gateway)
  // C + F/E = 10.0 + 2.0 = 12.0
  // P_be = 12.0 / (1 - 0.02) = 12.0 / 0.98 ≈ 12.24
  const result = calculateMonthlyFinancials({
    monthIndex: 1,
    dailySessions: 2, // 2 sessions * 30 days * 1.0 = 60 sessions
    demandMode: 'site-wide',
    chargerQuantity: 2,
    operatingDays: 30,
    avgKwhPerSession: 16.6666667, // 60 * 16.6666667 ≈ 1000 kWh
    uptimePct: 100,
    customerSellingPricePerKwh: 20,
    electricityCostPerKwh: 9.5,
    platformFeePerKwh: 0.5,
    paymentGatewayFeePct: 2.0,
    fixedPlatformFeeMonthly: 500, // 500 * 2 = 1000
    fixedPlatformFeePerCharger: true,
    monthlyMaintenanceCost: 1000, // Total F = 2000
    siteRentMonthly: 0,
    otherFixedOpexMonthly: 0
  });

  assert.equal(result.breakEven.status, 'normal');
  assert.ok(Math.abs(result.breakEven.pricePerKwh - 12.24) <= 0.05);
});

test('Break-Even Safety Fallbacks - Zero Energy and Invalid Gateway Fee', () => {
  // Zero energy delivered
  const zeroEnergy = calculateMonthlyFinancials({
    dailySessions: 0,
    customerSellingPricePerKwh: 20
  });
  assert.equal(zeroEnergy.breakEven.status, 'zero_energy');
  assert.equal(zeroEnergy.breakEven.pricePerKwh, null);

  // Gateway fee >= 100%
  const invalidFee = calculateMonthlyFinancials({
    dailySessions: 2,
    paymentGatewayFeePct: 100
  });
  assert.equal(invalidFee.breakEven.status, 'invalid_gateway_fee');
  assert.equal(invalidFee.breakEven.pricePerKwh, null);
});

test('Site-Wide vs Per-Charger Demand Logic', () => {
  const siteWide = calculateMonthlyFinancials({
    dailySessions: 4,
    demandMode: 'site-wide',
    chargerQuantity: 4,
    operatingDays: 30,
    uptimePct: 100,
    avgKwhPerSession: 20
  });
  // Site-wide: 4 sessions/day across site -> 4 * 30 = 120 sessions
  assert.equal(siteWide.expectedMonthlySessions, 120);

  const perCharger = calculateMonthlyFinancials({
    dailySessions: 4,
    demandMode: 'per-charger',
    chargerQuantity: 4,
    operatingDays: 30,
    uptimePct: 100,
    avgKwhPerSession: 20
  });
  // Per-charger: 4 sessions/day per charger * 4 chargers -> 16/day * 30 = 480 sessions
  assert.equal(perCharger.expectedMonthlySessions, 480);
});

test('Capacity Validation Alert when Demand Exceeds Limit', () => {
  const capLimits = calculateCapacityLimits({
    chargerQuantity: 1,
    chargerRatingKw: 3.3,
    operatingHoursPerDay: 10,
    uptimePct: 100
  });
  // Max deliverable: 1 * 3.3 * 10 = 33 kWh/day

  // Demand: 3 sessions * 20 kWh = 60 kWh/day > 33 kWh/day
  const result = calculateMonthlyFinancials({
    dailySessions: 3,
    avgKwhPerSession: 20,
    capacityLimits: capLimits
  });

  assert.equal(result.capacity.isExceeded, true);
  assert.ok(result.capacity.utilizationPct > 100);
});

test('12-Month Projection and Honest Payback Recovery', () => {
  const proj = calculate12MonthProjection({
    investmentConfig: {
      chargerQuantity: 2,
      costPerCharger: 49900,
      installationPerCharger: 10000,
      infrastructureFixed: 15000,
      otherSetupCosts: 5000,
      contingencyPct: 0
    },
    tariffConfig: {
      customerSellingPricePerKwh: 22,
      electricityCostPerKwh: 9.0,
      platformFeePerKwh: 0.5,
      paymentGatewayFeePct: 1.8,
      fixedPlatformFeeMonthly: 400,
      fixedPlatformFeePerCharger: true,
      monthlyMaintenanceCost: 800
    },
    demandSchedule: [2, 2, 2, 4, 4, 4, 6, 6, 6, 8, 8, 8],
    demandMode: 'site-wide',
    operatingDays: 30,
    avgKwhPerSession: 20,
    uptimePct: 98
  });

  assert.equal(proj.monthlyResults.length, 12);
  // Reconcile annual total with sum of 12 months
  const sumRevenue = proj.monthlyResults.reduce((sum, m) => sum + m.grossRevenue, 0);
  assert.equal(proj.annualTotals.revenue, sumRevenue);

  const sumProfit = proj.monthlyResults.reduce((sum, m) => sum + m.operatingProfit, 0);
  assert.equal(proj.annualTotals.operatingProfit, sumProfit);

  // Month 0 cumulative cash flow should be -totalProjectInvestment
  assert.equal(proj.monthlyResults[0].cumulativeCashFlow, -proj.investment.totalProjectInvestment + proj.monthlyResults[0].netOperatingCashFlow);

  // If cumulative cash flow remains negative, payback must clearly state unrecovered
  if (proj.cumulativeCashFlowMonth12 < 0) {
    assert.equal(proj.paybackMonth, null);
    assert.equal(proj.paybackStatus, 'Investment not recovered within the 12-month forecast.');
  } else {
    assert.ok(proj.paybackMonth >= 1 && proj.paybackMonth <= 12);
  }
});

test('Format INR Currency Utility', () => {
  assert.ok(formatINR(150000).includes('1,50,000'));
});
