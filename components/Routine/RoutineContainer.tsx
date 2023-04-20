import { RoutineExercise } from '@/lib/database.types'
import { createServerClient } from '@/utils/supabase-server'
import ExerciseDayNavigation from '../Create/ExerciseDayNavigation'
import RoutineExerciseList from './RoutineExerciseList'
import RoutineInfo from './RoutineInfo'

async function RoutineContainer({ id }: { id: string }) {
  const supabase = createServerClient()

  const { data: routine } = await supabase
    .from('routine')
    .select()
    .eq('id', id)
    .single()

  const { data: exercises } = await supabase
    .from('exercises_on_day')
    .select(
      `sets, reps, day_of_week, 
  exercise (
    name,
    gif,
    target,
    id,
    equipment,
    muscle_group
  )`
    )
    .eq('routine_id', id)
    .returns<RoutineExercise[]>()

  if (routine && exercises)
    return (
      <div className="flex flex-col space-y-4">
        <RoutineInfo routine={routine} />
        <ExerciseDayNavigation />
        <RoutineExerciseList exercises={exercises} />
      </div>
    )
}

export default RoutineContainer
