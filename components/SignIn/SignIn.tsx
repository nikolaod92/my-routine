'use client'

import { useUser } from '@/contexts/userContext'
import Avatar from '../Avatar'
import { useSupabase } from '../SupabaseProvider'
import LogoutButton from './LogoutButton'
import SignInButton from './SignInButton'

function SignIn() {
  const { session } = useSupabase()
  const { user } = useUser()

  if (!session) return <SignInButton />

  return (
    <>
      {user?.avatar && <Avatar avatar={user?.avatar} />}
      <LogoutButton />
    </>
  )
}

export default SignIn
