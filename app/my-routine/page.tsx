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

  const { data } = await supabase
    .from('profile')
    .select('routine_id')
    .eq('id', session?.user.id)
    .single()

  if (!data?.routine_id)
    return (
      <Card className="flex flex-col items-center space-y-4">
        <p className="font-semibold text-2xl text-center">
          You are not currently following a routine.
        </p>
        <div className="divider" />
        <p className="text-sm">Choose one already created by our users:</p>
        <Link href="/routines" className="btn btn-wide btn-secondary">
          Routines
        </Link>
        <div className="divider" />
        <p className="text-sm">or create your own and share it!</p>
        <Link href="/create" className="btn btn-wide btn-primary">
          Create
        </Link>
      </Card>
    )

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <RoutineContainer id={data.routine_id} />
    </div>
  )
}
