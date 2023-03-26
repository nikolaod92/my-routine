import { createServerClient } from '@/utils/supabase-server'
import { UserIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export const revalidate = 0

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
          <div className="card bg-base-100 shadow">
            <div className="card-body p-6">
              <div className="flex items-center space-x-1">
                <Link
                  href={`/routines/${routine.id}`}
                  className="card-title flex-1"
                >
                  {routine.name}
                </Link>
                <p className="text-xs font-bold flex-grow-0">32</p>
                <UserIcon width={20} height={20} className="fill-primary" />
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
