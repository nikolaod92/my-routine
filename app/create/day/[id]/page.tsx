'use client'

import Link from 'next/link'
import ExerciseDayNavigation from '@/components/ExerciseSelect/ExerciseDayNavigation'
import SelectedExerciseDisplay from '@/components/ExerciseSelect/SelectedExerciseDisplay'
import ExerciseSelect from '@/components/ExerciseSelect/ExerciseSelect'

export default function Day({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex justify-between w-full">
        <ExerciseDayNavigation />
        {/* <p>Choose exercises for day {params.id}</p> */}
        {/* <SelectedExerciseDisplay /> */}
        <Link className="btn btn-success" href="/create/review">
          Review
        </Link>
      </div>
      <ExerciseSelect />
    </>
  )
}
