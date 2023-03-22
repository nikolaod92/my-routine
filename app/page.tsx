import { createServerClient } from '@/utils/supabase-server'

export default async function Home() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return <p>You have not chosen a routine yet. </p>

  return <div>Current routine: </div>
}
