import React, { Dispatch, SetStateAction } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

import MasonryLayout from '../MasonryLayout'
import Spinner from '../Spinner'
import { PinType, User } from '../../types/types'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,technology"

type PropsType = {
  createdPins: PinType[]
  savedPins: PinType[]
  id?: string
  userId: string
  text: string | null
  setText: Dispatch<SetStateAction<string | null>>
  activeBtn: string
  setActiveBtn: Dispatch<SetStateAction<string>>
  userProfile: User
}

const UserProfile: React.FC<PropsType> = ({ userProfile, createdPins, savedPins,
  id, userId, text, setText, activeBtn, setActiveBtn }) => {

  const navigate = useNavigate()

  const logout = () => {
    googleLogout()
    localStorage.clear()
    navigate('/login')
  }

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
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === id && (
              <button
                type="button"
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                onClick={logout}
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            )}
          </div>
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
        {(text === 'Created' && createdPins.length) || (text === 'Saved' && savedPins.length) ? (
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