'use client'

import { useStore } from '@/store'
import { useMemo } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'
import ResetButton from './ResetButton'
import SubmitRoutine from './SubmitRoutine'

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

  return (
    <div className="w-full lg:max-w-lg mt-2">
      <div className="rounded overflow-hidden shadow">
        <AnimatePresence initial={false} mode="popLayout">
          {exercisesOnDay.length === 0 ? (
            <motion.div
              animate={{ y: [-10, 0] }}
              className="text-xs bg-base-100 px-2 py-1"
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
                <div className="flex flex-1 justify-between capitalize text-xs bg-base-100 px-2 py-1 ">
                  <h2 className=" font-semibold line-clamp-1">{ex.name}</h2>
                  <div className="flex space-x-2">
                    <p className="badge badge-sm badge-primary font-semibold whitespace-nowrap">
                      {ex.sets} / {ex.reps}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-xs btn-secondary rounded-none "
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
              className="flex justify-between space-x-2 mt-2"
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
