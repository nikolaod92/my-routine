function FullScreenSpinner() {
  return (
    <div className="min-w-screen fixed inset-0 z-30 flex items-center justify-center bg-gray-100 p-5">
      <div className="flex animate-pulse space-x-2">
        <div className="h-3 w-3 rounded-full bg-gray-500" />
        <div className="h-3 w-3 rounded-full bg-gray-500" />
        <div className="h-3 w-3 rounded-full bg-gray-500" />
      </div>
    </div>
  )
}

export default FullScreenSpinner
