/* eslint-disable jsx-a11y/label-has-associated-control */

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
      <label className="label">
        <span className="label-text">Search for an exercise: </span>
      </label>
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
