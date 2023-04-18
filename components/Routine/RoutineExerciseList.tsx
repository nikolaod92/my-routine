'use client'

import { useMounted } from '@/hooks/useMounted'
import { RoutineExercise } from '@/lib/database.types'
import { useStore } from '@/store'
import ResponsiveGrid from '../UI/ResponsiveGrid'
import RoutineExerciseGrid from './RoutineExerciseGrid'

function RoutineExerciseList({ exercises }: { exercises: RoutineExercise[] }) {
  const [currentDay] = useStore((state) => [state.currentDay])

  const mounted = useMounted()

  if (!mounted) return null

  const singleDayExerciseList = exercises?.filter(
    (ex) => ex.day_of_week === currentDay
  )

  return (
    <ResponsiveGrid>
      {singleDayExerciseList && (
        <RoutineExerciseGrid exercises={singleDayExerciseList} />
      )}
    </ResponsiveGrid>
  )
}

export default RoutineExerciseList
