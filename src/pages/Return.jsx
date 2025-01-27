import React from 'react'
import { Link } from 'react-router-dom'

const Return = () => {
  return (
    <div className='m-2 w-full max-w-md bg-yellow-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-yellow-800 font-bold text-lg text-center'>Order Returned Successfully</p>
        <Link to="/" className="border border-yellow-900 text-yellow-900 hover:bg-yellow-900 hover:text-white transition-all px-4 py-1">Go To Home</Link>
    </div>
  )
}

export default Return
