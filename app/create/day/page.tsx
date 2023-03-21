import ExerciseDayNavigation from '@/components/CreateExerciseForm/ExerciseDayNavigation'
import SelectedExerciseDisplay from '@/components/CreateExerciseForm/SelectedExerciseDisplay'
import ExerciseSelect from '@/components/CreateExerciseForm/ExerciseSelect'
import { createServerClient } from '@/utils/supabase-server'
import SubmitRoutine from '@/components/CreateExerciseForm/SubmitRoutine'

export default async function Day() {
  const supabase = createServerClient()

  const { data: muscleGroups } = await supabase
    .from('distinct_muscle_group')
    .select()
    .then()

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
      {muscleGroups && <ExerciseSelect muscleGroups={muscleGroups} />}
    </>
  )
}
