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
          className="btn btn-sm"
          onClick={() => setRange((prev) => prev - PAGINATION_STEP)}
        >
          «
        </button>
      )}
      <button className="btn btn-sm">
        {(range + PAGINATION_STEP) / PAGINATION_STEP} /{' '}
        {Math.ceil(count / PAGINATION_STEP)}
      </button>
      {count - (range + 1) >= PAGINATION_STEP && (
        <button
          onClick={() => setRange((prev) => prev + PAGINATION_STEP)}
          className="btn btn-sm"
        >
          »
        </button>
      )}
    </div>
  )
}

export default ExercisePagination
