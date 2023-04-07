import ResponsiveGrid from '@/components/CreateExerciseForm/ResponsiveGrid'
import {
  ExerciseCardContainer,
  ExerciseHeader,
  ExerciseImage,
  ExerciseTitle,
} from '@/components/Exercise'
import { createServerClient } from '@/utils/supabase-server'

export const revalidate = 60

export default async function Exercises() {
  const supabase = createServerClient()
  const { data: exercises } = await supabase.from('exercise').select().limit(10)

  return (
    <div>
      <h1 className="text-2xl font-bold">Browse:</h1>
      <ResponsiveGrid>
        {exercises?.map((exercise) => (
          <ExerciseCardContainer key={exercise.id}>
            <ExerciseHeader>
              <ExerciseTitle name={exercise.name} />
            </ExerciseHeader>
            <ExerciseImage src={exercise.gif} alt={exercise.name} />
          </ExerciseCardContainer>
        ))}
      </ResponsiveGrid>
    </div>
  )
}
