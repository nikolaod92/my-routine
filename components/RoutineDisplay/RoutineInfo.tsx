import { Routine } from '@/lib/database.types'
import { UserIcon } from '@heroicons/react/20/solid'
import Follow from '../Follow'

function RoutineInfo({ routine }: { routine: Routine }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex  items-center">
          <h1 className="font-bold text-2xl mr-2">{routine?.name}</h1>
          <UserIcon width={24} height={24} className="fill-primary" />
          <p className="text-xs font-bold ">32</p>
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
