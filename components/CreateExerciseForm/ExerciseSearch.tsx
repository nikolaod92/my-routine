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
    <form onSubmit={onSubmit} className="">
      <label className="label p-1">
        <span className="text-xs">or search:</span>
      </label>
      <div className="input-group ">
        <input
          type="text"
          placeholder="Exercise name"
          {...register(name)}
          className="input input-bordered input-xs sm:input-sm input-primary w-full"
        />
        <button
          type="submit"
          className="btn btn-square btn-primary btn-xs sm:btn-sm "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 sm:h-4 sm:w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default ExerciseSearch
