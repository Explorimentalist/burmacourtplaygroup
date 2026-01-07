import React from 'react';
import Navbar from '../components/Navbar';
import HomeHero from '../components/sections/HomeHero';
import KeyInfo from '../components/sections/KeyInfo';
import Testimonials from '../components/sections/Testimonials';
import FindUs from '../components/sections/FindUs';
import Footer from '../components/organisms/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-neutral-200">
      <Navbar />
      <main>
        <HomeHero />
        <KeyInfo />
        <Testimonials />
        <FindUs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;