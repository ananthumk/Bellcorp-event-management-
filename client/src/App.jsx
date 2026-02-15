import React, { useState } from 'react'
import Login from './pages/login' 
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { AppContext } from './context/AppContext'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  

  const url = 'https://bellcorp-event-management-den5.onrender.com/api'
  return (
    <AppContext.Provider value={{
       url, token, setToken
    }}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
        </AppContext.Provider>

  )
}

export default App
