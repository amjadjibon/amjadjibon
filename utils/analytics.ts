// Google Analytics 4 event tracking utilities

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: title,
    })
  }
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track newsletter signup
export const trackNewsletterSignup = (email?: string) => {
  trackEvent('sign_up', 'newsletter', email)
}

// Track social media clicks
export const trackSocialClick = (platform: string, url: string) => {
  trackEvent('click', 'social_media', `${platform}_${url}`)
}

// Track external link clicks
export const trackExternalLink = (url: string) => {
  trackEvent('click', 'external_link', url)
}

// Track project/github link clicks
export const trackProjectClick = (projectName: string, url: string) => {
  trackEvent('click', 'project', `${projectName}_${url}`)
}

// Track scroll depth
export const trackScrollDepth = (depth: '25%' | '50%' | '75%' | '100%') => {
  trackEvent('scroll', 'engagement', depth)
}

// Track blog post interactions
export const trackBlogEngagement = (action: 'read_more' | 'share' | 'like', postTitle: string) => {
  trackEvent(action, 'blog', postTitle)
}

// Track search queries
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', 'site_search', searchTerm, resultsCount)
}

// Track tag filtering
export const trackTagFilter = (tagName: string) => {
  trackEvent('filter', 'tags', tagName)
}

// Track errors
export const trackError = (error: string, context?: string) => {
  trackEvent('error', 'system', context ? `${context}_${error}` : error)
}
