/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ExerciseGrid, { ExerciseType } from './ExerciseGrid'
import { useSupabase } from '../SupabaseProvider'
import ExerciseSearch from './ExerciseSearch'
import MuscleGroupSelect from './MuscleGroupSelect'

export default function ExerciseSelect() {
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
    setErrorMsg('')
    const fetchExercises = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('exercise')
        .select()
        .eq('body_part', selected)
        .limit(10)

      if (error) {
        // TODO: handle errors
      }

      if (!data) return
      setExercises(data)
      setLoading(false)
    }

    if (!selected) return

    fetchExercises()
  }, [selected, supabase])

  return (
    <div>
      <label className="label">
        <span className="label-text">Search for an exercise: </span>
      </label>
      <ExerciseSearch
        onSubmit={onSubmit}
        register={register}
        name="searchTerm"
      />
      <label className="label">
        <span className="label-text">or choose a body part: </span>
      </label>
      <MuscleGroupSelect
        selected={selected}
        onChange={(e) => setSelected(e.target.value)}
      />
      {loading ? <div>Loading...</div> : <ExerciseGrid exercises={exercises} />}
      {errorMsg && <div>{errorMsg}</div>}
    </div>
  )
}
