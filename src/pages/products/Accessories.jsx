import React from 'react';
import ProductPage from './ProductPage';
import accImage from '../../assets/images/Axion pedestal stand product advertisement.png';

const Accessories = () => (
  <ProductPage 
    title="Accessories"
    category="Hardware Enhancements"
    description="High-quality cables, pedestals, and RFID management tools to complete and customize your charging infrastructure."
    image={accImage}
    features={[
      { title: "Charging Cables", desc: "High-quality, durable Type 2 and CCS2 cables for reliable charging.", link: "/product/charging-cables" },
      { title: "Pedestal Stand", desc: "Sleek, weather-resistant mounting poles for freestanding charger installations.", link: "/product/pedestal-stand" },
      { title: "RFID Card & Keyfob", desc: "Custom-branded RFID cards and compact keyfobs for secure, quick-tap access control.", link: "/product/rfid-access" }
    ]}
  />
);

export default Accessories;
