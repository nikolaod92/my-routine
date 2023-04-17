'use client'

import useFetchSupabase from '@/hooks/useFetchSupabase'
import { RoutineWithAuthor } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import FollowerCount from './RoutineDisplay/FollowerCount'
import { useSupabase } from './SupabaseProvider'
import Avatar from './UI/Avatar'
import Card from './UI/Card'
import Input from './UI/Input'
import Loader from './UI/Loader'

type Props = {
  serverRoutines: RoutineWithAuthor[]
}

function RoutineList({ serverRoutines }: Props) {
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
      .limit(10)
      .returns<RoutineWithAuthor[]>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ searchTerm: string }>()

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
      <div className="max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Search for a routine..."
            srOnly
            {...register('searchTerm')}
            errorMsg={errors?.searchTerm?.message}
          >
            <button
              type="submit"
              className="btn btn-square btn-primary btn-sm rounded-s-none absolute right-[0.1rem]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </Input>
        </form>
      </div>
      <Loader loading={loading} size={32}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {routines &&
            routines.map((routine) => (
              <Card className="flex flex-col min-w-full items-stretch p-4 border-t-0 border-primary hover:border-l-4 transition-all">
                <div className="flex justify-between items-center">
                  <Link
                    href={`/routines/${routine.id}`}
                    className="font-bold text-2xl"
                  >
                    {routine.name}
                  </Link>
                  <FollowerCount count={routine.follower_count} />
                </div>
                <p className="font-medium text-sm flex-1">
                  {routine.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs  flex-1">
                    {routine.created_at ? formatDate(routine.created_at) : ''}
                  </p>
                  <p className="mr-2 text-xs uppercase font-medium">
                    {routine?.profile?.name}
                  </p>
                  {routine.profile.avatar && (
                    <Avatar avatar={routine.profile.avatar} />
                  )}
                </div>
              </Card>
            ))}
        </div>
      </Loader>
    </>
  )
}

export default RoutineList
