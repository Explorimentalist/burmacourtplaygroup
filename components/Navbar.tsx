
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out bg-white ${isScrolled ? 'shadow-md' : ''}`}
        aria-label="Main Navigation"
      >
        <div className="max-w-[1440px] mx-auto h-[56px] md:h-[96px] flex items-center relative px-6 md:px-[80px]">
          
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

          {/* Desktop Layout: key info left, logo center, about + CTA right */}
          <div className="hidden md:flex w-full items-center justify-between">
            
            {/* Left Item: Key info */}
            <div className="w-1/3 flex justify-start items-center">
              <Link
                to="/#key-info"
                className="font-sans text-[16px] leading-[21px] text-neutral-800 hover:text-primary-500 active:text-primary-700 transition-colors duration-200"
              >
                Key info
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

            {/* Right Items: About + CTA */}
            <div className="w-1/3 flex justify-end items-center gap-8">
              <Link 
                to="/about" 
                className="font-sans text-[16px] leading-[21px] text-neutral-800 hover:text-primary-500 active:text-primary-700 transition-colors duration-200"
              >
                About
              </Link>
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

        {/* Mobile Full Screen Menu Content */}
        <div
          className={cn(
            "fixed inset-0 w-screen max-w-[100vw] h-[100svh] max-h-[100svh] bg-neutral-200 z-[100] transition-transform duration-300 ease-in-out md:hidden overflow-x-hidden overflow-y-auto",
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col h-full px-6 pb-8 pt-6">
            {/* Close button - top right */}
            <div className="flex justify-end">
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-neutral-800 hover:text-primary-500 transition-colors"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Centered vertical mobile navigation */}
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="flex flex-col gap-6 items-center text-center">
                <Link
                  to="/#key-info"
                  onClick={toggleMobileMenu}
                  className="font-body text-24 font-regular text-neutral-800 hover:text-primary-500 active:text-primary-700 transition-colors duration-200"
                >
                  Key info
                </Link>
                <Link
                  to="/about"
                  className="font-body text-24 font-regular text-neutral-800 hover:text-primary-500 active:text-primary-700 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
              </div>
            </div>

            <div className="w-full mt-auto">
              <Link
                to="/contact"
                className="font-body bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-neutral-50 py-3 px-5 rounded-sm text-16 font-medium shadow-sm active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-primary-200 w-full max-w-full"
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
