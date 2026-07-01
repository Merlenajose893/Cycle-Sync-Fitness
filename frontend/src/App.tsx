<<<<<<< HEAD
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

=======
import React from 'react'
import AppRoutes from './routes/AppRoutes'
import './api/axios'
const App = () => {
  return (
    <AppRoutes/>
  )
}

>>>>>>> 081b12d (changes)
export default App