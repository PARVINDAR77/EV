# AXION CHARGE V2 — ev-final

A complete, production-quality redesign of the **AXION CHARGE** EV charging infrastructure website.

## Core Design Principles
* **Realistic & Approachable:** Predominantly white and soft grey (`#FFFFFF`, `#F5F7F5`) with deep green (`#122D26`) navigation and forest brand green (`#16834A`).
* **Zero Animations:** Strict zero-animation policy. No Framer Motion, no GSAP, no Lenis, no animated loaders, no typewriter effects, no 3D globes, no animated maps, no video timelines. Fast, predictable, accessible document scrolling.
* **Relevant to India:** Tailored for property owners, RWAs, and businesses in Ahmedabad, Gujarat, and across India (DISCOM single vs. 3-phase considerations, sub-metering, earthing standards).
* **100% Isolated:** Lives in its own folder `ev-final/` without modifying or overwriting any file in the original project.

## How to Run

### Development Mode
```bash
cd ev-final
npm install
npm run dev
```

### Production Build & Preview
```bash
cd ev-final
npm run build
npm run preview -- --port 5174
```

## Route Inventory (All 21 Verified Routes)

| Path | Purpose |
| :--- | :--- |
| `/` | Homepage (Hero, Solutions, Hardware/Software, Process, Why Axion, CTA) |
| `/about` | Corporate Story, Core Pillars, Ahmedabad HQ details |
| `/contact` | Verified Contact Details (+91 99799 93397 / 93396) & Enquiry Form |
| `/calculator` | Interactive Payback ROI Calculator with real financial formulas |
| `/franchise` | B2B Commercial Partnering & Site Host Application Form |
| `/solutions/residential` | Residential Villas & Apartment Complex Charging |
| `/solutions/workplace` | Corporate Campuses & Office Park Charging |
| `/solutions/commercial` | Shopping Malls, Hotels & Retail Destination Charging |
| `/solutions/fleet` | Logistics Van & Commercial Fleet Depot Hubs |
| `/solutions/highway` | Interstate Corridors & Highway Fast Charging |
| `/products/ac-chargers` | AC Wallboxes Catalog (3.3 kW to 22 kW) |
| `/products/dc-chargers` | DC Fast Chargers Catalog (30 kW to 240 kW) |
| `/products/accessories` | Charging Cables, Steel Pedestals & RFID Access Tokens |
| `/products/software` | Overview of CMS, Driver App & Enterprise API |
| `/product/:id` | Dynamic Individual Product Page with Full Technical Specs Table |
| `/product/charge-app` | Driver Mobile App Interface & Key Features |
| `/product/cms` | Station Management System (CMS) Cloud Platform |
| `/product/enterprise-api` | Developer Headless API & Webhooks |
| `/services/installation` | Turnkey Site Survey, Civil Work, Safety Switchgear & Handover |
| `/services/maintenance` | Preventive Maintenance, Spare Parts & 24/7 Monitoring |
