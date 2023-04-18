'use client'

import useFetchSupabase from '@/hooks/useFetchSupabase'
import { RoutineWithAuthor } from '@/lib/database.types'
import { SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Skeleton } from '../Skeleton'
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
        `id, name, description, follower_count, created_at, profile!routine_author_id_fkey (name, avatar)`
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
      {routines && !loading ? (
        <RoutineList routines={routines} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton className="hidden lg:block" />
          <Skeleton className="hidden lg:block" />
        </div>
      )}
    </>
  )
}

export default RoutineListContainer
