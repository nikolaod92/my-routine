/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Exercise } from '@/lib/database.types'
import ExerciseGrid from './ExerciseGrid'
import { useSupabase } from '../SupabaseProvider'
import ExerciseSearch from './ExerciseSearch'
import MuscleGroupSelect from './MuscleGroupSelect'
import Exercise from './ExerciseCard'

export default function ExerciseSelect() {
  const { supabase } = useSupabase()
  const { register, handleSubmit } = useForm()

  const [selected, setSelected] = useState<string>('')
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

  useEffect(() => {
    setExercises([])
    setErrorMsg('')
    const fetchExercises = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('exercise')
        .select()
        .eq('muscle_group', selected)
        .range(0, 9)

      if (error) {
        setErrorMsg(error.message)
      }

      if (!data) return
      setExercises(data)
      setLoading(false)
    }
    if (!selected) return

    fetchExercises()
  }, [selected, supabase])

  return (
    <>
      <div className="flex justify-between space-x-2">
        <MuscleGroupSelect
          selected={selected}
          onChange={(e) => setSelected(e.target.value)}
        />
        <ExerciseSearch
          onSubmit={onSubmit}
          register={register}
          name="searchTerm"
        />
      </div>
      {loading ? (
        <div className="mt-2">Loading...</div>
      ) : (
        <ExerciseGrid>
          {exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </ExerciseGrid>
      )}
      {errorMsg && <div>{errorMsg}</div>}
    </>
  )
}
