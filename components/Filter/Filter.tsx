'use client'

import useFetchSupabase from '@/hooks/useFetchSupabase'
import { PAGINATION_STEP } from '@/lib/constants'
import { Exercise } from '@/lib/database.types'
import { useCallback, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import ResponsiveGrid from '../UI/ResponsiveGrid'
import {
  ExerciseCardContainer,
  ExerciseHeader,
  ExerciseTitle,
  ExerciseImage,
} from '../ExerciseCard'
import { useSupabase } from '../SupabaseProvider'
import FilterData from './FilterData'
import FilterForm from './FilterForm'
import FilterModal from './FilterModal'
import ExercisePagination from '../Create/ExercisePagination'

function Filter({ serverExercises }: { serverExercises: Exercise[] | null }) {
  const { supabase } = useSupabase()
  const { register, handleSubmit } = useForm()

  const [exercises, setExercises] = useState<Exercise[] | null>(serverExercises)
  const [showModal, setShowModal] = useState(false)
  const [range, setRange] = useState(0)

  const getDistinctTargetMuscles = useCallback(
    async () => supabase.from('distinct_target').select(),
    [supabase]
  )

  const { data: targetMuscles } = useFetchSupabase(getDistinctTargetMuscles, {
    executeOnMount: true,
  })

  const onSubmit = (formData: FieldValues) => {
    setShowModal(false)
    const { filters } = formData
    if (!filters || filters.length === 0) {
      setExercises(serverExercises)
      return
    }

    setRange(0)
    const filteredExercises = serverExercises?.filter((exercise) =>
      filters.some((filter: string) => exercise.target === filter)
    )
    if (filteredExercises) setExercises(filteredExercises)
  }

  return (
    <>
      <div className="flex justify-between">
        <button
          className="btn btn-sm btn-secondary"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Filters{' '}
          <span className="bg-base-100 text-secondary text-xs font-bold rounded px-1 ml-2">
            {exercises?.length}
          </span>
        </button>
        {exercises && exercises.length > 0 ? (
          <ExercisePagination
            range={range}
            setRange={setRange}
            count={exercises.length}
          />
        ) : null}
      </div>
      {showModal ? (
        <FilterModal>
          <FilterForm onSubmit={onSubmit} handleSubmit={handleSubmit}>
            {targetMuscles && (
              <FilterData register={register} data={targetMuscles} />
            )}
          </FilterForm>
        </FilterModal>
      ) : null}
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
    </>
  )
}

export default Filter
