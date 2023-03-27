import useFetchSupabase from '@/hooks/useFetchSupabase'
import { PAGINATION_STEP } from '@/lib/constants'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSupabase } from '../../SupabaseProvider'
import ExerciseCard from '../ExerciseCard'
import ExerciseGrid from '../ResponsiveGrid'
import ExercisePagination from './ExercisePagination'
import MuscleGroupSelect from './MuscleGroupSelect'

function MuscleGroupSearch() {
  const { supabase } = useSupabase()
  const [selected, setSelected] = useState('')
  const [range, setRange] = useState(0)

  const exerciseCount = useRef(0)

  const getPaginatedExercises = useCallback(async () => {
    const { data, count, error } = await supabase
      .from('exercise')
      .select('*', { count: 'exact' })
      .eq('muscle_group', selected)
      .range(range, range + PAGINATION_STEP - 1)

    if (count) exerciseCount.current = count

    return { data, error }
  }, [range, selected, supabase])

  const { data: exercises, error } = useFetchSupabase(getPaginatedExercises, {
    executeOnMount: true,
  })

  useEffect(() => {
    setRange(0)
  }, [selected])

  return (
    <div className="flex-1">
      <div className="flex justify-between">
        <MuscleGroupSelect
          selected={selected}
          onChange={(e) => setSelected(e.target.value)}
        />
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
      {error && <div>{error.message}</div>}
    </div>
  )
}

export default MuscleGroupSearch
