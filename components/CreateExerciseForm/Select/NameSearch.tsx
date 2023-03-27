'use client'

import { FieldValues, useForm } from 'react-hook-form'
import useFetchSupabase from '@/hooks/useFetchSupabase'
import ExerciseCard from '../ExerciseCard'
import ExerciseGrid from '../ResponsiveGrid'
import { useSupabase } from '../../SupabaseProvider'

function NameSearch() {
  const { supabase } = useSupabase()
  const { register, handleSubmit } = useForm()

  const getExercises = async (formData: FieldValues) => {
    const { data, error } = await supabase
      .from('exercise')
      .select()
      .textSearch('name', formData.searchTerm, {
        config: 'english',
        type: 'websearch',
      })
      .limit(20)

    return { data, error }
  }

  const { fetchData, data: exercises } = useFetchSupabase(getExercises)

  const onSubmit = handleSubmit(async (formData, e) => {
    e?.preventDefault()
    fetchData(formData)
  })

  return (
    <>
      <form onSubmit={onSubmit} className="">
        <div className="input-group ">
          <input
            type="text"
            placeholder="Exercise name"
            {...register('searchTerm')}
            className="input input-bordered input-xs sm:input-sm input-primary w-72"
          />
          <button
            type="submit"
            className="btn btn-square btn-primary btn-xs sm:btn-sm "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-4 sm:w-4"
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
        </div>
      </form>

      {exercises && (
        <ExerciseGrid>
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </ExerciseGrid>
      )}
    </>
  )
}

export default NameSearch
