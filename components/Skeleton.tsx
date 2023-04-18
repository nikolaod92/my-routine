import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'h-32 w-full animate-pulse rounded bg-base-100 shadow',
        className
      )}
      {...props}
    />
  )
}
