import { ReactNode } from 'react'
import { Skeleton } from '../UI/Skeleton'

function ExerciseCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded bg-base-100 shadow">
      {children}
    </div>
  )
}

ExerciseCardContainer.Skeleton = function CardSkeleton() {
  return (
    <div className="my-4 grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {[...Array(6)].map((_, i) => (
        // Using index as key since order of components will never chagnge
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          <Skeleton className="h-8 rounded-b-none bg-primary/10" />
          <Skeleton className="h-36 rounded-t-none" />
        </div>
      ))}
    </div>
  )
}

export default ExerciseCardContainer
