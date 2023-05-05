'use client'

import { UserProfile } from '@/lib/database.types'
import { updateProfileSchema } from '@/lib/validators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSupabase } from '../SupabaseProvider'
import Input from '../UI/Input'
import LoadingButton from '../UI/LoadingButton'

type UserData = {
  username: string
  avatar: FileList
}

type Props = {
  user: UserProfile
}

function UpdateForm({ user }: Props) {
  const { supabase } = useSupabase()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<UserData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: user.name ?? undefined,
    },
  })

  const onSubmit: SubmitHandler<UserData> = async (formData) => {
    const { username, avatar } = formData

    if (avatar.length > 0) {
      const { error: uploadError } = await supabase.storage
        .from('Avatars')
        .upload(`${user?.id}/${avatar[0].name}`, avatar[0])

      if (uploadError) {
        toast.error(uploadError.message)
        return
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from('Avatars')
        .getPublicUrl(`${user?.id}/${avatar[0].name}`)

      const { error } = await supabase
        .from('profile')
        .update({
          name: username,
          avatar: publicUrl,
        })
        .eq('id', user.id)

      if (error) {
        toast.error(error.message)
        return
      }
    } else {
      const { error } = await supabase
        .from('profile')
        .update({
          name: username,
        })
        .eq('id', user.id)

      if (error) {
        toast.error(error.message)
        return
      }
    }

    toast.success('Update successful!')
    reset({}, { keepValues: true })
    router.refresh()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-control w-full space-y-6"
    >
      <div className="space-y-1">
        <Input
          errorMsg={errors.username?.message}
          {...register('username')}
          icon="User"
          labelText="Change Username"
        />
        <Input
          errorMsg={errors.avatar?.message}
          {...register('avatar')}
          type="file"
          accept="image/*"
          labelText="Upload Avatar"
        />
      </div>
      <LoadingButton
        loading={isSubmitting}
        type="submit"
        disabled={!isDirty || isSubmitting}
      >
        Update
      </LoadingButton>
    </form>
  )
}

export default UpdateForm
