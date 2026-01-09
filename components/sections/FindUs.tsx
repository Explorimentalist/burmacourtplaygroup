
import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import Grid from '../atoms/Grid';

const FindUs: React.FC = () => {
  const images = [
    {
      src: "/images/find us/mosaic.png",
      alt: "Community Mosaic Art"
    },
    {
      src: "/images/find us/track.png", 
      alt: "Outdoor Play Track"
    },
    {
      src: "/images/find us/building.png",
      alt: "Playgroup Building"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slidePosition, setSlidePosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // Create doubled images array for seamless infinite loop
  const doubledImages = [...images, ...images];

  useEffect(() => {
    const slideToNext = () => {
      if (isAnimatingRef.current) return;
      
      isAnimatingRef.current = true;
      
      // Move to next slide position
      const nextPosition = slidePosition + 1;
      const nextImageIndex = (currentImageIndex + 1) % images.length;
      
      setSlidePosition(nextPosition);
      setCurrentImageIndex(nextImageIndex);
      
      // After transition completes
      setTimeout(() => {
        // If we've reached the end of our doubled array, reset without animation
        if (nextPosition >= images.length) {
          // Remove transition temporarily for instant reset
          if (containerRef.current) {
            containerRef.current.style.transition = 'none';
          }
          
          // Reset to position 0 (showing the same image as position 3, but at the beginning)
          setSlidePosition(0);
          
          // Re-enable transition after a frame
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.style.transition = 'transform 1000ms ease-in-out';
            }
          });
        }
        
        isAnimatingRef.current = false;
      }, 1000); // Match transition duration
    };

    const interval = setInterval(slideToNext, 4000);
    return () => clearInterval(interval);
  }, [slidePosition, currentImageIndex, images.length]);

  const googleMapsUrl = "https://www.google.com/maps/place/Burma+Court+Playgroup/@51.5559268,-0.0889307,11z/data=!4m15!1m8!3m7!1s0x48761c874a5ac4b9:0x47aed6d4144142b4!2sBurma+Court+Playgroup!8m2!3d51.5559272!4d-0.0885469!10e5!16s%2Fg%2F11g_cg4bv!3m5!1s0x48761c874a5ac4b9:0x47aed6d4144142b4!8m2!3d51.5559272!4d-0.0885469!16s%2Fg%2F11g_cg4bv!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className="bg-accent-500 w-full min-h-[776px] py-16 md:py-20">
      <Grid>
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-12 lg:mb-16">
          <h2 className="font-display text-48 text-neutral-800 ml-0 lg:ml-2">
            Find us
          </h2>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <div className="w-full h-[300px] md:h-[544px] overflow-hidden relative">
            <div 
              ref={containerRef}
              className="flex h-full transition-transform duration-1000 ease-in-out"
              style={{ 
                width: `${doubledImages.length * 100}%`,
                transform: `translateX(${-(slidePosition * (100 / doubledImages.length))}%)`
              }}
            >
              {doubledImages.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="flex-shrink-0 w-full h-full"
                  style={{ width: `${100 / doubledImages.length}%` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimatingRef.current) {
                      setCurrentImageIndex(index);
                      setSlidePosition(index);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 md:col-span-4 lg:col-start-10 lg:col-span-3 flex flex-col items-center lg:items-start mt-12 lg:mt-0 lg:self-end">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full aspect-square bg-neutral-200 overflow-hidden mb-8 relative hover:opacity-90 transition-opacity duration-200 cursor-pointer"
            aria-label="View Burma Court Playgroup on Google Maps"
          >
             <img 
               src="/images/find us/location_map.png" 
               alt="Burma Rd Map Location" 
               className="w-full h-full object-cover"
             />
             {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="bg-white/80 px-3 py-1 rounded text-sm font-medium text-neutral-800">
                 Click to view on Maps
               </div>
             </div> */}
          </a>

          <div className="flex flex-col gap-3 text-left lg:text-left w-full lg:pl-1">
            <h3 className="font-display text-30 text-neutral-800">
              Burma Court Playgroup
            </h3>
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-left lg:justify-start gap-2 text-neutral-800 hover:text-primary-500 active:text-primary-700 transition-colors duration-200"
              aria-label="View address on Google Maps"
            >
              {/* <MapPin size={20} className="text-neutral-800 flex-shrink-0" /> */}
              <img src="/icons/custom/pin.svg" alt="Map Pin" className="text-neutral-800 flex-shrink-0" />
              <address className="not-italic font-sans text-16 font-regular text-neutral-800">
                Burma Rd, London N16 9BG
              </address>
            </a>
          </div>
        </div>
      </Grid>
    </section>
  );
};

export default FindUs;
