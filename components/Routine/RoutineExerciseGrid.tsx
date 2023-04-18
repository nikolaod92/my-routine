'use client'

import { RoutineExercise } from '@/lib/database.types'
import { ExerciseImage } from '../ExerciseCard'

function RoutineExerciseGrid({ exercises }: { exercises: RoutineExercise[] }) {
  if (exercises.length === 0)
    return (
      <div className="max-w-fit bg-primary text-primary-content rounded py-2 px-4 font-semibold text-sm shadow">
        Rest day.
      </div>
    )

  return (
    <>
      {exercises.map((ex) => (
        <div key={ex.exercise.id} className="card bg-base-100 shadow">
          <p className="badge badge-xs badge-primary rounded-xl p-2 m-2 font-semibold uppercase">
            {ex?.exercise.target}
          </p>
          <ExerciseImage src={ex.exercise.gif} alt={ex.exercise.name} />
          <div className="card-body p-4 space-y-2 pt-2 justify-between">
            <h2 className="text-center font-semibold text-sm capitalize line-clamp-2">
              {ex?.exercise.name}
            </h2>
            <div className="flex space-x-2 justify-center items-center  self-center">
              <p className="text-xs text-end font-medium">Sets</p>
              <p className="badge badge-sm badge-primary font-bold">
                {ex.sets}
              </p>
              <p className="text-xs text-end font-medium">Reps</p>
              <p className="badge badge-sm badge-primary font-bold">
                {ex.reps}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default RoutineExerciseGrid
