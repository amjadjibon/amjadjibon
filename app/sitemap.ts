import { allBlogs } from 'contentlayer/generated'
import type { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}/`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'about', 'blog', 'projects', 'tags'].map((route) => ({
    url: route ? `${siteUrl}/${route}/` : `${siteUrl}/`,
  }))

  return [...routes, ...blogRoutes]
}
