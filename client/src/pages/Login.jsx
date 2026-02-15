import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react';
import axios from 'axios'
import { AppContext } from '../context/AppContext';

const Login = () => {
  const { loginInfo, setLoginInfo } = useState({
    email: '',
    password: ''
  })

  const [processing, setProcessing] = useState(false)
  const [errMsg, setErrMsg] = useState(null)

  const {url, setToken} = useContext(AppContext)

  const navigate = useNavigate()

  const handleChanges = (e) => {
    const { name, value } = e.target
    setLoginInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    setErrMsg(null)
    try {
      const url = `${url}/auth/login`

      const response = await axios.post(url, loginInfo)
      if (response.status === 200) {
        setProcessing(false)
        setErrMsg(null)
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
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
      setErrMsg(error.response.data.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className='w-full h-screen bg-white flex justify-center items-center'>
      <div className='min-w-[350px] border-gray-500 shadow-2xl rounded-sm py-4 px-5 flex flex-col gap-3'>
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            type="email"
            placeholder='email'
            name="email"
            required
            onChange={handleChanges}
            className='w-full border-2 border-gray-300 rounded-sm py-2 px-3 focus:outline-none' />
          <input
            type="password"
            placeholder='Password'
            name="password"
            required
            onChange={handleChanges}
            className='w-full border-2 border-gray-300 rounded-sm py-2 px-3 focus:outline-none focus:border-blue-500' />
          {processing ? (
            <button className="w-full flex justify-center items-center gap-2 bg-blue-400 text-white py-2 rounded-sm cursor-not-allowed">
              <LoaderCircle className="animate-spin w-4 h-4" />
              <span>Logging in...</span>
            </button>) : (
            <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded-sm transition duration-300'>
              Login
            </button>)}
          {errMsg && <p className='text-red-500 text-sm text-center'>{errMsg}</p>}
        </form>
        <p className='text-center text-sm text-gray-500'>Don't have an account? 
          <span onClick={() => navigate('/register')} className='text-blue-500 cursor-pointer hover:underline'>Register</span></p>

      </div>
    </div>
  )
}

export default Login
