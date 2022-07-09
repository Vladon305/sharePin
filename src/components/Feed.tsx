import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTypedDispatch } from '../hooks/useTypedDispatch'
import { getPins } from '../store/pins/pinsSlice'

const Feed: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { categoryId } = useParams()

  const { pins } = useTypedSelector(state => state.pins)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    setLoading(true)
    if (categoryId) {
      dispatch(getPins(categoryId))
      setLoading(false)
    } else {
      dispatch(getPins())
      setLoading(false)
    }
  }, [categoryId, dispatch])

  if (loading) return <Spinner message='We are adding new ideas to your feed!' />

  if (!pins?.length) return <h2>No pins in category</h2>

  return (
    <div>{pins && <MasonryLayout pins={pins} />}</div>
  )
}

export default Feed