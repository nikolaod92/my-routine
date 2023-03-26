/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'

export default function Create() {
  const [setRoutineInfo, routineInfo, setCurrentDay] = useStore((state) => [
    state.setRoutineInfo,
    state.routineInfo,
    state.setCurrentDay,
  ])

  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...routineInfo,
    },
  })

  const router = useRouter()

  const onSubmit = (data: any, e: any) => {
    e.preventDefault()
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
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          className="textarea textarea-bordered textarea-md"
          {...register('description')}
        />
        {/* <Controller
          name="daysPerWeek"
          control={control}
          render={({ field: { ref, ...field } }) => <Slider {...field} />}
        /> */}
        <button type="submit" className="btn btn-primary mt-6 self-end">
          Next
        </button>
      </form>
    </div>
  )
}
