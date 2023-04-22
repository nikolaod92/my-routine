'use client'

import { UserProfile } from '@/lib/database.types'
import { useRouter } from 'next/navigation'
import { createContext, useState, useEffect, useContext } from 'react'
import { useSupabase } from '../components/SupabaseProvider'

type ContextType = UserProfile | null

const Context = createContext<ContextType>({} as ContextType)

function UserProvider({ children }: { children: React.ReactNode }) {
  const { supabase, session } = useSupabase()

  const router = useRouter()

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  const userId = session?.user.id

  useEffect(() => {
    const getUserProfile = async () => {
      if (session) {
        const { data } = await supabase
          .from('profile')
          .select()
          .eq('id', userId)
          .single()

        if (data) {
          setUserProfile(data)
        }
      }
    }
    getUserProfile()
  }, [userId, supabase, session])

  useEffect(() => {
    const profile = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profile',
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new) {
            setUserProfile(payload.new as UserProfile)
          }
        }
      )
      .subscribe()

    return () => {
      profile.unsubscribe()
    }
  }, [userId, router, supabase])

  return <Context.Provider value={userProfile}>{children}</Context.Provider>
}

export const useUserProfile = () => useContext(Context)

export default UserProvider
