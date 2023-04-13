'use client'

import ExerciseDayNavigation from '@/components/CreateExerciseForm/ExerciseDayNavigation'
import SelectedExerciseDisplay from '@/components/CreateExerciseForm/SelectedExerciseDisplay'

import ExerciseSelect from '@/components/CreateExerciseForm/Select/ExerciseSelect'

export default function Day() {
  return (
    <div className="flex flex-col">
      <ExerciseDayNavigation />
      <SelectedExerciseDisplay />
      <div className="divider" />
      <ExerciseSelect />
    </div>
  )
}
