import { createServerClient } from '@/utils/supabase-server'
import ExerciseSelect from './ExerciseSelect'

async function BodyPartProvider() {
  const supabase = createServerClient()
  const { data } = await supabase.from('distinct_body_part').select()

  if (data) return <ExerciseSelect />
}

export default BodyPartProvider
