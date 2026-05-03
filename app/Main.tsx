import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

const MAX_DISPLAY = 5

const SKILLS = [
  'Golang',
  'Python',
  'Kubernetes',
  'AWS',
  'gRPC',
  'Terraform',
  'LangChain',
  'PostgreSQL',
  'Kafka',
  'Docker',
]

export default function Home({ posts }: { posts: Record<string, unknown>[] }) {
  return (
    <>
      {/* Hero */}
      <div className="space-y-6 pt-10 pb-12">
        <div className="space-y-3">
          <p className="text-primary-500 text-lg font-medium">Hi there, I'm</p>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100">
            Amjad Hossain
          </h1>
          <p className="text-xl font-medium text-gray-600 dark:text-gray-400">
            Senior Technical Consultant · Golang & Python · Kuala Lumpur, Malaysia
          </p>
        </div>

        <p className="max-w-2xl text-base leading-7 text-gray-500 dark:text-gray-400">
          Software engineer with 7+ years building scalable distributed systems, microservices, and
          cloud infrastructure. I write about backend engineering, Go, Kubernetes, and AI
          automation.
        </p>

        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300 rounded-full border px-3 py-1 text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <Link
            href="/about"
            className="bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400 rounded-lg px-4 py-2 text-sm font-semibold text-white"
          >
            About me
          </Link>
          <Link
            href="/projects"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
          >
            Projects
          </Link>
          <Link
            href={`mailto:${siteMetadata.email}`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Recent Posts
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Thoughts on backend engineering, Go, cloud infrastructure, and AI.
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && (
            <li className="py-12 text-gray-500">No posts yet — check back soon.</li>
          )}
          {posts.slice(0, MAX_DISPLAY).map((post: Record<string, unknown>) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-10">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-4 xl:col-span-3">
                      <div className="space-y-2">
                        <h3 className="text-xl leading-8 font-bold tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {(tags as string[]).map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <p className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</p>
                      <Link
                        href={`/blog/${slug}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
                        aria-label={`Read more: "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end pt-4 text-sm font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
