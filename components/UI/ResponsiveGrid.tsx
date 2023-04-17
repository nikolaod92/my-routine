import { ReactNode } from 'react'

function ResponsiveGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full my-4">
      {children}
    </div>
  )
}

export default ResponsiveGrid
