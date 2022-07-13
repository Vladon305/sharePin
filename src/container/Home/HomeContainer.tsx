import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Home from './Home'

const HomeContainer: React.FC = () => {
  const { user } = useTypedSelector(state => state.user)

  return <Home user={user} />
}

export default HomeContainer
