import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchingAPI, patchAPI } from "../../API/API"
import { Comment, PinType, User } from "../../types/types"
import { v4 as uuidv4 } from 'uuid'
import { pinDetailMorePinQuery, pinDetailQuery } from "../../utils/data"

const initialState = {
  comment: '' as Comment["comment"],
  pinDetail: {} as PinType,
  similarPins: [] as PinType[],
  loading: false
}
type InitialStateType = typeof initialState

export const getPinDetail = createAsyncThunk(
  'pinDetail/getPinDetail',
  async (pinId: string, { dispatch }) => {
    let query = pinDetailQuery(pinId)
    if (query) {
      fetchingAPI(query).then((data) => {
        dispatch(pinDetailActions.setPinDetail(data[0]))
        if (data[0]) {
          query = pinDetailMorePinQuery(data[0])
          fetchingAPI(query).then((res) => {
            dispatch(pinDetailActions.setSimilarPins(res))
          })
        }
      })
    }
  }
)

type AtrType = {
  pinId: string
  user: User
}

export const addNewComment = createAsyncThunk<Comment, AtrType, {
  state: {
    pinDetail: InitialStateType
  }
}>(
  'pinDetail/addNewComment',
  async ({ pinId, user }, { getState }) => {
    const state = getState()
    const item = {
      comment: state.pinDetail.comment,
      _key: uuidv4(),
      postedBy: {
        _type: 'postedBy',
        _ref: user._id
      }
    }
    await patchAPI(pinId, { comments: [] }, {
      at: 'after', selector: 'comments[-1]', items: [item]
    })
    return {
      comment: state.pinDetail.comment,
      _key: uuidv4(),
      postedBy: {
        userName: user.userName,
        image: user.image,
        _type: 'postedBy',
        _ref: user._id,
        _id: user._id
      }
    }
  }
)

export const pinDetailSlice = createSlice({
  name: 'pinDetail',
  initialState,
  reducers: {
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload
    },
    setPinDetail: (state, action: PayloadAction<PinType>) => {
      state.pinDetail = action.payload
    },
    setSimilarPins: (state, action: PayloadAction<PinType[]>) => {
      state.similarPins = action.payload
    }
  },
  extraReducers: {
    [addNewComment.pending.type]: (state) => {
      state.loading = true
    },
    [addNewComment.fulfilled.type]: (state, action: PayloadAction<Comment>) => {
      state.comment = ''
      state.pinDetail.comments.push(action.payload)
      state.loading = false
    }
  }
})

export const pinDetailReducer = pinDetailSlice.reducer
export const pinDetailActions = pinDetailSlice.actions