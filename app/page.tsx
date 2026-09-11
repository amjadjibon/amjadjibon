import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Main from './Main'
import { genPageMetadata } from './seo'

const homeTitle = 'Amjad Hossain (Jibon) | Go & Backend Engineer'

export const metadata = {
  ...genPageMetadata({
    title: 'Go & Backend Engineer',
    description:
      'Amjad Hossain (Jibon), software engineer in Kuala Lumpur. Explore Go, Python, distributed systems, cloud infrastructure, and open-source projects.',
  }),
  title: { absolute: homeTitle },
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
