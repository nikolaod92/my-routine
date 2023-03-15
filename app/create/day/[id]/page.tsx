/* eslint-disable @typescript-eslint/no-unused-vars */

import Link from 'next/link'
import ExerciseDayNavigation from '@/components/CreateExerciseForm/ExerciseDayNavigation'
import SelectedExerciseDisplay from '@/components/CreateExerciseForm/SelectedExerciseDisplay'
import ExerciseSelect from '@/components/CreateExerciseForm/ExerciseSelect'
import { createServerClient } from '@/utils/supabase-server'

export default async function Day({ params }: { params: { id: string } }) {
  const supabase = createServerClient()

  const { data: muscleGroups } = await supabase
    .from('distinct_body_part')
    .select()

  return (
    <>
      <div className="flex justify-between w-full items-center mb-2">
        <Link className="btn btn-accent btn-xs md:btn-sm" href="/create">
          Back
        </Link>
        <ExerciseDayNavigation />
        <Link className="btn btn-accent btn-xs md:btn-sm" href="/create/review">
          Review
        </Link>
      </div>
      <SelectedExerciseDisplay day={params.id} />
      {muscleGroups && <ExerciseSelect muscleGroups={muscleGroups} />}
    </>
  )
}
