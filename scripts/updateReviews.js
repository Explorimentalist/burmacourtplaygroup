#!/usr/bin/env node

/**
 * Manual Google Reviews Update Script
 * 
 * This script fetches fresh reviews from Google Places API and updates the cached data.
 * Run manually or schedule with cron for weekly updates.
 * 
 * Usage:
 *   node scripts/updateReviews.js
 *   
 * Environment variables required:
 *   GOOGLE_PLACES_API_KEY - Your Google Places API key
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - extracted from Google Maps URL:
// https://www.google.com/maps/place/Burma+Court+Playgroup/@51.5559272,-0.0885469,17z/data=!4m8!3m7!1s0x48761c874a5ac4b9:0x47aed6d4144142b4
// The data parameter contains: 0x48761c874a5ac4b9:0x47aed6d4144142b4
// Converting hex 47aed6d4144142b4 to decimal: 5197395362856862388 (this is the CID)

const BURMA_COURT_CID = '5197395362856862388'; // Decimal conversion of 0x47aed6d4144142b4
const SEARCH_QUERY = 'Burma Court Playgroup London E5 0RJ';

// Possible approaches to find Place ID
const TEST_APPROACHES = [
  'text_search',     // Search by business name and address
  'cid_lookup',      // Try using CID if possible  
  'coordinates'      // Search by coordinates from URL
];
const GOOGLE_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
const REVIEWS_FILE_PATH = path.join(__dirname, '../data/reviews.json');

/**
 * Find the correct Place ID using multiple methods
 */
async function findPlaceId(apiKey) {
  console.log('🎯 Attempting to find Burma Court Playgroup Place ID...');
  
  // Method 1: Text search by name and address
  try {
    console.log(`🔍 Method 1: Text search for "${SEARCH_QUERY}"...`);
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(SEARCH_QUERY)}&key=${apiKey}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      // Look for exact match
      const exactMatch = data.results.find(place => 
        place.name.toLowerCase().includes('burma court') && 
        place.name.toLowerCase().includes('playgroup')
      );
      
      const place = exactMatch || data.results[0];
      console.log(`✅ Found via text search: ${place.name}`);
      console.log(`📍 Address: ${place.formatted_address}`);
      console.log(`🆔 Place ID: ${place.place_id}`);
      console.log(`⭐ Rating: ${place.rating} (${place.user_ratings_total} reviews)`);
      console.log(`💡 CID: ${place.cid || 'Not available'}`);
      
      return place.place_id;
    }
  } catch (error) {
    console.log(`❌ Text search failed: ${error.message}`);
  }
  
  // Method 2: Nearby search using coordinates from Google Maps URL
  try {
    console.log('🔍 Method 2: Searching by coordinates (51.5559272,-0.0885469)...');
    const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=51.5559272,-0.0885469&radius=50&type=school&key=${apiKey}`;
    const response = await fetch(nearbyUrl);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      // Look for Burma Court Playgroup in nearby results
      const playground = data.results.find(place => 
        place.name.toLowerCase().includes('burma') || 
        place.name.toLowerCase().includes('playgroup')
      );
      
      if (playground) {
        console.log(`✅ Found via coordinates: ${playground.name}`);
        console.log(`🆔 Place ID: ${playground.place_id}`);
        return playground.place_id;
      }
    }
  } catch (error) {
    console.log(`❌ Coordinate search failed: ${error.message}`);
  }
  
  console.log('❌ Could not find Burma Court Playgroup using API methods');
  return null;
}

/**
 * Fetches fresh reviews from Google Places API
 */
async function fetchGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_PLACES_API_KEY environment variable not found');
  }

  // Find the correct Place ID
  console.log('🔍 Finding correct Place ID...');
  let placeId = await findPlaceId(apiKey);
  
  // Additional info for debugging
  if (placeId) {
    console.log('');
    console.log('📋 Summary:');
    console.log(`   🆔 Using Place ID: ${placeId}`);
    console.log(`   🎯 CID from URL: ${BURMA_COURT_CID}`);
    console.log(`   📍 Coordinates: 51.5559272,-0.0885469`);
  }
  
  if (!placeId) {
    throw new Error('Could not find a valid Place ID for Burma Court Playgroup');
  }

  const url = `${GOOGLE_PLACES_API_URL}?place_id=${placeId}&fields=reviews,rating,user_ratings_total,name&key=${apiKey}`;

  console.log('📞 Fetching reviews from Google Places API...');
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google Places API status: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    // Filter and sort reviews: 4-5 stars only, most recent first
    const filteredReviews = (data.result?.reviews || [])
      .filter((review) => review.rating >= 4)
      .sort((a, b) => b.time - a.time)
      .slice(0, 5); // Limit to 5 most recent

    console.log(`✅ Successfully fetched ${filteredReviews.length} reviews`);
    console.log(`📊 Overall rating: ${data.result?.rating || 'N/A'}`);
    console.log(`📝 Total reviews: ${data.result?.user_ratings_total || 'N/A'}`);

    return {
      lastUpdated: new Date().toISOString(),
      source: 'google_api',
      reviews: filteredReviews,
      placeData: {
        rating: data.result?.rating,
        totalReviews: data.result?.user_ratings_total
      }
    };
  } catch (error) {
    console.error('❌ Failed to fetch Google reviews:', error.message);
    throw error;
  }
}

/**
 * Saves reviews data to the cache file
 */
function saveReviewsToFile(reviewsData) {
  try {
    // Ensure the data directory exists
    const dataDir = path.dirname(REVIEWS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write the reviews data
    fs.writeFileSync(REVIEWS_FILE_PATH, JSON.stringify(reviewsData, null, 2));
    console.log(`💾 Reviews saved to: ${REVIEWS_FILE_PATH}`);
    
    return true;
  } catch (error) {
    console.error('❌ Failed to save reviews:', error.message);
    throw error;
  }
}

/**
 * Main function to update reviews
 */
async function updateReviews() {
  console.log('🚀 Starting Google Reviews update...');
  console.log(`🕒 ${new Date().toLocaleString()}`);
  console.log('');

  try {
    // Fetch fresh reviews
    const reviewsData = await fetchGoogleReviews();
    
    // Save to cache file
    saveReviewsToFile(reviewsData);
    
    console.log('');
    console.log('✅ Review update completed successfully!');
    console.log('📋 Summary:');
    console.log(`   • Reviews fetched: ${reviewsData.reviews.length}`);
    console.log(`   • Data source: ${reviewsData.source}`);
    console.log(`   • Last updated: ${reviewsData.lastUpdated}`);
    
    if (reviewsData.reviews.length > 0) {
      console.log('   • Latest review preview:');
      const latest = reviewsData.reviews[0];
      console.log(`     "${latest.text.substring(0, 100)}..."`)
      console.log(`     - ${latest.author_name} (${latest.rating} stars)`);
    }
    
    console.log('');
    console.log('🎉 Reviews are now available in your website!');
    
  } catch (error) {
    console.error('');
    console.error('❌ Review update failed!');
    console.error(`Error: ${error.message}`);
    console.error('');
    console.error('💡 Troubleshooting tips:');
    console.error('   • Check your GOOGLE_PLACES_API_KEY environment variable');
    console.error('   • Verify the Place ID is correct');
    console.error('   • Ensure Google Places API is enabled in your project');
    console.error('   • Check API quotas and billing in Google Cloud Console');
    
    process.exit(1);
  }
}

// Run the update
if (import.meta.url === `file://${process.argv[1]}`) {
  updateReviews();
}