import { ReactNode } from 'react'
import { Skeleton } from '../Skeleton'

function ExerciseCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden rounded shadow bg-base-100">
      {children}
    </div>
  )
}

ExerciseCardContainer.Skeleton = function CardSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        // Using index as key since order of components will never chagnge
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          <Skeleton className="h-8 bg-primary/10 rounded-b-none" />
          <Skeleton className="h-36 rounded-t-none" />
        </div>
      ))}
    </>
  )
}

export default ExerciseCardContainer
