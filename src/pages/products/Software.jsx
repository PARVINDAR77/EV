import React from 'react';
import ProductPage from './ProductPage';
import swImage from '../../assets/images/workplace.jpg';

const Software = () => (
  <ProductPage 
    title="Management Software"
    category="Cloud Platform"
    description="A comprehensive cloud-based dashboard for monitoring, monetization, and maintenance of your entire charging network in real-time."
    image={swImage}
    features={[
      { title: "Real-Time Analytics", desc: "Monitor energy consumption, revenue, and station health instantly." },
      { title: "Automated Billing", desc: "Set custom tariffs and handle payments automatically." },
      { title: "Over-The-Air Updates", desc: "Remotely update charger firmware without on-site visits." },
      { title: "White-Label App", desc: "Offer a custom-branded charging app to your customers." }
    ]}
  />
);

export default Software;
