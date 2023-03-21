import ExerciseDayNavigation from '@/components/CreateExerciseForm/ExerciseDayNavigation'
import SelectedExerciseDisplay from '@/components/CreateExerciseForm/SelectedExerciseDisplay'
import ExerciseSelect from '@/components/CreateExerciseForm/ExerciseSelect'

import SubmitRoutine from '@/components/CreateExerciseForm/SubmitRoutine'

export default async function Day() {
  return (
    <>
      <div className="flex flex-col w-full mb-2 space-y-2">
        <div className="flex">
          <p className="text-xl font-semibold flex-1">Push Pull Legs</p>
          <SubmitRoutine />
        </div>
        <ExerciseDayNavigation />
      </div>
      <SelectedExerciseDisplay />
      <ExerciseSelect />
    </>
  )
}
