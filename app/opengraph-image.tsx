// Note: Inline styles are REQUIRED here — ImageResponse renders to an image, not HTML.
// External CSS and Tailwind classes are not supported in image generation.
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function ogImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '72px 80px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1f0e 60%, #1a1a1a 100%)',
        fontFamily: 'monospace',
      }}
    >
      <div
        style={{
          color: '#d87943',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.12em',
          marginBottom: '24px',
        }}
      >
        amjadjibon.github.io
      </div>
      <div
        style={{
          color: '#f5f5f5',
          fontSize: '80px',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}
      >
        Amjad Hossain
      </div>
      <div style={{ color: '#aaa', fontSize: '28px', marginTop: '20px', letterSpacing: '0.02em' }}>
        Software Engineer · Go · Distributed Systems · Cloud
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}
