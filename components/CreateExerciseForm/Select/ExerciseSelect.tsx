'use client'

import { useState } from 'react'
import MuscleGroupSearch from './MuscleGroupSearch'
import NameSearch from './NameSearch'

function ExerciseSelect() {
  const [current, setCurrent] = useState<JSX.Element | null>(null)

  return (
    <>
      <div className="flex space-x-2 items-center mb-2">
        <button
          type="button"
          className="btn btn-xs btn-primary text-base-100 "
          onClick={() => setCurrent(<MuscleGroupSearch />)}
        >
          Choose Muscle Group
        </button>
        <button
          type="button"
          className="btn btn-xs btn-primary text-base-100"
          onClick={() => setCurrent(<NameSearch />)}
        >
          Search By Name
        </button>
      </div>
      {current}
    </>
  )
}

export default ExerciseSelect
