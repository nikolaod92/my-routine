'use client'

import { useStore } from '@/store'
import ResetButton from './ResetButton'

const daysOfWeek = ['m', 'tu', 'w', 'th', 'f', 'sa', 'su'] as const

function ExerciseDayNavigation() {
  const [currentDay, setCurrentDay] = useStore((state) => [
    state.currentDay,
    state.setCurrentDay,
  ])

  return (
    <div className="flex space-x-2 items-center justify-between sm:justify-start">
      <div className="btn-group">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            type="button"
            className={`btn btn-xs relative capitalize ${
              currentDay === day && 'btn-active'
            }`}
            onClick={() => setCurrentDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <ResetButton />
    </div>
  )
}

export default ExerciseDayNavigation
