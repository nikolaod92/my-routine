/* eslint-disable jsx-a11y/label-has-associated-control */
import { MuscleGroup } from '@/lib/database.types'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSupabase } from '../SupabaseProvider'

type Props = {
  selected: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function MuscleGroupSelect({ selected, onChange }: Props) {
  const { supabase } = useSupabase()
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.from('distinct_muscle_group').select()

      if (data) setMuscleGroups(data)
    })()
  }, [supabase])

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
