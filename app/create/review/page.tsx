'use client'

import { useStore } from '@/store'

export default function Review() {
  const [exercises] = useStore((state) => [state.exercises])

  console.log(exercises)

  return <div>Review</div>
}
