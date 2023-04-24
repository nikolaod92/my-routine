import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes } from 'react'
import { IconName, Icons } from './Icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMsg: string | undefined
  srOnly?: boolean
  icon?: IconName
  labelText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMsg, srOnly = false, children, icon, labelText, ...props }, ref) => {
    const Icon = icon ? Icons[icon] : undefined
    return (
      <div className="relative">
        <label
          htmlFor={props.name}
          className={cn('label justify-start', srOnly && 'sr-only')}
        >
          <span className="text-xs font-semibold uppercase leading-3">
            {labelText ?? props.name}
          </span>
        </label>
        {Icon && (
          <Icon className="absolute top-9 h-4 w-4 translate-x-2 text-primary/40" />
        )}
        <input
          id={props.name}
          className={cn(
            'input input-sm w-full bg-primary/10 text-lg font-medium',
            icon && 'pl-8'
          )}
          ref={ref}
          {...props}
        />
        {children}
        {errorMsg && (
          <p className="mt-1 text-xs font-medium text-error">{errorMsg}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
