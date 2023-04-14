'use client'

import { useStore } from '@/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ZodError } from 'zod'
import LoadingButton from '../UI/LoadingButton'

function SubmitRoutine() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [routineInfo, exercises, reset] = useStore((state) => [
    state.routineInfo,
    state.exercises,
    state.reset,
  ])

  const submitRoutine = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ routineInfo, exercises }),
      })

      const data = await res.json()

      if (data.message) {
        toast.error(data.message)
        return
      }

      if (res.status === 400) {
        if (data.issues) {
          const { issues } = data as ZodError
          issues.map((issue) => toast.error(issue.message))
        }
        return
      }

      reset()
      router.push(`/routines/${data[0].id}`)
      toast('Successfully created routine!')
    } catch (error: unknown) {
      const { message } = error as Error
      toast.error(message)
    } finally {
      setTimeout(() => setLoading(false), 1000)
    }
  }

  return (
    <LoadingButton
      onClick={submitRoutine}
      loading={loading}
      disabled={!exercises.length}
    >
      {loading ? 'Wait' : 'Create'}
    </LoadingButton>
  )
}

export default SubmitRoutine
