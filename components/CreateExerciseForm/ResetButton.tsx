'use client'

import { useStore } from '@/store'

function ResetButton() {
  const [resetExercises] = useStore((state) => [state.resetExercises])

  return (
    <button
      type="button"
      className="btn btn-outline btn-error btn-xs "
      onClick={(e) => {
        e.preventDefault()
        resetExercises()
      }}
    >
      Clear
    </button>
  )
}

export default ResetButton
