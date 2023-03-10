import Link from 'next/link'

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
