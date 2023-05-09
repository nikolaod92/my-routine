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

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: comments } = await supabase
    .from('comments')
    .select(`content, created_at, profile (name, avatar)`)
    .eq('routine_id', id)
    .returns<ReturnType[]>()

  return (
    <div className="mt-6 space-y-2">
      {comments && comments.length > 0 && (
        <div>
          <div className="flex items-center text-xl font-bold">
            Comments{' '}
            <span className="badge-secondary badge badge-sm ml-2">
              {comments.length}
            </span>
          </div>
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
      {session && <AddCommentForm id={id} />}
    </div>
  )
}

export default RoutineCommentsList
