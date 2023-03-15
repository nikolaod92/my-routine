'use client'

import { usePathname, useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
import { useStore } from '@/store'

function ExerciseDayNavigation() {
  const router = useRouter()
  const path = usePathname()

  const [days, resetExercises] = useStore((state) => [
    state.routineInfo.daysPerWeek,
    state.resetExercises,
  ])

  const navigate: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const page = (e.target as HTMLElement).innerHTML
    router.push(`/create/day/${page}`)
  }

  return (
    <div className="flex space-x-2 items-center">
      <div className="btn-group" onClick={navigate} aria-hidden="true">
        {Array.from({ length: days }, (_, i) => (
          <button
            type="button"
            key={i}
            className={`btn btn-xs ${
              path?.charAt(path.length - 1) === (i + 1).toString() &&
              'btn-active'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-warning btn-xs "
        onClick={(e) => {
          e.preventDefault()
          resetExercises()
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default ExerciseDayNavigation
