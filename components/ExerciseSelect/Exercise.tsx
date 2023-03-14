/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import Image from 'next/image'
import { useStore } from '@/store'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import type { ExerciseType } from './ExerciseGrid'
import { blurData } from '../../public/blurData'
import AddExerciseForm from './AddExerciseForm'

export default function Exercise({ exercise }: { exercise: ExerciseType }) {
  const { id, name } = exercise
  const [show, setShow] = useState(false)

  const [exercises] = useStore((state) => [state.exercises])
  const isAddedToState = exercises.some((ex) => ex.exercise_id === id)

  return (
    <div
      key={exercise.id}
      className="flex flex-col overflow-hidden rounded-lg shadow hover:cursor-pointer hover:shadow-lg"
    >
      <div
        className={`${
          isAddedToState ? 'bg-success' : 'bg-primary'
        } flex space-x-2 justify-between items-center text-base-100 py-1 px-2`}
      >
        <p className="truncate capitalize font-semibold text-xs ml-1">
          {exercise.name}
        </p>
        <div onClick={() => setShow(!show)}>
          <PlusIcon
            width={20}
            height={20}
            className={`shrink-0 ${show && 'rotate-45'} transition-all`}
          />
        </div>
      </div>

      <div className="flex mx-auto h-32">
        {exercise.gif && !show ? (
          <Image
            className="rounded-lg py-2"
            placeholder="blur"
            blurDataURL={blurData}
            src={exercise.gif}
            alt="Shoes"
            width={120}
            height={120}
          />
        ) : (
          <AddExerciseForm id={id} name={name} setShow={setShow} />
        )}
      </div>
    </div>
  )
}
