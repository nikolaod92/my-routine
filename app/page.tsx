import Link from 'next/link'

export const revalidate = 60

export default async function Home() {
  return (
    <div className="flex flex-col text-center mt-4 px-4">
      <h1 className="text-5xl lg:text-6xl font-bold mb-4">
        Let us help you on your fitness journey!
      </h1>
      <p className="text-lg leading-6 font-medium mb-12">
        Browse our extensive collection of routines and exercises, select a
        routine created by our users or even create your own!
      </p>
      <div className="flex flex-col mx-auto">
        <Link
          href="/routines"
          className="btn btn-md btn-wide btn-secondary shadow-lg shadow-secondary/25 mb-1 "
        >
          Routines
        </Link>
        <Link
          href="/create"
          className="btn btn-md btn-wide btn-primary shadow-lg shadow-primary/50 "
        >
          Create
        </Link>
      </div>
    </div>
  )
}
