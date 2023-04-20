import { ReactNode } from 'react'
import { Skeleton } from '../UI/Skeleton'

function ExerciseCardContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full overflow-hidden rounded shadow bg-base-100">
      {children}
    </div>
  )
}

ExerciseCardContainer.Skeleton = function CardSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full my-4">
      {[...Array(6)].map((_, i) => (
        // Using index as key since order of components will never chagnge
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}>
          <Skeleton className="h-8 bg-primary/10 rounded-b-none" />
          <Skeleton className="h-36 rounded-t-none" />
        </div>
      ))}
    </div>
  )
}

export default ExerciseCardContainer
