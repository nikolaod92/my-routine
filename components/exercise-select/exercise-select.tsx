'use client'

import { ChangeEvent } from 'react'
import { useSupabase } from '../supabase-provider'

export default function ExerciseSelect({ bodyParts }) {
  const { supabase } = useSupabase()

  // const [selected, setSelected] = useState('');

  const fetchExercises = async (e: ChangeEvent<HTMLSelectElement>) => {
    const exercises = await supabase
      .from('exercise')
      .select()
      .eq('bodyPart', e.target.value)
      .limit(5)
  }

  return (
    <div>
      <select
        className="select select-primary w-full capitalize"
        onChange={fetchExercises}
      >
        <option disabled selected>
          Pick a target muscle group:
        </option>
        {bodyParts?.map((bodyPart) => (
          <option key={bodyPart.bodyPart} className="capitalize">
            {bodyPart.bodyPart}
          </option>
        ))}
      </select>
      {/* <div>{JSON.stringify(exercises)}</div> */}
    </div>
  )
}
