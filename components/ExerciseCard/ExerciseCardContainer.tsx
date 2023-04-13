import { ReactNode } from 'react'

function ExerciseCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded shadow bg-base-100">
      {children}
    </div>
  )
}

export default ExerciseCardContainer
