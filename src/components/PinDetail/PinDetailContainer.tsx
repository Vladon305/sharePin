import React from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { User } from '../../types/types'
import PinDetail from './PinDetail'

type PropsType = {
  user: User
}

const PinDetailContainer: React.FC<PropsType> = ({ user }) => {
  const { pinDetail, loading, comment, similarPins } = useTypedSelector(state => state.pinDetail)
  const { setComment } = useActions()

  return <PinDetail user={user}
    pinDetail={pinDetail}
    loading={loading}
    comment={comment}
    similarPins={similarPins}
    setComment={setComment}
  />
}

export default PinDetailContainer