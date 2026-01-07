import React from 'react';
import Navbar from '../components/Navbar';
import TermsSection from '../components/sections/TermsSection';
import Footer from '../components/organisms/Footer';

/**
 * Terms & Conditions Page
 * 
 * Implementation of the Terms & Conditions design specification
 * using our atomic design system components for Vite + React Router.
 */
const Terms: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <TermsSection />
      </main>
      <Footer />
    </>
  );
};

export default Terms;