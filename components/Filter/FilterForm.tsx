import { ReactNode } from 'react'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'

type Props = {
  onSubmit: (data: FieldValues) => void
  handleSubmit: UseFormHandleSubmit<FieldValues>
  children: ReactNode
}

function FilterForm({ onSubmit, handleSubmit, children }: Props) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
      {children}
      <button className="btn btn-sm btn-secondary" type="submit">
        Apply filters
      </button>
    </form>
  )
}

export default FilterForm
