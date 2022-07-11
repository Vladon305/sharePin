import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchingAPI, patchAPI } from "../../API/API"
import { Comment, PinType, User } from "../../types/types"
import { v4 as uuidv4 } from 'uuid'
import { SanityDocument } from "@sanity/client"

const initialState = {
  comment: '' as Comment["comment"],
  pinDetail: {} as PinType,
  loading: false
}
type InitialStateType = typeof initialState

export const getPinDetail = createAsyncThunk(
  'pinDetail/getPinDetail',
  async (query: string) => {
    return await fetchingAPI(query).then((data) => {
      return data[0]
    })
  }
)
type AtrType = {
  pinId: string
  user: User
}
export const addNewComment = createAsyncThunk<Promise<SanityDocument<any>>, AtrType, {
  state: {
    pinDetail: InitialStateType
  }
}>(
  'pinDetail/addComment',
  async ({ pinId, user }, { getState }) => {
    const state = getState()
    return await patchAPI(pinId, { comments: [] }, {
      at: 'after', selector: 'comments[-1]', items: [{
        comment: state.pinDetail.comment,
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        }
      }]
    })
  }
)

export const pinDetailSlice = createSlice({
  name: 'pinDetail',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload
    }
  },
  extraReducers: {
    [getPinDetail.fulfilled.type]: (state, action: PayloadAction<PinType>) => {
      state.pinDetail = action.payload
    },
    [addNewComment.pending.type]: (state) => {
      state.loading = true
    },
    [addNewComment.fulfilled.type]: (state) => {
      state.comment = ''
      // state.pinDetail.comments.push()
      state.loading = false
    }
  }
})

export const pinDetailReducer = pinDetailSlice.reducer
export const pinDetailActions = pinDetailSlice.actions