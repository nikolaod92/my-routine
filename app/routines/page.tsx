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
      }
    }[]
  | null

export default async function Routines() {
  const supabase = createServerClient()

  const { data } = await supabase
    .from('routine')
    .select(`id, name, description, profile!routine_author_id_fkey (name)`)
    .returns<ReturnType>()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data &&
        data.map((routine) => (
          <div className="card bg-base-100 shadow hover:shadow-md">
            <div className="card-body p-6">
              <div className="flex justify-between items-center">
                <Link href={`/routines/${routine.id}`} className="card-title">
                  {routine.name}
                </Link>
                <FollowerCount routineId={routine.id} />
              </div>

              <p>{routine.description}</p>
              <div className="flex text-sm self-end">
                <p>By:</p>
                <p className="ml-1 font-semibold">{routine?.profile?.name}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
