import ac7kwImg from '../assets/images/WhatsApp Image 2026-10-05 at 4.18.49 PM.jpeg';
import ac22kwImg from '../assets/images/WhatsApp Image 2026-10-05 at 4.18.49 PM (1).jpeg';
import dc30kwImg from '../assets/images/WhatsApp Image 2026-10-05 at 4.18.49 PM (3).jpeg';
import dc120kwImg from '../assets/images/WhatsApp Image 2026-10-05 at 4.18.49 PM (2).jpeg';

export const productsData = [
  {
    id: "ac-7kw",
    category: "ac",
    name: "Axion AC 7kW",
    tagline: "Compact. Smart. Efficient.",
    description: "The perfect residential charging solution. Compact design with intelligent load balancing and robust app connectivity.",
    image: ac7kwImg,
    features: ["Wi-Fi & Bluetooth", "IP65 Rated Weatherproof", "Type 2 Cable/Socket", "OCPP 1.6J Compatible"],
    specs: {
      power: "7.4 kW",
      inputVoltage: "230V AC",
      current: "32A",
      connector: "Type 2",
      protection: "Built-in Type A RCD + 6mA DC"
    }
  },
  {
    id: "ac-22kw",
    category: "ac",
    name: "Axion AC 22kW",
    tagline: "High Power for Commercial Lots.",
    description: "Ideal for workplaces and commercial parking. Delivering rapid AC charging with full fleet management integration.",
    image: ac22kwImg,
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
    description: "Fast, reliable DC charging perfect for urban destinations, retail locations, and fleet depots.",
    image: dc30kwImg,
    features: ["CCS2 & CHAdeMO", "Compact Footprint", "Liquid Cooling", "7-inch Touchscreen"],
    specs: {
      power: "30 kW",
      inputVoltage: "400V AC (3-Phase)",
      outputVoltage: "150V - 1000V DC",
      connector: "CCS2 / CHAdeMO",
      efficiency: "> 95%"
    }
  },
  {
    id: "dc-120kw",
    category: "dc",
    name: "Axion DC 120kW",
    tagline: "Highway Dominance.",
    description: "Ultra-fast charging for highway transit. Capable of charging two vehicles simultaneously with power sharing.",
    image: dc120kwImg,
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
