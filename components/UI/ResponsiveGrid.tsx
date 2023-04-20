import { motion } from 'framer-motion'
import { Children, ReactNode } from 'react'

function ResponsiveGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full my-4">
      {Children.map(children, (child, index) => (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className="flex"
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

export default ResponsiveGrid
