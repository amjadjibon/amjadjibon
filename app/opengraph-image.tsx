import Image from 'next/image'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function ogImage() {
  return (
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
    </div>
  )
}
