'use client'

import useFetchSupabase from '@/hooks/useFetchSupabase'
import { RoutineWithAuthor } from '@/lib/database.types'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSupabase } from '../SupabaseProvider'
import RoutineList from './RoutineList'
import RoutineSearchForm from './RoutineSearchForm'

type Props = {
  serverRoutines: RoutineWithAuthor[]
}

function RoutineListContainer({ serverRoutines }: Props) {
  const { supabase } = useSupabase()

  const getRoutines = async (searchTerm: string) =>
    supabase
      .from('routine')
      .select(
        `id, name, description, follower_count, created_at, author_id, profile!routine_author_id_fkey (name, avatar)`
      )
      .textSearch('name', searchTerm, {
        config: 'english',
        type: 'websearch',
      })
      .order('follower_count', {
        ascending: false,
      })
      .limit(12)
      .returns<RoutineWithAuthor[]>()

  const {
    fetchData,
    loading,
    data: routines,
    error,
  } = useFetchSupabase(getRoutines, { initialState: serverRoutines })

  const onSubmit: SubmitHandler<{ searchTerm: string }> = async (
    { searchTerm },
    event
  ) => {
    event?.preventDefault()

    fetchData(searchTerm)

    if (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <RoutineSearchForm onSubmit={onSubmit} />
      {routines?.length === 0 && !loading && (
        <p className="text-md ml-2 font-medium">No routines found.</p>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {routines && !loading ? (
          <RoutineList routines={routines} />
        ) : (
          <RoutineList.Skeleton />
        )}
      </div>
    </>
  )
}

export default RoutineListContainer
