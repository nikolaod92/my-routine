'use client'

import { useUser } from '@/contexts/userContext'
import toast from 'react-hot-toast'
import { useSupabase } from '../SupabaseProvider'

function FollowRoutineButton({ id }: { id: string }) {
  const { supabase, session } = useSupabase()
  const { user } = useUser()

  const isUserFollowingRoutine = user?.routine_id === id

  const updateRoutine = async (idToUpdate: string | null) => {
    const { error } = await supabase
      .from('profile')
      .update({ routine_id: idToUpdate })
      .eq('id', session?.user.id)

    if (error) {
      toast.error(error.message)
    }
  }

  if (session)
    return (
      <button
        onClick={
          isUserFollowingRoutine
            ? () => updateRoutine(null)
            : () => updateRoutine(id)
        }
        type="button"
        className="btn btn-sm btn-secondary"
      >
        {isUserFollowingRoutine ? 'Unfollow' : 'Follow'}
      </button>
    )

  return null
}

export default FollowRoutineButton
