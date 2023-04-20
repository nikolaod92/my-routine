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
          className="flex flex-col min-w-full items-stretch p-4 border-t-0 border-primary hover:border-l-4 transition-all"
        >
          <div className="flex justify-between items-center">
            <Link
              prefetch={false}
              href={`/routines/${routine.id}`}
              className="font-bold text-2xl"
            >
              {routine.name}
            </Link>
            <FollowerCount count={routine.follower_count} />
          </div>
          <p className="font-medium text-sm flex-1 line-clamp-4">
            {routine.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs  flex-1">
              {routine.created_at ? formatDate(routine.created_at) : ''}
            </p>
            <p className="mr-2 text-xs uppercase font-bold">
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
