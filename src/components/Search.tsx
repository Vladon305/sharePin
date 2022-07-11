import React, { Dispatch, SetStateAction, useEffect } from 'react'

import MasonryLayout from './MasonryLayout'
import { feedQuery } from '../utils/data'
import Spinner from './Spinner'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTypedDispatch } from '../hooks/useTypedDispatch'
import { getSearchPins } from "../store/pins/reducers"

type PropsType = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

const Search: React.FC<PropsType> = ({ searchTerm }) => {
  const { searchPins } = useTypedSelector(state => state.pins)
  const { loading } = useTypedSelector(state => state.pins)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (searchTerm !== '' && searchTerm !== ' ') {
      dispatch(getSearchPins(searchTerm))
    } else {
      dispatch(getSearchPins(feedQuery))
    }
  }, [searchTerm, dispatch])

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {searchPins?.length !== 0 && <MasonryLayout pins={searchPins && searchPins} />}
      {searchPins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  )
}

export default Search
