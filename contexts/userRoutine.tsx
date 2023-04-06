'use client'

import { useRouter } from 'next/navigation'
import { createContext, useState, useEffect, useContext } from 'react'
import { useSupabase } from '../components/SupabaseProvider'

type ContextType = { routineId: string | null }

const Context = createContext<ContextType>({} as ContextType)

function UserRoutineProvider({ children }: { children: React.ReactNode }) {
  const { supabase, session } = useSupabase()

  const router = useRouter()

  const [routineId, setRoutineId] = useState<string | null>(null)

  const userId = session?.user.id

  useEffect(() => {
    const getUserRoutine = async () => {
      if (session) {
        const { data } = await supabase
          .from('profile')
          .select('routine_id')
          .eq('id', userId)
          .single()

        if (data) {
          setRoutineId(data.routine_id)
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
          setRoutineId(payload.new.routine_id)
          router.replace('/my-routine')
        }
      )
      .subscribe()

    return () => {
      profile.unsubscribe()
    }
  }, [userId, router, supabase])

  return <Context.Provider value={{ routineId }}>{children}</Context.Provider>
}

export const useUserRoutine = () => useContext(Context)

export default UserRoutineProvider
