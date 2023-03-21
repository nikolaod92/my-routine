import ExerciseGrid from '@/components/CreateExerciseForm/ExerciseGrid'
import { createServerClient } from '@/utils/supabase-server'
import { StarIcon } from '@heroicons/react/20/solid'
import ExerciseDayNavigation from '@/components/CreateExerciseForm/ExerciseDayNavigation'
import RoutineGrid from '@/components/RoutineDisplay/RoutineGrid'
import { RoutineExercise } from '@/lib/database.types'

export const revalidate = 60

export default async function Routine({ params }: any) {
  const supabase = createServerClient()

  const { data: routine } = await supabase
    .from('routine')
    .select()
    .eq('id', params.id)
    .single()

  const { data } = await supabase
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

  const dataOnDay = data?.filter((ex) => ex.day_of_week === 'tu')

  if (data)
    return (
      <div className="p-1">
        <div className="flex justify-between items-center space-x-1">
          <h1 className="flex-1 font-bold text-2xl">{routine?.name}</h1>
          <p className="text-xs font-bold mt-1">32</p>
          <StarIcon width={24} height={24} className="fill-primary" />
        </div>
        <h1 className="font-light text-lg">{routine?.description}</h1>
        <ExerciseDayNavigation />
        <ExerciseGrid>
          {dataOnDay && <RoutineGrid exercises={dataOnDay} />}
        </ExerciseGrid>
      </div>
    )
}
