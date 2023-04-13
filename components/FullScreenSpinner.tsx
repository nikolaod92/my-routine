function FullScreenSpinner() {
  return (
    <div className="flex items-center justify-center p-5 min-w-screen fixed inset-0 z-40 bg-gray-100">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-gray-500 rounded-full" />
        <div className="w-3 h-3 bg-gray-500 rounded-full" />
        <div className="w-3 h-3 bg-gray-500 rounded-full" />
      </div>
    </div>
  )
}

export default FullScreenSpinner
