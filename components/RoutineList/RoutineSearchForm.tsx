import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../UI/Input'

function RoutineSearchForm({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ searchTerm: string }>
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ searchTerm: string }>()

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Search for a routine..."
          srOnly
          {...register('searchTerm')}
          errorMsg={errors?.searchTerm?.message}
        >
          <button
            type="submit"
            className="btn btn-square btn-primary btn-sm rounded-s-none absolute right-[0.1rem]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
        </Input>
      </form>
    </div>
  )
}

export default RoutineSearchForm
