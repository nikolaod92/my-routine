'use client'

import { DAYS_OF_WEEK } from '@/lib/constants'
import { useStore } from '@/store'

function ExerciseDayNavigation() {
  const [currentDay, setCurrentDay] = useStore((state) => [
    state.currentDay,
    state.setCurrentDay,
  ])

  return (
    <div className="btn-group">
      {DAYS_OF_WEEK.map((day) => (
        <button
          key={day}
          type="button"
          className={`btn-xs btn relative capitalize md:btn-sm ${
            currentDay === day && 'btn-primary '
          }`}
          onClick={() => setCurrentDay(day)}
        >
          {day}
        </button>
      ))}
    </div>
  )
}

export default ExerciseDayNavigation
