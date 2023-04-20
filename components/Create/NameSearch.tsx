'use client'

import { FieldValues, useForm } from 'react-hook-form'
import useFetchSupabase from '@/hooks/useFetchSupabase'
import { useSupabase } from '../SupabaseProvider'
import ResponsiveGrid from '../UI/ResponsiveGrid'
import AddExerciseCard from './AddExerciseCard'
import Input from '../UI/Input'
import { ExerciseCardContainer } from '../ExerciseCard'

function NameSearch() {
  const { supabase } = useSupabase()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ searchTerm: string }>()

  const getExercises = async (formData: FieldValues) =>
    supabase
      .from('exercise')
      .select()
      .textSearch('name', formData.searchTerm, {
        config: 'english',
        type: 'websearch',
      })
      .limit(20)

  const { fetchData, data: exercises, loading } = useFetchSupabase(getExercises)

  const onSubmit = handleSubmit(async (formData, e) => {
    e?.preventDefault()
    fetchData(formData)
  })

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-md">
        <Input
          srOnly
          errorMsg={errors.searchTerm?.message}
          placeholder="Exercise name (eg. Barbell squat)"
          {...register('searchTerm')}
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
      {exercises?.length === 0 && !loading && (
        <p className="font-medium text-md ml-2 mt-1">No exercises found.</p>
      )}

      <ResponsiveGrid>
        {loading ? (
          <ExerciseCardContainer.Skeleton />
        ) : (
          exercises &&
          exercises.map((exercise) => (
            <AddExerciseCard key={exercise.id} exercise={exercise} />
          ))
        )}
      </ResponsiveGrid>
    </>
  )
}

export default NameSearch
