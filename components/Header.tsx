/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import Link from 'next/link'

import { useEffect } from 'react'
import SignIn from './SignIn/SignIn'

function MenuItems() {
  return (
    <>
      <li>
        <Link href="/create">Create</Link>
      </li>
      <li>
        <Link href="/routines">All Routines</Link>
      </li>
    </>
  )
}

export default function Header() {
  // ? Temporary solution: Modified DaisyUI dropdown component to close when clicking a menu item
  useEffect(() => {
    const dropdownContent = document.querySelectorAll('.dropdown-content>li')
    dropdownContent.forEach((element) => {
      element.addEventListener('click', () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      })
    })
  }, [])

  return (
    <div className="navbar bg-base-100 lg:px-16 xl:px-24 2xl:px-36">
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
            <MenuItems />
          </ul>
        </div>
        <Link href="/" className="text-xl font-bold">
          myRoutine
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <MenuItems />
        </ul>
      </div>
      <div className="navbar-end">
        <SignIn />
      </div>
    </div>
  )
}
