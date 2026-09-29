import React from 'react';
import ProductPage from './ProductPage';
import acImage from '../../assets/images/residential.jpg';

const ACChargers = () => (
  <ProductPage 
    title="AC Chargers"
    category="Home & Destination"
    description="Intelligent and compact AC charging stations designed for residential and light commercial use, offering seamless connectivity and smart load balancing."
    image={acImage}
    features={[
      { title: "Smart Load Balancing", desc: "Automatically adjusts power output to prevent grid overload." },
      { title: "App Connectivity", desc: "Monitor and control charging sessions via the AXION app." },
      { title: "Weatherproof IP65", desc: "Built to withstand harsh weather conditions indoors or outdoors." },
      { title: "RFID Authentication", desc: "Secure access control for multi-user environments." }
    ]}
  />
);

export default ACChargers;
