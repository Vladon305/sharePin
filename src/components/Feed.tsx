import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTypedDispatch } from '../hooks/useTypedDispatch'
import { getPins } from "../store/pins/reducers"

const Feed: React.FC = () => {
  const { pins } = useTypedSelector(state => state.pins)
  const { loading } = useTypedSelector(state => state.pins)
  const { categoryId } = useParams()

  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (categoryId) {
      dispatch(getPins(categoryId))
    } else {
      dispatch(getPins())
    }
  }, [categoryId, dispatch])

  if (loading) return <Spinner message='We are adding new ideas to your feed!' />

  if (!pins?.length) return <h2>No pins in category</h2>

  return (
    <div>{pins && <MasonryLayout pins={pins} />}</div>
  )
}

export default Feed