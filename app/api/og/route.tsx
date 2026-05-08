import { allBlogs } from 'contentlayer/generated'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const slug = searchParams.get('slug') ?? ''

  const post = allBlogs.find((p) => p.slug === decodeURIComponent(slug))

  const title = post?.title ?? 'Blog'
  const summary = post?.summary ?? ''
  const date = post?.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''
  const tags: string[] = post?.tags ?? []

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 72px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1f0e 60%, #1a1a1a 100%)',
        fontFamily: 'monospace',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{ color: '#d87943', fontSize: '20px', fontWeight: 700, letterSpacing: '0.1em' }}
        >
          amjadjibon
        </div>
        {date && <div style={{ color: '#888', fontSize: '16px', marginLeft: '16px' }}>{date}</div>}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            color: '#f5f5f5',
            fontSize: title.length > 50 ? '44px' : '56px',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
        {summary && (
          <div style={{ color: '#aaa', fontSize: '22px', lineHeight: 1.5, maxWidth: '900px' }}>
            {summary.length > 120 ? `${summary.slice(0, 120)}…` : summary}
          </div>
        )}
      </div>

      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {tags.slice(0, 5).map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(216,121,67,0.15)',
                border: '1px solid rgba(216,121,67,0.4)',
                color: '#d87943',
                fontSize: '14px',
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: '999px',
                letterSpacing: '0.05em',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>,
    { width: 1200, height: 630 }
  )
}
