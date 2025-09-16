import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const ErrorPage = ({ message }) => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-black p-6">
      <div className="gradient-border rounded-xl card-hover w-full max-w-xl">
        <div className="card-surface rounded-[11px] p-8 text-center">
          <div className="flex justify-center mb-4">
            <FaExclamationTriangle className='text-5xl text-yellow-400' />
          </div>
          <h1 className='text-3xl font-bold mb-2 text-yellow-400'>
            Oops! Something went wrong.
          </h1>
          <p className='text-gray-300 mb-6'>
            {message ? message : "An unexpected error has occurred."}
          </p>
          <button onClick={() => navigate("/")}
            className='px-5 py-3 bg-yellow-500 hover:bg-yellow-400 text-black rounded-md transition'>
            Go back to home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage