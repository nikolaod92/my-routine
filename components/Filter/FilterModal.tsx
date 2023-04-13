import { ReactNode } from 'react'

function FilterModal({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="max-w-sm p-4 mx-4 rounded-lg shadow-lg relative w-full bg-base-100 outline-none focus:outline-none">
          {children}
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  )
}

export default FilterModal
