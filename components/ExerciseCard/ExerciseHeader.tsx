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
      } flex items-center justify-between space-x-2 px-2 py-1 text-primary-content`}
    >
      {children}
    </div>
  )
}

export default ExerciseHeader
