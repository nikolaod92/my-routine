'use client'

import { RoutineExercise } from '@/lib/database.types'
import { useStore } from '@/store'
import ExerciseDayNavigation from '../Create/ExerciseDayNavigation'
import ExerciseGrid from '../UI/ResponsiveGrid'
import RoutineGrid from './RoutineGrid'

function RoutineDisplay({ exercises }: { exercises: RoutineExercise[] }) {
  const [currentDay] = useStore((state) => [state.currentDay])

  const singleDayExerciseList = exercises?.filter(
    (ex) => ex.day_of_week === currentDay
  )
  return (
    <>
      <ExerciseDayNavigation />
      <ExerciseGrid>
        {singleDayExerciseList && (
          <RoutineGrid exercises={singleDayExerciseList} />
        )}
      </ExerciseGrid>
    </>
  )
}

export default RoutineDisplay
