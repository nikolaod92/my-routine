'use client'

import { RoutineExercise } from '@/lib/database.types'
import Image from 'next/image'

function RoutineGrid({ exercises }: { exercises: RoutineExercise[] }) {
  return (
    <>
      {exercises.map((ex) => (
        <div className="card bg-base-100 shadow-md">
          <p className="badge badge-xs badge-primary text-base-100 rounded-xl p-2 m-2 font-semibold uppercase">
            {ex?.exercise.target}
          </p>
          {ex.exercise.gif && (
            <Image
              className="p-4 mx-auto"
              src={ex?.exercise.gif}
              alt="Shoes"
              width={160}
              height={160}
            />
          )}
          <div className="card-body p-4 space-y-2 pt-2 justify-between">
            <h2 className="text-center font-semibold text-sm capitalize line-clamp-2">
              {ex?.exercise.name}
            </h2>
            <div className="flex space-x-2 justify-center items-center  self-center">
              <p className="text-xs text-end font-light">Sets</p>
              <p className="badge badge-sm badge-primary text-base-100 font-bold">
                {ex.sets}
              </p>
              <p className="text-xs text-end font-light">Reps</p>
              <p className="badge badge-sm badge-primary text-base-100 font-bold">
                {ex.reps}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default RoutineGrid