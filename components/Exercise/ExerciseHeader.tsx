import { ReactNode } from 'react'

function ExerciseHeader({
  children,
  isAddedToState = false,
}: {
  children: ReactNode
  isAddedToState?: boolean
}) {
  return (
    <div
      className={`bg-primary ${
        isAddedToState && 'bg-success'
      } flex space-x-2 justify-between items-center py-1 px-2 text-primary-content`}
    >
      {children}
    </div>
  )
}

export default ExerciseHeader
