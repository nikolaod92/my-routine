/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import Image from 'next/image'
import { useStore } from '@/store'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Exercise } from '@/lib/database.types'
import AddExerciseForm from './AddExerciseForm'

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const { id, name } = exercise
  const [show, setShow] = useState(false)

  const [exercises] = useStore((state) => [state.exercises])
  const isAddedToState = exercises.some((ex) => ex.exercise_id === id)

  return (
    <div
      key={exercise.id}
      className="flex flex-col h-48 overflow-hidden rounded shadow hover:cursor-pointer hover:shadow-lg"
    >
      <div
        className={`bg-primary ${
          isAddedToState && 'bg-success'
        } flex space-x-2 justify-between items-center py-1 px-2 text-primary-content`}
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

      {exercise.gif && !show ? (
        <div className="bg-white h-full w-full flex items-center justify-center">
          <Image
            className="p-4"
            src={exercise.gif}
            alt={exercise.name}
            width={160}
            height={160}
          />
        </div>
      ) : (
        <AddExerciseForm id={id} name={name} setShow={setShow} />
      )}
    </div>
  )
}
