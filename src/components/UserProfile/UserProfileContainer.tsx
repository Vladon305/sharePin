import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getCreatedPins, getSavedPins } from '../../store/pins/reducers'
import { getUserProfile } from '../../store/user/userSlice'
import UserProfile from './UserProfile'

const UserProfileContainer: React.FC = () => {
  const { userProfile } = useTypedSelector(state => state.user)
  const { _id } = useTypedSelector(state => state.user.user)
  const { createdPins, savedPins } = useTypedSelector(state => state.pins)
  const [text, setText] = useState<string | null>('Created')
  const [activeBtn, setActiveBtn] = useState('Created')

  const { userId } = useParams()
  const dispatch = useTypedDispatch()

  if (!userId) {
    throw new Error('Unexpected undefined pin id')
  }

  useEffect(() => {
    dispatch(getCreatedPins(userId))
    dispatch(getSavedPins(userId))
    dispatch(getUserProfile(userId)).then(() => {
      setActiveBtn('Created')
      setText('Created')
    })
    // eslint-disable-next-line
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      dispatch(getCreatedPins(userId))
    } else {
      dispatch(getSavedPins(userId))
    }
    // eslint-disable-next-line
  }, [text, userId])


  return <UserProfile
    createdPins={createdPins}
    savedPins={savedPins}
    id={_id}
    activeBtn={activeBtn}
    setActiveBtn={setActiveBtn}
    userId={userId}
    text={text}
    setText={setText}
    userProfile={userProfile}
  />
}

export default UserProfileContainer