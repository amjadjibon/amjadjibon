// OpenGraph image generation using Next.js ImageResponse
// Note: Inline styles are REQUIRED here - ImageResponse renders to an image, not HTML
// External CSS files and Tailwind classes are not supported in image generation
import { ImageResponse } from 'next/og'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// biome-ignore lint/style/noUnusedTemplateLiteral: ImageResponse requires inline styles for image generation
export default function ogImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '128px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #4f55c5, #1e1b4b)',
        color: 'white',
      }}
    >
      amjadjibon
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
