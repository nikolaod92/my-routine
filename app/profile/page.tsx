import UpdateForm from '@/components/Profile/UpdateForm'
import Avatar from '@/components/UI/Avatar'
import Card from '@/components/UI/Card'
import { createServerClient } from '@/utils/supabase-server'

export const revalidate = 0

export default async function ProfilePage() {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: user } = await supabase
    .from('profile')
    .select()
    .eq('id', session?.user.id)
    .single()

  if (user)
    return (
      <Card className="flex flex-col items-center space-y-6">
        {user.avatar && <Avatar avatar={user.avatar} size="xl" />}
        <h1 className="text-center text-4xl font-bold capitalize">
          {user.name}
        </h1>
        <UpdateForm user={user} />
      </Card>
    )
}
