/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { PAGINATION_STEP } from '@/lib/constants'
import type { Exercise, MuscleGroup } from '@/lib/database.types'
import { useEffect, useRef, useState } from 'react'
import ExerciseCard from '../ExerciseCard'
import ExerciseGrid from '../ResponsiveGrid'
import { useSupabase } from '../../SupabaseProvider'
import ExercisePagination from './ExercisePagination'

function MuscleGroupSelect() {
  const { supabase } = useSupabase()
  const [selected, setSelected] = useState('')
  const [exercises, setExercises] = useState<Exercise[]>()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([])
  const [range, setRange] = useState(0)

  const exerciseCount = useRef(0)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.from('distinct_muscle_group').select()
      if (data) setMuscleGroups(data)
    })()
  }, [supabase])

  useEffect(() => {
    setRange(0)
  }, [selected])

  useEffect(() => {
    setErrorMsg('')
    const fetchExercises = async () => {
      setLoading(true)
      const { data, count, error } = await supabase
        .from('exercise')
        .select('*', { count: 'exact' })
        .eq('muscle_group', selected)
        .range(range, range + PAGINATION_STEP - 1)

      if (count) exerciseCount.current = count

      if (error) {
        setErrorMsg(error.message)
      }

      if (data) setExercises(data)
      setLoading(false)
    }
    if (!selected) return

    fetchExercises()
  }, [selected, supabase, range])

  return (
    <div className="flex-1">
      <div className="flex justify-between">
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
        {selected && (
          <ExercisePagination
            range={range}
            setRange={setRange}
            count={exerciseCount.current}
          />
        )}
      </div>
      {exercises && (
        <ExerciseGrid>
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </ExerciseGrid>
      )}
    </div>
  )
}

export default MuscleGroupSelect
