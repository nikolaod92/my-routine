'use client'

import { User } from '@/lib/database.types'
import { useRouter } from 'next/navigation'
import { createContext, useState, useEffect, useContext } from 'react'
import { useSupabase } from '../components/SupabaseProvider'

type ContextType = { user: User | null }

const Context = createContext<ContextType>({} as ContextType)

function UserProvider({ children }: { children: React.ReactNode }) {
  const { supabase, session } = useSupabase()

  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)

  const userId = session?.user.id

  useEffect(() => {
    const getUserRoutine = async () => {
      if (session) {
        const { data } = await supabase
          .from('profile')
          .select()
          .eq('id', userId)
          .single()

        if (data) {
          setUser(data)
        }
      }
    }
    getUserRoutine()
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
          setUser(payload.new.user)
          router.replace('/my-routine')
        }
      )
      .subscribe()

    return () => {
      profile.unsubscribe()
    }
  }, [userId, router, supabase])

  return <Context.Provider value={{ user }}>{children}</Context.Provider>
}

export const useUser = () => useContext(Context)

export default UserProvider
