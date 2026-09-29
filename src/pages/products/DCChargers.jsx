import React from 'react';
import ProductPage from './ProductPage';
import dcImage from '../../assets/images/commercial.jpg';

const DCChargers = () => (
  <ProductPage 
    title="DC Fast Chargers"
    category="Highway & Fleet"
    description="Ultra-fast DC charging solutions engineered for rapid turnaround times, perfect for highway corridors and high-demand commercial fleets."
    image={dcImage}
    features={[
      { title: "Ultra-Fast Charging", desc: "Deliver up to 360kW of power for 80% charge in 15 minutes." },
      { title: "Liquid Cooled Cables", desc: "Advanced thermal management for continuous high-power delivery." },
      { title: "Dynamic Power Sharing", desc: "Distribute power intelligently across multiple connected vehicles." },
      { title: "Credit Card Integration", desc: "Built-in POS terminal for seamless ad-hoc payments." }
    ]}
  />
);

export default DCChargers;
