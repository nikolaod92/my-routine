/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { Exercise } from '@/lib/database.types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ExerciseCard from '../ExerciseCard'
import ExerciseGrid from '../ResponsiveGrid'
import { useSupabase } from '../../SupabaseProvider'

function NameSearch() {
  const { supabase } = useSupabase()
  const { register, handleSubmit } = useForm()

  const [loading, setLoading] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = handleSubmit(async (formData, e) => {
    e?.preventDefault()
    setExercises([])
    setErrorMsg('')
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('exercise')
        .select()
        .textSearch('name', formData.searchTerm, {
          config: 'english',
          type: 'websearch',
        })
        .limit(20)
      if (error) {
        setErrorMsg(error.message)
      }

      if (!data || data.length === 0) {
        setLoading(false)
        setErrorMsg('No exercises found.')
        return
      }

      setExercises(data)
    } catch (error) {
      setErrorMsg('Something went wrong.')
    }
    setLoading(false)
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
