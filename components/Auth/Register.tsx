'use client'

import { registerSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSupabase } from '../SupabaseProvider'
import Input from '../UI/Input'

type RegisterData = {
  email: string
  password: string
  confirm: string
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

    if (error) {
      toast.error(error.message)
      return
    }
    toast.success('Registered successfully!')
    router.replace('/')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-control w-full space-y-6"
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <div className="space-y-1">
          <Input
            errorMsg={errors.email?.message}
            {...register('email')}
            icon="Email"
          />
          <Input
            errorMsg={errors.username?.message}
            {...register('username')}
            icon="User"
          />
          <Input
            errorMsg={errors.password?.message}
            {...register('password')}
            type="password"
            icon="Password"
          />
          <Input
            errorMsg={errors.confirm?.message}
            {...register('confirm')}
            type="password"
            icon="Password"
            labelText="Confirm password"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">
          Register
        </button>
      </form>
      <div className="divider" />
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold underline underline-offset-4 hover:text-primary"
        >
          Login
        </Link>
      </p>
    </div>
  )
}

export default Register
