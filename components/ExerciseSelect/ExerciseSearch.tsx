'use client'

import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<FieldValues>
  onSubmit: () => void
  name: string
}

function ExerciseSearch({ register, onSubmit, name }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        {...register(name)}
        className="input input-bordered input-xs max-w-sm mr-2"
      />
      <button type="submit" className="btn btn-primary btn-xs">
        Search
      </button>
    </form>
  )
}

export default ExerciseSearch
