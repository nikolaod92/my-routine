import { cn } from '@/lib/utils'
import Image from 'next/image'

const sizes = {
  xs: 'w-8 h-8',
  sm: 'w-12 h-12',
  lg: 'w-24 h-24',
  xl: 'w-36 h-36',
}

type Size = keyof typeof sizes

function Avatar({ avatar, size = 'xs' }: { avatar: string; size?: Size }) {
  return (
    <div className={cn('relative overflow-hidden rounded-full', sizes[size])}>
      {avatar && (
        <Image src={avatar} alt="Avatar" fill style={{ objectFit: 'cover' }} />
      )}
    </div>
  )
}

export default Avatar
