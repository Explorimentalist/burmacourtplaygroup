
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Grid from '../atoms/Grid';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const mobileLogoRef = useRef<HTMLImageElement>(null);
  const desktopLogoRef = useRef<HTMLImageElement>(null);
  const mobileFooterRef = useRef<HTMLDivElement>(null);
  const desktopFooterRef = useRef<HTMLDivElement>(null);
  const returnTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const draggableInstancesRef = useRef<any[]>([]);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(Draggable, InertiaPlugin);

    const calculateFooterBounds = (footerElement: HTMLDivElement | null, logoElement: HTMLImageElement | null) => {
      if (!footerElement || !logoElement) return null;
      
      const footerRect = footerElement.getBoundingClientRect();
      const logoRect = logoElement.getBoundingClientRect();
      
      return {
        minX: -(logoRect.width / 4), // Allow some overhang
        maxX: footerRect.width - (logoRect.width * 0.75),
        minY: -(logoRect.height / 4),
        maxY: footerRect.height - (logoRect.height * 0.75)
      };
    };

    const setupDraggableLogo = (logoElement: HTMLImageElement | null, footerElement: HTMLDivElement | null) => {
      if (!logoElement || !footerElement) return;

      // Prevent default click behavior
      logoElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      // Store original transform values
      const originalTransform = gsap.getProperty(logoElement, 'transform');
      const originalX = gsap.getProperty(logoElement, 'x') as number || 0;
      const originalY = gsap.getProperty(logoElement, 'y') as number || 0;
      
      // Calculate bounds
      const bounds = calculateFooterBounds(footerElement, logoElement);
      if (!bounds) return;
      
      // Make the logo draggable with footer-confined bounds
      const draggableInstance = Draggable.create(logoElement, {
        type: 'x,y',
        inertia: true,
        bounds: bounds,
        edgeResistance: 0.65,
        onClick: false, // Disable click events
        dragClickables: false, // Prevent dragging from triggering clicks
        minimumMovement: 8, // Minimum pixels to move before drag starts
        onDrag: () => {
          // Clear any existing timeout when dragging
          if (returnTimeoutRef.current) {
            clearTimeout(returnTimeoutRef.current);
            returnTimeoutRef.current = null;
          }
        },
        onDragEnd: () => {
          // Set timeout to return to original position after 0.5 seconds using InertiaPlugin
          returnTimeoutRef.current = setTimeout(() => {
            // Get current velocity from the draggable instance
            const currentX = gsap.getProperty(logoElement, 'x') as number;
            const currentY = gsap.getProperty(logoElement, 'y') as number;
            
            // Calculate velocity toward original position for natural movement
            const velocityX = (originalX - currentX) * 2;
            const velocityY = (originalY - currentY) * 2;
            
            gsap.to(logoElement, {
              inertia: {
                x: {
                  velocity: velocityX,
                  end: originalX,
                  resistance: 0.3
                },
                y: {
                  velocity: velocityY, 
                  end: originalY,
                  resistance: 0.3
                }
              },
              onComplete: () => {
                returnTimeoutRef.current = null;
              }
            });
          }, 500);
        }
      })[0];

      // Store instance for cleanup
      if (draggableInstance) {
        draggableInstancesRef.current.push(draggableInstance);
      }

      // Add playful hover effect for nursery feel
      const handleMouseEnter = () => {
        if (!draggableInstance.isDragging) {
          gsap.to(logoElement, {
            scale: 1.05,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        }
      };

      const handleMouseLeave = () => {
        if (!draggableInstance.isDragging) {
          gsap.to(logoElement, {
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        }
      };

      logoElement.addEventListener('mouseenter', handleMouseEnter);
      logoElement.addEventListener('mouseleave', handleMouseLeave);
    };

    const updateBounds = () => {
      // Update bounds for both logos when window resizes
      draggableInstancesRef.current.forEach((instance, index) => {
        const logoElement = index === 0 ? mobileLogoRef.current : desktopLogoRef.current;
        const footerElement = index === 0 ? mobileFooterRef.current : desktopFooterRef.current;
        
        if (logoElement && footerElement) {
          const newBounds = calculateFooterBounds(footerElement, logoElement);
          if (newBounds) {
            instance.applyBounds(newBounds);
          }
        }
      });
    };

    // Setup for both mobile and desktop logos
    setupDraggableLogo(mobileLogoRef.current, mobileFooterRef.current);
    setupDraggableLogo(desktopLogoRef.current, desktopFooterRef.current);

    // Add resize listener
    window.addEventListener('resize', updateBounds);

    // Cleanup function
    return () => {
      if (returnTimeoutRef.current) {
        clearTimeout(returnTimeoutRef.current);
      }
      
      // Clean up draggable instances
      draggableInstancesRef.current.forEach(instance => {
        if (instance && instance.kill) {
          instance.kill();
        }
      });
      draggableInstancesRef.current = [];
      
      // Remove resize listener
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  return (
    <footer className="bg-neutral-50 pt-20 pb-12 border-t border-neutral-200">
      {/* Mobile Layout */}
      <div ref={mobileFooterRef} className="block md:hidden">
        <Grid>
          {/* Navigation Links - Top (Split into 2 columns) */}
          <div className="col-span-2 flex flex-col gap-3 mb-12">
            <Link to="/" className="font-sans text-16 font-regular text-neutral-600 hover:text-primary-500 transition-colors">Home</Link>
            <Link to="/about" className="font-sans text-16 font-regular text-neutral-600 hover:text-primary-500 transition-colors">About</Link>
          </div>
          
          <div className="col-span-2 flex flex-col gap-3 mb-12">
            <Link to="/contact" className="font-sans text-16 font-regular text-neutral-600 hover:text-primary-500 transition-colors">Contact us</Link>
            <a href="/terms" className="font-sans text-16 font-regular text-neutral-600 hover:text-primary-500 transition-colors">Terms & Conditions</a>
          </div>

          {/* Logo - Middle (Full width centered) */}
          <div className="col-span-4 flex justify-center mb-12">
            <img 
              ref={mobileLogoRef}
              src="/Logo/full-logo.svg" 
              alt="Burma Court Playgroup" 
              className="w-[280px] h-auto cursor-grab active:cursor-grabbing"
              width="406"
              height="299"
            />
          </div>

          {/* Copyright - Bottom (Full width centered) */}
          <div className="col-span-4 text-center">
            <p className="font-sans text-12 text-neutral-400">
              ©Burma Court Playgroup {currentYear}. Designed by the Explorimentalist - <a href="https://www.hey-oko.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 underline underline-offset-4 decoration-neutral-200 hover:decoration-primary-300 transition-all">Hey-oko.com</a>
            </p>
          </div>
        </Grid>
      </div>

      {/* Tablet & Desktop Layout */}
      <div ref={desktopFooterRef} className="hidden md:block">
        <Grid className="items-start">
          <div className="col-span-4 md:col-span-4 lg:col-span-6 mb-12 lg:mb-0">
            <div className="flex flex-col items-start">
              <img 
                ref={desktopLogoRef}
                src="/Logo/full-logo.svg" 
                alt="Burma Court Playgroup" 
                className="w-[280px] h-auto cursor-grab active:cursor-grabbing"
                width="406"
                height="299"
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-2 lg:col-start-8 lg:col-span-2 flex flex-col gap-3">
            <nav className="flex flex-col gap-3">
              <Link to="/" className="font-sans text-16 font-regular text-neutral-600 hover:text-primary-500 transition-colors">Home</Link>
              <Link to="/about" className="font-sans text-16 font-regular text-neutral-600 hover:text-primary-500 transition-colors">About</Link>
            </nav>
          </div>

          <div className="col-span-2 md:col-span-2 lg:col-start-10 lg:col-span-3 flex flex-col gap-3">
            <nav className="flex flex-col gap-3">
              <Link to="/contact" className="font-sans text-16 font-regular text-neutral-600 hover:text-primary-500 transition-colors">Contact us</Link>
              <a href="/terms" className="font-sans text-16 font-regular text-neutral-600 hover:text-primary-500 transition-colors">Terms & Conditions</a>
            </nav>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-start-7 lg:col-span-6 mt-8">
            <p className="font-sans text-12 text-neutral-400 text-center md:text-right">
              ©Burma Court Playgroup {currentYear}. Design by Explorimentalist - <a href="https://www.hey-oko.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 underline underline-offset-4 decoration-neutral-200 hover:decoration-primary-300 transition-all">Hey-oko.com</a>
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
