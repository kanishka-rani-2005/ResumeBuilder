import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate,Link} from 'react-router-dom'
import {logout } from '../app/features/authSlice.js'


const Navbar = () => {
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logoutUser=()=>{
        navigate('/')
        dispatch(logout())
    }

  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>

        <Link to='/' >
        <img src="/logo.svg" alt="logo" className='h-11 w-auto'/>
        </Link>
        <div className='flex items-center gap-4 text-sm'>
            <p className='max-sm:hidden'>Hi,{user?.name}</p>
             <button
              onClick={logoutUser}
              className="hidden md:block bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-full text-sm"
            >
              Logout
            </button>

        </div>
        </nav>
      
    </div>
  )
}

export default Navbar
