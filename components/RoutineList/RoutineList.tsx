import { RoutineWithAuthor } from '@/lib/database.types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import FollowerCount from '../Routine/FollowerCount'
import Avatar from '../UI/Avatar'
import Card from '../UI/Card'
import { Skeleton } from '../UI/Skeleton'

function RoutineList({ routines }: { routines: RoutineWithAuthor[] }) {
  return (
    <>
      {routines.map((routine) => (
        <Card
          key={routine.id}
          className="flex min-w-full flex-col items-stretch border-t-0 border-primary p-4 transition-all hover:border-l-4"
        >
          <div className="flex items-center justify-between">
            <Link
              prefetch={false}
              href={`/routines/${routine.id}`}
              className="text-2xl font-bold"
            >
              {routine.name}
            </Link>
            <FollowerCount count={routine.follower_count} />
          </div>
          <p className="line-clamp-4 flex-1 text-sm font-medium">
            {routine.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="flex-1  text-xs">
              {routine.created_at ? formatDate(routine.created_at) : ''}
            </p>
            <p className="mr-2 text-xs font-bold uppercase">
              {routine?.profile?.name}
            </p>
            {routine.profile.avatar && (
              <Avatar avatar={routine.profile.avatar} />
            )}
          </div>
        </Card>
      ))}
    </>
  )
}

RoutineList.Skeleton = function RoutineListSkeleton() {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton className="hidden lg:block" />
      <Skeleton className="hidden lg:block" />
    </>
  )
}

export default RoutineList
