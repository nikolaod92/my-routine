'use client'

import { RoutineExercise } from '@/lib/database.types'
import { ExerciseImage } from '../ExerciseCard'
import ResponsiveGrid from '../UI/ResponsiveGrid'

function RoutineExerciseGrid({ exercises }: { exercises: RoutineExercise[] }) {
  if (exercises.length === 0)
    return (
      <div className="max-w-fit rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-content shadow">
        Rest day.
      </div>
    )

  return (
    <ResponsiveGrid>
      {exercises.map((ex) => (
        <div key={ex.exercise.id} className="card flex-1 bg-base-100 shadow">
          <p className="badge-primary badge badge-xs m-2 rounded-xl p-2 font-semibold uppercase">
            {ex?.exercise.target}
          </p>
          <ExerciseImage src={ex.exercise.gif} alt={ex.exercise.name} />
          <div className="card-body justify-between space-y-2 p-4 pt-2">
            <h2 className="line-clamp-2 text-center text-sm font-semibold capitalize leading-5">
              {ex?.exercise.name}
            </h2>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-end text-xs font-medium">Sets</p>
              <p className="badge-primary badge badge-sm font-bold">
                {ex.sets}
              </p>
              <p className="text-end text-xs font-medium">Reps</p>
              <p className="badge-primary badge badge-sm font-bold">
                {ex.reps}
              </p>
            </div>
          </div>
        </div>
      ))}
    </ResponsiveGrid>
  )
}

export default RoutineExerciseGrid
