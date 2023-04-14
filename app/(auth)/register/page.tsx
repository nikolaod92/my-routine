import Card from '@/components/UI/Card'
import Register from '@/components/Auth/Register'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

export default async function RegisterPage() {
  return (
    <Card>
      <Register />
    </Card>
  )
}
