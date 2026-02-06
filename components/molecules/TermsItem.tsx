import React from 'react';

interface TermsItemProps {
  /** Section heading text */
  heading: string;
  /** Section content text - supports HTML for formatting */
  content: string;
  /** Optional custom CSS classes */
  className?: string;
}

/**
 * TermsItem - Molecule component for individual terms sections
 * 
 * Combines heading and content in a vertical flexbox layout
 * Following design system specifications:
 * - Display font for headings (32px)
 * - Body font for content (16px)
 * - Content supports HTML formatting (bold, line breaks, lists)
 */
export const TermsItem: React.FC<TermsItemProps> = ({
  heading,
  content,
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Section Heading */}
      <h3 className="font-display text-32 text-neutral-800 leading-38">
        {heading}
      </h3>
      
      {/* Section Content - Renders HTML for formatting support */}
      <div 
        className="font-body text-16 text-neutral-600 leading-21 prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TermsItem;