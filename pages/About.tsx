import React from 'react';
import Navbar from '../components/Navbar';
import History from '../components/sections/History';
import Team from '../components/sections/Team';
import Footer from '../components/organisms/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen font-sans bg-neutral-200">
      <Navbar />
      <main>
        <History />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default About;