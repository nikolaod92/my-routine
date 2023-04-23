import Card from '@/components/UI/Card'
import RoutineContainer from '@/components/Routine/RoutineContainer'
import { createServerClient } from '@/utils/supabase-server'
import Link from 'next/link'

export const revalidate = 0

export default async function Home() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: user, error } = await supabase
    .from('profile')
    .select('name, routine_id')
    .eq('id', session?.user.id)
    .single()

  if (!user?.routine_id)
    return (
      <Card className="flex flex-col items-center space-y-4">
        <p className="text-center text-2xl font-semibold">
          You are not currently following a routine.
        </p>
        <div className="divider" />
        <p className="text-sm">Choose one already created by our users:</p>
        <Link href="/routines" className="btn btn-secondary btn-wide">
          Routines
        </Link>
        <div className="divider" />
        <p className="text-sm">or create your own and share it!</p>
        <Link href="/create" className="btn btn-primary btn-wide">
          Create
        </Link>
      </Card>
    )

  if (error) return <div>Could not load routine. Please try again.</div>

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <RoutineContainer id={user.routine_id} />
    </>
  )
}
