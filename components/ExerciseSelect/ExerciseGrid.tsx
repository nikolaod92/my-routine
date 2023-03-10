import { useEffect, useState } from 'react'
import { Database } from '@/lib/database.types'
import { useSupabase } from '../SupabaseProvider'
import Exercise from './Exercise'

export type ExerciseType = Database['public']['Tables']['exercise']['Row']

function ExerciseGrid({ selected }: { selected: string }) {
  const [exercises, setExercises] = useState<ExerciseType[]>([])
  const { supabase } = useSupabase()

  useEffect(() => {
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
      {exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}

export default ExerciseGrid
