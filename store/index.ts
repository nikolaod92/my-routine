import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Database, DayOfWeek } from '@/lib/database.types'

type ExerciseWithoutRoutineId = Omit<
  Database['public']['Tables']['exercises_on_day']['Row'],
  'routine_id'
>

export type DayExercise = ExerciseWithoutRoutineId & {
  name: string
}

type State = {
  currentDay: DayOfWeek
  routineInfo: {
    name: string
    description: string
  }
  exercises: DayExercise[]
}

type Action = {
  setCurrentDay: (currentDay: State['currentDay']) => void
  setRoutineInfo: (routineInfo: State['routineInfo']) => void
  setExercises: (exercises: State['exercises']) => void
  addExercise: (exercise: DayExercise) => void
  deleteExercise: (exercise: DayExercise) => void
  resetExercises: () => void
}

const initialState: State = {
  currentDay: 'm',
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
    }),
    { name: 'routine' }
  )
)
