import { Routine } from '@/lib/database.types'
import { StarIcon } from '@heroicons/react/20/solid'

function RoutineInfo({ routine }: { routine: Routine }) {
  return (
    <div>
      <div className="flex justify-between items-center space-x-1">
        <h1 className="flex-1 font-bold text-2xl">{routine?.name}</h1>
        <p className="text-xs font-bold mt-1">32</p>
        <StarIcon width={24} height={24} className="fill-primary" />
      </div>
      <h1 className="font-light text-lg line-clamp-3">
        {routine?.description}
      </h1>
    </div>
  )
}

export default RoutineInfo
