'use client'

import { Routine } from '@/lib/database.types'
import FollowRoutineButton from './FollowRoutineButton'
import FollowerCount from './FollowerCount'

function RoutineInfo({ routine }: { routine: Routine }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl mr-2">{routine?.name}</h1>
          <FollowerCount routineId={routine.id} />
        </div>
        <FollowRoutineButton id={routine.id} />
      </div>
      <h1 className="font-medium leading-5 text-md line-clamp-3">
        {routine?.description}
      </h1>
    </div>
  )
}

export default RoutineInfo
