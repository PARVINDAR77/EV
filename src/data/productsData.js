import ac3kwImg from '../assets/images/product_ac_2wheeler_3_3kw.webp';
import ac7kwImg from '../assets/images/product_ac_7_4kw.webp';
import ac11kwImg from '../assets/images/product_ac_11kw.webp';
import ac22kwImg from '../assets/images/product_ac_22kw.webp';
import dc30kwImg from '../assets/images/AXION DC charger with black cables-1.webp';
import dc60kwImg from '../assets/images/AXION 60 kW EV Wallbox Advertisement.webp';
import dc120kwImg from '../assets/images/AXION 120 kW EV Charging Station.webp';

export const productsData = [
  {
    id: "ac-3kw",
    category: "ac",
    name: "Axion AC 3.3kW (AXION 3)",
    tagline: "Slow AC Charger with 3 Sockets.",
    description: "Compact slow charger with 3 sockets for all Indian 2-wheelers, 3-wheelers, and cars. Rapid deployment with OCPP v1.6 support.",
    image: ac3kwImg,
    price: "₹14,900",
    priceNumber: 14900,
    features: ["3-Pin Sockets (16A max)", "OCPP v1.6 Over Wi-Fi/GSM", "Emergency Mushroom Switch", "Compatible with 2/3/4 Wheelers"],
    specs: {
      power: "3.3 kW",
      inputVoltage: "1-Phase 230V AC",
      current: "16A Max",
      connector: "3-Pin Universal",
      protection: "Over Voltage, Short Circuit, Ground Fault, Emergency Cutoff"
    }
  },
  {
    id: "ac-7kw",
    category: "ac",
    name: "Axion AC 7.4kW (Axion Pro)",
    tagline: "Compact. Smart. Efficient.",
    description: "The standard for home use and apartments. Delivers a full overnight charge for most EVs on single-phase with intelligent load balancing.",
    image: ac7kwImg,
    price: "₹59,900",
    priceNumber: 59900,
    features: ["Wi-Fi & Bluetooth", "IP65 Rated Weatherproof", "Type 2 Cable / Gun", "OCPP 1.6J Compatible"],
    specs: {
      power: "7.4 kW",
      inputVoltage: "230V AC ± 10%, 50Hz",
      current: "32A",
      connector: "Type 2",
      protection: "Built-in Type A RCD + 6mA DC, Emergency shutdown"
    }
  },
  {
    id: "ac-11kw",
    category: "ac",
    name: "Axion AC 11kW",
    tagline: "Fast 3-Phase Commercial Wallbox.",
    description: "Ideal for workplaces, fleet depots, and residential societies with balanced 3-phase power and MID certified metering.",
    image: ac11kwImg,
    price: "₹74,900",
    priceNumber: 74900,
    features: ["3-Phase Power Distribution", "RFID / App Scan Code", "Dynamic Load Sharing", "MID Certified Meter"],
    specs: {
      power: "11 kW",
      inputVoltage: "3-Phase 400V AC",
      current: "16A per phase",
      connector: "Type 2",
      protection: "Phase Loss Detection, Short Circuit, Ground Fault"
    }
  },
  {
    id: "ac-22kw",
    category: "ac",
    name: "Axion AC 22kW (Focal 22)",
    tagline: "High Power for Commercial Lots.",
    description: "Maximum speed AC charging station for offices, commercial parking, hotels, and retail destinations.",
    image: ac22kwImg,
    price: "₹89,900",
    priceNumber: 89900,
    features: ["RFID Authentication", "4G / LTE Optional", "Dynamic Load Management", "MID Certified Meter"],
    specs: {
      power: "22 kW",
      inputVoltage: "400V AC (3-Phase)",
      current: "32A",
      connector: "Type 2",
      protection: "Built-in Type A RCD + 6mA DC"
    }
  },
  {
    id: "dc-30kw",
    category: "dc",
    name: "Axion DC 30kW",
    tagline: "Rapid Urban Charging.",
    description: "Fast, reliable DC charging perfect for car dealerships, quick-service retail, urban fleet depots, and hospitality.",
    image: dc30kwImg,
    price: "₹4,99,900",
    priceNumber: 499900,
    features: ["CCS2 Gun", "Compact Footprint (<0.3 sq.m)", "7-inch Touchscreen", "Liquid / Active Air Cooling"],
    specs: {
      power: "30 kW",
      inputVoltage: "400V AC (3-Phase)",
      outputVoltage: "150V - 1000V DC",
      connector: "CCS2",
      efficiency: "> 95%"
    }
  },
  {
    id: "dc-60kw",
    category: "dc",
    name: "Axion DC 60kW Dual-Gun",
    tagline: "Commercial Fast Charging Hub.",
    description: "High-throughput dual-gun DC fast charger engineered for shopping malls, fleet logistics hubs, and city transit corridors.",
    image: dc60kwImg,
    price: "₹6,99,900",
    priceNumber: 699900,
    features: ["Dual CCS2 Guns", "Dynamic Power Sharing", "10-inch Kiosk Display", "RFID & UPI QR Payment Ready"],
    specs: {
      power: "60 kW (30kW + 30kW Dual Mode)",
      inputVoltage: "415V AC (3-Phase)",
      outputVoltage: "200V - 1000V DC",
      connector: "Dual CCS2",
      efficiency: "> 95.5%"
    }
  },
  {
    id: "dc-120kw",
    category: "dc",
    name: "Axion DC 120kW",
    tagline: "Highway Dominance.",
    description: "Ultra-fast charging for highway transit corridors. Rapid dual-vehicle simultaneous charging with intelligent power routing.",
    image: dc120kwImg,
    price: "₹9,99,900",
    priceNumber: 999900,
    features: ["Dual CCS2 Output", "Dynamic Power Sharing", "10-inch Kiosk Display", "Plug & Charge Ready"],
    specs: {
      power: "120 kW",
      inputVoltage: "400V AC (3-Phase)",
      outputVoltage: "200V - 1000V DC",
      connector: "Dual CCS2",
      efficiency: "> 95%"
    }
  }
];
