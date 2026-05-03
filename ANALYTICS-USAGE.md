# Google Analytics 4 - Usage Guide

## 📋 Setup Checklist

- [x] Created GA4 property in Google Analytics
- [x] Added GoogleAnalytics component
- [x] Created analytics utility functions
- [x] Updated siteMetadata.js
- [x] Updated root layout
- [ ] Created `.env.local` with your Measurement ID
- [ ] Added environment variable to Vercel
- [ ] Tested analytics locally
- [ ] Verified data in GA4 dashboard

## 🔧 Configuration

### 1. Set Your Measurement ID

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID.

### 2. Add to Vercel

1. Go to Vercel Dashboard → your project
2. Settings → Environment Variables
3. Add: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Value: Your GA4 Measurement ID (e.g., `G-ABC123XYZ`)
5. Select all environments (Production, Preview, Development)

## 📊 What's Tracked Automatically

With Enhanced Measurement enabled (default), GA4 tracks:

1. **Page Views** - Every page navigation
2. **Scrolls** - 90% scroll depth
3. **Outbound Clicks** - Links to external domains
4. **Site Search** - Searches on your site
5. **Video Engagement** - Video interactions
6. **File Downloads** - PDF, ZIP, etc.

## 🎯 Custom Event Tracking

### Import Tracking Functions

```typescript
import {
  trackEvent,
  trackNewsletterSignup,
  trackSocialClick,
  trackExternalLink,
  trackProjectClick,
  trackScrollDepth,
  trackBlogEngagement,
  trackSearch,
  trackTagFilter,
  trackError,
} from '@/utils/analytics'
```

### Available Functions

| Function | Parameters | Use Case |
|----------|-----------|----------|
| `trackPageView(url, title)` | url, title | Manual page view tracking |
| `trackEvent(action, category, label?, value?)` | action, category, label, value | Generic custom events |
| `trackNewsletterSignup(email?)` | email | Newsletter subscriptions |
| `trackSocialClick(platform, url)` | platform, url | Social media clicks |
| `trackExternalLink(url)` | url | External link clicks |
| `trackProjectClick(name, url)` | name, url | Project/github links |
| `trackScrollDepth(depth)` | '25%', '50%', '75%', '100%' | Scroll milestones |
| `trackBlogEngagement(action, title)` | action, title | Blog interactions |
| `trackSearch(term, results)` | term, count | Search queries |
| `trackTagFilter(tagName)` | tag name | Tag filtering |
| `trackError(error, context?)` | error, context | Error tracking |

## 💡 Usage Examples

### 1. Track Button Clicks

```typescript
'use client'

import { trackEvent } from '@/utils/analytics'

export function CTAButton() {
  const handleClick = () => {
    trackEvent('click', 'cta_button', 'homepage_hero')
  }

  return <button onClick={handleClick}>Get Started</button>
}
```

### 2. Track Newsletter Signup

```typescript
'use client'

import { trackNewsletterSignup } from '@/utils/analytics'

export function NewsletterForm() {
  const handleSubmit = (email: string) => {
    // Your signup logic
    await subscribeToNewsletter(email)

    // Track the signup
    trackNewsletterSignup(email)
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      const email = e.target.email.value
      handleSubmit(email)
    }}>
      <input name="email" type="email" placeholder="your@email.com" />
      <button>Subscribe</button>
    </form>
  )
}
```

### 3. Track Social Media Clicks

```typescript
'use client'

import { trackSocialClick } from '@/utils/analytics'

export function SocialLinks() {
  const socials = [
    { name: 'GitHub', url: 'https://github.com/amjadjibon' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/amjad-hossaain' },
    { name: 'Twitter', url: 'https://x.com/amjadjibon' },
  ]

  return (
    <div>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackSocialClick(social.name.toLowerCase(), social.url)}
        >
          {social.name}
        </a>
      ))}
    </div>
  )
}
```

### 4. Track External Link Clicks

```typescript
'use client'

import { trackExternalLink } from '@/utils/analytics'

export function ResourceLink({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackExternalLink(href)}
    >
      {title}
      <span className="external-icon">↗</span>
    </a>
  )
}
```

### 5. Track Project Clicks

```typescript
'use client'

import { trackProjectClick } from '@/utils/analytics'

export function ProjectCard({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return (
    <div className="project">
      <h3>{name}</h3>
      <p>{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackProjectClick(name, url)}
      >
        View Project →
      </a>
    </div>
  )
}
```

### 6. Track Scroll Depth

```typescript
'use client'

import { useState, useEffect } from 'react'
import { trackScrollDepth } from '@/utils/analytics'

export function ScrollTracker() {
  const [trackedDepths, setTrackedDepths] = useState<string[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      const depths = ['25', '50', '75', '100']
      depths.forEach((depth) => {
        if (scrollPercent >= parseInt(depth) && !trackedDepths.includes(depth)) {
          trackScrollDepth(`${depth}%` as any)
          setTrackedDepths([...trackedDepths, depth])
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [trackedDepths])

  return null // Invisible component
}
```

Add to your root layout:

```typescript
import ScrollTracker from '@/components/ScrollTracker'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ScrollTracker />
        {children}
      </body>
    </html>
  )
}
```

### 7. Track Blog Engagement

