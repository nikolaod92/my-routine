'use client'

import { useStore } from '@/store'
import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Exercise } from '@/lib/database.types'
import { AnimatePresence } from 'framer-motion'
import AddExerciseForm from './AddExerciseForm'
import {
  ExerciseHeader,
  ExerciseCardContainer,
  ExerciseImage,
  ExerciseTitle,
} from '../Exercise'

export default function AddExerciseCard({ exercise }: { exercise: Exercise }) {
  const { id, name } = exercise
  const [show, setShow] = useState(false)

  const [exercises] = useStore((state) => [state.exercises])
  const isAddedToState = exercises.some((ex) => ex.exercise_id === id)

  return (
    <ExerciseCardContainer>
      <ExerciseHeader isAddedToState={isAddedToState}>
        <ExerciseTitle name={exercise.name} />
        <button type="button" onClick={() => setShow(!show)}>
          <PlusIcon
            width={20}
            height={20}
            className={`shrink-0 ${
              show && 'rotate-45'
            } transition-all hover:cursor-pointer`}
          />
        </button>
      </ExerciseHeader>

      <AnimatePresence initial={false} mode="wait">
        {exercise.gif && !show ? (
          <ExerciseImage src={exercise.gif} alt={exercise.name} />
        ) : (
          <AddExerciseForm id={id} name={name} setShow={setShow} />
        )}
      </AnimatePresence>
    </ExerciseCardContainer>
  )
}
