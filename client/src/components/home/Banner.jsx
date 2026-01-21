import React, { useState } from 'react'
import Loader from '../Loader'   // adjust path if needed

const Banner = () => {

  const [loading, setLoading] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      window.location.href = "/app?state=register"
    }, 800) 
  }

  return (
    <>
      {loading && <Loader />}

      <div className="flex flex-wrap items-center justify-between w-full px-4 md:px-14 py-2 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 to-purple-100">
        <p>Build Your Resume With the help of AI</p>

        <button
          onClick={handleClick}
          className="flex items-center gap-1 px-3 py-1 rounded-lg text-violet-600 bg-violet-50 hover:bg-slate-100 transition active:scale-95 ml-3"
        >
          Explore now

        </button>
      </div>
    </>
  )
}

export default Banner
