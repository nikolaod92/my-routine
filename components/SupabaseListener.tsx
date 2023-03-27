'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSupabase } from './SupabaseProvider'

export default function SupabaseListener({
  serverAccessToken,
}: {
  serverAccessToken?: string
}) {
  const { supabase } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        router.refresh()
      }

      if (event === 'SIGNED_IN') {
        router.push('/')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, router, supabase])

  useEffect(() => {
    const profile = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profile' },
        () => {
          router.replace('/')
        }
      )
      .subscribe()

    return () => {
      profile.unsubscribe()
    }
  }, [router, supabase])

  return null
}
