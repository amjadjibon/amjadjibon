# Google Analytics 4 Setup Guide

## Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring" or "Admin" → "Create Account"
3. Account name: "Amjad Hossain Personal Site"
4. Property name: "amjadjibon.com"
5. Reporting time zone: Select your timezone
6. Currency: Based on your location
7. **Important:** Enable "Enhanced measurement" (tracks page views, scrolls, outbound clicks)

## Step 2: Get Your Measurement ID

After creating the property:
1. Go to **Admin** → **Data Streams**
2. Click on your web data stream
3. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Save it - you'll need it for the next step

## Step 3: Add Environment Variable

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

## Step 4: Update siteMetadata.js

Add GA4 configuration to your existing analytics section.

## Step 5: Test Your Setup

1. Run `npm run dev`
2. Open your site locally
3. Go to GA4 → **Realtime** report
4. You should see yourself as an active user

## Step 6: Deploy to Production

1. Add the environment variable to Vercel:
   - Go to Vercel Dashboard → your project
   - Settings → Environment Variables
   - Add `NEXT_PUBLIC_GA_MEASUREMENT_ID`
2. Deploy your changes
3. Verify data is coming in GA4

## Important Events to Track

### Automatically Tracked (Enhanced Measurement):
- Page views
- Scroll tracking
- Outbound clicks
- Site search
- Video engagement
- File downloads

### Custom Events You Can Add:
- Newsletter signups
- Social media clicks
- Project link clicks
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page

## Privacy Considerations

Add Google Analytics consent mode for GDPR/CCPA compliance.

## Data Retention Settings

1. Go to **Admin** → **Data Settings** → **Data Retention**
2. Set to 14 months (default) or longer
3. Enable "Reset user data on new activity"

## Exclude Internal Traffic

1. Go to **Admin** → **Data Streams** → your stream
2. Configure **Tag Settings** → **Define internal traffic**
3. Add your IP address
4. Create filter: Admin → Data Settings → Data Filters
