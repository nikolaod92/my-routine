'use client'

import { useStore } from '@/store'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Exercise } from '@/lib/database.types'
import AddExerciseForm from './AddExerciseForm'
import {
  ExerciseHeader,
  ExerciseCardContainer,
  ExerciseImage,
} from '../Exercise'

export default function AddExerciseCard({ exercise }: { exercise: Exercise }) {
  const { id, name } = exercise
  const [show, setShow] = useState(false)

  const [exercises] = useStore((state) => [state.exercises])
  const isAddedToState = exercises.some((ex) => ex.exercise_id === id)

  return (
    <ExerciseCardContainer>
      <ExerciseHeader isAddedToState={isAddedToState}>
        <p className="truncate capitalize font-semibold text-xs ml-1">
          {exercise.name}
        </p>
        <PlusIcon
          width={20}
          height={20}
          onClick={() => setShow(!show)}
          className={`shrink-0 ${show && 'rotate-45'} transition-all`}
        />
      </ExerciseHeader>

      {exercise.gif && !show ? (
        <ExerciseImage src={exercise.gif} alt={exercise.name} />
      ) : (
        <AddExerciseForm id={id} name={name} setShow={setShow} />
      )}
    </ExerciseCardContainer>
  )
}
