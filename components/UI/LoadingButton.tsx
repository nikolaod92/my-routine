import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading: boolean
}

function LoadingButton(props: Props) {
  const { children, loading, ...rest } = props

  return (
    <button
      type="button"
      className={`btn btn-sm btn-primary ${loading && 'loading'}`}
      disabled={loading}
      {...rest}
    >
      {children}
    </button>
  )
}

export default LoadingButton
