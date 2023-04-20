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
          type="button"
          className="btn btn-sm"
          onClick={() => setRange((prev) => prev - PAGINATION_STEP)}
        >
          «
        </button>
      )}
      <button type="button" className="btn btn-sm">
        {Math.floor((range + PAGINATION_STEP) / PAGINATION_STEP)} /{' '}
        {Math.ceil(count / PAGINATION_STEP)}
      </button>
      {count - (range + 1) >= PAGINATION_STEP && (
        <button
          type="button"
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
