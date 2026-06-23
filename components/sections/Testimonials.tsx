'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getReviews, type GoogleReview, type ReviewsData } from '../../lib/googlePlaces';
import Grid from '../atoms/Grid';

interface TestimonialColumnProps {
  testimonials: GoogleReview[];
  duration: number;
  className?: string;
}

/**
 * A single vertical column of testimonial cards that auto-scrolls infinitely.
 * Cards are duplicated so the translateY(-50%) loop is seamless.
 * Adapted from 21st.dev avanishverma4/testimonial-v2 animation pattern.
 */
const TestimonialColumn: React.FC<TestimonialColumnProps> = ({ testimonials, duration, className = '' }) => {
  return (
    <div className={className}>
      <motion.ul
        animate={{ y: ['0%', '-50%'] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-4 list-none m-0 p-0"
      >
        {/* Render testimonials twice for seamless infinite scroll */}
        {[0, 1].map((dup) =>
          testimonials.map((review, index) => (
            <motion.li
              key={`${dup}-${index}`}
              aria-hidden={dup === 1 ? 'true' : 'false'}
              tabIndex={dup === 1 ? -1 : 0}
              className="flex-shrink-0 bg-white p-6 flex flex-col gap-6 shadow-sm rounded-md border border-neutral-100 w-full max-w-sm cursor-default select-none"
              style={{
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa',
              }}
            >
              <div className="flex gap-2 items-center flex-shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    fill={i < review.rating ? '#F6BE28' : 'transparent'}
                    stroke="#45403B"
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              <p className="font-sans text-12 md:text-16 font-regular text-neutral-600 flex-grow leading-relaxed min-h-0">
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
            </motion.li>
          ))
        )}
      </motion.ul>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [dataSource, setDataSource] = useState<string>('loading');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData: ReviewsData = await getReviews();
        setReviews(reviewsData.reviews);
        setDataSource(reviewsData.source);
      } catch (error) {
        console.error('Error loading reviews:', error);
        setReviews([
          {
            author_name: 'Burma Court Parent',
            profile_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
            rating: 5,
            text: 'Wonderful playgroup with caring staff and excellent facilities. My child has thrived here!',
            relative_time_description: 'recently',
            time: Date.now() / 1000,
          },
        ]);
        setDataSource('emergency_fallback');
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Split reviews into columns for the multi-column layout
  const getColumnData = (): GoogleReview[][] => {
    if (reviews.length === 0) return [[], [], []];

    // If we have enough reviews, split into 3 groups for 3 columns
    // Each column needs at least 2 reviews to create a meaningful scroll
    const minPerColumn = 2;

    if (reviews.length >= minPerColumn * 3) {
      // Distribute reviews across 3 columns
      const col1: GoogleReview[] = [];
      const col2: GoogleReview[] = [];
      const col3: GoogleReview[] = [];
      reviews.forEach((review, i) => {
        if (i % 3 === 0) col1.push(review);
        else if (i % 3 === 1) col2.push(review);
        else col3.push(review);
      });
      return [col1, col2, col3];
    }

    // Not enough reviews for 3 columns - duplicate to fill
    const filled = [...reviews];
    while (filled.length < minPerColumn * 3) {
      filled.push(...reviews);
    }
    const col1: GoogleReview[] = [];
    const col2: GoogleReview[] = [];
    const col3: GoogleReview[] = [];
    filled.forEach((review, i) => {
      if (i % 3 === 0) col1.push(review);
      else if (i % 3 === 1) col2.push(review);
      else col3.push(review);
    });
    return [col1, col2, col3];
  };

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

  const [col1, col2, col3] = getColumnData();

  return (
    <section className="bg-neutral-200 pt-16 pb-16">
      <Grid>
        {/* Header */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-12">
          <h2 className="font-display text-48 text-neutral-800">
            What parents say
            <span className="text-12 text-neutral-500 ml-2 font-sans">{reviews.length} reviews loaded</span>
          </h2>
        </div>

        {/* Testimonials Scrolling Columns */}
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

          {/* Scrolling testimonials container with fade mask */}
          <div
            className="flex justify-center gap-4 py-5 max-h-[740px] overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            }}
            role="region"
            aria-label="Scrolling Testimonials"
          >
            <TestimonialColumn testimonials={col1} duration={30} />
            <TestimonialColumn testimonials={col2} duration={38} className="hidden md:flex" />
            <TestimonialColumn testimonials={col3} duration={34} className="hidden lg:flex" />
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
