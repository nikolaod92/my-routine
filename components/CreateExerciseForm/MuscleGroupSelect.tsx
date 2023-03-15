/* eslint-disable jsx-a11y/label-has-associated-control */
import { Database } from '@/lib/database.types'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSupabase } from '../SupabaseProvider'

type BodyPart = Database['public']['Views']['distinct_body_part']['Row']

type Props = {
  selected: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function MuscleGroupSelect({ selected, onChange }: Props) {
  const { supabase } = useSupabase()

  const [bodyParts, setBodyParts] = useState<BodyPart[]>([])

  useEffect(() => {
    const fetchBodyParts = async () => {
      const { data } = await supabase.from('distinct_body_part').select()
      if (data) setBodyParts(data)
    }
    fetchBodyParts()
  }, [supabase])

  return (
    <>
      <label className="label">
        <span className="label-text">or choose a muscle group: </span>
      </label>
      <select
        className="select select-primary select-xs capitalize w-36"
        onChange={onChange}
        value={selected}
      >
        <option disabled>{selected}</option>
        {bodyParts?.map((bodyPart: any) => (
          <option key={bodyPart.bodyPart} className="capitalize">
            {bodyPart.bodyPart}
          </option>
        ))}
      </select>
    </>
  )
}

export default MuscleGroupSelect
