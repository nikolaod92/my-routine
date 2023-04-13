'use client'

import { DAYS_OF_WEEK } from '@/lib/constants'
import { useStore } from '@/store'
import { useEffect } from 'react'

function ExerciseDayNavigation() {
  const [currentDay, setCurrentDay] = useStore((state) => [
    state.currentDay,
    state.setCurrentDay,
  ])

  const date = new Date()
  const today = DAYS_OF_WEEK[date.getDay()]

  useEffect(() => {
    setCurrentDay(today)
  }, [setCurrentDay, today])

  return (
    <div className="btn-group">
      {DAYS_OF_WEEK.map((day) => (
        <button
          key={day}
          type="button"
          className={`btn btn-sm relative capitalize ${
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
