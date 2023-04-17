import { createServerClient } from '@/utils/supabase-server'
import { Metadata } from 'next'
import RoutineList from '@/components/RoutineList'
import { RoutineWithAuthor } from '@/lib/database.types'

export const revalidate = 30

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
      `id, name, description, follower_count, profile!routine_author_id_fkey (name, avatar)`
    )
    .order('follower_count', {
      ascending: false,
    })
    .returns<RoutineWithAuthor[]>()

  return (
    <div className="space-y-4">
      {data ? (
        <RoutineList serverRoutines={data} />
      ) : (
        <div>Could not load routines. Please try again.</div>
      )}
    </div>
  )
}
