import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import Feed from './Feed'

const FeedContainer: React.FC = () => {
  const { pins, loading } = useTypedSelector(state => state.pins)

  return <Feed pins={pins} loading={loading} />
}

export default FeedContainer