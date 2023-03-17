'use client'

import { useStore } from '@/store'
import { useRouter } from 'next/navigation'

export default function Review() {
  const router = useRouter()

  const [routineInfo, exercises] = useStore((state) => [
    state.routineInfo,
    state.exercises,
  ])

  const submitRoutine = async () => {
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ routineInfo, exercises }),
      })

      if (res.ok) {
        router.push('/routines')
      } else {
        console.error(res)
      }
    } catch (error) {
      console.error(error)
    }
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
