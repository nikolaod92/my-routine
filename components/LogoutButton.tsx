'use client'

import { useSupabase } from './SupabaseProvider'

function LogoutButton() {
  const { supabase, session } = useSupabase()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (session)
    return (
      <button type="button" onClick={logout} className="btn btn-warning">
        Logout
      </button>
    )

  return null
}

export default LogoutButton
