import { configureStore } from '@reduxjs/toolkit'
import { pinsReducer } from './pins/pinsSlice'
import { userReducer } from './user/userSlice'

export const store = configureStore({
  reducer: { user: userReducer, pins: pinsReducer }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch