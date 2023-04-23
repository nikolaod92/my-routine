import { ReactNode } from 'react'

function FilterModal({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-4 w-full max-w-sm rounded-lg bg-base-100 p-4 shadow-lg outline-none focus:outline-none">
          {children}
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25" />
    </>
  )
}

export default FilterModal
