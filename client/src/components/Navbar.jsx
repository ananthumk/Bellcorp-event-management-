import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full flex items-center justify-between px-10 bg-[#f4f3f3] h-[10vh] border-b-2 border-gray-400 py-4 px-6'>
      <h1 className='text-xl text-gray-400 font-bold'>Event <span className='text-[#1f7679]'>Management</span> </h1>
      <button className='bg-[#1f7679] text-white py-1 px-3 border-0 outline-0 rounded-sm'>Logout</button>
    </nav>
  )
}

export default Navbar
