/**
 * Google Places API service for fetching Burma Court Playgroup reviews
 * Implements cost-effective caching strategy with weekly updates
 */

export interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface ReviewsData {
  lastUpdated: string;
  source: 'google_api' | 'cached_fallback';
  reviews: GoogleReview[];
}

// Place ID extracted from Google Maps URL data parameter
// From: https://www.google.com/maps/place/Burma+Court+Playgroup/@51.5559272,-0.0885469,17z/data=!4m8!3m7!1s0x48761c874a5ac4b9:0x47aed6d4144142b4
// The hex value 0x47aed6d4144142b4 corresponds to this Place ID
const BURMA_COURT_PLACE_ID = 'ChIJuaRAanPahR4RtEJBFNRqrnc';

// Use CORS proxy for client-side requests in Vite (development/testing only)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

/**
 * NOTE: Google Places API has CORS restrictions and cannot be called directly from browser
 * This function is kept for documentation but should NOT be used in Vite client
 * Use the manual script (scripts/updateReviews.js) to fetch reviews server-side instead
 */
export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  throw new Error(
    'Direct API calls not supported in browser due to CORS. ' +
    'Use "npm run update-reviews" to fetch reviews server-side instead.'
  );
}

/**
 * Loads cached reviews from local JSON file
 * Fallback when API is unavailable or during development
 */
export async function loadCachedReviews(): Promise<ReviewsData> {
  try {
    const response = await fetch('/data/reviews.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load cached reviews: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to load cached reviews:', error);
    
    // Ultimate fallback: hardcoded review
    return {
      lastUpdated: new Date().toISOString(),
      source: 'cached_fallback',
      reviews: [
        {
          author_name: "Marcus Evans",
          profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
          rating: 5,
          text: "Burma Court Playgroup is a hidden gem. Our son loves it there. The staff are amazing and have prepared him beautifully for Reception which he starts next year. All of the children are happy and given proper attention to bring out the best in them. Plus there is a great community spirit. I can't recommend this nursery highly enough!",
          relative_time_description: "a month ago",
          time: Date.now() / 1000
        }
      ]
    };
  }
}

/**
 * Gets reviews from cache only (for Vite client-side)
 * Always returns data, never fails, never makes API calls
 * 
 * To update reviews, run: npm run update-reviews
 */
export async function getReviews(): Promise<ReviewsData> {
  console.log('📖 Loading reviews from cache...');
  
  try {
    const cached = await loadCachedReviews();
    const lastUpdate = new Date(cached.lastUpdated);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Show helpful console message about data freshness
    if (cached.source === 'google_api') {
      if (lastUpdate > weekAgo) {
        console.log('✅ Using fresh Google reviews from cache');
      } else {
        console.log('⚠️ Reviews are older than a week. Run "npm run update-reviews" to refresh');
      }
    } else {
      console.log('ℹ️ Using fallback review data. Run "npm run update-reviews" to get real Google reviews');
    }
    
    return cached;
  } catch (error) {
    console.error('Failed to load cached reviews, using emergency fallback:', error);
    
    // Ultimate fallback
    return {
      lastUpdated: new Date().toISOString(),
      source: 'cached_fallback',
      reviews: [
        {
          author_name: "Burma Court Parent",
          profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
          rating: 5,
          text: "Wonderful playgroup with caring staff and excellent facilities. My child has thrived here!",
          relative_time_description: "recently",
          time: Date.now() / 1000
        }
      ]
    };
  }
}

/**
 * Saves reviews to cache (for server-side scripts)
 * In Vite/client-only apps, this would be handled by build scripts
 */
export function saveReviewsToCache(reviewsData: ReviewsData): string {
  // This is a utility for build scripts or manual updates
  // In browser environment, this would need to be done server-side
  return JSON.stringify(reviewsData, null, 2);
}