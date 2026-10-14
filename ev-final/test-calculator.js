import { calculateFinancials, formatINR, CHARGER_MODELS } from './src/utils/calculator.js';

console.log("=== Testing ROI Calculator Formulas & Data Integrity (Direct Operator Margins) ===");

let allPassed = true;

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    allPassed = false;
  } else {
    console.log(`PASS: ${message}`);
  }
}

// Test 1: Verify charger models count
assert(CHARGER_MODELS.length === 8, "Expected 8 charger models in catalog");

// Test 2: Standard direct calculation test (No commission deductions)
// Axion 7.4 kW Pro (₹24,999) with 10 vehicles/day, 10 kWh/session, tariff ₹16/kWh, powerCost ₹8/kWh
const result = calculateFinancials({
  chargerPrice: 24999,
  vehiclesPerDay: 10,
  kwhPerVehicle: 10,
  tariff: 16,
  powerCost: 8
});

// Expected calculations:
// Monthly sessions = 10 * 30 = 300
// Gross revenue = 10 kWh * ₹16 * 300 = ₹48,000
// Power cost = 10 kWh * ₹8 * 300 = ₹24,000
// Net profit monthly = 48000 - 24000 = ₹24,000
// Annual profit = 24000 * 12 = ₹288,000
// Payback period = 24999 / 24000 = 1.0 month
// Net margin per kWh = 16 - 8 = 8 ₹/kWh
assert(result.monthlySessions === 300, `Monthly sessions = ${result.monthlySessions} (expected 300)`);
assert(result.grossRevenueMonthly === 48000, `Gross revenue = ${result.grossRevenueMonthly} (expected 48000)`);
assert(result.powerCostMonthly === 24000, `Power cost = ${result.powerCostMonthly} (expected 24000)`);
assert(result.netProfitMonthly === 24000, `Net profit monthly = ${result.netProfitMonthly} (expected 24000)`);
assert(result.annualProfit === 288000, `Annual profit = ${result.annualProfit} (expected 288000)`);
assert(result.breakEvenMonths === 1.0, `Break even months = ${result.breakEvenMonths} (expected 1.0)`);
assert(result.netMarginPerKwh === 8.0, `Net margin per kWh = ${result.netMarginPerKwh} (expected 8.0)`);

// Test 3: Currency formatting in INR
const formatted = formatINR(24000);
assert(formatted.includes('24,000'), `Formatted INR contains 24,000: ${formatted}`);

if (allPassed) {
  console.log("\nAll Calculator Tests Passed Successfully!");
} else {
  process.exit(1);
}
