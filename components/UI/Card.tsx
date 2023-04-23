import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  variant?: keyof typeof variants
} & React.HTMLAttributes<HTMLDivElement>

const variants = { primary: 'border-t-primary', error: 'border-t-error' }

function Card({ children, variant = 'primary', className }: Props) {
  return (
    <div
      className={cn(
        'mx-auto max-w-md rounded border-t-4 bg-base-100 p-8 shadow',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
