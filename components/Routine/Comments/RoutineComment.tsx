import Avatar from '@/components/UI/Avatar'
import { formatDate } from '@/lib/utils'

type Props = {
  author: string
  content: string
  created_at: string
  avatar: string
}

function RoutineComment({ author, content, created_at, avatar }: Props) {
  return (
    <div className="flex gap-4 py-4">
      <Avatar avatar={avatar} size="sm" />
      <div className="flex flex-col">
        <div className="flex items-center divide-x-2">
          <p className="text-md pr-2 font-bold text-gray-600">{author}</p>
          <p className="pl-2 text-sm">{formatDate(created_at)}</p>
        </div>
        <p className="text-md font-medium leading-5 md:text-lg">{content}</p>
      </div>
    </div>
  )
}

export default RoutineComment
