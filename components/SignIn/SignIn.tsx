'use client'

import { useSupabase } from '../SupabaseProvider'
import LogoutButton from './LogoutButton'
import SignInButton from './SignInButton'

function SignIn() {
  const { session } = useSupabase()

  if (!session) return <SignInButton />

  return <LogoutButton />
}

export default SignIn
