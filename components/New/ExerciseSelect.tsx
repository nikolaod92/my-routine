'use client'

import { useState } from 'react'
import MuscleGroupSelect from './MuscleGroupSelect'
import NameSearch from './NameSearch'

function ExerciseSelect() {
  const [current, setCurrent] = useState<JSX.Element | null>(null)

  return (
    <>
      <div className="flex space-x-2 items-center">
        <p>Search by: </p>
        <button
          type="button"
          className="btn btn-xs btn-primary text-base-100 "
          onClick={() => setCurrent(<MuscleGroupSelect />)}
        >
          Muscle Group
        </button>
        <button
          type="button"
          className="btn btn-xs btn-primary text-base-100"
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
