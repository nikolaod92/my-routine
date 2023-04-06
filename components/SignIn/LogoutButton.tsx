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
      className="btn btn-sm p-2 mx-1 btn-ghost capitalize"
    >
      Log Out
    </button>
  )
}

export default LogoutButton
