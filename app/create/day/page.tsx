'use client'

import ExerciseDayNavigation from '@/components/CreateExerciseForm/ExerciseDayNavigation'
import SelectedExerciseDisplay from '@/components/CreateExerciseForm/SelectedExerciseDisplay'

import ExerciseSelect from '@/components/CreateExerciseForm/Select/ExerciseSelect'

export default function Day() {
  return (
    <>
      <ExerciseDayNavigation />
      <SelectedExerciseDisplay />
      <ExerciseSelect />
    </>
  )
}
