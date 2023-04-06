import { useUser } from '@/contexts/userContext'
import Image from 'next/image'

function Avatar() {
  const { user } = useUser()

  return (
    <div className="avatar">
      <div className="rounded-full">
        {user?.avatar && (
          <Image src={user?.avatar} alt="Avatar" width={20} height={20} />
        )}
      </div>
    </div>
  )
}

export default Avatar
