export const products = [
  // AC Chargers
  {
    id: 'ac-3-3kw',
    category: 'ac',
    categoryName: 'AC Wallboxes',
    name: 'Axion 3.3 kW AC',
    power: '3.3 kW',
    tagline: 'Cost-effective residential charging for homes and two-wheelers/PHEVs.',
    description: 'Designed for single-phase household supply. A safe, compact wallbox that charges overnight without requiring an upgraded electrical load.',
    price: '₹18,000',
    priceNum: 18000,
    image: '/images/products/ac-3kw.png',
    specs: {
      'Power Output': '3.3 kW',
      'Input Voltage': '230V AC, 1-Phase',
      'Current': '16A',
      'Connector': 'Type 2 / 16A Industrial Socket',
      'Protection': 'IP65 Weatherproof, Over/Under Voltage, Residual Current Detection'
    },
    useCases: ['Villas & Private Garages', 'Dedicated Apartment Parking', 'Light EVs & Two-wheelers']
  },
  {
    id: 'ac-7-4kw',
    category: 'ac',
    categoryName: 'AC Wallboxes',
    name: 'Axion 7.4 kW AC Pro',
    power: '7.4 kW',
    tagline: 'The dependable standard for home and individual vehicle charging.',
    description: 'Delivers a full battery charge overnight on a standard 32A single-phase connection. Features dynamic load balancing to protect household circuits.',
    price: '₹24,999',
    priceNum: 24999,
    image: '/images/products/ac-7kw.png',
    specs: {
      'Power Output': '7.4 kW',
      'Input Voltage': '230V AC, 1-Phase',
      'Current': '32A',
      'Connector': 'Type 2 Tethered Cable / Socket',
      'Connectivity': 'Wi-Fi, Bluetooth, Optional 4G',
      'Protection': 'IP65 Ingress Protection, Type A RCD + 6mA DC Leakage'
    },
    useCases: ['Individual Car Owners', 'Residential Communities', 'Executive Parking Spots']
  },
  {
    id: 'ac-11kw',
    category: 'ac',
    categoryName: 'AC Wallboxes',
    name: 'Axion 11 kW AC Commercial',
    power: '11 kW',
    tagline: 'Balanced 3-phase charging for workplaces and commercial parking.',
    description: 'Efficient commercial AC charger utilizing three-phase power. Built with MID-certified metering for automated billing and power accounting.',
    price: '₹38,000',
    priceNum: 38000,
    image: '/images/products/ac-11kw.png',
    specs: {
      'Power Output': '11 kW',
      'Input Voltage': '400V AC, 3-Phase',
      'Current': '16A per phase',
      'Connector': 'Type 2 Socket / Cable',
      'Metering': 'MID Certified Revenue Meter',
      'Protocols': 'OCPP 1.6J Compliant'
    },
    useCases: ['Commercial Office Parks', 'Hospitality & Hotels', 'Co-working Parking Facilities']
  },
  {
    id: 'ac-22kw',
    category: 'ac',
    categoryName: 'AC Wallboxes',
    name: 'Axion 22 kW AC Ultra',
    power: '22 kW',
    tagline: 'Maximum commercial AC speed for destination hubs and retail parking.',
    description: 'Delivers the highest rate of AC charging supported by current EVs. Rugged IK10 vandal-resistant casing designed for outdoor public lots.',
    price: '₹45,000',
    priceNum: 45000,
    image: '/images/products/ac-22kw.png',
    specs: {
      'Power Output': '22 kW',
      'Input Voltage': '400V AC, 3-Phase',
      'Current': '32A per phase',
      'Connector': 'Type 2 Dual Socket Option Available',
      'Authentication': 'RFID, Mobile App, QR Code',
      'Protection': 'IK10 Impact / IP65 Weatherproof'
    },
    useCases: ['Shopping Malls & Retail Centers', 'Fleet Depots with Long Dwell Time', 'Public Paid Parking Lots']
  },

  // DC Fast Chargers
  {
    id: 'dc-30kw',
    category: 'dc',
    categoryName: 'DC Fast Chargers',
    name: 'Axion DC 30 kW Urban',
    power: '30 kW',
    tagline: 'Compact DC fast charging for urban retail and service centers.',
    description: 'Rapid direct-current turnaround in a compact footprint that fits standard parking bays without heavy civil modifications.',
    price: '₹3,50,000',
    priceNum: 350000,
    image: '/images/products/dc-30kw.png',
    specs: {
      'Power Output': '30 kW Constant',
      'Input Voltage': '400V AC ± 15%, 3-Phase',
      'Output Voltage': '150V - 1000V DC',
      'Connector': 'CCS2 (Optional CHAdeMO)',
      'Efficiency': '≥ 95% Peak Efficiency',
      'Interface': '7-inch High Contrast Display'
    },
    useCases: ['Automobile Dealerships', 'Quick Service Restaurants', 'Urban Commercial Hubs']
  },
  {
    id: 'dc-60kw',
    category: 'dc',
    categoryName: 'DC Fast Chargers',
    name: 'Axion DC 60 kW Dual Gun',
    power: '60 kW',
    tagline: 'High-utility dual charging for commercial properties and transit fleets.',
    description: 'Simultaneously charges two vehicles with dynamic load sharing (30kW + 30kW or 60kW single). Built for continuous operational duty.',
    price: '₹6,50,000',
    priceNum: 650000,
    image: '/images/products/dc-60kw.png',
    specs: {
      'Power Output': '60 kW (Dynamic 2 x 30 kW)',
      'Input Voltage': '400V AC, 3-Phase',
      'Output Voltage': '200V - 1000V DC',
      'Gun Configuration': 'Dual CCS2 Charging Guns',
      'Payment Terminal': 'Integrated POS & QR Payment',
      'Protection': 'IP54 Enclosure with Anti-Corrosion Treatment'
    },
    useCases: ['Commercial Office Parks', 'Intercity Stopover Cafes', 'Last-Mile Delivery Hubs']
  },
  {
    id: 'dc-120kw',
    category: 'dc',
    categoryName: 'DC Fast Chargers',
    name: 'Axion DC 120 kW Highway Dual',
    power: '120 kW',
    tagline: 'Rapid highway charging engineered for India’s expressways.',
    description: 'Delivers 80% charge in 20-30 minutes for passenger vehicles. Engineered with heavy-duty thermal management for high ambient temperatures.',
    price: '₹12,00,000',
    priceNum: 1200000,
    image: '/images/products/dc-120kw.png',
    specs: {
      'Power Output': '120 kW Shared Power Matrix',
      'Input Voltage': '400V AC, 3-Phase + Neutral',
      'Output Voltage': '200V - 1000V DC Wide Range',
      'Connector': 'Dual Liquid-Cooled / Air-Cooled CCS2',
      'Network': '4G LTE / Gigabit Ethernet',
      'Compliance': 'AIS-138 / ARAI & CE Standards'
    },
    useCases: ['Highway Waypoints & Fuel Stations', 'State Transport Terminals', 'Commercial EV Hubs']
  },
  {
    id: 'dc-240kw',
    category: 'dc',
    categoryName: 'DC Fast Chargers',
    name: 'Axion DC 240 kW Heavy Duty',
    power: '240 kW',
    tagline: 'High-output power station for commercial bus depots and heavy fleets.',
    description: 'Modular power architecture designed for commercial bus fleets, long-haul freight vans, and 800V vehicle platforms.',
    price: '₹22,00,000',
    priceNum: 2200000,
    image: '/images/products/dc-240kw.png',
    specs: {
      'Power Output': '240 kW Modular (Expandable to 360 kW)',
      'Input Voltage': '415V AC, 3-Phase',
      'Output Current': 'Up to 500A Continuous',
      'Connector': 'Dual CCS2 with Cable Management Arm',
      'Grid Support': 'Optional Battery Energy Storage (BESS) Buffer',
      'Monitoring': '24/7 Cloud Telemetry & Automated NOC Alerting'
    },
    useCases: ['Electric Bus Depots', 'Logistics Distribution Hubs', 'High-Density Highway Charging Hubs']
  },

  // Accessories
  {
    id: 'charging-cables',
    category: 'accessories',
    categoryName: 'Accessories',
    name: 'Heavy-Duty EV Charging Cables',
    power: 'Up to 32A / 22kW',
    tagline: 'Durable, weather-sealed Type 2 cables built for daily Indian road conditions.',
    description: 'High-flexibility copper cables rated for 10,000+ plug cycles. Resistant to oil, road debris, and extreme summer temperatures.',
    price: '₹8,500',
    priceNum: 8500,
    image: '/images/products/cable.png',
    specs: {
      'Ratings': 'Single Phase 32A (7.4kW) / 3-Phase 32A (22kW)',
      'Standard Length': '5 Metres (7.5m Optional)',
      'Pin Material': 'Silver-Plated Copper Alloy',
      'Protection': 'IP55 Mated State'
    },
    useCases: ['Public AC Charging Access', 'Backup Boot Cable', 'Workplace Plug-in']
  },
  {
    id: 'pedestal-stand',
    category: 'accessories',
    categoryName: 'Accessories',
    name: 'Commercial Pedestal Stand',
    power: 'Mounting Solution',
    tagline: 'Sturdy, weather-coated steel mount for wallbox installations without wall access.',
    description: 'Galvanized powder-coated steel pedestal engineered to hold one or two Axion AC chargers with integrated base cable entry and conduit management.',
    price: '₹14,500',
    priceNum: 14500,
    image: '/images/products/pedestal.png',
    specs: {
      'Material': 'Galvanized Heavy Gauge Steel',
      'Finish': 'Polyester Powder Coating, UV Resistant',
      'Height': '1400 mm',
      'Mounting': 'Single or Back-to-Back Dual Mount'
    },
    useCases: ['Open Air Car Parks', 'Ground Level Residential Parking', 'Commercial Forecourts']
  },
  {
    id: 'rfid-access',
    category: 'accessories',
    categoryName: 'Accessories',
    name: 'Axion RFID Cards & Keyfobs',
    power: 'Access Control',
    tagline: 'Secure, contactless driver authentication for shared and private chargers.',
    description: 'Enables quick-tap authentication on all Axion AC and DC chargers without requiring mobile app connectivity or internet access at the charger.',
    price: '₹450',
    priceNum: 450,
    image: '/images/products/rfid.png',
    specs: {
      'Standard': 'Mifare Classic 1K / 13.56 MHz',
      'Form Factor': 'Standard ISO Plastic Card & Rugged Keyfob',
      'Integration': 'Managed via Axion CMS'
    },
    useCases: ['Society Residents Access', 'Office Staff Perks', 'Fleet Driver Identification']
  }
];
