import { DecodedResponseData } from "../types/types"

export const fetchUser = () => {
  //@ts-ignore
  const userInfo: DecodedResponseData = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

  return userInfo
}