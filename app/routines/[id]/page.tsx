import Routine from '@/components/RoutineDisplay/Routine'

export const revalidate = 0

export default async function RoutinePage({
  params,
}: {
  params: { id: string }
}) {
  // @ts-expect-error Server Component
  return <Routine id={params.id} />
}
