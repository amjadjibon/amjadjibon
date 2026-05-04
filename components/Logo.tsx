import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/static/images/logo.png"
      alt="Amjad Jibon"
      width={40}
      height={40}
      className="size-10"
      priority
    />
  )
}
