import React, { useState } from 'react'
import Login from './pages/Login' 
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { AppContext } from './context/AppContext'
import ProtectedRoute from './components/ProtectedRoute'

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
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
        </AppContext.Provider>

  )
}

export default App
