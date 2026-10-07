import React from 'react';
import ProductPage from './ProductPage';
import acImage from '../../assets/images/22 kW EV charger, black AXION logo-4.png';

const ACChargers = () => (
  <ProductPage 
    title="AC Chargers"
    category="Home & Destination"
    description="Intelligent and compact AC charging stations designed for residential and light commercial use, offering seamless connectivity and smart load balancing."
    image={acImage}
    features={[
      { title: "Axion 3.3 kW AC", desc: "Compact and cost-effective. Ideal for long-duration residential charging and plug-in hybrids.", link: "/product/ac-3-3kw" },
      { title: "Axion 7.4 kW AC", desc: "The standard for home use. Delivers a full overnight charge for most EVs on a single-phase connection.", link: "/product/ac-7-4kw" },
      { title: "Axion 11 kW AC", desc: "Faster 3-phase charging perfect for workplaces, fleet depots, and multi-unit dwellings.", link: "/product/ac-11kw" },
      { title: "Axion 22 kW AC", desc: "Maximum AC charging speed. Designed for destination charging at hotels, malls, and public parking.", link: "/product/ac-22kw" }
    ]}
  />
);

export default ACChargers;
