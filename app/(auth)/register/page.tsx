import Card from '@/components/UI/Card'
import Register from '@/components/Auth/Register'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an account to get started.',
}

export default async function RegisterPage() {
  return (
    <Card>
      <Register />
    </Card>
  )
}
