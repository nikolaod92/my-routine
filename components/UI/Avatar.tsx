import { cn } from '@/lib/utils'
import Image from 'next/image'

const sizes = {
  xs: 'w-8 h-8',
  sm: 'w-12 h-12',
  lg: 'w-24 h-24',
  xl: 'w-40 h-40',
}

type Size = keyof typeof sizes

function Avatar({ avatar, size = 'xs' }: { avatar: string; size?: Size }) {
  return (
    <div className="avatar ">
      <div
        className={cn(
          'mask mask-squircle relative overflow-hidden',
          sizes[size]
        )}
      >
        {avatar && (
          <Image
            src={avatar}
            alt="Avatar"
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
    </div>
  )
}

export default Avatar
