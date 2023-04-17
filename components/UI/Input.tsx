import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMsg: string | undefined
  srOnly?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMsg, srOnly = false, children, ...props }, ref) => (
    <div className="relative">
      <label htmlFor={props.name} className={cn('label', srOnly && 'sr-only')}>
        <span className="text-xs font-semibold uppercase leading-3">
          {props.name}
        </span>
      </label>
      <input
        id={props.name}
        className="input input-sm w-full bg-primary/10 text-lg font-medium"
        ref={ref}
        {...props}
      />
      {children}
      {errorMsg && (
        <p className="mt-1 text-xs italic text-red-500">{errorMsg}</p>
      )}
    </div>
  )
)

Input.displayName = 'Input'

export default Input
