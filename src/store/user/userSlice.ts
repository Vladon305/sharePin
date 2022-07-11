import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/types'
import { userQuery } from '../../utils/data'
import { fetchingAPI } from '../../API/API'

const initialState = {
  user: {} as unknown as User,
  userProfile: {} as unknown as User
}

export const getUser = createAsyncThunk(
  'user/getUser',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const query = userQuery(id)
      return await fetchingAPI(query).then((data) => {
        return data[0]
      })
    } catch (e) {
      return rejectWithValue('request problem')
    }
  }
)

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (id: string | number, { rejectWithValue }) => {
    try {
      const query = userQuery(id)
      return await fetchingAPI(query).then((data) => {
        return data[0]
      })
    } catch (e) {
      return rejectWithValue('request problem')
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  },
  extraReducers: {
    [getUser.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    [getUserProfile.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.userProfile = action.payload
    }
  }
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions