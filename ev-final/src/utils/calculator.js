/**
 * Verified ROI Calculator Financial Formulas for Axion Charge
 */

export const CHARGER_MODELS = [
  {
    id: 'ac-3-3kw',
    name: 'Axion 3.3 kW AC (Entry Wallbox)',
    category: 'AC Chargers',
    price: 18000,
    defaultKwh: 5,
  },
  {
    id: 'ac-7-4kw',
    name: 'Axion 7.4 kW AC Pro',
    category: 'AC Chargers',
    price: 24999,
    defaultKwh: 10,
  },
  {
    id: 'ac-11kw',
    name: 'Axion 11 kW AC Commercial',
    category: 'AC Chargers',
    price: 38000,
    defaultKwh: 15,
  },
  {
    id: 'ac-22kw',
    name: 'Axion 22 kW AC Ultra',
    category: 'AC Chargers',
    price: 45000,
    defaultKwh: 20,
  },
  {
    id: 'dc-30kw',
    name: 'Axion DC 30 kW Urban Fast',
    category: 'DC Fast Chargers',
    price: 350000,
    defaultKwh: 25,
  },
  {
    id: 'dc-60kw',
    name: 'Axion DC 60 kW Dual Gun',
    category: 'DC Fast Chargers',
    price: 650000,
    defaultKwh: 35,
  },
  {
    id: 'dc-120kw',
    name: 'Axion DC 120 kW Highway Dual',
    category: 'DC Fast Chargers',
    price: 1200000,
    defaultKwh: 50,
  },
  {
    id: 'dc-240kw',
    name: 'Axion DC 240 kW Heavy Duty',
    category: 'DC Fast Chargers',
    price: 2200000,
    defaultKwh: 70,
  },
];

export function calculateFinancials({
  chargerPrice,
  vehiclesPerDay,
  kwhPerVehicle,
  tariff,
  powerCost
}) {
  const monthlySessions = vehiclesPerDay * 30;
  const revenuePerSession = kwhPerVehicle * tariff;
  const costPerSession = kwhPerVehicle * powerCost;

  const grossRevenueMonthly = revenuePerSession * monthlySessions;
  const powerCostMonthly = costPerSession * monthlySessions;

  const netProfitMonthly = grossRevenueMonthly - powerCostMonthly;
  const annualProfit = netProfitMonthly * 12;
  const breakEvenMonths = netProfitMonthly > 0 ? (chargerPrice / netProfitMonthly) : 0;
  const netMarginPerKwh = tariff - powerCost;

  return {
    monthlySessions,
    grossRevenueMonthly,
    powerCostMonthly,
    netProfitMonthly,
    annualProfit,
    breakEvenMonths: Math.round(breakEvenMonths * 10) / 10,
    netMarginPerKwh: Math.round(netMarginPerKwh * 10) / 10
  };
}

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
