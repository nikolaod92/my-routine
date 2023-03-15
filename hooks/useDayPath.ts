import { usePathname } from 'next/navigation'

const useDayPath = () => {
  const path = usePathname()
  return Number(path?.charAt(path.length - 1))
}

export default useDayPath
