import React from 'react'

import {  Routes,Route } from 'react-router-dom'
import LandingPage from './pages/public/Landing'
import RegisterPage from './pages/auth/Register'
import VerifyEmailPage from './pages/auth/VerifyEmail'
import TrainerLogin from './pages/trainer-panel/TrainerLogin'
const App = () => {
  return (
    <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/verifyEmail' element={<VerifyEmailPage/>}/>
        <Route path='/trainer/login' element={<TrainerLogin/>}/>
      </Routes>
    
  )
}

export default App