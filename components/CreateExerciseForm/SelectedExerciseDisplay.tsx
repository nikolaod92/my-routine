'use client'

import { useStore } from '@/store'
import { useMemo } from 'react'

function SelectedExerciseDisplay({ day }: { day: string }) {
  const [exercises] = useStore((state) => [state.exercises])

  const exercisesOnDay = useMemo(
    () => exercises.filter((ex) => ex.day_of_week === Number(day)),
    [day, exercises]
  )

  return (
    <div className="flex flex-col mt-4 mb-2 space-y-1">
      {exercisesOnDay.map((ex) => (
        <div className="flex justify-between capitalize text-xs bg-base-300 shadow-sm rounded px-2 py-1 ">
          <h2 className=" font-semibold">{ex.name}</h2>
          <div className="flex space-x-2">
            <p className="">Sets</p>
            <p className="badge badge-sm badge-primary font-semibold">
              {ex.sets}
            </p>
            <p>Reps</p>
            <p className="badge badge-sm badge-primary font-semibold">
              {ex.reps}
            </p>
          </div>
          {/* <button type="button" className="btn btn-xs btn-primary">
            Edit
          </button> */}
        </div>
      ))}
    </div>
  )
}

export default SelectedExerciseDisplay
