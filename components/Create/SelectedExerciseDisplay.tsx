'use client'

import { useStore } from '@/store'
import { useMemo } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useMounted } from '@/hooks/useMounted'
import ResetButton from './ResetButton'
import SubmitRoutine from './SubmitRoutine'
import { Skeleton } from '../UI/Skeleton'

function SelectedExerciseDisplay() {
  const [exercises, currentDay, deleteExercise] = useStore((state) => [
    state.exercises,
    state.currentDay,
    state.deleteExercise,
  ])

  const exercisesOnDay = useMemo(
    () => exercises.filter((ex) => ex.day_of_week === currentDay),
    [currentDay, exercises]
  )

  const mounted = useMounted()
  if (!mounted) return <Skeleton className="mt-2 h-6 max-w-lg" />

  return (
    <div className="mt-2 max-w-lg">
      <div className="overflow-hidden rounded shadow">
        <AnimatePresence initial={false} mode="popLayout">
          {exercisesOnDay.length === 0 ? (
            <motion.div
              animate={{ y: [-10, 0] }}
              className="bg-base-100 px-2 py-1 text-xs"
            >
              No exercises selected. Leave empty to designate a rest day.
            </motion.div>
          ) : (
            exercisesOnDay.map((ex) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [-10, 0] }}
                exit={{ opacity: 0, y: -10 }}
                key={ex.exercise_id}
                className="flex justify-between"
              >
                <div className="flex flex-1 justify-between bg-base-100 px-2 py-1 text-xs capitalize ">
                  <h2 className=" line-clamp-1 font-semibold">{ex.name}</h2>
                  <div className="flex space-x-2">
                    <p className="badge-primary badge badge-sm whitespace-nowrap font-semibold">
                      {ex.sets} / {ex.reps}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-xs rounded-none "
                  onClick={() => deleteExercise(ex)}
                >
                  <TrashIcon width={16} height={16} />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <div>
        {exercises.length !== 0 && (
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [-20, 0] }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-2 flex justify-between space-x-2"
            >
              <SubmitRoutine />
              <ResetButton />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default SelectedExerciseDisplay
