import { createServerClient } from '@/utils/supabase-server'
import { Metadata } from 'next'
import { RoutineWithAuthor } from '@/lib/database.types'
import RoutineListContainer from '@/components/RoutineList/RoutineListContainer'

export const revalidate = 0

export const metadata: Metadata = {
  title: {
    template: 'Routines | %s',
    default: 'Routines',
  },
  description: 'Browse our routines',
}

export default async function Routines() {
  const supabase = createServerClient()

  const { data } = await supabase
    .from('routine')
    .select(
      `id, name, description, follower_count, created_at, profile!routine_author_id_fkey (name, avatar)`
    )
    .order('follower_count', {
      ascending: false,
    })
    .limit(12)
    .returns<RoutineWithAuthor[]>()

  return (
    <div className="space-y-4">
      {data ? (
        <RoutineListContainer serverRoutines={data} />
      ) : (
        <div>Could not load routines. Please try again.</div>
      )}
    </div>
  )
}
