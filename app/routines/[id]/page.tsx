import RoutineCommentsList from '@/components/Routine/Comments/RoutineCommentsList'
import RoutineContainer from '@/components/Routine/RoutineContainer'
import { createServerClient } from '@/utils/supabase-server'

export const revalidate = 0

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props) {
  const supabase = createServerClient()
  const { data: routine } = await supabase
    .from('routine')
    .select('name, description')
    .eq('id', params.id)
    .single()

  if (!routine) return {}

  return {
    title: routine.name,
    description: routine.description,
  }
}

export default async function RoutinePage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <RoutineContainer id={params.id} />
      {/* @ts-expect-error Async Server Component */}
      <RoutineCommentsList id={params.id} />
    </>
  )
}
