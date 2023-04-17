import Card from '@/components/UI/Card'
import Login from '@/components/Auth/Login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default async function LoginPage() {
  return (
    <Card>
      <Login />
    </Card>
  )
}
