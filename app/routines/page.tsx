import Avatar from '@/components/UI/Avatar'
import Card from '@/components/UI/Card'
import FollowerCount from '@/components/RoutineDisplay/FollowerCount'
import { createServerClient } from '@/utils/supabase-server'
import Link from 'next/link'
import { Metadata } from 'next'

export const revalidate = 30

export const metadata: Metadata = {
  title: {
    template: 'Routines | %s',
    default: 'Routines',
  },
  description: 'Browse our routines',
}

type ReturnType =
  | {
      id: string
      name: string
      description: string | null
      follower_count: number
      profile: {
        name: string | null
        avatar: string | null
      }
    }[]
  | null

export default async function Routines() {
  const supabase = createServerClient()

  const { data, count } = await supabase
    .from('routine')
    .select(
      `id, name, description, follower_count, profile!routine_author_id_fkey (name, avatar)`,
      { count: 'exact' }
    )
    .order('follower_count', {
      ascending: false,
    })
    .returns<ReturnType>()

  return (
    <>
      <h1 className="text-xl font-semibold mb-2">
        Showing {count} most popular routines
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data &&
          data.map((routine) => (
            <Card className="flex flex-col min-w-full items-stretch p-4 border-t-0 border-primary hover:border-l-4 cursor-pointer transition-all">
              <div className="flex justify-between items-center">
                <Link
                  href={`/routines/${routine.id}`}
                  className="font-bold text-2xl"
                >
                  {routine.name}
                </Link>
                <FollowerCount count={routine.follower_count} />
              </div>
              <p className="font-medium text-sm flex-1">
                {routine.description}
              </p>
              <div className="flex items-center self-end mt-4">
                <p className="mr-2 text-xs uppercase font-medium">
                  {routine?.profile?.name}
                </p>
                {routine.profile.avatar && (
                  <Avatar avatar={routine.profile.avatar} />
                )}
              </div>
            </Card>
          ))}
      </div>
    </>
  )
}
