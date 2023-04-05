/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading: boolean
}

function LoadingButton(props: Props) {
  const { children, loading, ...rest } = props

  return (
    <button
      className={`btn btn-sm md:btn-md btn-primary text-base-100 ${
        loading && 'loading'
      }`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default LoadingButton
