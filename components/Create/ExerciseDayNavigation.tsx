'use client'

import { useMounted } from '@/hooks/useMounted'
import { DAYS_OF_WEEK } from '@/lib/constants'
import { useStore } from '@/store'
import { Skeleton } from '../UI/Skeleton'

function ExerciseDayNavigation() {
  const [currentDay, setCurrentDay] = useStore((state) => [
    state.currentDay,
    state.setCurrentDay,
  ])

  const mounted = useMounted()
  if (!mounted) return <Skeleton className="h-8 w-64 bg-slate-200" />

  return (
    <div className="btn-group justify-between max-w-lg">
      {DAYS_OF_WEEK.map((day) => (
        <button
          key={day}
          type="button"
          className={`btn btn-xs sm:btn-sm flex-1 capitalize ${
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
