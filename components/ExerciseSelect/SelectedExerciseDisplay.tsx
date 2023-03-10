import { useStore } from '@/store'

function SelectedExerciseDisplay() {
  const [exercises] = useStore((state) => [state.exercises])

  console.log(exercises)

  return exercises && <h3>{JSON.stringify(exercises)}</h3>
}

export default SelectedExerciseDisplay
