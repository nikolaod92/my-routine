import { ReactNode } from 'react'

function ExerciseCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-48 overflow-hidden rounded shadow hover:cursor-pointer hover:shadow-lg">
      {children}
    </div>
  )
}

export default ExerciseCardContainer
