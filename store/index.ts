import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Database } from '@/lib/database.types'

export type DayExercise =
  Database['public']['Tables']['exercises_on_day']['Insert'] & {
    name: string
  }

type State = {
  routineInfo: {
    name: string
    description: string
    daysPerWeek: number
  }
  exercises: DayExercise[]
}

type Action = {
  setRoutineInfo: (routineInfo: State['routineInfo']) => void
  setExercises: (exercises: State['exercises']) => void
  addExercise: (exercise: DayExercise) => void
  resetExercises: () => void
}

const initialState: State = {
  routineInfo: {
    name: '',
    description: '',
    daysPerWeek: 0,
  },
  exercises: [],
}

export const useStore = create(
  persist<State & Action>(
    (set) => ({
      ...initialState,
      setRoutineInfo: (routineInfo) => set(() => ({ routineInfo })),
      setExercises: (exercises) => set(() => ({ exercises })),
      addExercise: (exercise) =>
        set((state) => ({ exercises: [...state.exercises, exercise] })),
      resetExercises: () => set(() => ({ exercises: [] })),
    }),
    { name: 'routine' }
  )
)
