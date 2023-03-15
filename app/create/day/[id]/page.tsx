/* eslint-disable @typescript-eslint/no-unused-vars */

import Link from 'next/link'
import ExerciseDayNavigation from '@/components/CreateExerciseForm/ExerciseDayNavigation'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SelectedExerciseDisplay from '@/components/CreateExerciseForm/SelectedExerciseDisplay'
import ExerciseSelect from '@/components/CreateExerciseForm/ExerciseSelect'

export default function Day({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex justify-between w-full items-center">
        <ExerciseDayNavigation />
        <p>Choose exercises for day {params.id}</p>
        {/* <SelectedExerciseDisplay /> */}
        <Link className="btn btn-success" href="/create/review">
          Review
        </Link>
      </div>
      <ExerciseSelect />
    </>
  )
}
