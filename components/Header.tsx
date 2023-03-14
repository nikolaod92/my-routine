/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import Link from 'next/link'
import { useSupabase } from '@/components/SupabaseProvider'

export default function Header() {
  const { supabase, session } = useSupabase()

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="navbar bg-base-200 xl:px-24 2xl:px-36">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/routines">Routines</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          myRoutine
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Link href="/routines">Routines</Link>
        </ul>
      </div>
      <div className="navbar-end">
        {!session ? (
          <button
            type="button"
            onClick={signInWithGoogle}
            className="btn btn-primary"
          >
            Sign In
          </button>
        ) : (
          <button type="button" onClick={logout} className="btn btn-accent">
            Logout
          </button>
        )}
      </div>
    </div>
  )
}
