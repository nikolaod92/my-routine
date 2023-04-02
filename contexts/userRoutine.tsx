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
      try {
        const { data } = await supabase
          .from('profile')
          .select('routine_id')
          .eq('id', userId)
          .single()

        if (data) {
          setRoutineId(data.routine_id)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserRoutine()
  }, [userId, supabase])

  useEffect(() => {
    const profile = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'profile' },
        (payload) => {
          setRoutineId(payload.new.routine_id)
          router.replace('/')
        }
      )
      .subscribe()

    return () => {
      profile.unsubscribe()
    }
  }, [router, supabase])

  return <Context.Provider value={{ routineId }}>{children}</Context.Provider>
}

export const useUserRoutine = () => useContext(Context)

export default UserRoutineProvider