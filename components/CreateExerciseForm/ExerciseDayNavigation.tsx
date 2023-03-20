'use client'

import { useStore } from '@/store'

function ExerciseDayNavigation() {
  const [currentDay, setCurrentDay, resetExercises] = useStore((state) => [
    state.currentDay,
    state.setCurrentDay,
    state.resetExercises,
  ])

  const daysOfWeek = ['m', 'tu', 'w', 'th', 'f', 'sa', 'su'] as const

  return (
    <div className="flex space-x-2 items-center">
      <div className="btn-group">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            type="button"
            className={`btn btn-xs capitalize ${
              currentDay === day && 'btn-active'
            }`}
            onClick={() => setCurrentDay(day)}
          >
            {day}
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
