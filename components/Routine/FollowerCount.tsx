import UserIcon from '@heroicons/react/20/solid/UserIcon'

function FollowerCount({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-center">
      <UserIcon width={24} height={24} className="fill-primary " />
      <p className="text-xs font-bold">{count}</p>
    </div>
  )
}

export default FollowerCount
