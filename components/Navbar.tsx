
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out bg-white ${isScrolled ? 'shadow-md' : ''}`}
        aria-label="Main Navigation"
      >
        <div className="max-w-[1440px] mx-auto h-[64px] md:h-[96px] flex items-center relative px-6 md:px-[80px]">
          
          {/* Mobile Layout: Logo Left, Hamburger Right */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Link to="/" aria-label="Go to Homepage" className="flex items-center group relative">
              <img 
                src="/Logo/logo.svg" 
                alt="Burma Court Playgroup Logo" 
                className="h-8 w-auto transition-opacity duration-200 group-hover:opacity-0"
              />
              <img 
                src="/icons/custom/home.svg" 
                alt="Home" 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(1176%) hue-rotate(350deg) brightness(100%) contrast(87%)' }}
              />
            </Link>
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Layout: About Left, Logo Center, CTA Right */}
          <div className="hidden md:flex w-full items-center justify-between">
            
            {/* Left Item: About */}
            <div className="w-1/3 flex justify-start">
              <Link 
                to="/about" 
                className="font-sans text-[16px] leading-[21px] text-neutral-800 hover:text-primary-500 active:text-primary-700 transition-colors duration-200"
              >
                About
              </Link>
            </div>

            {/* Middle Item: Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link to="/" aria-label="Go to Homepage" className="block group relative">
                <img 
                  src="/Logo/logo.svg" 
                  alt="Burma Court Playgroup Logo" 
                  className="h-12 w-auto transition-opacity duration-200 group-hover:opacity-0"
                />
                <img 
                  src="/icons/custom/home.svg" 
                  alt="Home" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(1176%) hue-rotate(350deg) brightness(100%) contrast(87%)' }}
                />
              </Link>
            </div>

            {/* Right Item: Small CTA Button */}
            <div className="w-1/3 flex justify-end">
              <Link 
                to="/contact"
                className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-neutral-50 px-3 py-2 rounded-[4px] flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-200 shadow-sm"
              >
                <span className="text-[16px] leading-tight font-normal">Get in touch</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Slide-in Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-neutral-900/40 z-[90] transition-opacity duration-300 md:hidden
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={toggleMobileMenu}
        />

        {/* Mobile Slide-in Menu Content */}
        <div 
          className={`fixed top-0 right-0 h-full w-[280px] bg-neutral-200 z-[100] transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex flex-col h-full">
            <div className="p-6 flex justify-end">
              <button onClick={toggleMobileMenu} className="p-2 text-neutral-800 hover:text-primary-500 transition-colors">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-8 px-8 mt-4">
              <Link 
                to="/about" 
                onClick={toggleMobileMenu}
                className="text-[20px] font-medium text-neutral-800 hover:text-primary-500 transition-colors border-b border-neutral-300 pb-2"
              >
                About
              </Link>
              <Link 
                to="/contact"
                className="bg-primary-500 hover:bg-primary-600 text-neutral-50 px-6 py-4 rounded-md text-[18px] font-medium shadow-md active:scale-95 transition-all"
                onClick={toggleMobileMenu}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer to push content below sticky nav */}
      <div className="h-[64px] md:h-[96px]" />
    </>
  );
};

export default Navbar;
