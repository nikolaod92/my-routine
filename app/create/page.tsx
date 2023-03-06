/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import { useStore } from '@/store'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Slider from '@/components/Slider'

export default function Create() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: '',
      description: '',
      daysPerWeek: 4,
    },
  })

  const [routineInfo, setRoutineInfo] = useStore((state) => [
    state.routineInfo,
    state.setRoutineInfo,
  ])

  const router = useRouter()

  const onSubmit = (data: any) => {
    setRoutineInfo(data)
    router.push('/create/day/1')
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div>{JSON.stringify(routineInfo)}</div>
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
        <Controller
          name="daysPerWeek"
          control={control}
          render={({ field: { ref, ...field } }) => <Slider {...field} />}
        />
        <button type="submit" className="btn btn-secondary mt-4 self-end">
          Next
        </button>
      </form>
    </div>
  )
}
