import { createServerClient } from '@/utils/supabase-server'
import AddCommentForm from './AddCommentForm'
import RoutineComment from './RoutineComment'

type ReturnType = {
  content: string
  created_at: string
  profile: {
    name: string
    avatar: string
  }
}

async function RoutineCommentsList({ id }: { id: string }) {
  const supabase = createServerClient()

  const { data: comments } = await supabase
    .from('comments')
    .select(`content, created_at, profile (name, avatar)`)
    .eq('routine_id', id)
    .returns<ReturnType[]>()

  return (
    <div className="mt-4 space-y-4">
      <AddCommentForm id={id} />
      {comments && comments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold">Comments</h2>
          <div className="divide-y-2">
            {comments?.map(
              ({ content, created_at, profile: { name, avatar } }) => (
                <RoutineComment
                  author={name}
                  created_at={created_at}
                  avatar={avatar}
                  content={content}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RoutineCommentsList
