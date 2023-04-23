'use client'

import Link from 'next/link'

import { useEffect } from 'react'
import SignIn from './SignIn/SignIn'

const menuItems = [
  { title: 'My Routine', url: '/my-routine', prefetch: false },
  { title: 'Routines', url: '/routines', prefetch: false },
  { title: 'Exercises', url: '/exercises', prefetch: true },
  { title: 'Create', url: '/create', prefetch: false },
]

function MenuItems() {
  return (
    <>
      {menuItems.map((item) => (
        <li key={item.url}>
          <Link
            prefetch={item.prefetch}
            href={item.url}
            className="font-semibold"
          >
            {item.title}
          </Link>
        </li>
      ))}
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
    <div className="navbar z-40 border-b-[1px] border-b-base-300 bg-base-100 lg:px-16 xl:px-24 2xl:px-36">
      <div className="navbar-start">
        <div className="dropdown">
          <button type="button" className="btn btn-ghost lg:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
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
          </button>
          <ul className="dropdown-content menu menu-compact mt-4 w-52 rounded-b-md border-l-4 border-l-primary  bg-base-100 p-2 shadow-lg">
            <MenuItems />
          </ul>
        </div>
        <Link href="/" className="pb-1 text-2xl font-bold">
          myRoutine
        </Link>
        <div className="ml-4 hidden lg:flex">
          <ul className="menu menu-horizontal">
            <MenuItems />
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <SignIn />
      </div>
    </div>
  )
}
