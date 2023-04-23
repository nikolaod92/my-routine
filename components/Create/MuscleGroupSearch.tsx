'use client'

import useFetchSupabase from '@/hooks/useFetchSupabase'
import { PAGINATION_STEP } from '@/lib/constants'
import { useCallback, useEffect, useState } from 'react'
import { ExerciseCardContainer } from '../ExerciseCard'
import { useSupabase } from '../SupabaseProvider'
import ResponsiveGrid from '../UI/ResponsiveGrid'
import AddExerciseCard from './AddExerciseCard'

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
    <div className="w-full flex-1 space-y-4">
      <div className="flex justify-between">
        <MuscleGroupSelect
          selected={selected}
          onChange={(e) => setSelected(e.target.value)}
        />
        {selected && count && (
          <ExercisePagination range={range} setRange={setRange} count={count} />
        )}
      </div>
      {loading ? (
        <ExerciseCardContainer.Skeleton />
      ) : (
        <ResponsiveGrid>
          {exercises &&
            exercises.map((exercise) => (
              <AddExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </ResponsiveGrid>
      )}
      {error && <div>{error.message}</div>}
    </div>
  )
}

export default MuscleGroupSearch
