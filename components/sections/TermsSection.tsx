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
      heading: "1. Mandatory Parental Governance",
      content: `<p class="mb-3">BCP is a community-run organization, meaning parents <strong>are</strong> the management. By joining, you automatically become a member of the <strong>Managing Committee</strong>. Your legal and operational obligations include:</p>
<ul class="list-disc pl-5 space-y-2">
<li><strong>Active Involvement:</strong> You must attend the yearly <strong>Annual General Meeting (AGM)</strong> every Autumn.</li>
<li><strong>Operational Support:</strong> You are required to help with <strong>fundraising</strong> and volunteer time to support the group's success.</li>
<li><strong>Management Duties:</strong> The committee is responsible for staffing, employment contracts, financial management, and implementing Ofsted recommendations.</li>
</ul>`
    },
    {
      heading: "2. Financial Obligations & Contributions",
      content: `<p class="mb-3">While the playgroup receives Nursery Education Grants, the financial stability of the group relies on specific parent-led payments:</p>
<ul class="list-disc pl-5 space-y-2">
<li><strong>Hourly Fees:</strong> Costs are <strong>£8.75 per hour</strong> for two-year-olds and <strong>£6.75 per hour</strong> for children aged three and four.</li>
<li><strong>Voluntary Contributions:</strong> To survive, the group requests <strong>£10 per week</strong> from working parents and <strong>£2.50</strong> from those on benefits. These are <strong>payable even during absences</strong> for sickness or holidays taken during term time.</li>
<li><strong>Lunch Club:</strong> A daily fee of <strong>£6.75</strong> applies for children staying for the lunch session.</li>
</ul>`
    },
    {
      heading: "3. Punctuality and Exclusion Policies",
      content: `<p class="mb-3">The playgroup maintains strict rules regarding time to ensure the safety and smooth running of the site:</p>
<ul class="list-disc pl-5 space-y-2">
<li><strong>Hours:</strong> Sessions run from <strong>9am to 4pm</strong>. Children must be collected promptly at <strong>12pm or 4pm</strong>.</li>
<li><strong>Lateness Sanctions:</strong> If a parent is late and unreachable, staff are <strong>obliged to contact Social Services</strong>.</li>
<li><strong>Exclusion:</strong> Persistent lateness or failure to communicate lateness is recorded in a "Late Book." The ultimate sanction for these failures is the <strong>exclusion of the child</strong> from the playgroup.</li>
</ul>`
    },
    {
      heading: "4. Health, Safety, and Conduct",
      content: `<ul class="list-disc pl-5 space-y-2">
<li><strong>Illness Protocols:</strong> Children who have vomited or suffered from diarrhea must be kept home for at least <strong>24 hours</strong> after the last episode. If a child is found to have <strong>head lice</strong>, parents must collect them immediately for treatment.</li>
<li><strong>Nutrition:</strong> BCP is a <strong>strict nut-free zone</strong>; parents must not send any nut products (including peanut butter) in packed lunches or snacks.</li>
<li><strong>Settling In:</strong> The decision of when a child can be left without a parent is a <strong>joint decision</strong> between the parent and the key worker; parents are expected to follow the staff's expertise regarding transition speed.</li>
<li><strong>Clothing:</strong> Parents must provide a <strong>labelled bag of spare clothes</strong> (underwear, socks, trousers) and accept that children will engage in messy play.</li>
</ul>`
    },
    {
      heading: "5. Communication and Complaints",
      content: `<ul class="list-disc pl-5 space-y-2">
<li><strong>Primary Contact:</strong> For late drop-offs or pick-ups, parents must use the designated phone lines (<strong>0207 249 6974</strong> or <strong>07736 703 930</strong>) rather than the general WhatsApp community group.</li>
<li><strong>Dispute Resolution:</strong> Complaints must first be directed to the <strong>Chair of the Management Committee</strong>, who will investigate and provide a written report. Ofsted generally requires internal resolution attempts before they will intervene.</li>
</ul>`
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
              By accepting a place at <strong>Burma Court Playgroup (BCP)</strong>, you are entering into a community-led agreement that differs from traditional childcare. The full terms and conditions of enrollment, as detailed in the Welcome Pack, are centered on <strong>active parental management and strict operational standards</strong>.
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