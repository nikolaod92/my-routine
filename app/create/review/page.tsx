'use client'

import { useMemo } from 'react'
import { useSupabase } from '@/components/SupabaseProvider'
import { useStore } from '@/store'

export default function Review() {
  const { supabase } = useSupabase()
  const [routineInfo, exercises] = useStore((state) => [
    state.routineInfo,
    state.exercises,
  ])

  const exerciseArray = useMemo(
    () =>
      exercises.map((ex) => {
        const { name, ...rest } = ex
        return {
          ...rest,
          routine_id: 'bd09736a-94e8-49de-af51-fb4f7dee59ac',
        }
      }),
    [exercises]
  )

  const submitRoutine = async () => {
    // const { data: routine } = await supabase
    //   .from('routine')
    //   .insert({
    //     name: routineInfo.name,
    //     description: routineInfo.description,
    //     author_id: '888d9003-2c81-4f90-b03d-7e5f615e3d22',
    //   })
    //   .select()

    // bd09736a-94e8-49de-af51-fb4f7dee59ac

    const { data, error } = await supabase
      .from('exercises_on_day')
      .insert(exerciseArray)
    console.log(data, error)
  }

  return (
    <div>
      <div>
        <p>Name: {routineInfo.description}</p>
      </div>
      {exercises.map((ex) => (
        <div>
          <h2>Name: {ex.name}</h2>
          <p>Day: {ex.day_of_week}</p>
          <p>Sets: {ex.sets}</p>
          <p>Reps: {ex.reps}</p>
        </div>
      ))}
      <button type="button" className="btn btn-accent" onClick={submitRoutine}>
        Submit Routine
      </button>
    </div>
  )
}
