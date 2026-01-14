
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getReviews, type GoogleReview, type ReviewsData } from '../../lib/googlePlaces';
import Grid from '../atoms/Grid';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [dataSource, setDataSource] = useState<string>('loading');
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for GSAP animation
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData: ReviewsData = await getReviews();
        console.log('📊 Loaded reviews:', reviewsData.reviews.length, 'reviews');
        console.log('📋 Review names:', reviewsData.reviews.map(r => r.author_name));
        setReviews(reviewsData.reviews);
        setDataSource(reviewsData.source);
      } catch (error) {
        console.error('Error loading reviews:', error);
        // Use hardcoded fallback reviews if everything fails
        setReviews([
          {
            author_name: "Burma Court Parent",
            profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
            rating: 5,
            text: "Wonderful playgroup with caring staff and excellent facilities. My child has thrived here!",
            relative_time_description: "recently",
            time: Date.now() / 1000
          }
        ]);
        setDataSource('emergency_fallback');
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // GSAP ScrollTrigger animation setup
  useEffect(() => {
    // Early returns for SSR safety and missing dependencies
    if (typeof window === 'undefined') return;
    if (isLoading || !reviews.length || !sectionRef.current || !containerRef.current || !scrollContentRef.current) {
      return;
    }

    // Allow DOM to settle before setting up animations
    const timeoutId = setTimeout(() => {
      const section = sectionRef.current;
      const scrollContent = scrollContentRef.current;
      
      if (!section || !scrollContent) return;
    
    // Calculate card width based on new responsive max-width approach
    const getCardWidth = () => {
      const screenWidth = window.innerWidth;
      
      if (screenWidth >= 1024) {
        // Desktop: max-w-lg = 512px
        return 512;
      } else if (screenWidth >= 768) {
        // Tablet: max-w-md = 448px
        return 448;
      } else {
        // Mobile: max-w-sm = 384px
        return 384;
      }
    };
    
    // Calculate Grid component's padding (matches Grid.tsx)
    const getHorizontalPadding = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1024) {
        return 80; // lg:px-20 = 80px each side
      } else if (screenWidth >= 768) {
        return 48; // md:px-12 = 48px each side
      } else {
        return 24; // px-6 = 24px each side
      }
    };
    
    const cardWidth = getCardWidth();
    const gap = 16; // gap-4 in Tailwind
    const horizontalPadding = getHorizontalPadding();
    const totalContentWidth = reviews.length * cardWidth + (reviews.length - 1) * gap + (horizontalPadding * 2);
    const viewportWidth = window.innerWidth;
    
    // Calculate scroll distance
    const scrollDistance = Math.max(0, totalContentWidth - viewportWidth);
    
    // Only create animation if we have enough content to scroll
    if (scrollDistance > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
        }
      });

      tl.to(scrollContent, {
        x: -scrollDistance,
        ease: 'none',
        duration: 1
      });
      
      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.killAll();
      };
    }
    }, 100); // 100ms delay to allow DOM to settle

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.killAll();
    };
  }, [isLoading, reviews.length]);

  // Show loading state briefly
  if (isLoading) {
    return (
      <section className="bg-neutral-200 pt-16 pb-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <h2 className="font-display text-48 text-neutral-800 mb-12 ml-0 md:ml-2">
            What parents say
          </h2>
          <div className="flex justify-center items-center h-[339px]">
            <div className="text-neutral-600">Loading reviews...</div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section ref={sectionRef} className="bg-neutral-200 pt-16 pb-16">
      <Grid>
        {/* Header */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-12">
          <h2 className="font-display text-48 text-neutral-800">
            What parents say
            <span className="text-12 text-neutral-500 ml-2 font-sans">{reviews.length} reviews loaded</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 relative">
          {/* Left decorative line */}
          <div className="absolute left-0 top-0 h-full w-[9px] z-10 pointer-events-none">
            <img 
              src="/illustrations/decorative/line_1.svg" 
              alt="" 
              className="h-full w-full object-cover object-center"
            />
          </div>
          
          {/* Right decorative line */}
          <div className="absolute right-0 top-0 h-full w-[9px] z-10 pointer-events-none">
            <img 
              src="/illustrations/decorative/line_2.svg" 
              alt="" 
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div ref={containerRef} className="overflow-x-hidden w-full py-5">
            <div 
              ref={scrollContentRef}
              className="flex flex-nowrap gap-4"
              style={{ willChange: 'transform' }}
            >
              {reviews.map((review, index) => (
                <div
                  key={`review-${index}`}
                  className="flex-shrink-0 bg-white p-6 flex flex-col gap-6 shadow-sm rounded-md border border-neutral-100 w-full max-w-sm md:max-w-md lg:max-w-lg max-h-[55vh] md:max-h-none"
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa'
                  }}
                >
                  <div className="flex gap-2 items-center flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        fill={i < review.rating ? "#F6BE28" : "transparent"}
                        stroke="#45403B"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>

                  <p className="font-sans text-16 font-regular text-neutral-600 flex-grow leading-relaxed overflow-y-auto min-h-0">
                    {review.text}
                  </p>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div 
                      className="w-[48px] h-[48px] bg-cover bg-center rounded-xs"
                      style={{ backgroundImage: `url(${review.profile_photo_url})` }}
                    />
                    <span className="font-sans text-12 font-medium text-text-neutral-600 text-right w-full tracking-wide">
                      {review.author_name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-16 flex justify-center">
          <Link 
            to="/contact"
            className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-neutral-50 rounded-sm w-[160px] h-[54px] flex items-center justify-center transition-all duration-200 shadow-sm"
          >
            <span className="text-20 font-medium">Get in touch</span>
          </Link>
        </div>
      </Grid>
    </section>
  );
};

export default Testimonials;
