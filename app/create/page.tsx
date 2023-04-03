/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutineInfo, routineSchema } from '@/lib/vaildators'

export default function Create() {
  const router = useRouter()

  const [setRoutineInfo, routineInfo, setCurrentDay] = useStore((state) => [
    state.setRoutineInfo,
    state.routineInfo,
    state.setCurrentDay,
  ])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...routineInfo,
    },
    resolver: zodResolver(routineSchema),
  })

  const onSubmit: SubmitHandler<RoutineInfo> = (data) => {
    setRoutineInfo(data)
    setCurrentDay('m')
    router.push('/create/day')
  }

  return (
    <div className="card card-body bg-base-100 rounded shadow max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <h1 className="text-xl font-bold mb-4">Create a routine</h1>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered input-sm w-full"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.name?.message}
          </p>
        )}
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered textarea-md"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.description?.message}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary mt-6 self-end  ${
            isSubmitting && 'loading'
          }`}
        >
          Next
        </button>
      </form>
    </div>
  )
}
