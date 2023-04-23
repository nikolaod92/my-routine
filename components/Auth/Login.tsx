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

    if (error) {
      toast.error(error.message)
      return
    }

    router.replace('/')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control w-full space-y-6"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="space-y-1">
          <Input
            errorMsg={errors.email?.message}
            {...register('email')}
            icon="Email"
          />
          <Input
            errorMsg={errors.password?.message}
            {...register('password')}
            icon="Password"
            type="password"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
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
          className="font-semibold underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
      </p>
    </div>
  )
}

export default Login
