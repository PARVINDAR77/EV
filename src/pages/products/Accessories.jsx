import React from 'react';
import ProductPage from './ProductPage';
import accImage from '../../assets/images/fleet.jpg';

const Accessories = () => (
  <ProductPage 
    title="Accessories"
    category="Hardware Enhancements"
    description="High-quality cables, pedestals, and RFID management tools to complete and customize your charging infrastructure."
    image={accImage}
    features={[
      { title: "Premium Cables", desc: "Tethered Type 2 and CCS2 cables built for extreme durability." },
      { title: "Mounting Pedestals", desc: "Sleek, weather-resistant mounting poles for freestanding installations." },
      { title: "RFID Cards", desc: "Custom-branded RFID cards for fleet and employee access." },
      { title: "Cable Management", desc: "Retractable cable systems to keep charging areas tidy and safe." }
    ]}
  />
);

export default Accessories;
