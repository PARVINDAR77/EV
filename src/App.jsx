import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Franchise from './pages/Franchise';
import Contact from './pages/Contact';
import Residential from './pages/solutions/Residential';
import Workplace from './pages/solutions/Workplace';
import Commercial from './pages/solutions/Commercial';
import Fleet from './pages/solutions/Fleet';
import Highway from './pages/solutions/Highway';
import ACChargers from './pages/products/ACChargers';
import DCChargers from './pages/products/DCChargers';
import Software from './pages/products/Software';
import Accessories from './pages/products/Accessories';
import Calculator from './pages/Calculator';
import ProductPage from './pages/products/ProductPage';
import Installation from './pages/services/Installation';
import Maintenance from './pages/services/Maintenance';
import ChargeApp from './pages/software/ChargeApp';
import CMS from './pages/software/CMS';
import EnterpriseAPI from './pages/software/EnterpriseAPI';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/solutions/residential" element={<Residential />} />
        <Route path="/solutions/workplace" element={<Workplace />} />
        <Route path="/solutions/commercial" element={<Commercial />} />
        <Route path="/solutions/fleet" element={<Fleet />} />
        <Route path="/solutions/highway" element={<Highway />} />
        <Route path="/products/ac-chargers" element={<ACChargers />} />
        <Route path="/products/dc-chargers" element={<DCChargers />} />
        <Route path="/products/accessories" element={<Accessories />} />
        
        <Route path="/product/charge-app" element={<ChargeApp />} />
        <Route path="/product/cms" element={<CMS />} />
        <Route path="/product/enterprise-api" element={<EnterpriseAPI />} />

        <Route path="/product/:id" element={<ProductPage />} />
        
        <Route path="/services/installation" element={<Installation />} />
        <Route path="/services/maintenance" element={<Maintenance />} />

        <Route path="/calculator" element={<Calculator />} />
        {/* Other routes will go here */}
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <React.Fragment key="content">
            <Navbar />
            <AnimatedRoutes />
          </React.Fragment>
        )}
      </AnimatePresence>
    </Router>
  );
};

export default App;
