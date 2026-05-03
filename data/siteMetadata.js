/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Amjad Hossain',
  author: 'Amjad Hossain',
  headerTitle: 'amjadjibon',
  description:
    'Software Engineer specializing in Golang, distributed systems, microservices, and cloud infrastructure.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://amjadjibon.github.io',
  siteRepo: 'https://github.com/amjadjibon/amjadjibon',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'amjad.jibon@gmail.com',
  github: 'https://github.com/amjadjibon',
  linkedin: 'https://www.linkedin.com/in/amjad-hossaain',
  x: 'https://x.com/amjadjibon',
  medium: 'https://medium.com/@amjadjibon',
  substack: 'https://substack.com/@amjadjibon',
  locale: 'en-US',
  stickyNav: true,
  analytics: {
    googleAnalytics: {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    },
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
