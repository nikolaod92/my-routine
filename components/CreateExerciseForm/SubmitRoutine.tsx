'use client'

import { useStore } from '@/store'
import { useRouter } from 'next/navigation'

function SubmitRoutine() {
  const router = useRouter()

  const [routineInfo, exercises] = useStore((state) => [
    state.routineInfo,
    state.exercises,
  ])

  const submitRoutine = async () => {
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ routineInfo, exercises }),
      })

      if (res.ok) {
        router.push('/routines')
      } else {
        const e = await res.json()
        console.log(e)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      type="button"
      className="btn btn-sm md:btn-md btn-primary text-base-100"
      onClick={submitRoutine}
    >
      Submit
    </button>
  )
}

export default SubmitRoutine
