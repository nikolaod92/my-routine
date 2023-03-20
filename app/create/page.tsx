/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'

export default function Create() {
  const [setRoutineInfo, routineInfo] = useStore((state) => [
    state.setRoutineInfo,
    state.routineInfo,
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
    router.push('/create/day')
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control">
        <label className="label">
          <span className="label-text">Routine name:</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered input-sm w-full"
          {...register('name')}
        />
        <label className="label">
          <span className="label-text">Routine description (optional):</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-primary input-bordered input-sm w-full mb-4"
          {...register('description')}
        />
        {/* <Controller
          name="daysPerWeek"
          control={control}
          render={({ field: { ref, ...field } }) => <Slider {...field} />}
        /> */}
        <button type="submit" className="btn btn-secondary mt-4 self-end">
          Next
        </button>
      </form>
    </div>
  )
}
