import { RoutineExercise } from '@/lib/database.types'
import { createServerClient } from '@/utils/supabase-server'
import RoutineDisplay from './RoutineDisplay'
import RoutineInfo from './RoutineInfo'

async function Routine({ id }: { id: string }) {
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
      <div className="space-y-4">
        <RoutineInfo routine={routine} />
        <RoutineDisplay exercises={exercises} />
      </div>
    )
}

export default Routine
