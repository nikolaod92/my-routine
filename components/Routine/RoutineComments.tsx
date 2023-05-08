import { DEFAULT_AVATAR_URL } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import Avatar from '../UI/Avatar'

function RoutineComments() {
  return (
    <>
      <h2 className="mt-4 text-2xl font-bold">Comments</h2>
      <div className="divide-y-2">
        <div className="flex gap-4 py-4">
          <Avatar avatar={DEFAULT_AVATAR_URL} size="sm" />
          <div className="flex flex-col">
            <div className="flex items-center divide-x-2">
              <p className="text-md pr-2 font-bold text-gray-600">
                Nikola Odalovic
              </p>
              <p className="pl-2 text-sm">
                {formatDate(new Date().toISOString())}
              </p>
            </div>
            <p className="text-md font-medium leading-5 md:text-lg">
              Amazing routine. Following for 3 months, been noticing great
              progress!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoutineComments
