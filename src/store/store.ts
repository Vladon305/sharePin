import { configureStore } from '@reduxjs/toolkit'
import { pinDetailReducer } from './pinDetail/pinDetailSlice'
import { pinsReducer } from './pins/pinsSlice'
import { userReducer } from './user/userSlice'

export const store = configureStore({
  reducer: { user: userReducer, pins: pinsReducer, pinDetail: pinDetailReducer }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch