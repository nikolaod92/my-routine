'use client'

import { useUserRoutine } from '@/contexts/userRoutine'
import { toast } from 'react-toastify'
import { useSupabase } from './SupabaseProvider'

function Follow({ id }: { id: string }) {
  const { supabase, session } = useSupabase()
  const { routineId } = useUserRoutine()

  const isUserFollowingRoutine = routineId === id

  const followRoutine = async () => {
    try {
      const { error } = await supabase
        .from('profile')
        .update({ routine_id: id })
        .eq('id', session?.user.id)

      if (error) {
        toast.error(error.message)
        return
      }
    } catch (e: unknown) {
      if (e instanceof Error) toast.error(e.message)
    }
  }

  const unfollowRoutine = async () => {
    try {
      const { error } = await supabase
        .from('profile')
        .update({ routine_id: null })
        .eq('id', session?.user.id)

      if (error) {
        toast.error(error.message)
        return
      }
    } catch (e: unknown) {
      if (e instanceof Error) toast.error(e.message)
    }
  }

  return (
    <button
      onClick={isUserFollowingRoutine ? unfollowRoutine : followRoutine}
      type="button"
      className="btn btn-sm btn-secondary"
    >
      {isUserFollowingRoutine ? 'Unfollow' : 'Follow'}
    </button>
  )
}

export default Follow
