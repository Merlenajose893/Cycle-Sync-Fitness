import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'
console.log(Toaster);

import './api/axios'
const App = () => {
  return (
    <>
    <Toaster position='top-right' reverseOrder={false}/>
    <AppRoutes/>
    </>
    
  )
}

export default App