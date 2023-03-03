import ExerciseSelect from '@/components/exercise-select/exercise-select'
import { createServerClient } from '@/utils/supabase-server'

export default async function Day({ params }: { params: { id: string } }) {
  const supabase = createServerClient()

  const { data: bodyParts } = await supabase.from('distinct_body_part').select()
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <ExerciseSelect bodyParts={bodyParts} />
    </div>
  )
}
