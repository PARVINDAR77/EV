import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';

// Lazy-loaded routes for ultra-fast initial page load
const About = lazy(() => import('./pages/About'));
const Franchise = lazy(() => import('./pages/Franchise'));
const Contact = lazy(() => import('./pages/Contact'));
const Residential = lazy(() => import('./pages/solutions/Residential'));
const Workplace = lazy(() => import('./pages/solutions/Workplace'));
const Commercial = lazy(() => import('./pages/solutions/Commercial'));
const Fleet = lazy(() => import('./pages/solutions/Fleet'));
const Highway = lazy(() => import('./pages/solutions/Highway'));
const ACChargers = lazy(() => import('./pages/products/ACChargers'));
const DCChargers = lazy(() => import('./pages/products/DCChargers'));
const Software = lazy(() => import('./pages/products/Software'));
const Accessories = lazy(() => import('./pages/products/Accessories'));
const Calculator = lazy(() => import('./pages/Calculator'));
const ProductPage = lazy(() => import('./pages/products/ProductPage'));
const Installation = lazy(() => import('./pages/services/Installation'));
const Maintenance = lazy(() => import('./pages/services/Maintenance'));
const ChargeApp = lazy(() => import('./pages/software/ChargeApp'));
const CMS = lazy(() => import('./pages/software/CMS'));
const EnterpriseAPI = lazy(() => import('./pages/software/EnterpriseAPI'));

const PageFallback = () => (
  <div className="min-h-screen bg-[#020403] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin shadow-[0_0_15px_rgba(0,255,0,0.4)]" />
  </div>
);

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
      <Suspense fallback={<PageFallback />}>
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
        </Routes>
      </Suspense>
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
