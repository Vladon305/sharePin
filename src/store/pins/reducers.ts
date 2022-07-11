import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchingAPI } from '../../API/API'
import { feedQuery, searchQuery, userCreatedPinsQuery, userSavedPinsQuery } from '../../utils/data'


export const getPins = createAsyncThunk(
  'pins/getPins',
  async (searchTerm: string | undefined | null) => {
    if (searchTerm) {
      const query = searchQuery(searchTerm)
      return await fetchingAPI(query).then((data) => {
        return data
      })
    } else {
      return await fetchingAPI(feedQuery).then((data) => {
        return data
      })
    }
  }
)

export const reGetPins = createAsyncThunk(
  'pins/reGetPins',
  async (query: string) => {
    return await fetchingAPI(query).then((data) => {
      return data
    })
  }
)

export const getSearchPins = createAsyncThunk(
  'pins/getSearchPins',
  async (searchTerm: string = feedQuery) => {
    const query = searchQuery(searchTerm === feedQuery ? searchTerm : searchTerm.toLowerCase())
    return await fetchingAPI(query).then((data) => {
      return data
    })
  }
)

export const getCreatedPins = createAsyncThunk(
  'pins/getCreatedPins',
  async (id: string) => {
    const query = userCreatedPinsQuery(id)
    return await fetchingAPI(query).then((data) => {
      return data
    })
  }
)

export const getSavedPins = createAsyncThunk(
  'pins/getSavedPins',
  async (id: string) => {
    const query = userSavedPinsQuery(id)
    return await fetchingAPI(query).then((data) => {
      return data
    })
  }
)
