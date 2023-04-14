'use client'

import { useUser } from '@/contexts/userContext'
import Link from 'next/link'
import Avatar from '../UI/Avatar'
import { useSupabase } from '../SupabaseProvider'
import LogoutButton from './LogoutButton'

function SignIn() {
  const { session } = useSupabase()
  const { user } = useUser()

  if (!session)
    return (
      <Link className="btn btn-ghost btn-sm capitalize" href="/login">
        Login
      </Link>
    )

  return (
    <>
      {user?.avatar && <Avatar avatar={user?.avatar} />}
      <LogoutButton />
    </>
  )
}

export default SignIn
