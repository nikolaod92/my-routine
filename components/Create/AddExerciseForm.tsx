import { useForm } from 'react-hook-form'
import { useStore } from '@/store'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { ExerciseOnDay } from '@/lib/database.types'
import { motion } from 'framer-motion'

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
  const exerciseAddedToRoutine = exercises.find((ex) => ex.exercise_id === id)
  const { sets, reps } = exerciseAddedToRoutine || {
    sets: undefined,
    reps: undefined,
  }

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
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

    if (exerciseAddedToRoutine) deleteExercise(exerciseInfo)

    addExercise(exerciseInfo)
  })

  useEffect(() => {
    setFocus('sets', { shouldSelect: true })
  }, [setFocus])

  useEffect(() => {
    if (isSubmitSuccessful) {
      setShow(false)
      reset()
    }
  }, [reset, isSubmitSuccessful, setShow])

  return (
    <motion.form
      onSubmit={onSubmit}
      className="form-control flex-1 items-end justify-end space-y-2  p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, x: [10, 0] }}
      exit={{ opacity: 0, x: 10 }}
    >
      <div>
        <label>
          <span className="mr-1 text-xs font-semibold uppercase">Sets </span>
        </label>
        <input
          type="number"
          className="input-primary input input-xs w-10 border-none bg-primary/10 text-right text-sm font-bold"
          {...register('sets', {
            valueAsNumber: true,
            min: 1,
            required: true,
          })}
        />
      </div>
      <div>
        <label>
          <span className="mr-1 text-xs font-semibold uppercase">Reps </span>
        </label>
        <input
          type="number"
          className="input-primary input input-xs w-10 border-none bg-primary/10 text-right text-sm font-bold"
          {...register('reps', {
            valueAsNumber: true,
            min: 1,
            required: true,
          })}
        />
      </div>
      <button
        disabled={!isValid || !isDirty}
        type="submit"
        className="btn btn-primary btn-xs"
      >
        {exerciseAddedToRoutine ? 'Edit' : 'Add'}
      </button>
    </motion.form>
  )
}
