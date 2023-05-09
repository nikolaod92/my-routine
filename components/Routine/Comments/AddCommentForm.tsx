'use client'

import { useSupabase } from '@/components/SupabaseProvider'
import LoadingButton from '@/components/UI/LoadingButton'
import { useUserProfile } from '@/contexts/userContext'
import useFetchSupabase from '@/hooks/useFetchSupabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type CommentData = {
  content: string
}

type Props = { id: string }

function AddCommentForm({ id }: Props) {
  const { supabase } = useSupabase()
  const router = useRouter()
  const user = useUserProfile()
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<CommentData>()

  const [userCommented, setUserCommented] = useState(true)

  const addComment = async (content: string) =>
    supabase.from('comments').insert({
      content,
      author_id: user?.id,
      routine_id: id,
    })

  const { loading, error, fetchData } = useFetchSupabase(addComment)

  useEffect(() => {
    const checkIfUserCommented = async () => {
      if (!user) return

      const { data } = await supabase
        .from('comments')
        .select()
        .eq('author_id', user?.id)
        .eq('routine_id', id)

      if (data) {
        setUserCommented(data.length > 0)
      }
    }
    checkIfUserCommented()
  }, [id, supabase, user])

  const onSubmit: SubmitHandler<CommentData> = async (formData) => {
    fetchData(formData.content)

    if (error) {
      toast.error(error.message)
      return
    }

    reset()
    router.refresh()
  }

  if (!user || userCommented) return null

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
      <div>
        <label htmlFor="description" className="label">
          <span className="text-xs font-semibold uppercase leading-3">
            Add Comment
          </span>
        </label>
        <textarea
          id="content"
          className="textarea h-24  w-full max-w-md bg-primary/10 px-4 py-2 text-sm font-medium"
          {...register('content')}
        />
        {errors.content && (
          <p className="text-xs italic text-red-500">
            {errors.content?.message}
          </p>
        )}
      </div>
      <LoadingButton
        loading={loading}
        type="submit"
        disabled={!isDirty || isSubmitting}
      >
        Post
      </LoadingButton>
    </form>
  )
}

export default AddCommentForm
