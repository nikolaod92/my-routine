'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Container() {
  return (
    <ToastContainer
      autoClose={3000}
      position="bottom-right"
      bodyClassName="text-base-100"
      toastClassName="bg-error rounded  md:m-0"
      hideProgressBar
    />
  )
}

export default Container
