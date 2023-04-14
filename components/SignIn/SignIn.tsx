'use client'

import { useUser } from '@/contexts/userContext'
import Avatar from '../UI/Avatar'
import { useSupabase } from '../SupabaseProvider'
import LogoutButton from './LogoutButton'

function SignIn() {
  const { session } = useSupabase()
  const { user } = useUser()

  if (!session) return null

  return (
    <>
      {user?.avatar && <Avatar avatar={user?.avatar} />}
      <LogoutButton />
    </>
  )
}

export default SignIn
