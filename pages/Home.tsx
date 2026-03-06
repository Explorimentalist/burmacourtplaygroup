import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomeHero from '../components/sections/HomeHero';
import KeyInfo from '../components/sections/KeyInfo';
import Testimonials from '../components/sections/Testimonials';
import FindUs from '../components/sections/FindUs';
import Footer from '../components/organisms/Footer';
import { getHomepageExperimentAssignment } from '../lib/abTest';
import { setHomepageExperimentContext, trackHomepageExperimentEvent } from '../lib/analytics';

const Home: React.FC = () => {
  const location = useLocation();
  const assignment = useMemo(
    () => getHomepageExperimentAssignment(location.search),
    [location.search],
  );

  useEffect(() => {
    setHomepageExperimentContext(assignment.variant, assignment.source);
    trackHomepageExperimentEvent('homepage_view', assignment.variant);
  }, [assignment.variant, assignment.source]);

  const handlePrimaryCtaClick = () => {
    trackHomepageExperimentEvent('cta_click', assignment.variant);
  };

  return (
    <div className="min-h-screen font-sans bg-neutral-200">
      <Navbar />
      {assignment.isPreview && (
        <div className="w-full bg-secondary-600 text-white py-2 text-center text-14 tracking-wide">
          Preview Mode: Variant {assignment.variant}
        </div>
      )}
      <main>
        <HomeHero variant={assignment.variant} onPrimaryCtaClick={handlePrimaryCtaClick} />
        <KeyInfo />
        <Testimonials />
        <FindUs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
