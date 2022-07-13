import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchingAPI, patchAPI } from '../../API/API'
import { feedQuery, searchQuery, userCreatedPinsQuery, userSavedPinsQuery } from '../../utils/data'
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../types/types';
import { client } from '../../client';


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

export const savePin = createAsyncThunk<any, { pinId: string, userId: User['_id'] }>(
  'pins/savePin',
  async ({ pinId, userId }) => {
    const item = {
      _key: uuidv4(),
      userId: userId,
      postedBy: {
        _type: 'postedBy',
        _ref: userId
      }
    }
    return await patchAPI(pinId, { save: [] }, {
      at: 'after', selector: 'save[-1]',
      items: [item]
    })
  }
)

export const unSavePin = createAsyncThunk(
  'pins/unSavePin',
  async (id: string) => {
    return await client.patch(id).unset(['save[0]']).commit()
  }
)