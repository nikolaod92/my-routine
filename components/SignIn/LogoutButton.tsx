'use client'

import { useSupabase } from '../SupabaseProvider'

function LogoutButton() {
  const { supabase } = useSupabase()

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="btn btn-ghost btn-sm mx-1 p-2 capitalize"
    >
      Log Out
    </button>
  )
}

export default LogoutButton
