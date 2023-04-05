/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form'
import { useStore } from '@/store'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ExerciseOnDay } from '@/lib/database.types'

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
    formState: { isSubmitSuccessful, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: {
      sets,
      reps,
    },
    mode: 'onChange',
  })

  const onSubmit = handleSubmit((data: FormData) => {
    const exerciseInfo = {
      ...data,
      day_of_week: currentDay,
      exercise_id: id,
      name,
    } as ExerciseOnDay

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
      className="form-control flex-1 items-end justify-end space-y-1 bg-base-100 p-4"
    >
      <div>
        <label>
          <span className="text-xs">Sets: </span>
        </label>
        <input
          type="number"
          placeholder="Sets"
          className="input-bordered input-primary input input-xs w-10 text-right"
          {...register('sets', { valueAsNumber: true, min: 1, required: true })}
        />
      </div>
      <div>
        <label>
          <span className="text-xs">Reps: </span>
        </label>
        <input
          type="number"
          placeholder="Reps"
          className="input-bordered input-primary input input-xs w-10 text-right"
          {...register('reps', { valueAsNumber: true, min: 1, required: true })}
        />
      </div>
      <button
        disabled={!isValid || !isDirty}
        type="submit"
        className="btn-primary btn-xs btn"
      >
        {isExerciseInState ? 'Edit' : 'Add'}
      </button>
    </form>
  )
}
