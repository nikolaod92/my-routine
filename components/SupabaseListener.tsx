'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSupabase } from './SupabaseProvider'

export default function SupabaseListener() {
  const { supabase, session } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      /**
       * * Since this triggers a 'SIGNED_IN' event on every browser tab switch,
       * * check if the session has changed before refreshing
       * */
      if (session?.access_token !== _session?.access_token) {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [session, router, supabase])

  return null
}
