import Filter from '@/components/Filter/Filter'
import { createServerClient } from '@/utils/supabase-server'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exercises',
  description: 'Browse our extensive list of exercises',
}

export default async function Exercises() {
  const supabase = createServerClient()

  const { data: exercises, error } = await supabase.from('exercise').select()

  if (error) return <div>{error.message}</div>

  return <Filter serverExercises={exercises} />
}
