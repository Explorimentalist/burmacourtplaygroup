#!/usr/bin/env node

/**
 * Script to find the correct Place ID for Burma Court Playgroup
 * and test Google Places API connection
 */

import fetch from 'node-fetch';

// Possible Place IDs to try (derived from Google Maps URL)
const POSSIBLE_PLACE_IDS = [
  'ChIJuaRAinPahR4RtEJBFNRqrnc', // Current guess
  'ChIJuZBRKHPahR4RtEJBFNRqrnc', // Variation 1
  'ChIJuZBRKXPahR4RtEJBFNRqrnc', // Variation 2
  // These are based on decoding the hex values from your URL:
  // 0x48761c874a5ac4b9:0x47aed6d4144142b4
];

// If you have the API key, we can test with text search instead
const SEARCH_QUERY = 'Burma Court Playgroup London E5';

async function testPlaceId(placeId, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
      console.log(`✅ SUCCESS with Place ID: ${placeId}`);
      console.log(`   Name: ${data.result?.name}`);
      console.log(`   Rating: ${data.result?.rating}`);
      console.log(`   Total Reviews: ${data.result?.user_ratings_total}`);
      console.log(`   Reviews found: ${data.result?.reviews?.length || 0}`);
      
      if (data.result?.reviews?.length > 0) {
        console.log(`   Latest review by: ${data.result.reviews[0].author_name}`);
        console.log(`   Review: "${data.result.reviews[0].text.substring(0, 100)}..."`);
      }
      
      return { success: true, placeId, data: data.result };
    } else {
      console.log(`❌ FAILED with Place ID: ${placeId}`);
      console.log(`   Status: ${data.status}`);
      console.log(`   Error: ${data.error_message || 'Unknown error'}`);
      return { success: false, placeId, error: data.error_message };
    }
  } catch (error) {
    console.log(`❌ ERROR with Place ID: ${placeId}`);
    console.log(`   Error: ${error.message}`);
    return { success: false, placeId, error: error.message };
  }
}

async function searchByText(query, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
  
  try {
    console.log(`🔍 Searching for: "${query}"`);
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const place = data.results[0];
      console.log(`✅ FOUND via text search:`);
      console.log(`   Name: ${place.name}`);
      console.log(`   Place ID: ${place.place_id}`);
      console.log(`   Rating: ${place.rating}`);
      console.log(`   Address: ${place.formatted_address}`);
      
      return place.place_id;
    } else {
      console.log(`❌ Text search failed: ${data.status}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Text search error: ${error.message}`);
    return null;
  }
}

async function findCorrectPlaceId() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    console.log('❌ GOOGLE_PLACES_API_KEY environment variable not found');
    console.log('💡 Set your API key and try again:');
    console.log('   export GOOGLE_PLACES_API_KEY="your_api_key_here"');
    console.log('   node scripts/findPlaceId.js');
    return;
  }

  console.log('🚀 Testing Place IDs for Burma Court Playgroup...');
  console.log('');

  // First try text search to find the correct Place ID
  const foundPlaceId = await searchByText(SEARCH_QUERY, apiKey);
  
  if (foundPlaceId) {
    console.log('');
    console.log('🎯 Testing the found Place ID for reviews...');
    await testPlaceId(foundPlaceId, apiKey);
  }

  console.log('');
  console.log('🧪 Testing predefined Place IDs...');
  
  let successFound = false;
  
  for (const placeId of POSSIBLE_PLACE_IDS) {
    console.log('');
    const result = await testPlaceId(placeId, apiKey);
    if (result.success) {
      successFound = true;
      
      // Update the lib/googlePlaces.ts file with correct Place ID
      console.log('');
      console.log('✨ UPDATE NEEDED:');
      console.log(`   Replace the Place ID in lib/googlePlaces.ts with: ${placeId}`);
      break;
    }
  }
  
  if (!successFound) {
    console.log('');
    console.log('❌ None of the predefined Place IDs worked');
    console.log('💡 Try the text search result above, or manually find the Place ID');
  }
}

// Run the script
findCorrectPlaceId();