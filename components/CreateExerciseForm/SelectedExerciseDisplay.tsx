'use client'

import { useStore } from '@/store'
import { useMemo } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { AnimatePresence, motion } from 'framer-motion'

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
    <div className="flex flex-col my-2 rounded shadow-sm overflow-hidden mb-6">
      <AnimatePresence initial={false} mode="popLayout">
        {exercisesOnDay.map((ex) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: [50, 0] }}
            exit={{ opacity: 0, x: 50 }}
            key={ex.exercise_id}
            className="flex justify-between"
          >
            <div className="flex flex-1 justify-between capitalize text-xs bg-base-100  px-2 py-1 ">
              <h2 className=" font-semibold line-clamp-1">{ex.name}</h2>
              <div className="flex space-x-2">
                <p className="badge badge-sm badge-primary font-semibold text-base-100 whitespace-nowrap">
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
        ))}
      </AnimatePresence>
    </div>
  )
}

export default SelectedExerciseDisplay
