'use client'

import { useState } from 'react'
import { Database } from '@/lib/database.types'
import ExerciseGrid from './ExerciseGrid'

type BodyPart = Database['public']['Views']['distinct_body_part']['Row']

export default function ExerciseSelect({
  bodyParts,
}: {
  bodyParts: BodyPart[]
}) {
  const [selected, setSelected] = useState('chest')

  return (
    <div>
      <select
        className="select select-primary w-full capitalize"
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
