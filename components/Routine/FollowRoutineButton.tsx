'use client'

import { useUserProfile } from '@/contexts/userContext'
import useFetchSupabase from '@/hooks/useFetchSupabase'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useSupabase } from '../SupabaseProvider'
import LoadingButton from '../UI/LoadingButton'

function FollowRoutineButton({ id }: { id: string }) {
  const { supabase } = useSupabase()
  const userProfile = useUserProfile()

  const isUserFollowingRoutine = userProfile?.routine_id === id

  const updateRoutine = async (idToUpdate: string | null) =>
    supabase
      .from('profile')
      .update({ routine_id: idToUpdate })
      .eq('id', userProfile?.id)

  const { fetchData, loading, error } = useFetchSupabase(updateRoutine)

  if (error) {
    toast.error(error.message)
  }

  if (userProfile)
    return (
      <LoadingButton
        loading={loading}
        onClick={
          isUserFollowingRoutine ? () => fetchData(null) : () => fetchData(id)
        }
        className={cn(isUserFollowingRoutine && 'btn-secondary')}
      >
        {isUserFollowingRoutine && !loading ? 'Unfollow' : 'Follow'}
      </LoadingButton>
    )

  return null
}

export default FollowRoutineButton
