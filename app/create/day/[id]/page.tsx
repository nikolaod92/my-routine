/* eslint-disable react/button-has-type */

'use client'

import ExerciseSelect from '@/components/ExerciseSelect/ExerciseSelect'
import { useStore } from '@/store'
import { useRouter } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Day({ params }: { params: { id: string } }) {
  const [exercises] = useStore((state) => [state.exercises])
  const router = useRouter()
  // const a = await supabase.from('routine').insert({
  //   name: 'Hello',
  //   description: 'Hello',
  //   authorId: '888d9003-2c81-4f90-b03d-7e5f615e3d22',
  // })
  // console.log(a)

  // const a = await supabase
  //   .from('day')
  //   .insert({
  //     dayOfWeek: 'MON',
  //     routineId: '1473bb4b-1ff9-4569-9b23-fc23693c014c',
  //   })
  // console.log(a, a.data)

  // const a = await supabase.from('exercises_on_day').insert({
  //   dayId: 1,
  //   exerciseId: 6,
  //   reps: 4,
  //   sets: 5,
  //   weight: 100,
  //   name: 'What',
  // })

  // console.log(a, a.data)

  return (
    <div>
      <div
        className="btn-group"
        onClick={(e) => router.push(`create/day/${e.target.textContent}`)}
      >
        <button className="btn btn-xs">1</button>
        <button className="btn btn-xs btn-active">2</button>
        <button className="btn btn-xs">3</button>
        <button className="btn btn-xs">4</button>
      </div>
      <p>Choose exercises for day {params.id}</p>
      <h3>
        {JSON.stringify(
          exercises.filter((ex) => ex.day_id.toString() === params.id)
        )}
      </h3>
      <ExerciseSelect />
    </div>
  )
}
