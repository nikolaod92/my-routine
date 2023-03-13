import { useEffect, useState } from 'react'
import { Database } from '@/lib/database.types'
import { useSupabase } from '../SupabaseProvider'
import Exercise from './Exercise'

export type ExerciseType = Database['public']['Tables']['exercise']['Row']

function ExerciseGrid({ selected }: { selected: string }) {
  const [exercises, setExercises] = useState<ExerciseType[]>([])
  const { supabase } = useSupabase()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
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
    fetchExercises()
  }, [selected, supabase])

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          {exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ExerciseGrid
