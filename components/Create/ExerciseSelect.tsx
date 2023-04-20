'use client'

import { useState } from 'react'
import MuscleGroupSearch from './MuscleGroupSearch'
import NameSearch from './NameSearch'

function ExerciseSelect() {
  const [current, setCurrent] = useState<JSX.Element | null>(
    <MuscleGroupSearch />
  )

  return (
    <>
      <div className="flex flex-col justify-center mb-4">
        <p className="font-medium text-xs mb-[0.1rem] px-1">
          Choose exercises by
        </p>
        <div>
          <button
            type="button"
            className="btn btn-sm btn-primary rounded-e-none border-r-2 border-r-white"
            onClick={() => setCurrent(<MuscleGroupSearch />)}
          >
            Muscle Group
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary rounded-s-none"
            onClick={() => setCurrent(<NameSearch />)}
          >
            Name
          </button>
        </div>
      </div>
      {current}
    </>
  )
}

export default ExerciseSelect
