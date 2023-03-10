'use client'

import { useEffect, useState } from 'react'
import { Database } from '@/lib/database.types'
import ExerciseGrid from './ExerciseGrid'
import { useSupabase } from '../SupabaseProvider'

type BodyPart = Database['public']['Views']['distinct_body_part']['Row']

export default function ExerciseSelect() {
  const [selected, setSelected] = useState('chest')
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([
    { bodyPart: 'chest' },
  ])
  const { supabase } = useSupabase()

  useEffect(() => {
    const fetchBodyParts = async () => {
      const { data } = await supabase.from('distinct_body_part').select()
      if (data) setBodyParts(data)
    }
    fetchBodyParts()
  }, [supabase])

  return (
    <div>
      <select
        className="select select-primary select-sm  capitalize"
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
      >
        {bodyParts?.map((bodyPart: any) => (
          <option key={bodyPart.bodyPart} className="capitalize">
            {bodyPart.bodyPart}
          </option>
        ))}
      </select>
      <ExerciseGrid selected={selected} />
    </div>
  )
}
