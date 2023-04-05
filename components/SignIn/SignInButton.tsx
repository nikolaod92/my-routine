'use client'

import { useSupabase } from '../SupabaseProvider'

function SignInButton() {
  const { supabase, session } = useSupabase()

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/',
      },
    })
  }

  if (!session)
    return (
      <button
        type="button"
        onClick={signInWithGoogle}
        className="btn btn-primary text-base-100"
      >
        Sign In
      </button>
    )

  return null
}

export default SignInButton
