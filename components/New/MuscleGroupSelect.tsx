/* eslint-disable jsx-a11y/label-has-associated-control */
import { ExerciseType, MuscleGroup } from '@/lib/database.types'
import { ChangeEvent, useEffect, useState } from 'react'
import Exercise from '../CreateExerciseForm/Exercise'
import ExerciseGrid from '../CreateExerciseForm/ExerciseGrid'
import { useSupabase } from '../SupabaseProvider'

type Props = {}

function MuscleGroupSelect() {
  const { supabase } = useSupabase()
  const [selected, setSelected] = useState('')
  const [exercises, setExercises] = useState<ExerciseType[]>()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([])

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.from('distinct_muscle_group').select()

      if (data) setMuscleGroups(data)
    })()
  }, [supabase])

  useEffect(() => {
    setExercises([])
    setErrorMsg('')
    const fetchExercises = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('exercise')
        .select()
        .eq('muscle_group', selected)
        .range(0, 9)

      if (error) {
        setErrorMsg(error.message)
      }

      if (!data) return
      setExercises(data)
      setLoading(false)
    }
    if (!selected) return

    fetchExercises()
  }, [selected, supabase])

  return (
    <div className="flex-1">
      <select
        className="select select-primary select-xs sm:select-sm capitalize w-36"
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
      >
        <option disabled>{selected}</option>
        {muscleGroups?.map((muscleGroup: any) => (
          <option key={muscleGroup.muscle_group} className="capitalize">
            {muscleGroup.muscle_group}
          </option>
        ))}
      </select>
      {exercises && (
        <ExerciseGrid>
          {exercises.map((exercise) => (
            <Exercise key={exercise.id} exercise={exercise} />
          ))}
        </ExerciseGrid>
      )}
    </div>
  )
}

export default MuscleGroupSelect
