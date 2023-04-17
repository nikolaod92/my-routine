import ExerciseDayNavigation from '@/components/Create/ExerciseDayNavigation'
import ExerciseSelect from '@/components/Create/ExerciseSelect'
import SelectedExerciseDisplay from '@/components/Create/SelectedExerciseDisplay'

export default function Day() {
  return (
    <div className="flex flex-col">
      <ExerciseDayNavigation />
      <SelectedExerciseDisplay />
      <div className="divider" />
      <ExerciseSelect />
    </div>
  )
}
