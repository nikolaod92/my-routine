'use client'

import { Database } from '@/lib/database.types'
import { useEffect, useState } from 'react'
import { useSupabase } from '../SupabaseProvider'
import Exercise from './Exercise'

export type ExerciseType = Database['public']['Tables']['exercise']['Row']
type BodyPart = Database['public']['Views']['distinct_body_part']['Row']

export default function ExerciseSelect() {
  const { supabase } = useSupabase()

  const [bodyParts, setBodyParts] = useState<BodyPart[]>([])
  const [selected, setSelected] = useState('chest')
  const [exercises, setExercises] = useState<ExerciseType[]>([])

  useEffect(() => {
    const fetchBodyParts = async () => {
      const { data } = await supabase.from('distinct_body_part').select()

      if (!data) return
      setBodyParts(data)
    }
    fetchBodyParts()
    console.log('Fetching....')
  }, [supabase])

  useEffect(() => {
    setExercises([])
    const fetchExercises = async () => {
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
    }
    fetchExercises()
  }, [selected, supabase])

  return (
    <div>
      <select
        className="select select-primary w-full capitalize"
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
      >
        {bodyParts?.map((bodyPart: any) => (
          <option key={bodyPart.bodyPart} className="capitalize">
            {bodyPart.bodyPart}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-4">
        {exercises.map((exercise) => (
          <Exercise key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  )
}
