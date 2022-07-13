import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Login } from './components'
import HomeContainer from './container/Home/HomeContainer'
import { fetchUser } from './utils/fetchUser'

const App: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = fetchUser()

    if (!user) navigate('/login')
    // eslint-disable-next-line
  }, [])

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<HomeContainer />} />
    </Routes>
  )
}

export default App