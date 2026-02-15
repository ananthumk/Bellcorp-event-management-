import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { LogOut } from 'lucide-react'

const Navbar = () => {
  const {setToken} = useContext(AppContext)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <nav className='w-full flex items-center justify-between px-10 bg-[#f4f3f3] h-[10vh] border-b-2 border-gray-400 py-4 px-6'>
      <h1 className='text-xl text-gray-400 font-bold'>Event <span className='text-[#1f7679]'>Management</span> </h1>
      
      <button onClick={handleLogout} className='bg-[#1f7679] hidden md:block text-white py-1 px-3 border-0 outline-0 rounded-sm'>Logout</button>
      <LogOut onClick={handleLogout} className='h-6 w-5 text-[#1f7679] md:hidden' />
    </nav>
  )
}

export default Navbar
