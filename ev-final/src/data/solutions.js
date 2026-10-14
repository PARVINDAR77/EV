export const solutions = [
  {
    id: 'residential',
    title: 'Residential Charging',
    badge: 'Apartments & Private Homes',
    heroTagline: 'Convenient, safe charging where your vehicle is parked the longest.',
    summary: 'Practical charging setups for private villas, gated societies, and multi-story apartment parking across Indian cities.',
    image: '/images/solutions/residential.jpg',
    targetAudience: 'Homeowners, Residential Welfare Associations (RWAs), and Apartment Managing Committees.',
    keyConsiderations: [
      {
        title: 'Single vs 3-Phase Connection',
        desc: 'Most residential apartments operate on 5kW to 8kW single-phase sanctioned loads. An Axion 3.3kW or 7.4kW charger matches this profile without costly transformer additions.'
      },
      {
        title: 'Sub-Metering & Society Billing',
        desc: 'Individual energy meters or RFID-tagged cards ensure power consumption is billed directly to the owner, keeping common society electricity accounts unaffected.'
      },
      {
        title: 'Basement Fire & Safety Compliance',
        desc: 'All hardware complies with Indian electrical standards (IS/IEC 61851) with built-in 6mA DC residual current protection to protect building wiring.'
      }
    ],
    recommendedHardware: ['ac-3-3kw', 'ac-7-4kw', 'charging-cables'],
    process: [
      'Site inspection to review meter room distance and cable route to parking bay.',
      'Check sanctioned DISCOM electrical load and propose load upgrade if needed.',
      'Mount weatherproof wallbox with dedicated miniature circuit breaker (MCB).',
      'Test earth resistance (below 5 ohms) and handover RFID cards or app access.'
    ]
  },
  {
    id: 'workplace',
    title: 'Workplace & Office Charging',
    badge: 'Corporate Parks & Offices',
    heroTagline: 'Support employees and fleet visitors with reliable workday charging.',
    summary: 'Scalable charging infrastructure for corporate offices, IT parks, and commercial campuses that keeps workday charging seamless and organized.',
    image: '/images/solutions/workplace.jpg',
    targetAudience: 'Facility Managers, Corporate Real Estate Heads, and Commercial Landlords.',
    keyConsiderations: [
      {
        title: 'Dynamic Load Management',
        desc: 'Automatically throttles charging power during peak office AC and elevator hours, then ramps up as building power demands drop.'
      },
      {
        title: 'Employee Access & Perks',
        desc: 'Integrate employee ID cards or corporate emails to allow subsidized or free charging during work hours with monthly consumption reports.'
      },
      {
        title: 'Clean Cable Routing',
        desc: 'Pedestals and cable retractor arms keep parking aisles uncluttered and safe for everyday pedestrian traffic.'
      }
    ],
    recommendedHardware: ['ac-7-4kw', 'ac-11kw', 'ac-22kw'],
    process: [
      'Review basement / podium electrical panel capacity and peak load curves.',
      'Design modular feeder busbars to support future charger additions without re-trenching.',
      'Deploy 11kW/22kW AC wallboxes with CMS connectivity via Wi-Fi or 4G LTE.',
      'Set automated tariff policies and provide facility dashboard access.'
    ]
  },
  {
    id: 'commercial',
    title: 'Commercial & Retail Charging',
    badge: 'Malls, Hotels & Retail',
    heroTagline: 'Attract premium footfall and generate non-tariff parking revenue.',
    summary: 'Fast and destination charging installations for shopping malls, hotels, restaurants, and multiplexes where customer dwell time translates directly into business.',
    image: '/images/solutions/commercial.jpg',
    targetAudience: 'Shopping Mall Operators, Hotel General Managers, and Commercial Property Owners.',
    keyConsiderations: [
      {
        title: 'Customer Dwell Time',
        desc: 'EV drivers charging at malls spend an average of 45-75 minutes shopping or dining, driving higher basket values and repeat visits.'
      },
      {
        title: 'Direct Monetization',
        desc: 'Set custom per-unit (₹/kWh) tariffs with automatic payment collection via UPI, cards, and EV driver apps.'
      },
      {
        title: 'Discovery on Public Maps',
        desc: 'Chargers are automatically listed on public charging networks and navigation apps, directing nearby drivers to your property.'
      }
    ],
    recommendedHardware: ['ac-22kw', 'dc-30kw', 'dc-60kw', 'pedestal-stand'],
    process: [
      'Assess transformer headroom and prime parking bay visibility.',
      'Install high-visibility signage, crash barriers, and dedicated EV parking bays.',
      'Integrate POS / UPI payment hardware for straightforward customer walk-ups.',
      'Go live on public charging apps and set dynamic off-peak pricing.'
    ]
  },
  {
    id: 'fleet',
    title: 'Fleet Logistics & Transit',
    badge: 'Logistics Depots & Cabs',
    heroTagline: 'High-availability charging depots built to keep electric fleets moving.',
    summary: 'Dedicated DC fast-charging depots for e-commerce delivery vans, corporate cab fleets, and municipal electric buses.',
    image: '/images/solutions/fleet.jpg',
    targetAudience: 'Fleet Operations Heads, Logistics Companies, and Last-Mile Delivery Operators.',
    keyConsiderations: [
      {
        title: 'Depot Turnaround Time',
        desc: 'High-output DC charging (60kW to 240kW) allows vehicles to turn around during shift handovers or rest breaks in 30-45 minutes.'
      },
      {
        title: 'Scheduled Overnight Sequencing',
        desc: 'Stagger charging automatically so all vans finish by 6:00 AM without triggering maximum demand (MD) penalty tariffs.'
      },
      {
        title: 'SLA-Backed Uptime',
        desc: 'Priority maintenance contracts with guaranteed on-site technician response to avoid grounded delivery routes.'
      }
    ],
    recommendedHardware: ['dc-60kw', 'dc-120kw', 'dc-240kw'],
    process: [
      'Analyze fleet daily route mileage, battery sizes, and depot dwell schedules.',
      'Coordinate HT (High Tension) transformer installation with DISCOM.',
      'Install industrial dual-gun DC chargers with rugged cable suspension arms.',
      'Connect telematics API to automate state-of-charge tracking and dispatch.'
    ]
  },
  {
    id: 'highway',
    title: 'Highway Fast Charging',
    badge: 'Corridors & Expressways',
    heroTagline: 'Reliable fast charging along intercity highways and expressways.',
    summary: 'High-power DC charging stations placed at toll plazas, fuel stations, and food plazas to enable interstate EV travel without range concerns.',
    image: '/images/solutions/highway.jpg',
    targetAudience: 'Highway Concessionaires, Fuel Pump Dealers, and Highway Food Plaza Operators.',
    keyConsiderations: [
      {
        title: 'Ultra-Fast 120kW+ Output',
        desc: 'Drivers stop for coffee or meals for 20-30 minutes and need a rapid 150-200 km range boost before getting back on the road.'
      },
      {
        title: 'Grid Resilience & Stability',
        desc: 'Designed with wide input voltage tolerances and industrial cooling to withstand highway summer heat and remote grid variations.'
      },
      {
        title: 'Multiple Gun Redundancy',
        desc: 'Dual-gun setups ensure a second vehicle can begin charging immediately if one port is occupied.'
      }
    ],
    recommendedHardware: ['dc-60kw', 'dc-120kw', 'dc-240kw'],
    process: [
      'Select high-traffic highway food plazas or fuel pumps with wide approach lanes.',
      'Coordinate 3-phase commercial electrical line and safety clearances.',
      'Commission weather-protected canopy and floodlit charging bays.',
      'Provide 24/7 remote NOC monitoring and emergency support hotlines.'
    ]
  }
];
