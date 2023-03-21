'use client'

import LogoutButton from './LogoutButton'
import SignInButton from './SignInButton'
import { useSupabase } from './SupabaseProvider'

function SignIn() {
  const { session } = useSupabase()

  if (!session) return <SignInButton />

  return <LogoutButton />
}

export default SignIn
