// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Database } from '@/lib/database.types'
import Link from 'next/link'

// type Exercise = Database["public"]["Tables"]["exercise"]["Row"];

export default async function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center space-y-2">
      <p className="text-xl font-bold">Welcome.</p>
      <p>We are a unique company. Please get started.</p>
      <Link href="/create" className="btn btn-secondary">
        Create Routine
      </Link>
    </div>
  )
}
