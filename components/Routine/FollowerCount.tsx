import { Icons } from '../UI/Icons'

function FollowerCount({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-center">
      <Icons.User width={20} height={20} className="fill-primary" />
      <p className="text-xs font-bold">{count}</p>
    </div>
  )
}

export default FollowerCount
