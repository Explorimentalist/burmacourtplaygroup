import React from 'react';
import TermsItem from '../molecules/TermsItem';

interface TermsData {
  heading: string;
  content: string;
}

interface TermsSectionProps {
  /** Optional custom CSS classes */
  className?: string;
  /** Terms content data - defaults to placeholder content if not provided */
  termsData?: TermsData[];
}

/**
 * TermsSection - Organism component for Terms & Conditions page
 * 
 * Layout Implementation:
 * - 12-column CSS grid system
 * - Main heading + intro: columns 1-6 (left side)
 * - Terms content: columns 5-10 (overlapping for visual flow)
 * - Background: neutral-200 (#EDEBE8)
 * - Responsive: stacks vertically on mobile/tablet
 * 
 * Grid positioning matches design specifications:
 * - Desktop: heading left (cols 1-6), content right (cols 5-10)
 * - Mobile: full-width stacked layout
 */
export const TermsSection: React.FC<TermsSectionProps> = ({
  className = '',
  termsData,
}) => {
  // Default terms content based on the design specification
  const defaultTermsData: TermsData[] = [
    {
      heading: "Content of this Website",
      content: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!"
    },
    {
      heading: "Rights regarding content on this Website",
      content: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!"
    },
    {
      heading: "Content of this Website",
      content: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!"
    },
    {
      heading: "Rights regarding content on this Website",
      content: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!"
    },
    {
      heading: "Rights regarding content on this Website",
      content: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!"
    }
  ];

  const terms = termsData || defaultTermsData;

  return (
    <section className={`bg-neutral-200 min-h-screen ${className}`}>
      {/* Container with proper design system margins */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Responsive Grid Container following design system specs */}
        {/* Mobile: 4-column, Tablet: 8-column, Desktop: 12-column */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 min-h-screen">
          
          {/* Left Section: Main Heading + Introduction */}
          {/* Mobile: 4 cols (full width), Tablet: 6 cols, Desktop: 6 cols (1-6) */}
          <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-1 pt-20 pb-8 lg:pb-0">
            {/* Main Page Heading - Matching Contact.tsx heading size */}
            <h1 className="font-display text-[64px] leading-[38px] text-neutral-800 text-left lg:text-left mb-16">
              Terms and conditions
            </h1>
            
            {/* Introduction Text */}
            <p className="font-body text-20 text-neutral-600 leading-31 font-light max-w-[632px]">
              We provide care and education for children from the age of two to five years old between. We emulate the experience of going to a friend's home for a play date in an intimate building off Green Lanes.
            </p>
          </div>

          {/* Right Section: Terms Content */}
          {/* Mobile: 4 cols (full width), Tablet: 6 cols starting at col 3, Desktop: 6 cols starting at col 5 (5-10) */}
          <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-6 lg:col-start-5 pt-8 lg:pt-20 pb-20">
            {/* Terms Content Container */}
            <div className="flex flex-col gap-8 max-w-[632px] lg:ml-auto">
              {terms.map((term: TermsData, index: number) => (
                <TermsItem
                  key={index}
                  heading={term.heading}
                  content={term.content}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TermsSection;