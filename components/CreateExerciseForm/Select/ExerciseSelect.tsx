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
      <div className="flex space-x-2 items-center justify-center mb-4">
        <p className="text-sm font-semibold uppercase">Search exercises by: </p>
        <button
          type="button"
          className="btn btn-xs md:btn-sm"
          onClick={() => setCurrent(<MuscleGroupSearch />)}
        >
          Muscle Group
        </button>
        <button
          type="button"
          className="btn btn-xs md:btn-sm"
          onClick={() => setCurrent(<NameSearch />)}
        >
          Name
        </button>
      </div>
      {current}
    </>
  )
}

export default ExerciseSelect
