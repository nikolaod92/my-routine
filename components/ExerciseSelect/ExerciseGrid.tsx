import { Database } from '@/lib/database.types'
import Exercise from './Exercise'

export type ExerciseType = Database['public']['Tables']['exercise']['Row']

function ExerciseGrid({ exercises }: { exercises: ExerciseType[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
      {exercises.map((exercise) => (
        <Exercise key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}

export default ExerciseGrid
