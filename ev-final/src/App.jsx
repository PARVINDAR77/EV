import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Direct imports for predictable, fast rendering (Zero animation / zero heavy chunking)
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Calculator from './pages/Calculator';
import Franchise from './pages/Franchise';

// Solutions
import Residential from './pages/solutions/Residential';
import Workplace from './pages/solutions/Workplace';
import Commercial from './pages/solutions/Commercial';
import Fleet from './pages/solutions/Fleet';
import Highway from './pages/solutions/Highway';

// Products
import ACChargers from './pages/products/ACChargers';
import DCChargers from './pages/products/DCChargers';
import Accessories from './pages/products/Accessories';
import ProductDetail from './pages/products/ProductDetail';

// Software
import ChargeApp from './pages/software/ChargeApp';
import CMS from './pages/software/CMS';
import EnterpriseAPI from './pages/software/EnterpriseAPI';

// Services
import Installation from './pages/services/Installation';
import Maintenance from './pages/services/Maintenance';

export const App = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/franchise" element={<Franchise />} />

          {/* Solution Routes */}
          <Route path="/solutions/residential" element={<Residential />} />
          <Route path="/solutions/workplace" element={<Workplace />} />
          <Route path="/solutions/commercial" element={<Commercial />} />
          <Route path="/solutions/fleet" element={<Fleet />} />
          <Route path="/solutions/highway" element={<Highway />} />

          {/* Product Category Routes */}
          <Route path="/products/ac-chargers" element={<ACChargers />} />
          <Route path="/products/dc-chargers" element={<DCChargers />} />
          <Route path="/products/accessories" element={<Accessories />} />
          <Route path="/products/software" element={<CMS />} />

          {/* Individual Product Detail Route */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Software Product Routes (Supporting both /product/ and /software/ prefixes) */}
          <Route path="/product/charge-app" element={<ChargeApp />} />
          <Route path="/product/cms" element={<CMS />} />
          <Route path="/product/enterprise-api" element={<EnterpriseAPI />} />
          <Route path="/software/charge-app" element={<ChargeApp />} />
          <Route path="/software/cms" element={<CMS />} />
          <Route path="/software/enterprise-api" element={<EnterpriseAPI />} />

          {/* Services Routes */}
          <Route path="/services/installation" element={<Installation />} />
          <Route path="/services/maintenance" element={<Maintenance />} />

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
