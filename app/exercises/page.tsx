import Filter from '@/components/Filter/Filter'
import { createServerClient } from '@/utils/supabase-server'

export const revalidate = 3600

export default async function Exercises() {
  const supabase = createServerClient()

  const { data: exercises, error } = await supabase.from('exercise').select()

  if (error) return <div>{error.message}</div>

  return <Filter serverExercises={exercises} />
}
