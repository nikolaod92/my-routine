/* eslint-disable react/button-has-type */

import { PAGINATION_STEP } from '@/lib/constants'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  range: number
  count: number
  setRange: Dispatch<SetStateAction<number>>
}

function ExercisePagination({ range, setRange, count }: Props) {
  return (
    <div className="btn-group">
      {range > 0 && (
        <button
          className="btn btn-xs"
          onClick={() => setRange((prev) => prev - PAGINATION_STEP)}
        >
          «
        </button>
      )}
      <button className="btn btn-xs">
        Page {(range + PAGINATION_STEP) / PAGINATION_STEP}
      </button>
      {count - (range + 1) > PAGINATION_STEP && (
        <button
          onClick={() => setRange((prev) => prev + PAGINATION_STEP)}
          className="btn btn-xs"
        >
          »
        </button>
      )}
    </div>
  )
}

export default ExercisePagination
