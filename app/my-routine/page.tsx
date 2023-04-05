import Routine from '@/components/RoutineDisplay/Routine'
import { createServerClient } from '@/utils/supabase-server'
import Link from 'next/link'

export const revalidate = 0

export default async function Home() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data } = await supabase
    .from('profile')
    .select('routine_id')
    .eq('id', session?.user.id)
    .single()

  if (!data?.routine_id)
    return (
      <div className="card card-body bg-base-100 shadow-sm items-center max-w-sm mx-auto">
        <p className="font-light">You are not currently following a routine.</p>
        <div className="divider" />
        <p className="text-sm ">Choose one already created by our users:</p>
        <Link
          href="/routines"
          className="btn btn-wide btn-secondary text-base-100"
        >
          Routines
        </Link>
        <div className="divider" />

        <p className="text-sm ">or create your own and share it!</p>
        <Link href="/create" className="btn btn-wide btn-primary text-base-100">
          Create
        </Link>
      </div>
    )

  return (
    <div>
      <h2>Your current routine is:</h2>
      {/* @ts-expect-error Server Component */}
      <Routine id={data.routine_id} />
    </div>
  )
}
