'use client'

import { usePathname, useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
import { useStore } from '@/store'

function ExerciseDayNavigation() {
  const router = useRouter()
  const path = usePathname()

  const days = useStore((state) => state.routineInfo.daysPerWeek)

  const navigate: MouseEventHandler<HTMLDivElement> = (e) => {
    const page = (e.target as HTMLElement).innerHTML
    router.push(`/create/day/${page}`)
  }

  return (
    <div className="btn-group" onClick={navigate} aria-hidden="true">
      {Array.from({ length: days }, (_, i) => (
        <button
          type="button"
          className={`btn btn-xs ${
            path?.charAt(path.length - 1) === (i + 1).toString() && 'btn-active'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

export default ExerciseDayNavigation
