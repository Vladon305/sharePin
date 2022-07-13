import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
// import { AiOutlineLogout } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
// import { googleLogout } from '@react-oauth/google'

import MasonryLayout from '../MasonryLayout'
import Spinner from '../Spinner'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { getUserProfile } from '../../store/user/userSlice'
import { getCreatedPins, getSavedPins } from '../../store/pins/reducers'
import { PinType } from '../../types/types'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,technology"

type PropsType = {
  createdPins: PinType[]
  savedPins: PinType[]
  pins: PinType[]
  setPins: Dispatch<SetStateAction<PinType[]>>
}

const UserProfile: React.FC<PropsType> = ({ createdPins, savedPins, pins, setPins }) => {
  const [text, setText] = useState<string | null>('Created')
  const [activeBtn, setActiveBtn] = useState('Created')

  const { userProfile } = useTypedSelector(state => state.user)

  const dispatch = useTypedDispatch()

  const { userId } = useParams()

  if (!userId) {
    throw new Error('Unexpected undefined pin id')
  }

  useEffect(() => {
    dispatch(getUserProfile(userId)).then(() => {
      setActiveBtn('Created')
      setText('Created')
    })
    // eslint-disable-next-line
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      dispatch(getCreatedPins(userId)).then(() => {
        setPins(createdPins)
      })
    } else {
      dispatch(getSavedPins(userId)).then(() => {
        setPins(savedPins)
      })
    }
    // eslint-disable-next-line
  }, [text, userId])

  if (!userProfile) return <Spinner message="Loading profile" />

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src={randomImage}
              alt="banner-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={userProfile.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {userProfile.userName}
          </h1>
          {/* <div className="absolute top-0 z-1 right-0 p-2">
            {userId === user._id && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout color="red" fontSize={21} />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div> */}
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText(e.currentTarget.textContent)
              setActiveBtn('Created')
            }}
            className={`${activeBtn === 'Created' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.currentTarget.textContent)
              setActiveBtn('Saved')
            }}
            className={`${activeBtn === 'Saved' ? activeBtnStyles : notActiveBtnStyles}`}
          >
            Saved
          </button>
        </div>
        {pins?.length ? (
          <div className="px-2">
            <MasonryLayout pins={text === 'Created' ? createdPins : savedPins} />
          </div>
        ) : (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfile