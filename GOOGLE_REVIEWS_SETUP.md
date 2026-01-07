# Google Reviews Integration Setup

This guide explains how to set up and maintain the Google Reviews integration for Burma Court Playgroup's website.

## Overview

The website now displays real Google Reviews with these features:
- ✅ **Cost-effective**: Weekly fetching (~52 API calls/year = FREE)
- ✅ **Fast loading**: Reviews served from cache, not live API
- ✅ **Graceful fallbacks**: Never shows broken testimonials
- ✅ **Fresh content**: Updates weekly with latest reviews
- ✅ **Quality filtering**: Only shows 4-5 star reviews

## Setup Instructions

### 1. Google Cloud Setup

1. **Create Google Cloud Project** (if you don't have one):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Places API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Places API (New)"
   - Click "Enable"

3. **Create API Key**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated key

4. **Secure your API Key**:
   - Click on your API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Places API (New)" only
   - Optionally add HTTP referrer restrictions for production

### 2. Environment Configuration

1. **Create .env file**:
   ```bash
   cp .env.example .env
   ```

2. **Add your API key**:
   ```env
   VITE_GOOGLE_PLACES_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   GOOGLE_PLACES_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```

3. **Verify Place ID**:
   - The Place ID is already configured: `ChIJuaRAinHahR4RtEJBFNRqrnc`
   - To verify, visit: https://developers.google.com/maps/documentation/places/web-service/place-id

### 3. Initial Review Fetch

Run the manual update to fetch your first set of reviews:

```bash
npm run update-reviews
```

This will:
- Fetch latest 4-5 star reviews from Google
- Save them to `data/reviews.json`
- Display a summary of what was fetched

## Usage

### Manual Review Updates

Update reviews manually anytime:
```bash
npm run update-reviews
```

### Automated Weekly Updates

#### Option A: GitHub Actions (Recommended for hosted projects)

Create `.github/workflows/update-reviews.yml`:
```yaml
name: Update Google Reviews
on:
  schedule:
    - cron: '0 8 * * 1'  # Every Monday at 8 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  update-reviews:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm install
      - run: npm run update-reviews
        env:
          GOOGLE_PLACES_API_KEY: ${{ secrets.GOOGLE_PLACES_API_KEY }}
      - name: Commit updated reviews
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add data/reviews.json
          git diff --staged --quiet || git commit -m "Update Google Reviews [automated]"
          git push
```

#### Option B: Server Cron Job

If hosting on a VPS/server, add to crontab:
```bash
# Update reviews every Monday at 8 AM
0 8 * * 1 cd /path/to/project && npm run update-reviews
```

#### Option C: Vercel Cron (for Vercel deployments)

Create `api/cron/reviews.js`:
```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Run review update logic here
  // Return success response
}
```

## Cost Analysis

**Google Places API Pricing** (as of 2025):
- Place Details (Atmosphere data): ~$10-20 per 1,000 requests
- Monthly free tier: $200 credit

**Our Usage**:
- Weekly updates: 52 requests/year
- Annual cost: ~$0.50-1.00
- **Effectively FREE** with monthly credit

## Monitoring & Maintenance

### Review the Setup

1. **Check data freshness**:
   ```bash
   cat data/reviews.json | grep lastUpdated
   ```

2. **Test manual update**:
   ```bash
   npm run update-reviews
   ```

3. **Monitor website**:
   - Visit testimonials section
   - Look for "(Live from Google)" indicator
   - Verify reviews are displaying correctly

### Troubleshooting

#### "API key not found" Error
```bash
# Check environment variables
echo $GOOGLE_PLACES_API_KEY
# Make sure .env file exists and contains your key
```

#### "PERMISSION_DENIED" Error
- Verify Places API is enabled in Google Cloud Console
- Check API key restrictions aren't too restrictive
- Ensure billing is enabled on your Google Cloud project

#### "INVALID_REQUEST" Error
- Verify the Place ID is correct
- Check the API endpoint URL format

#### Reviews not updating on website
- Check `data/reviews.json` exists and has recent data
- Restart development server: `npm run dev`
- Clear browser cache

### Fallback Strategy

The system has multiple fallback layers:

1. **Google API** (primary) → Fresh reviews weekly
2. **Cached file** (fallback) → Last known good data
3. **Hardcoded review** (emergency) → Always works

This ensures visitors never see broken testimonials, even if the API fails.

## File Structure

```
├── components/
│   └── Testimonials.tsx          # Updated component with dynamic reviews
├── lib/
│   └── googlePlaces.ts           # Google API service functions
├── data/
│   └── reviews.json              # Cached review data
├── scripts/
│   └── updateReviews.js          # Manual/scheduled update script
└── GOOGLE_REVIEWS_SETUP.md      # This guide
```

## Security Notes

- ✅ API key stored in environment variables (never committed)
- ✅ API key restricted to Places API only
- ✅ Client-side requests use cached data, not direct API access
- ✅ Server-side script handles API communication securely

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Google Cloud Console for API errors
3. Test with the manual update script first
4. Check browser console for client-side errors

The integration is designed to be maintenance-free once set up correctly!