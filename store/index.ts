import { Database } from '@/lib/database.types'
import { create } from 'zustand'

type Day = Database['public']['Tables']['day']['Insert']
export type DayExercise =
  Database['public']['Tables']['exercises_on_day']['Insert']

type State = {
  routineInfo: {
    name: string
    description: string
    daysPerWeek: number
  }
  days: Day[]
  exercises: DayExercise[]
}

type Action = {
  setRoutineInfo: (routineInfo: State['routineInfo']) => void
  setExercises: (exercises: State['exercises']) => void
  addExercise: (exercise: DayExercise) => void
}

export const useStore = create<State & Action>((set) => ({
  routineInfo: {
    name: '',
    description: '',
    daysPerWeek: 0,
  },
  days: [],
  exercises: [],
  setRoutineInfo: (routineInfo) => set(() => ({ routineInfo })),
  setExercises: (exercises) => set(() => ({ exercises })),
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
}))
