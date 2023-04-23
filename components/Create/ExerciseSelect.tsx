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
      <div className="mb-4 flex flex-col justify-center">
        <p className="mb-[0.1rem] px-1 text-xs font-medium">
          Choose exercises by
        </p>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-sm rounded-e-none border-r-2 border-r-white"
            onClick={() => setCurrent(<MuscleGroupSearch />)}
          >
            Muscle Group
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm rounded-s-none"
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
