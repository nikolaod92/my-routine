import { Routine } from '@/lib/database.types'
import FollowRoutineButton from './FollowRoutineButton'

function RoutineInfo({ routine }: { routine: Routine }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl truncate">{routine?.name}</h1>
        <FollowRoutineButton id={routine.id} />
      </div>
      <h1 className="font-medium leading-5 text-md">{routine?.description}</h1>
    </div>
  )
}

export default RoutineInfo
