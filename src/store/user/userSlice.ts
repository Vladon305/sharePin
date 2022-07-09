import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/types'
import { userQuery } from '../../utils/data'
import { fetchingAPI } from '../../API/API'

const initialState = {
  user: {} as unknown as User
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
      return rejectWithValue('Ошибка запроса')
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
    }
  }
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions