import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading: boolean
}

function LoadingButton(props: Props) {
  const { children, loading, className, ...rest } = props

  return (
    <button
      type="button"
      className={cn('btn btn-primary btn-sm', loading && 'loading', className)}
      disabled={loading}
      {...rest}
    >
      {children}
    </button>
  )
}

export default LoadingButton
