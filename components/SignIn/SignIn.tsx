'use client'

import { useUserProfile } from '@/contexts/userContext'
import Link from 'next/link'
import Avatar from '../UI/Avatar'
import { useSupabase } from '../SupabaseProvider'
import LogoutButton from './LogoutButton'

function SignIn() {
  const { session } = useSupabase()
  const userProfile = useUserProfile()

  if (!session)
    return (
      <Link className="btn btn-ghost btn-sm capitalize" href="/login">
        Login
      </Link>
    )

  return (
    <>
      {userProfile?.avatar && <Avatar avatar={userProfile?.avatar} />}
      <LogoutButton />
    </>
  )
}

export default SignIn
