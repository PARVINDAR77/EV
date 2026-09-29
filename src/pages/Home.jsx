import React from 'react';
import PageTransition from '../components/PageTransition/PageTransition';
import Hero from '../sections/home/Hero';
import ElectricShiftSection from '../sections/home/ElectricShiftSection';
import EcosystemSection from '../sections/home/EcosystemSection';
import ConnectedIndiaSection from '../sections/home/ConnectedIndiaSection';
import DeploymentProcessSection from '../sections/home/DeploymentProcessSection';
import SmartControlSection from '../sections/home/SmartControlSection';
import EngineeredToChargeSection from '../sections/home/EngineeredToChargeSection';
import ChargingSolutionsSection from '../sections/home/ChargingSolutionsSection';
import WhyAxionSection from '../sections/home/WhyAxionSection';
import StatsSection from '../sections/home/StatsSection';
import CTASection from '../sections/home/CTASection';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <PageTransition locationKey="home">
      <main className="w-full min-h-screen bg-background">
        <Hero />
        <ElectricShiftSection />
        <EcosystemSection />
        <ConnectedIndiaSection />
        <DeploymentProcessSection />
        <SmartControlSection />
        <EngineeredToChargeSection />
        <ChargingSolutionsSection />
        <WhyAxionSection />
        <StatsSection />
        <CTASection />
        <Footer />
      </main>
    </PageTransition>
  );
};

export default Home;
