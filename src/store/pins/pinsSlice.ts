import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PinType } from '../../types/types'
import { getPins, getSearchPins, getCreatedPins, getSavedPins, reGetPins } from './reducers'

const initialState = {
  pins: [] as PinType[],
  searchPins: [] as PinType[],
  createdPins: [] as PinType[],
  savedPins: [] as PinType[],
  loading: false
}

export const pinsSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {},
  extraReducers: {
    [getPins.pending.type]: (state) => {
      state.loading = true
    },
    [getPins.fulfilled.type]: (state, action: PayloadAction<PinType[]>) => {
      state.pins = action.payload
      state.loading = false
    },
    [reGetPins.pending.type]: (state) => {
      state.loading = true
    },
    [reGetPins.fulfilled.type]: (state, action: PayloadAction<PinType[]>) => {
      state.pins = action.payload
      state.loading = false
    },
    [getSearchPins.pending.type]: (state) => {
      state.loading = true
    },
    [getSearchPins.fulfilled.type]: (state, action: PayloadAction<PinType[]>) => {
      state.searchPins = action.payload
      state.loading = false
    },
    [getCreatedPins.pending.type]: (state) => {
      state.loading = true
    },
    [getCreatedPins.fulfilled.type]: (state, action: PayloadAction<PinType[]>) => {
      state.createdPins = action.payload
    },
    [getSavedPins.pending.type]: (state) => {
      state.loading = true
    },
    [getSavedPins.fulfilled.type]: (state, action: PayloadAction<PinType[]>) => {
      state.savedPins = action.payload
    }
  }
})

export const pinsReducer = pinsSlice.reducer
export const pinsActions = pinsSlice.actions