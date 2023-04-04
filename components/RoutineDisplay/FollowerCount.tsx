'use client'

import useFetchSupabase from '@/hooks/useFetchSupabase'
import UserIcon from '@heroicons/react/20/solid/UserIcon'
import { useCallback } from 'react'
import Loader from '../Loader'
import { useSupabase } from '../SupabaseProvider'

function FollowerCount({ routineId }: { routineId: string }) {
  const { supabase } = useSupabase()

  const getFollowers = useCallback(async () => {
    const { data, count, error } = await supabase
      .from('profile')
      .select('*', { count: 'exact' })
      .eq('routine_id', routineId)

    return { data, count, error }
  }, [routineId, supabase])

  const { loading, count } = useFetchSupabase(getFollowers, {
    executeOnMount: true,
  })

  return (
    <Loader loading={loading} size={16}>
      <div className="flex items-center justify-center">
        <UserIcon width={24} height={24} className="fill-primary " />
        <p className="text-xs font-bold">{count}</p>
      </div>
    </Loader>
  )
}

export default FollowerCount
