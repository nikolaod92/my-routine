// import { Database } from '@/lib/database.types'
import { create } from 'zustand'

// type Routine = Database['public']['Tables']['routine']['Insert']

type State = {
  routine: {
    name: string
    description: string
    days: number
  }
}

type Action = {
  setRoutine: (routine: State['routine']) => void
}

export const useStore = create<State & Action>((set) => ({
  routine: {
    name: '',
    description: '',
    days: 0,
  },
  setRoutine: (routine) => set(() => ({ routine })),
}))
