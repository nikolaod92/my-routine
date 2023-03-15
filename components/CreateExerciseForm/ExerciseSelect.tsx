/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ExerciseType, MuscleGroup } from '@/lib/database.types'
import ExerciseGrid from './ExerciseGrid'
import { useSupabase } from '../SupabaseProvider'
import ExerciseSearch from './ExerciseSearch'
import MuscleGroupSelect from './MuscleGroupSelect'
import Exercise from './Exercise'

export default function ExerciseSelect({
  muscleGroups,
}: {
  muscleGroups: MuscleGroup[]
}) {
  const { supabase } = useSupabase()
  const { register, handleSubmit } = useForm()

  const [selected, setSelected] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [exercises, setExercises] = useState<ExerciseType[]>([])
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
        .eq('body_part', selected)
        .limit(10)

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
      <ExerciseSearch
        onSubmit={onSubmit}
        register={register}
        name="searchTerm"
      />

      <MuscleGroupSelect
        selected={selected}
        onChange={(e) => setSelected(e.target.value)}
        muscleGroups={muscleGroups}
      />
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
