import { useSupabase } from '@/components/SupabaseProvider'
import useFetchSupabase from '@/hooks/useFetchSupabase'
import { MuscleGroup } from '@/lib/database.types'
import { ChangeEvent, useCallback } from 'react'

type Props = {
  selected: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function MuscleGroupSelect({ selected, onChange }: Props) {
  const { supabase } = useSupabase()

  const getMuscleGroups = useCallback(async () => {
    const { data, error } = await supabase
      .from('distinct_muscle_group')
      .select()
    return { data, error }
  }, [supabase])

  const { data: muscleGroupArray } = useFetchSupabase(getMuscleGroups, {
    executeOnMount: true,
  })

  return (
    <select
      className="select select-sm select-primary bg-primary/10 capitalize font-bold w-36"
      onChange={onChange}
      value={selected}
    >
      {muscleGroupArray?.map(({ muscle_group }: MuscleGroup) => (
        <option key={muscle_group} className="capitalize font-medium">
          {muscle_group}
        </option>
      ))}
    </select>
  )
}

export default MuscleGroupSelect
