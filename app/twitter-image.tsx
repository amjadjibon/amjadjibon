// Twitter card image generation using Next.js ImageResponse
// Note: Inline styles are REQUIRED here - ImageResponse renders to an image, not HTML
// External CSS files and Tailwind classes are not supported in image generation
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 1200,
  height: 630,
}

export const alt = 'Amjad Hossain'

export default function twitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '72px',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px',
      }}
    >
      <div style={{ fontSize: '128px', marginBottom: '20px' }}>amjadjibon</div>
      <div style={{ fontSize: '32px', fontWeight: 'normal' }}>
        Golang & Python | Distributed Systems | Cloud Infrastructure
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
