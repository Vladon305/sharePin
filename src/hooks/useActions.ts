import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { pinDetailActions } from "../store/pinDetail/pinDetailSlice"
import { pinsActions } from "../store/pins/pinsSlice"
import { userActions } from '../store/user/userSlice'

const allActions = {
  ...userActions,
  ...pinsActions,
  ...pinDetailActions
}

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(allActions, dispatch)
}