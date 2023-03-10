/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form'
import { DayExercise, useStore } from '@/store'

type FormData = { sets: number; reps: number }

type Props = {
  id: number
  name: string
}

export default function AddExerciseForm({ id, name }: Props) {
  const { register, handleSubmit } = useForm<FormData>()
  const [addExercise] = useStore((state) => [state.addExercise])

  const onSubmit = handleSubmit((data: FormData) => {
    const exerciseInfo = {
      ...data,
      day_of_week: 'mon',
      exercise_id: id,
      name,
    } as DayExercise
    addExercise(exerciseInfo)
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col p-4 items-center justify-center"
    >
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Sets"
          className="input input-bordered input-xs w-16"
          {...register('sets', { valueAsNumber: true })}
        />
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Reps"
          className="input input-bordered input-xs w-16"
          {...register('reps', { valueAsNumber: true })}
        />
      </div>
      <button type="submit" className="btn btn-secondary btn-xs mt-1">
        Add
      </button>
    </form>
  )
}
