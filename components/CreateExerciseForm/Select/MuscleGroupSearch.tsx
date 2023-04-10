'use client'

import Loader from '@/components/Loader'
import useFetchSupabase from '@/hooks/useFetchSupabase'
import { PAGINATION_STEP } from '@/lib/constants'
import { useCallback, useEffect, useState } from 'react'
import { useSupabase } from '../../SupabaseProvider'
import ExerciseCard from '../AddExerciseCard'
import ExerciseGrid from '../ResponsiveGrid'
import ExercisePagination from './ExercisePagination'
import MuscleGroupSelect from './MuscleGroupSelect'

function MuscleGroupSearch() {
  const { supabase } = useSupabase()
  const [selected, setSelected] = useState('chest')
  const [range, setRange] = useState(0)

  const getPaginatedExercises = useCallback(async () => {
    if (!selected) return { data: null, error: null }

    return supabase
      .from('exercise')
      .select('*', { count: 'exact' })
      .eq('muscle_group', selected)
      .range(range, range + PAGINATION_STEP - 1)
  }, [range, selected, supabase])

  const {
    data: exercises,
    error,
    loading,
    count,
  } = useFetchSupabase(getPaginatedExercises, {
    executeOnMount: true,
  })

  useEffect(() => {
    setRange(0)
  }, [selected])

  return (
    <div className="flex-1 space-y-4 w-full">
      <div className="flex justify-between">
        <MuscleGroupSelect
          selected={selected}
          onChange={(e) => setSelected(e.target.value)}
        />
        {selected && count && (
          <ExercisePagination range={range} setRange={setRange} count={count} />
        )}
      </div>
      <Loader loading={loading} size={32}>
        <ExerciseGrid>
          {exercises &&
            exercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </ExerciseGrid>
      </Loader>
      {error && <div>{error.message}</div>}
    </div>
  )
}

export default MuscleGroupSearch
