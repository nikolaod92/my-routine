import Avatar from '@/components/Avatar'
import Card from '@/components/Card'
import FollowerCount from '@/components/RoutineDisplay/FollowerCount'
import { createServerClient } from '@/utils/supabase-server'
import Link from 'next/link'

export const revalidate = 30

type ReturnType =
  | {
      id: string
      name: string
      description: string | null
      profile: {
        name: string | null
        avatar: string | null
      }
    }[]
  | null

export default async function Routines() {
  const supabase = createServerClient()

  const { data } = await supabase
    .from('routine')
    .select(
      `id, name, description, profile!routine_author_id_fkey (name, avatar)`
    )
    .returns<ReturnType>()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data &&
        data.map((routine) => (
          <Card className="flex flex-col min-w-full items-stretch p-4 border-t-0 border-l-4 border-primary">
            <div className="flex justify-between items-center">
              <Link
                href={`/routines/${routine.id}`}
                className="font-bold text-2xl"
              >
                {routine.name}
              </Link>
              <FollowerCount routineId={routine.id} />
            </div>
            <p className="font-medium text-sm flex-1">{routine.description}</p>
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
  )
}
