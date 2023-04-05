'use client'

import { Routine } from '@/lib/database.types'
import Follow from '../Follow'
import FollowerCount from './FollowerCount'

function RoutineInfo({ routine }: { routine: Routine }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl mr-2">{routine?.name}</h1>
          <FollowerCount routineId={routine.id} />
        </div>
        <Follow id={routine.id} />
      </div>
      <h1 className="font-light text-lg line-clamp-3">
        {routine?.description}
      </h1>
    </div>
  )
}

export default RoutineInfo
