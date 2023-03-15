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
    <>
      <label className="label p-1">
        <span className="text-xs">or choose a muscle group: </span>
      </label>
      <select
        className="select select-primary select-xs capitalize w-36"
        onChange={onChange}
        value={selected}
      >
        <option disabled>{selected}</option>
        {muscleGroups?.map((bodyPart: any) => (
          <option key={bodyPart.bodyPart} className="capitalize">
            {bodyPart.bodyPart}
          </option>
        ))}
      </select>
    </>
  )
}

export default MuscleGroupSelect
