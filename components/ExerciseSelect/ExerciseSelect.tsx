'use client'

import { Database } from '@/lib/database.types'
import { useEffect, useState } from 'react'
import { useSupabase } from '../SupabaseProvider'
import Exercise from './Exercise'

export type ExerciseType = Database['public']['Tables']['exercise']['Row']

export default function ExerciseSelect({ bodyParts }: any) {
  const { supabase } = useSupabase()

  const [selected, setSelected] = useState('')
  const [exercises, setExercises] = useState<ExerciseType[]>([])

  useEffect(() => {
    setExercises([])
    const fetchExercises = async () => {
      const { data, error } = await supabase
        .from('exercise')
        .select()
        .eq('bodyPart', selected)
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
