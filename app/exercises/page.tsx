import Filter from '@/components/Filter/Filter'
import { createServerClient } from '@/utils/supabase-server'

export const revalidate = 3600

export default async function Exercises() {
  const supabase = createServerClient()

  const { data: exercises } = await supabase.from('exercise').select()

  return (
    <div>
      <h1 className="text-2xl font-bold">Browse:</h1>
      <Filter serverExercises={exercises} />
    </div>
  )
}
