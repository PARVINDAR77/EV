import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant jump to top on route change (zero smooth animation)
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-shell">
      <Navbar />
      <main id="main-content" className="page-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
