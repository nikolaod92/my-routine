import { Routine } from '@/lib/database.types'
import FollowRoutineButton from './FollowRoutineButton'

function RoutineInfo({ routine }: { routine: Routine }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="truncate text-3xl font-bold">{routine?.name}</h1>
        <FollowRoutineButton id={routine.id} />
      </div>
      <h1 className="text-md font-medium leading-5">{routine?.description}</h1>
    </div>
  )
}

export default RoutineInfo
