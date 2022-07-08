import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { PinType } from '../types/types'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState<PinType[] | null>(null)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)

    if (categoryId) {
      const query = searchQuery(categoryId)

      client.fetch(query).then((data) => {
        setPins(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
    // eslint-disable-next-line
  }, [categoryId])

  if (loading) return <Spinner message='We are adding new ideas to your feed!' />

  if (!pins?.length) return <h2>No pins in category</h2>

  return (
    <div>{pins && <MasonryLayout pins={pins} />}</div>
  )
}

export default Feed