/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import Image from 'next/image'
import type { ExerciseType } from './ExerciseGrid'
import { blurData } from '../../public/blurData'
import AddExerciseForm from './AddExerciseForm'

export default function Exercise({ exercise }: { exercise: ExerciseType }) {
  const { id, name } = exercise

  return (
    <div
      key={exercise.id}
      className="flex flex-col rounded-lg shadow hover:cursor-pointer hover:shadow-lg"
    >
      <p className="text-center text-base-100 font-semibold py-1 px-4 text-xs truncate capitalize bg-primary ">
        {exercise.name}
      </p>
      <div className="flex mx-auto">
        {exercise.gif && (
          // TODO: set placeholders
          <Image
            className="rounded-lg py-4"
            placeholder="blur"
            blurDataURL={blurData}
            src={exercise.gif}
            alt="Shoes"
            width={120}
            height={120}
          />
        )}
        <AddExerciseForm id={id} name={name} />
      </div>
    </div>
  )
}
