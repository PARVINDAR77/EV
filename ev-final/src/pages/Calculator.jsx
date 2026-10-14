import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator as CalcIcon, Info, ArrowRight, Check } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ContactCTA from '../components/ContactCTA';
import { CHARGER_MODELS, calculateFinancials, formatINR } from '../utils/calculator';

export const Calculator = () => {
  const [selectedCharger, setSelectedCharger] = useState(CHARGER_MODELS[1]); // Default: 7.4kW Pro
  const [vehiclesPerDay, setVehiclesPerDay] = useState(12);
  const [kwhPerVehicle, setKwhPerVehicle] = useState(12);
  const [tariff, setTariff] = useState(16); // ₹/kWh charged to customer
  const [powerCost, setPowerCost] = useState(7.5); // ₹/kWh commercial discom rate
  const [chargerPrice, setChargerPrice] = useState(24999);

  // Sync defaults when charger changes
  useEffect(() => {
    setKwhPerVehicle(selectedCharger.defaultKwh);
    setChargerPrice(selectedCharger.price);
  }, [selectedCharger]);

  // Main Financials
  const current = calculateFinancials({
    chargerPrice,
    vehiclesPerDay,
    kwhPerVehicle,
    tariff,
    powerCost
  });

  // 3-Scenario Comparison: Quiet (50%), Likely (100%), Busy (150%)
  const quietVehicles = Math.max(1, Math.floor(vehiclesPerDay * 0.5));
  const busyVehicles = Math.floor(vehiclesPerDay * 1.5);

  const quietScenario = calculateFinancials({
    chargerPrice,
    vehiclesPerDay: quietVehicles,
    kwhPerVehicle,
    tariff,
    powerCost
  });

  const busyScenario = calculateFinancials({
    chargerPrice,
    vehiclesPerDay: busyVehicles,
    kwhPerVehicle,
    tariff,
    powerCost
  });

  return (
    <div className="calculator-page">
      {/* Hero Header */}
      <section className="section section-alt" style={{ paddingBottom: 'var(--space-12)' }}>
        <div className="container">
          <SectionHeading 
            badge="Financial Planning Tool"
            title="EV Charging ROI & Payback Calculator"
            subtitle="Estimate your operational economics, monthly power margins, and estimated equipment payback period based on your local DISCOM commercial electricity tariffs."
          />
        </div>
      </section>

      {/* Calculator Body */}
      <section className="section">
        <div className="container">
          <div className="calc-layout">
            
            {/* Left Inputs Column */}
            <div className="calc-inputs-pane">
              
              {/* Step 1: Select Charger Model */}
              <div className="calc-card">
                <label className="calc-step-label">Step 1: Select Hardware Model</label>
                <div className="calc-select-grid">
                  {CHARGER_MODELS.map(model => (
                    <button
                      key={model.id}
                      type="button"
                      className={`calc-option-btn ${selectedCharger.id === model.id ? 'active' : ''}`}
                      onClick={() => setSelectedCharger(model)}
                    >
                      <div className="calc-option-top">
                        <strong className="calc-option-name">{model.name}</strong>
                        <span className="calc-option-price">{formatINR(model.price)}</span>
                      </div>
                      <span className="calc-option-cat">{model.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Operational Assumptions */}
              <div className="calc-card">
                <label className="calc-step-label">Step 2: Operational Assumptions</label>
                
                <div className="form-group-grid">
                  <div className="form-field">
                    <label htmlFor="vehiclesPerDay">Expected Vehicles / Day</label>
                    <input 
                      id="vehiclesPerDay"
                      type="number" 
                      min="1" 
                      max="100" 
                      value={vehiclesPerDay} 
                      onChange={(e) => setVehiclesPerDay(Number(e.target.value) || 1)}
                    />
                    <span className="field-hint">Average sessions per day</span>
                  </div>

                  <div className="form-field">
                    <label htmlFor="kwhPerVehicle">Avg. Energy per Session (kWh)</label>
                    <input 
                      id="kwhPerVehicle"
                      type="number" 
                      min="1" 
                      max="150" 
                      value={kwhPerVehicle} 
                      onChange={(e) => setKwhPerVehicle(Number(e.target.value) || 1)}
                    />
                    <span className="field-hint">e.g. 10-15 kWh for 2W/compact cars, 30-50 kWh for SUVs</span>
                  </div>

                  <div className="form-field">
                    <label htmlFor="tariff">Customer Charging Tariff (₹/kWh)</label>
                    <input 
                      id="tariff"
                      type="number" 
                      step="0.5" 
                      min="5" 
                      max="40" 
                      value={tariff} 
                      onChange={(e) => setTariff(Number(e.target.value) || 1)}
                    />
                    <span className="field-hint">Market rate in Gujarat: ₹14 - ₹20 / kWh</span>
                  </div>

                  <div className="form-field">
                    <label htmlFor="powerCost">DISCOM Electricity Cost (₹/kWh)</label>
                    <input 
                      id="powerCost"
                      type="number" 
                      step="0.5" 
                      min="4" 
                      max="20" 
                      value={powerCost} 
                      onChange={(e) => setPowerCost(Number(e.target.value) || 1)}
                    />
                    <span className="field-hint">Commercial grid tariff (e.g. UGVCL / Torrent)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Summary & ROI Output Pane */}
            <div className="calc-output-pane">
              <div className="results-card">
                <span className="badge" style={{ marginBottom: '12px' }}>Financial Estimates</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Projected Economics</h3>

                {/* Key Numbers */}
                <div className="primary-metric-box">
                  <span className="metric-label">Estimated Monthly Net Profit</span>
                  <div className="metric-value">{formatINR(current.netProfitMonthly)}</div>
                  <span className="metric-sub">
                    {current.netProfitMonthly > 0 
                      ? `${formatINR(current.annualProfit)} / year after commercial DISCOM power costs` 
                      : 'Costs exceed tariff revenue at current input rates'}
                  </span>
                </div>

                <div className="secondary-metrics-grid">
                  <div className="sec-metric-item">
                    <span className="sec-label">Estimated Payback Period</span>
                    <strong className="sec-value">
                      {current.breakEvenMonths > 0 ? `${current.breakEvenMonths} Months` : 'N/A'}
                    </strong>
                  </div>

                  <div className="sec-metric-item">
                    <span className="sec-label">Net Electricity Margin</span>
                    <strong className="sec-value">₹{current.netMarginPerKwh} / kWh</strong>
                  </div>

                  <div className="sec-metric-item">
                    <span className="sec-label">Monthly Sessions</span>
                    <strong className="sec-value">{current.monthlySessions} sessions</strong>
                  </div>

                  <div className="sec-metric-item">
                    <span className="sec-label">Hardware Price</span>
                    <strong className="sec-value">{formatINR(chargerPrice)}</strong>
                  </div>
                </div>

                {/* Monthly Ledger Breakdown */}
                <div className="ledger-block">
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    Monthly Cash Flow Breakdown
                  </h4>
                  <div className="ledger-row">
                    <span>Gross Tariff Revenue:</span>
                    <strong>{formatINR(current.grossRevenueMonthly)}</strong>
                  </div>
                  <div className="ledger-row">
                    <span>Grid Power Cost ({powerCost} ₹/kWh):</span>
                    <span style={{ color: '#C2410C' }}>- {formatINR(current.powerCostMonthly)}</span>
                  </div>
                  <div className="ledger-row total">
                    <span>Net Monthly Earnings:</span>
                    <strong style={{ color: 'var(--brand-green)' }}>{formatINR(current.netProfitMonthly)}</strong>
                  </div>
                </div>

                {/* 3-Scenario Analysis */}
                <div className="scenarios-block">
                  <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Traffic Scenarios
                  </h4>
                  <div className="scenario-item">
                    <div className="scenario-meta">
                      <span>Low Traffic ({quietVehicles} cars/day):</span>
                      <strong>{formatINR(quietScenario.netProfitMonthly)}/mo</strong>
                    </div>
                  </div>
                  <div className="scenario-item current-scenario">
                    <div className="scenario-meta">
                      <span>Expected ({vehiclesPerDay} cars/day):</span>
                      <strong>{formatINR(current.netProfitMonthly)}/mo</strong>
                    </div>
                  </div>
                  <div className="scenario-item">
                    <div className="scenario-meta">
                      <span>Peak Traffic ({busyVehicles} cars/day):</span>
                      <strong>{formatINR(busyScenario.netProfitMonthly)}/mo</strong>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="disclaimer-note">
                  <Info size={14} className="disclaimer-icon" />
                  <span>
                    Note: Calculations are based on user-entered assumptions for illustration purposes and do not represent a guaranteed financial return. Civil foundation, cabling, and local DISCOM demand charges vary per site.
                  </span>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                    Request Detailed Commercial Proposal <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <ContactCTA 
        title="Ready to discuss an installation at your property?"
        description="Our technical team will review your sanctioned electrical load, advise on civil requirements, and help verify your business case."
      />

      <style>{`
        .calc-layout {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: var(--space-8);
          align-items: flex-start;
        }

        .calc-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          margin-bottom: var(--space-6);
          box-shadow: var(--shadow-sm);
        }

        .calc-step-label {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--deep-green);
          margin-bottom: var(--space-4);
          display: block;
        }

        .calc-select-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
        }

        .calc-option-btn {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--space-3);
          text-align: left;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .calc-option-btn:hover {
          border-color: var(--text-muted);
          background-color: var(--bg-secondary);
        }

        .calc-option-btn.active {
          border-color: var(--brand-green);
          background-color: var(--brand-green-subtle);
        }

        .calc-option-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .calc-option-name {
          font-size: 0.8125rem;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .calc-option-price {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--brand-green);
          white-space: nowrap;
          margin-left: 6px;
        }

        .calc-option-cat {
          font-size: 0.6875rem;
          color: var(--text-secondary);
        }

        .form-group-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .form-field {
          display: flex;
          flex-direction: column;
        }

        .field-hint {
          font-size: 0.6875rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        /* Results Pane */
        .results-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          position: sticky;
          top: calc(var(--header-height) + 20px);
        }

        .primary-metric-box {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--space-5);
          text-align: center;
          margin-bottom: var(--space-4);
        }

        .metric-label {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 4px;
        }

        .metric-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--brand-green);
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .metric-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .secondary-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-3);
          margin-bottom: var(--space-5);
        }

        .sec-metric-item {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: var(--space-3);
        }

        .sec-label {
          font-size: 0.6875rem;
          color: var(--text-secondary);
          display: block;
        }

        .sec-value {
          font-size: 0.9375rem;
          color: var(--deep-green);
          margin-top: 2px;
          display: block;
        }

        .ledger-block {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .ledger-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8125rem;
          padding: 4px 0;
          color: var(--text-secondary);
        }

        .ledger-row.total {
          border-top: 1px solid var(--border-color);
          margin-top: 6px;
          padding-top: 8px;
          font-weight: 700;
          color: var(--deep-green);
        }

        .scenarios-block {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .scenario-item {
          padding: 6px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
        }

        .scenario-item.current-scenario {
          background-color: var(--brand-green-subtle);
          border-left: 3px solid var(--brand-green);
        }

        .scenario-meta {
          display: flex;
          justify-content: space-between;
        }

        .disclaimer-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.6875rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-top: var(--space-4);
        }

        .disclaimer-icon {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .calc-layout {
            grid-template-columns: 1fr;
          }
          .results-card {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .calc-select-grid,
          .plan-select-grid,
          .form-group-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Calculator;
