'use client'

import { daysOfWeek } from '@/lib/constants'
import { useStore } from '@/store'

function ExerciseDayNavigation() {
  const [currentDay, setCurrentDay] = useStore((state) => [
    state.currentDay,
    state.setCurrentDay,
  ])

  return (
    <div className="btn-group">
      {daysOfWeek.map((day) => (
        <button
          key={day}
          type="button"
          className={`btn btn-xs md:btn-sm relative capitalize ${
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
