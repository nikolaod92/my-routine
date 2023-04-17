import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ExerciseOnDay, DayOfWeek } from '@/lib/database.types'
import { DAYS_OF_WEEK } from '@/lib/constants'

type State = {
  currentDay: DayOfWeek
  routineInfo: {
    name: string
    description: string
  }
  exercises: ExerciseOnDay[]
}

type Action = {
  setCurrentDay: (currentDay: State['currentDay']) => void
  setRoutineInfo: (routineInfo: State['routineInfo']) => void
  setExercises: (exercises: State['exercises']) => void
  addExercise: (exercise: ExerciseOnDay) => void
  deleteExercise: (exercise: ExerciseOnDay) => void
  resetExercises: () => void
  reset: () => void
}

const initialState: State = {
  currentDay: DAYS_OF_WEEK[new Date().getDay() - 1],
  routineInfo: {
    name: '',
    description: '',
  },
  exercises: [],
}

export const useStore = create(
  persist<State & Action>(
    (set) => ({
      ...initialState,
      setCurrentDay: (currentDay) => set(() => ({ currentDay })),
      setRoutineInfo: (routineInfo) => set(() => ({ routineInfo })),
      setExercises: (exercises) => set(() => ({ exercises })),
      addExercise: (exercise) =>
        set((state) => ({ exercises: [...state.exercises, exercise] })),
      deleteExercise: (exercise) =>
        set((state) => ({
          exercises: state.exercises.filter(
            (ex) => ex.exercise_id !== exercise.exercise_id
          ),
        })),
      resetExercises: () => set(() => ({ exercises: [] })),
      reset: () => {
        set(initialState)
      },
    }),
    { name: 'routine' }
  )
)
