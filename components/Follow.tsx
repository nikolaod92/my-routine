'use client'

import { useUserRoutine } from '@/contexts/userRoutine'
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
        alert(error.message)
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  const unfollowRoutine = async () => {
    try {
      const { error } = await supabase
        .from('profile')
        .update({ routine_id: null })
        .eq('id', session?.user.id)

      if (error) {
        alert(error.message)
        return
      }
    } catch (error) {
      console.log(error)
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
