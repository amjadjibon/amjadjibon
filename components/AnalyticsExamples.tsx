'use client'

/**
 * Example components showing how to use Google Analytics event tracking
 *
 * Import the tracking functions from utils/analytics:
 * import { trackEvent, trackSocialClick, trackNewsletterSignup } from '@/utils/analytics'
 */

import {
  trackEvent,
  trackExternalLink,
  trackProjectClick,
  trackSocialClick,
} from '@/utils/analytics'

// Example 1: Track social media link clicks
export function SocialLinks() {
  const handleSocialClick = (platform: string, url: string) => {
    trackSocialClick(platform, url)
    // Then navigate to the link
    window.open(url, '_blank')
  }

  return (
    <div className="flex gap-4">
      <button onClick={() => handleSocialClick('github', 'https://github.com/amjadjibon')}>
        GitHub
      </button>
      <button
        onClick={() => handleSocialClick('linkedin', 'https://linkedin.com/in/amjad-hossaain')}
      >
        LinkedIn
      </button>
      <button onClick={() => handleSocialClick('twitter', 'https://x.com/amjadjibon')}>
        Twitter
      </button>
    </div>
  )
}

// Example 2: Track newsletter signup
export function NewsletterForm() {
  const handleSignup = (email: string) => {
    // Your newsletter signup logic here

    // Track the signup event
    trackEvent('sign_up', 'newsletter', email)

    console.log('Newsletter signup tracked:', email)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        handleSignup(email)
      }}
    >
      <input type="email" name="email" placeholder="your@email.com" />
      <button type="submit">Subscribe</button>
    </form>
  )
}

// Example 3: Track external link clicks
export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = () => {
    trackExternalLink(href)
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
      {children}
    </a>
  )
}

// Example 4: Track project link clicks
export function ProjectCard({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const handleProjectClick = () => {
    trackProjectClick(name, url)
  }

  return (
    <div className="project-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" onClick={handleProjectClick}>
        View Project
      </a>
    </div>
  )
}

// Example 5: Track custom events with values
export function DownloadButton({ filename }: { filename: string }) {
  const handleDownload = () => {
    // Track file download with custom parameters
    trackEvent('download', 'resume', filename, 1) // 1 is the value
  }

  return <button onClick={handleDownload}>Download Resume</button>
}

// Example 6: Track tag/filter clicks
export function TagFilter({ tags }: { tags: string[] }) {
  const handleTagClick = (tag: string) => {
    trackEvent('filter', 'tags', tag)
    // Your tag filtering logic
  }

  return (
    <div className="tags">
      {tags.map((tag) => (
        <button key={tag} onClick={() => handleTagClick(tag)}>
          #{tag}
        </button>
      ))}
    </div>
  )
}

// Example 7: Track search queries
export function SearchBar() {
  const handleSearch = (query: string, resultsCount: number) => {
    trackEvent('search', 'site_search', query, resultsCount)
  }

  return (
    <input
      type="search"
      placeholder="Search posts..."
      onChange={(e) => {
        const query = e.target.value
        // Your search logic
        const results = [] // Your search results
        handleSearch(query, results.length)
      }}
    />
  )
}

// Example 8: Track scroll depth engagement
export function ScrollTracker() {
  const [scrollDepths, setScrollDepths] = useState<string[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      const depths = ['25', '50', '75', '100']
      depths.forEach((depth) => {
        if (scrollPercent >= parseInt(depth) && !scrollDepths.includes(depth)) {
          trackEvent('scroll', 'engagement', `${depth}%`)
          setScrollDepths([...scrollDepths, depth])
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollDepths])

  return null // This component doesn't render anything
}

// Example 9: Track blog post engagement
export function BlogActions({ postTitle }: { postTitle: string }) {
  return (
    <div className="blog-actions">
      <button onClick={() => trackEvent('share', 'blog', postTitle)}>Share</button>
      <button onClick={() => trackEvent('like', 'blog', postTitle)}>Like</button>
      <button onClick={() => trackEvent('bookmark', 'blog', postTitle)}>Bookmark</button>
    </div>
  )
}

// Example 10: Track errors
export function ErrorTracking() {
  useEffect(() => {
    // Track JavaScript errors
    const handleError = (event: ErrorEvent) => {
      trackEvent('error', 'javascript', event.message)
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  return null
}
