'use client'

import { loginSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import GoogleSignInButton from '../SignIn/GoogleSignInButton'
import { useSupabase } from '../SupabaseProvider'
import Input from '../UI/Input'

type LoginData = {
  email: string
  password: string
}

function Login() {
  const { supabase } = useSupabase()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) })

  const onSubmit: SubmitHandler<LoginData> = async (formData) => {
    const { email, password } = formData

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) toast.error(error.message)

    if (!error) router.replace('/')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control space-y-6 w-full"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="space-y-1">
          <Input errorMsg={errors.email?.message} {...register('email')} />
          <Input
            errorMsg={errors.password?.message}
            {...register('password')}
            type="password"
          />
        </div>
        <button type="submit" className="btn-primary btn-sm btn">
          Login
        </button>
        <div className="divider">or</div>
        <GoogleSignInButton />
      </form>
      <div className="divider" />
      <p className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-semibold hover:text-primary underline underline-offset-4"
        >
          Register
        </Link>
      </p>
    </div>
  )
}

export default Login
