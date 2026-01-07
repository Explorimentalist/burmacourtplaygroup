
import React from 'react';

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Grid Atom: Implements the layout system defined in the design tokens:
 * - Mobile (<768px): 4 columns, 16px gutter, 24px margins (px-6)
 * - Tablet (768px+): 8 columns, 16px gutter, 48px margins (px-12)
 * - Desktop (1440px): 12 columns, 16px gutter, 80px margins (px-20)
 */
const Grid: React.FC<GridProps> = ({ children, className = "" }) => {
  return (
    <div 
      className={`
        grid 
        grid-cols-4 md:grid-cols-8 lg:grid-cols-12 
        gap-x-4 
        mx-auto 
        max-w-[1440px] 
        px-6 md:px-12 lg:px-20 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Grid;
