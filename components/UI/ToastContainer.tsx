'use client'

// TODO: Create custom Toast component with tailwind

import colors from '@/lib/colors'
import { Toaster } from 'react-hot-toast'

function Container() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          fontSize: '0.875rem',
          fontWeight: 500,
          color: colors['primary-content'],
        },
        success: {
          iconTheme: {
            primary: colors['base-100'],
            secondary: colors.success,
          },
          style: {
            background: colors.success,
          },
        },
        error: {
          iconTheme: {
            primary: colors['base-100'],
            secondary: colors.error,
          },
          style: {
            background: colors.error,
          },
        },
      }}
    />
  )
}

export default Container
