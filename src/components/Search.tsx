import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'
import { PinType } from '../types/types'

type PropsType = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

const Search: React.FC<PropsType> = ({ searchTerm }) => {
  const [pins, setPins] = useState(null as unknown as PinType[])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())

      client.fetch(query).then((data) => {
        setPins(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [searchTerm])

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  )
}

export default Search
