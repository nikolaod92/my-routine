/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form'
import { DayExercise, useStore } from '@/store'
import { Dispatch, SetStateAction, useEffect } from 'react'

type FormData = { sets: number; reps: number }

type Props = {
  id: number
  name: string
  setShow: Dispatch<SetStateAction<boolean>>
}

export default function AddExerciseForm({ id, name, setShow }: Props) {
  const [addExercise, exercises] = useStore((state) => [
    state.addExercise,
    state.exercises,
  ])
  const exerciseInState = exercises.find((ex) => ex.exercise_id === id)
  const { sets, reps } = exerciseInState || { sets: 0, reps: 0 }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      sets,
      reps,
    },
  })

  const onSubmit = handleSubmit((data: FormData) => {
    const exerciseInfo = {
      ...data,
      day_of_week: 'mon',
      exercise_id: id,
      name,
      addedToRoutine: true,
    } as DayExercise
    addExercise(exerciseInfo)
  })

  useEffect(() => {
    if (isSubmitSuccessful) {
      setShow(false)
      reset()
    }
  }, [reset, isSubmitSuccessful, setShow])

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col p-4 items-center justify-center"
    >
      <div className="flex flex-col space-y-1">
        <input
          type="number"
          placeholder="Sets"
          className="input input-bordered input-xs w-12"
          {...register('sets', { valueAsNumber: true })}
        />

        <input
          type="number"
          placeholder="Reps"
          className="input input-bordered input-xs w-12"
          {...register('reps', { valueAsNumber: true })}
        />
      </div>
      <button type="submit" className="btn btn-secondary btn-xs mt-1">
        {exerciseInState ? 'Edit' : 'Add'}
      </button>
    </form>
  )
}
