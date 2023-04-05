import { ReactNode, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

type Props = {
  loading: boolean
  children: ReactNode
  size: number
}

function Loader({ loading, size, children }: Props) {
  const [isExpired, setIsExpired] = useState(true)

  const delay = 500

  useEffect(() => {
    if (loading) {
      setIsExpired(false)
      let timeoutInstance

      if (timeoutInstance) {
        clearTimeout(timeoutInstance)
      }

      timeoutInstance = setTimeout(() => {
        setIsExpired(true)
      }, delay)
    }
  }, [loading])

  if (!isExpired) {
    return <ClipLoader size={size} cssOverride={{}} />
  }

  return <div>{children}</div>
}

export default Loader
