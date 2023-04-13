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
        <p className="text-xs font-semibold ">Search exercises by: </p>
        <div>
          <button
            type="button"
            className="btn btn-xs md:btn-sm mr-2"
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
      </div>
      {current}
    </>
  )
}

export default ExerciseSelect
