/* eslint-disable jsx-a11y/label-has-associated-control */
import { MuscleGroup } from '@/lib/database.types'
import { ChangeEvent } from 'react'

type Props = {
  selected: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  muscleGroups: MuscleGroup[]
}

function MuscleGroupSelect({ selected, onChange, muscleGroups }: Props) {
  return (
    <div className="flex-1">
      <label className="label p-1">
        <span className="text-xs">Muscle group: </span>
      </label>
      <select
        className="select select-primary select-xs sm:select-sm capitalize w-36"
        onChange={onChange}
        value={selected}
      >
        <option disabled>{selected}</option>
        {muscleGroups?.map((muscleGroup: any) => (
          <option key={muscleGroup.muscle_group} className="capitalize">
            {muscleGroup.muscle_group}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MuscleGroupSelect
