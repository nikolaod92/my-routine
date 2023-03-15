'use client'

import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
import { useStore } from '@/store'
import useDayPath from '@/hooks/useDayPath'

function ExerciseDayNavigation() {
  const router = useRouter()
  const currentDayPath = useDayPath()

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
            className={`btn btn-xs ${currentDayPath === i + 1 && 'btn-active'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-outline btn-primary btn-xs "
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
