'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutineInfo, routineSchema } from '@/lib/validators'
import Card from '@/components/UI/Card'
import Input from '@/components/UI/Input'

export default function Create() {
  const router = useRouter()

  const [setRoutineInfo, routineInfo] = useStore((state) => [
    state.setRoutineInfo,
    state.routineInfo,
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
    router.push('/create/day')
  }

  return (
    <Card>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control w-full space-y-4"
      >
        <h1 className="text-2xl font-bold">Create a routine</h1>
        <Input errorMsg={errors.name?.message} {...register('name')} />
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
        <button type="submit" className="btn btn-primary btn-sm self-end">
          Next
        </button>
      </form>
    </Card>
  )
}
