import { createServerClient } from '@/utils/supabase-server'
import Link from 'next/link'

export const revalidate = 0

export default async function Routines() {
  const supabase = createServerClient()

  const { data } = await supabase.from('routine').select()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data &&
        data.map((routine) => (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <Link href={`/routines/${routine.id}`} className="card-title">
                {routine.name}
              </Link>
              <p>{routine.description}</p>
              <p>Created by {routine.author_id}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
