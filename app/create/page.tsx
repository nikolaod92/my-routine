/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutineInfo, routineSchema } from '@/lib/validators'

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
    formState: { errors },
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
    <div className="card card-body mx-auto max-w-md rounded-lg border-t-4 border-t-primary bg-base-100 shadow">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control space-y-4"
      >
        <h1 className="text-2xl font-bold">Create a routine</h1>
        <div>
          <label htmlFor="name" className="label">
            <span className="text-xs font-semibold uppercase leading-3">
              Name
            </span>
          </label>
          <input
            id="name"
            type="text"
            className="input input-sm w-full bg-primary/10 text-lg font-medium"
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-xs italic text-red-500">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="label">
            <span className="text-xs font-semibold uppercase leading-3">
              Description
            </span>
          </label>
          <textarea
            id="description"
            className="textarea h-32 w-full bg-primary/10 px-4 py-2 text-sm font-medium"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-xs italic text-red-500">
              {errors.description?.message}
            </p>
          )}
        </div>
        <button type="submit" className="btn-primary btn-sm btn self-end">
          Next
        </button>
      </form>
    </div>
  )
}
