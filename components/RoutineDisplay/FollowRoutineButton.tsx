'use client'

import { useUser } from '@/contexts/userContext'
import { toast } from 'react-toastify'
import { useSupabase } from '../SupabaseProvider'

function FollowRoutineButton({ id }: { id: string }) {
  const { supabase, session } = useSupabase()
  const { user } = useUser()

  const isUserFollowingRoutine = user?.routine_id === id

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

  if (session)
    return (
      <button
        onClick={isUserFollowingRoutine ? unfollowRoutine : followRoutine}
        type="button"
        className="btn btn-sm btn-secondary"
      >
        {isUserFollowingRoutine ? 'Unfollow' : 'Follow'}
      </button>
    )

  return null
}

export default FollowRoutineButton
