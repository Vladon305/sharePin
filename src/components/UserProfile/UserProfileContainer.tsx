import React, { useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { PinType } from '../../types/types'
import UserProfile from './UserProfile'

const UserProfileContainer: React.FC = () => {
  const { createdPins, savedPins } = useTypedSelector(state => state.pins)
  const [pins, setPins] = useState(null as unknown as PinType[])

  return <UserProfile createdPins={createdPins} savedPins={savedPins} pins={pins} setPins={setPins} />
}

export default UserProfileContainer