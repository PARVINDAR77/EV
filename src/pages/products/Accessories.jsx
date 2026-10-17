import React from 'react';
import ProductPage from './ProductPage';
import accImage from '../../assets/images/AXION Type 1 Charging Cable.webp';

const Accessories = () => (
  <ProductPage 
    title="Accessories"
    category="Hardware Enhancements"
    description="High-quality cables and RFID management tools to complete and customize your charging infrastructure."
    image={accImage}
    features={[
      { title: "Charging Cables", desc: "High-quality, durable Type 2 and CCS2 cables for reliable charging.", link: "/product/charging-cables" },
      { title: "RFID Card & Keyfob", desc: "Custom-branded RFID cards and compact keyfobs for secure, quick-tap access control.", link: "/product/rfid-access" }
    ]}
  />
);

export default Accessories;
