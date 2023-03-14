import { createServerClient } from '@/utils/supabase-server'

export default async function Routines() {
  const supabase = createServerClient()

  const { data } = await supabase.from('routine').select()

  return (
    <div>
      {data &&
        data.map((routine) => (
          <div>
            {routine.name}, {routine.description}, {routine.author_id}
          </div>
        ))}
    </div>
  )
}
