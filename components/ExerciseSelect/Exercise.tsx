/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client'

import { DayExercise, useStore } from '@/store'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ExerciseType } from './ExerciseSelect'

type FormData = { sets: number; reps: number }

export default function Exercise({ exercise }: { exercise: ExerciseType }) {
  const { register, handleSubmit } = useForm<FormData>()
  const [show, setShow] = useState(false)
  const pathname = usePathname()

  const [exercises, addExercise] = useStore((state) => [
    state.exercises,
    state.addExercise,
  ])

  const onSubmit = handleSubmit((data: FormData) => {
    const exerciseInfo = {
      ...data,
      day_id: pathname && Number(pathname.charAt(pathname.length - 1)),
      exercise_id: exercise.id,
    } as DayExercise

    addExercise(exerciseInfo)
    setShow(false)
  })

  return (
    <div
      key={exercise.id}
      className="flex flex-col space-y-2 overflow-hidden rounded-lg shadow hover:cursor-pointer hover:shadow-lg"
      onClick={() => setShow(true)}
    >
      <p className="text-center text-base-100 font-semibold py-1 px-4 text-xs truncate capitalize bg-primary ">
        {exercise.name}
      </p>
      {exercise.gif && (
        // TODO: set placeholders
        <Image
          className="mx-auto rounded-lg p-4"
          src={exercise.gif}
          alt="Shoes"
          width={160}
          height={160}
        />
      )}
      {show && (
        <form
          onSubmit={onSubmit}
          className="flex flex-col p-4 items-end justify-center "
        >
          <div className="flex justify-center items-center">
            <label className="label">
              <span className="text-xs">Sets</span>
            </label>
            <input
              type="text"
              placeholder="Sets"
              className="input input-bordered input-xs w-10"
              {...register('sets', { valueAsNumber: true })}
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="label">
              <span className="text-xs">Reps</span>
            </label>
            <input
              type="text"
              placeholder="Reps"
              className="input input-bordered input-xs w-10"
              {...register('reps', { valueAsNumber: true })}
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-xs mt-1">
            Add
          </button>
        </form>
      )}
    </div>
  )
}
