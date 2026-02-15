import React, { use, useContext, useEffect,  } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react';
import axios from 'axios'
import { AppContext } from '../context/AppContext';

const Register = () => {
  const [registerInfo, setRegisterInfo ] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [processing, setProcessing] = useState(false)
  const [errMsg, setErrMsg] = useState(null)

  const {url, setToken} = useContext(AppContext)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token') || null
    if(token){
      setToken(token)
      navigate('/dashboard')
    } else {
      setToken(null)
    }   
  }, [])

  const handleChanges = (e) => {
    const { name, value } = e.target
    setRegisterInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    setErrMsg(null)
    try {
      const endpoint = `${url}/auth/register`

      const response = await axios.post(endpoint, registerInfo)
      if (response.status === 201) {
        setProcessing(false)
        setErrMsg(null)
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        navigate('/dashboard')
      } else {
        setProcessing(false)
        setToken(null)
        setErrMsg(response.data.message)
      }
    } catch (error) {
      console.log(error)
        setToken(null)
      setProcessing(false)
      setErrMsg(error.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className='w-full h-screen bg-white flex justify-center items-center'>
      <div className='min-w-[350px] border-gray-500 shadow-2xl rounded-sm py-4 px-5 flex flex-col gap-3'>
        <h1 className='text-2xl font-bold text-center'>Register</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            type="text"
            placeholder='Name'
            name="name"
            onChange={handleChanges}
            required
            className='w-full border-2 border-gray-300 rounded-sm py-2 px-3 focus:outline-none' />
          <input
            type="text"
            placeholder='Email'
            name="email"
            onChange={handleChanges}
            required
            className='w-full border-2 border-gray-300 rounded-sm py-2 px-3 focus:outline-none' />
          <input
            type="password"
            placeholder='Password'
            name="password"
            onChange={handleChanges}
            required
            className='w-full border-2 border-gray-300 rounded-sm py-2 px-3 focus:outline-none ' />
          {processing ? (
            <button disabled className="w-full flex justify-center items-center gap-2 bg-blue-400 text-white py-2 rounded-sm cursor-not-allowed">
              <LoaderCircle className="animate-spin w-4 h-4" />
              <span>Registering...</span>
            </button>
          ) : (
            <button className='w-full bg-blue-500 text-white py-2 rounded-sm transition duration-300'>
              Register
            </button>
          )}
            {errMsg && <p className='text-red-500 text-sm text-center'>{errMsg}</p>}
        </form>

        <p className='text-center text-sm text-gray-500'>Already have an account? <span onClick={() => navigate('/login')} className='text-blue-500 cursor-pointer hover:underline'>Login</span></p>
      </div>
    </div>
  )
}

export default Register
