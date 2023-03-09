'use client'

import { useStore } from '@/store'

function SelectedExerciseDisplay({ day }: { day: string }) {
  const [exercises] = useStore((state) => [state.exercises])

  return (
    <h3>
      {JSON.stringify(exercises.filter((ex) => ex.day_id.toString() === day))}
    </h3>
  )
}

export default SelectedExerciseDisplay
