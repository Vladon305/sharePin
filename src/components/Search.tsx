import React, { Dispatch, SetStateAction } from 'react'

type PropsType = {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}

const Search: React.FC<PropsType> = () => {
  return (
    <div>
      Search
    </div>
  )
}

export default Search
