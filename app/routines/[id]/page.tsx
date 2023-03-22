import { createServerClient } from '@/utils/supabase-server'
import { RoutineExercise } from '@/lib/database.types'
import RoutineInfo from '@/components/RoutineDisplay/RoutineInfo'
import RoutineDisplay from '@/components/RoutineDisplay/RoutineDisplay'

export const revalidate = 60

export default async function Routine({ params }: any) {
  const supabase = createServerClient()

  const { data: routine } = await supabase
    .from('routine')
    .select()
    .eq('id', params.id)
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
    .eq('routine_id', params.id)
    .returns<RoutineExercise[]>()

  if (routine && exercises)
    return (
      <div className="space-y-2">
        <RoutineInfo routine={routine} />
        <RoutineDisplay exercises={exercises} />
      </div>
    )

  return <div>Error getting routine.</div>
}
