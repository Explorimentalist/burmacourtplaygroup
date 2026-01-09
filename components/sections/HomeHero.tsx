'use client';
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { ZoomParallax } from "../ui/zoom-parallax";
import AnimatedLogo from "../AnimatedLogo";

const HomeHero: React.FC = () => {

  const images = [
    {
      src: "images/hero/IMG_3063.jpg",
      alt: "Kids in garden", 
      gridArea: "1 / 1 / 7 / 4", // Baseline at bottom of row 6 (end at row 7), 3 columns wide
      size: "xl" as const,
    },
    {
      src: "images/hero/IMG_2455.jpg",
      alt: "Activity at table",
      gridArea: "1 / 4 / 7 / 8", // Bottom aligned to row 6: row 1 to row 7 (bottom of row 6), 4 columns wide
      size: "xl" as const,
    },
    {
      src: "images/hero/IMG_3608.jpg",
      alt: "Upside down play",
      gridArea: "1 / 8 / 6 / 13", // Bottom aligned to row 5: spans to row 6 (bottom of row 5), Column 8, 5 columns wide
      size: "xl" as const,
    },
    {
      src: "images/hero/IMG_3228.jpg",
      alt: "Kid doing puzzle",
      gridArea: "7 / 3 / 10 / 8", // Row 7, Column 3, 5 columns wide
      size: "lg" as const,
    },
    {
      src: "images/hero/IMG_2964.jpg", 
      alt: "Kid with paint",
      gridArea: "6 / 8 / 9 / 11", // Row 6, Column 8, 3 columns wide
      size: "md" as const,
    }
  ];

  return (
    <main className="min-h-screen w-full">
      {/* Header Section with Logo and Tagline */}
      <div className="relative flex h-[50vh] items-center justify-center bg-neutral-200 lg:mt-[120px] md:mt-20 mb-20 lg:mb-16 md:mb-16">
        {/* Radial spotlight */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
            'blur-[30px]',
          )}
        />
        
        <div className="flex flex-col items-center text-neutral-800 z-10">
          <div className="w-[300px] md:w-[455px] h-auto mb-[40px]">
            <AnimatedLogo className="w-full h-full" />
          </div>
          <p className="font-body font-light text-24 text-neutral-600 mb-0" style={{ fontFamily: 'Geist, sans-serif !important' }}>
            Learning through play.
          </p>
        </div>
      </div>
      
      {/* Zoom Parallax Section */}
      <ZoomParallax images={images} />
      
      {/* Bottom Section with Intro Text */}
      <div className="relative w-full bg-neutral-200 py-20 md:py-32">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[80px] flex flex-col items-center">
          <div className="max-w-[856px] text-center">
            <p className="font-body font-light text-36 text-neutral-600 mb-12 px-4" style={{ fontFamily: 'Geist, sans-serif !important' }}>
              We provide care and education for children from the age of two to five years old between. We emulate the experience of going to a friend's home for a play date in an intimate building off Green Lanes.
            </p>
            
            <Link 
              to="/contact"
              className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-neutral-50 px-6 py-4 md:px-[24px] md:py-[20px] rounded-[4px] inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-200 shadow-sm"
            >
              <span className="text-[18px] md:text-[20px] leading-tight font-medium">Get in touch</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeHero;