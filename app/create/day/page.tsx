import ExerciseDayNavigation from '@/components/CreateExerciseForm/ExerciseDayNavigation'
import ResetButton from '@/components/CreateExerciseForm/ResetButton'
import SelectedExerciseDisplay from '@/components/CreateExerciseForm/SelectedExerciseDisplay'

import SubmitRoutine from '@/components/CreateExerciseForm/SubmitRoutine'
import ExerciseSelect from '@/components/New/ExerciseSelect'

export default async function Day() {
  return (
    <>
      <div className="flex flex-col w-full mb-2 space-y-2">
        <div className="flex">
          <p className="text-xl font-semibold flex-1">Push Pull Legs</p>
          <SubmitRoutine />
        </div>
        <div className="flex space-x-2 justify-between md:justify-start">
          <ExerciseDayNavigation />
          <ResetButton />
        </div>
      </div>
      <SelectedExerciseDisplay />
      <ExerciseSelect />
    </>
  )
}
