'use client'

import { useStore } from '@/store'

function ResetButton() {
  const [resetExercises] = useStore((state) => [state.resetExercises])

  return (
    <button
      type="button"
      className="btn btn-secondary btn-xs "
      onClick={(e) => {
        e.preventDefault()
        resetExercises()
      }}
    >
      Clear All
    </button>
  )
}

export default ResetButton
