import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchingAPI } from '../../API/API'
import { PinType } from '../../types/types'
import { feedQuery, searchQuery } from '../../utils/data'

const initialState = {
  pins: [] as PinType[],
  pinDetail: {} as PinType
}

export const getPins = createAsyncThunk(
  'pins/getPins',
  async (searchTerm: string | undefined | null, { rejectWithValue }) => {
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
  'pins/getPins',
  async (query: string, { rejectWithValue }) => {
    return await fetchingAPI(query).then((data) => {
      return data
    })
  }
)

export const getPinDetail = createAsyncThunk(
  'pins/getPinDetail',
  async (query: string, { rejectWithValue }) => {
    return await fetchingAPI(query).then((data) => {
      return data[0]
    })
  }
)

export const pinsSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {

  },
  extraReducers: {
    [getPins.fulfilled.type]: (state, action: PayloadAction<PinType[]>) => {
      state.pins = action.payload
    },
    [getPinDetail.fulfilled.type]: (state, action: PayloadAction<PinType>) => {
      state.pinDetail = action.payload
    }
  }
})

export const pinsReducer = pinsSlice.reducer
export const pinsActions = pinsSlice.actions