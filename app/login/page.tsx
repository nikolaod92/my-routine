import SignInButton from '@/components/SignIn/SignInButton'

export default async function Login() {
  return (
    <div className="card card-body bg-base-100 shadow-sm max-w-lg mx-auto">
      <p className="text-center text-sm mb-4">Please sign in to continue</p>
      <SignInButton />
    </div>
  )
}
