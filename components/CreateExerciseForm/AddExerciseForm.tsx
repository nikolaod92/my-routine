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
  const [currentDay, addExercise, deleteExercise, exercises] = useStore(
    (state) => [
      state.currentDay,
      state.addExercise,
      state.deleteExercise,
      state.exercises,
    ]
  )
  const isExerciseInState = exercises.find((ex) => ex.exercise_id === id)
  const { sets, reps } = isExerciseInState || { sets: 0, reps: 0 }

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
      day_of_week: currentDay,
      exercise_id: id,
      name,
    } as DayExercise

    if (isExerciseInState) deleteExercise(exerciseInfo)

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
      className="form-control p-4 items-end bg-base-100 flex-1 space-y-1 justify-end"
    >
      <div>
        <label>
          <span className="text-xs">Sets: </span>
        </label>
        <input
          type="number"
          placeholder="Sets"
          className="input input-bordered input-xs input-primary w-10 text-right"
          {...register('sets', { valueAsNumber: true })}
        />
      </div>
      <div>
        <label>
          <span className="text-xs">Reps: </span>
        </label>
        <input
          type="number"
          placeholder="Reps"
          className="input input-bordered input-primary input-xs w-10 text-right"
          {...register('reps', { valueAsNumber: true })}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-xs ">
        {isExerciseInState ? 'Edit' : 'Add'}
      </button>
    </form>
  )
}
