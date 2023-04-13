import Card from '@/components/UI/Card'
import SignInButton from '@/components/SignIn/SignInButton'

export default async function Login() {
  return (
    <Card variant="error">
      <p className="text-center text-2xl font-bold">
        You have to be logged in to view this page.
      </p>
      <div className="divider" />
      <p className="text-center text-sm font-semibold uppercase">
        <span className="pr-4">
          <SignInButton />
        </span>
        to continue
      </p>
    </Card>
  )
}
