/* eslint-disable jsx-a11y/label-has-associated-control */

import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'

type Props<T> = {
  register: UseFormRegister<FieldValues>
  onSubmit: (data: FieldValues) => void
  handleSubmit: UseFormHandleSubmit<FieldValues>
  data: T[] | null
}

function FilterForm<T extends { [key: string]: string }>({
  register,
  onSubmit,
  handleSubmit,
  data,
}: Props<T>) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-control">
      {data?.map((row) =>
        Object.keys(row).map(
          (key) =>
            row[key] && (
              <label className="label cursor-pointer py-0">
                <span className="label-text capitalize">{row[key]}</span>
                <input
                  type="checkbox"
                  value={row[key]}
                  className="checkbox checkbox-primary"
                  {...register('filters')}
                />
              </label>
            )
        )
      )}
      <button className="btn btn-xs btn-secondary" type="submit">
        Apply filters
      </button>
    </form>
  )
}

export default FilterForm
