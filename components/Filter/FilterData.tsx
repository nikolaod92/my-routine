import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props<T> = {
  data: T[] | null
  register: UseFormRegister<FieldValues>
}

function FilterData<T extends { [key: string]: string }>({
  data,
  register,
}: Props<T>) {
  return (
    <div className="grid grid-cols-2 gap-x-2">
      {data?.map((row) =>
        Object.keys(row).map(
          (key) =>
            row[key] && (
              <label key={row[key]} className="label cursor-pointer py-0">
                <span className="text-sm font-medium capitalize">
                  {row[key]}
                </span>
                <input
                  type="checkbox"
                  value={row[key]}
                  className="checkbox-primary checkbox checkbox-xs border-0 bg-primary/10 transition-all hover:bg-primary/50"
                  {...register('filters')}
                />
              </label>
            )
        )
      )}
    </div>
  )
}

export default FilterData
