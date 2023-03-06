import { create } from 'zustand'

type State = {
  routineInfo: {
    name: string
    description: string
    daysPerWeek: number
  }
}

type Action = {
  setRoutineInfo: (routineInfo: State['routineInfo']) => void
}

export const useStore = create<State & Action>((set) => ({
  routineInfo: {
    name: '',
    description: '',
    daysPerWeek: 0,
  },
  setRoutineInfo: (routineInfo) => set(() => ({ routineInfo })),
}))