```typescript
'use client'

import { trackBlogEngagement } from '@/utils/analytics'

export function BlogActions({ postTitle, slug }: { postTitle: string; slug: string }) {
  const handleShare = async () => {
    await navigator.share({ title: postTitle, url: `/blog/${slug}` })
    trackBlogEngagement('share', postTitle)
  }

  return (
    <div className="actions">
      <button onClick={handleShare}>Share</button>
      <button onClick={() => trackBlogEngagement('bookmark', postTitle)}>
        Bookmark
      </button>
      <button onClick={() => trackBlogEngagement('like', postTitle)}>
        Like
      </button>
    </div>
  )
}
```

### 8. Track Search

```typescript
'use client'

import { trackSearch } from '@/utils/analytics'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async (searchQuery: string) => {
    // Your search logic
    const searchResults = await performSearch(searchQuery)
    setResults(searchResults)

    // Track the search
    trackSearch(searchQuery, searchResults.length)
  }

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
      placeholder="Search posts..."
    />
  )
}
```

### 9. Track Tag Filtering

```typescript
'use client'

import { trackTagFilter } from '@/utils/analytics'

export function TagCloud({ tags }: { tags: string[] }) {
  return (
    <div className="tags">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => {
            trackTagFilter(tag)
            // Your filtering logic
            filterByTag(tag)
          }}
        >
          #{tag}
        </button>
      ))}
    </div>
  )
}
```

### 10. Track Errors

```typescript
'use client'

import { trackError } from '@/utils/analytics'

export function ContactForm() {
  const handleSubmit = async (data: FormData) => {
    try {
      await submitContactForm(data)
    } catch (error) {
      trackError(error instanceof Error ? error.message : 'Unknown error', 'contact_form')
      // Show error to user
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

## 📈 View Your Analytics

### Real-Time Dashboard
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property: "amjadjibon.com"
3. Click **Reports** → **Realtime**
4. See active users on your site right now

### Key Reports to Check

**1. Acquisition Reports**
- Reports → Acquisition → Traffic acquisition
- See where your visitors come from

**2. Engagement Reports**
- Reports → Engagement → Events
- See what users interact with

**3. Monetization** (if applicable)
- Reports → Monetization
- Track revenue if you sell anything

**4. Retention**
- Reports → Retention
- See if users come back

## 🎯 Important Metrics to Track

| Metric | What It Means | Good Target |
|--------|---------------|-------------|
| Users | Unique visitors | Growing month over month |
| Sessions | Total visits | 2-3x per user per month |
| Engagement Rate | Active sessions | > 50% |
| Avg. Session Duration | Time on site | > 2 minutes |
| Pages Per Session | Depth of engagement | > 2 pages |
| Bounce Rate | Single-page sessions | < 60% |

## 🔍 Debugging

### Test Locally

1. Start dev server: `npm run dev`
2. Open your site
3. Go to GA4 → Configure → DebugView
4. You should see events in real-time

### Check if GA4 is Working

1. Open browser DevTools (F12)
2. Go to Console tab
3. Type: `window.dataLayer`
4. You should see an array with your events

### Common Issues

**No data showing:**
- Check Measurement ID is correct
- Verify environment variable is set
- Clear browser cache and cookies
- Wait 24-48 hours for data to appear in reports

**Realtime not working:**
- Enhanced Measurement might be disabled
- Check ad blocker isn't blocking GA
- Verify you're not excluding your IP

## 🎨 Custom Dimensions

Create custom dimensions in GA4:

1. Admin → Custom definitions → Custom dimensions
2. Create dimensions like:
   - `post_category` - Blog post category
   - `author_name` - Post author
   - `reading_time` - Estimated read time

Then send them:

```typescript
trackEvent('read_article', 'blog', postTitle, undefined, {
  post_category: 'golang',
  author_name: 'Amjad Hossain',
  reading_time: '5 min',
})
```

## 📱 Cross-Domain Tracking

If you have multiple domains:

```typescript
gtag('config', 'G-XXXXXXXXXX', {
  linker: {
    domains: ['amjadjibon.com', 'amjadjibon.github.io'],
  },
})
```

## 🔄 Migration from Universal Analytics

If you were using UA (analytics.js), the main differences:

| Universal Analytics | GA4 |
|---------------------|-----|
| Sessions | Events (everything is an event) |
| Pageviews | page_view event |
| Bounce rate | Engagement rate |
| Unique pageviews | Not directly available |
| Custom dimensions | Custom parameters |

## 📚 Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Event Tracking Guide](https://support.google.com/analytics/answer/10075109)
- [Google Tag Manager](https://tagmanager.google.com/)
- [Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

## ⚡ Performance Tips

1. **Use `afterInteractive` strategy** - Already configured ✅
2. **Defer non-critical scripts** - GA loads after page is interactive
3. **Batch events** - Send multiple events together
4. **Avoid excessive tracking** - Only track what you'll use

## 🔒 Privacy & GDPR

### For EU Visitors

Add consent mode:

```typescript
// In GoogleAnalytics.tsx
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'granted',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'granted',
})
```

### Add Cookie Banner

Consider adding a cookie consent banner for GDPR compliance.

## 🚀 Next Steps

1. Set up your Measurement ID
2. Add to `.env.local` and Vercel
3. Test locally
4. Add custom tracking to key interactions
5. Check reports after 24-48 hours
6. Optimize based on data

Happy analyzing! 📊
