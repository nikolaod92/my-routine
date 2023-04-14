'use client'

import { registerSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSupabase } from '../SupabaseProvider'

type RegisterData = {
  email: string
  password: string
  username: string
}

function Register() {
  const { supabase } = useSupabase()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) })

  const onSubmit: SubmitHandler<RegisterData> = async (formData) => {
    const { email, password, username } = formData

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username,
        },
      },
    })

    if (!error) router.replace('/')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control space-y-6 w-full"
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <div className="space-y-1">
          <div>
            <label htmlFor="email" className="label">
              <span className="text-xs font-semibold uppercase leading-3">
                Email
              </span>
            </label>
            <input
              id="email"
              type="email"
              className="input input-sm w-full bg-primary/10 text-lg font-medium"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-xs italic text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="label">
              <span className="text-xs font-semibold uppercase leading-3">
                Password
              </span>
            </label>
            <input
              id="password"
              type="password"
              className="input input-sm w-full bg-primary/10 text-lg font-medium"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="username" className="label">
              <span className="text-xs font-semibold uppercase leading-3">
                Username
              </span>
            </label>
            <input
              id="username"
              type="text"
              className="input input-sm w-full bg-primary/10 text-lg font-medium"
              {...register('username')}
            />
            {errors.username && (
              <p className="text-xs italic text-red-500">
                {errors.username?.message}
              </p>
            )}
          </div>
        </div>
        <button type="submit" className="btn-primary btn-sm btn">
          Register
        </button>
      </form>
      <div className="divider" />
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold hover:text-primary underline underline-offset-4"
        >
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
