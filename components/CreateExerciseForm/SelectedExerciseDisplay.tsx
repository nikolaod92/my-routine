'use client'

import { useStore } from '@/store'
import { useMemo } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'

function SelectedExerciseDisplay() {
  const [exercises, currentDay, deleteExercise] = useStore((state) => [
    state.exercises,
    state.currentDay,
    state.deleteExercise,
  ])

  const exercisesOnDay = useMemo(
    () => exercises.filter((ex) => ex.day_of_week === currentDay),
    [currentDay, exercises]
  )

  if (!exercisesOnDay.length) return null

  return (
    <div className="flex flex-col my-2 space-y-1">
      {exercisesOnDay.map((ex) => (
        <div className="flex justify-between space-x-2">
          <div className="flex flex-1 justify-between capitalize text-xs bg-base-100 shadow-sm rounded-lg px-2 py-1 ">
            <h2 className=" font-semibold line-clamp-1">{ex.name}</h2>
            <div className="flex space-x-2">
              <p className="badge badge-sm badge-primary font-semibold text-base-100 whitespace-nowrap">
                {ex.sets} / {ex.reps}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-xs btn-warning"
            onClick={() => deleteExercise(ex)}
          >
            <TrashIcon width={16} height={16} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default SelectedExerciseDisplay
