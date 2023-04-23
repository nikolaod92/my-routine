import Image from 'next/image'

function Avatar({ avatar, size = 24 }: { avatar: string; size?: number }) {
  return (
    <div className="overflow-hidden rounded-full">
      {avatar && <Image src={avatar} alt="Avatar" width={size} height={size} />}
    </div>
  )
}

export default Avatar
