import Link from 'next/link'

export default async function Home() {
  return (
    <div className="mt-4 flex flex-col px-4 text-center">
      <h1 className="mb-4 text-5xl font-bold lg:text-6xl">
        Let us help you on your fitness journey!
      </h1>
      <p className="mb-12 text-lg font-medium leading-6">
        Browse our extensive collection of routines and exercises, select a
        routine created by our users or even create your own!
      </p>
      <div className="mx-auto flex flex-col">
        <Link
          href="/routines"
          className="btn-secondary btn-wide btn-md btn mb-1 shadow-lg shadow-secondary/25 "
        >
          Routines
        </Link>
        <Link
          prefetch={false}
          href="/create"
          className="btn-primary btn-wide btn-md btn shadow-lg shadow-primary/50 "
        >
          Create
        </Link>
      </div>
    </div>
  )
}
