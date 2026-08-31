import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

// Site's --color-primary-500, converted from oklch to hex.
const CHART_COLOR = 'd87943'

function githubUsername() {
  return siteMetadata.github.replace(/\/+$/, '').split('/').pop()
}

// Renders the live GitHub contribution graph as a plain <img>, generated
// server-side on every request by a public third-party service — no client
// JS, no build-time fetch, no secrets, and it works the same in static export.
export default function GithubHeatmap() {
  const username = githubUsername()

  return (
    <div className="space-y-4 pb-12">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          GitHub Activity
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Contribution history, pulled live from GitHub.
        </p>
      </div>
      {/* biome-ignore lint/performance/noImgElement: external SVG generated per-request by a third party — not a local asset next/image can optimize */}
      <img
        src={`https://ghchart.rshah.org/${CHART_COLOR}/${username}`}
        alt={`${username}'s GitHub contribution graph`}
        className="h-auto w-full max-w-3xl"
        loading="lazy"
      />
      <Link
        href={siteMetadata.github}
        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium"
        aria-label={`View ${username}'s full GitHub profile`}
      >
        View full profile &rarr;
      </Link>
    </div>
  )
}
