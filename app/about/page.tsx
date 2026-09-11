import { type Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from '@/app/seo'
import siteMetadata from '@/data/siteMetadata'
import AuthorLayout from '@/layouts/AuthorLayout'

export const metadata = genPageMetadata({
  title: 'About Amjad Hossain',
  description:
    'Meet Amjad Hossain (Jibon), a software engineer in Kuala Lumpur specializing in Go, Python, distributed systems, and cloud infrastructure.',
})

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  const profile = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${siteMetadata.siteUrl}/about/`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteMetadata.siteUrl}/about/#person`,
      name: author.name,
      alternateName: 'Amjad Jibon',
      url: `${siteMetadata.siteUrl}/about/`,
      image: new URL(author.avatar || siteMetadata.siteLogo, siteMetadata.siteUrl).href,
      jobTitle: author.occupation,
      sameAs: [siteMetadata.github, siteMetadata.linkedin, siteMetadata.x],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profile).replace(/</g, '\\u003c') }}
      />
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
