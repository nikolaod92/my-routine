/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import useFetchSupabase from '@/hooks/useFetchSupabase'
import { PAGINATION_STEP } from '@/lib/constants'
import { Exercise } from '@/lib/database.types'
import { useCallback, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import ResponsiveGrid from '../CreateExerciseForm/ResponsiveGrid'
import ExercisePagination from '../CreateExerciseForm/Select/ExercisePagination'
import {
  ExerciseCardContainer,
  ExerciseHeader,
  ExerciseTitle,
  ExerciseImage,
} from '../Exercise'
import { useSupabase } from '../SupabaseProvider'
import FilterForm from './FilterForm'
import FilterModal from './FilterModal'

function Filter({ serverExercises }: { serverExercises: Exercise[] | null }) {
  const [exercises, setExercises] = useState<Exercise[] | null>(serverExercises)
  const { supabase } = useSupabase()
  const { register, handleSubmit } = useForm()
  const [range, setRange] = useState(0)

  const getDistinctTargetMuscles = useCallback(
    async () => supabase.from('distinct_target').select(),
    [supabase]
  )

  const { data: targetMuscles } = useFetchSupabase(getDistinctTargetMuscles, {
    executeOnMount: true,
  })

  const onSubmit = (formData: FieldValues) => {
    const { filters } = formData

    setRange(0)

    const filteredExercises = serverExercises?.filter((exercise) =>
      filters.some((filter: string) => exercise.target === filter)
    )
    if (filteredExercises && filters.length > 0) setExercises(filteredExercises)
  }

  return (
    <>
      <FilterModal>
        <FilterForm
          register={register}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          data={targetMuscles}
        />
      </FilterModal>
      <ResponsiveGrid>
        {exercises?.slice(range, range + PAGINATION_STEP).map((exercise) => (
          <ExerciseCardContainer key={exercise.id}>
            <ExerciseHeader>
              <ExerciseTitle name={exercise.name} />
            </ExerciseHeader>
            <ExerciseImage src={exercise.gif} alt={exercise.name} />
          </ExerciseCardContainer>
        ))}
      </ResponsiveGrid>
      {exercises && exercises.length > 0 && (
        <ExercisePagination
          range={range}
          setRange={setRange}
          count={exercises.length}
        />
      )}
    </>
  )
}

export default Filter
