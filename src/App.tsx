import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Login } from './components'
import Home from './container/Home'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>

  )
}

export default App