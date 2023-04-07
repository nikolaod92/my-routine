type Props = { children: React.ReactNode; variant?: keyof typeof variants }

const variants = { primary: 'border-t-primary', error: 'border-t-error' }

function Card({ children, variant = 'primary' }: Props) {
  return (
    <div
      className={`card card-body mx-auto items-center max-w-md rounded border-t-4 ${variants[variant]} bg-base-100 shadow`}
    >
      {children}
    </div>
  )
}

export default Card
