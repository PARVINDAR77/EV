import React from 'react';
import ProductPage from './ProductPage';
import dcImage from '../../assets/images/AXION charger with matte black cables-3.png';

const DCChargers = () => (
  <ProductPage 
    title="DC Fast Chargers"
    category="Highway & Fleet"
    description="Ultra-fast DC charging solutions engineered for rapid turnaround times, perfect for highway corridors and high-demand commercial fleets."
    image={dcImage}
    features={[
      { title: "Axion DC 30kW", desc: "Compact DC charging for car dealerships, quick-service retail, and urban fleet depots.", link: "/product/dc-30kw" },
      { title: "Axion DC 60kW", desc: "Versatile fast charging for commercial parking, hospitality, and longer stops.", link: "/product/dc-60kw" },
      { title: "Axion DC 120kW", desc: "High-power dual-charging solution engineered for highway corridors and rapid transit.", link: "/product/dc-120kw" },
      { title: "Axion DC 240kW", desc: "Ultra-fast hyper-charging for heavy-duty fleets and next-generation EVs.", link: "/product/dc-240kw" }
    ]}
  />
);

export default DCChargers;
