import { ReactNode } from 'react'

function ExerciseGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
      {children}
    </div>
  )
}

export default ExerciseGrid
