import React, { useState, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Routes, Route } from 'react-router-dom'

import { Sidebar } from '../../components'
import Pins from '../Pins'
import logo from '../../assets/logo.png'
import { fetchUser } from '../../utils/fetchUser'
import { getUser } from '../../store/user/userSlice'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { User } from '../../types/types'
import UserProfileContainer from '../../components/UserProfile/UserProfileContainer'

type PropsType = {
  user: User
}

const Home: React.FC<PropsType> = ({ user }) => {

  const [toggleSidebar, setToggleSidebar] = useState(false)
  const dispatch = useTypedDispatch()

  const userInfo = fetchUser()

  useEffect(() => {
    dispatch(getUser(userInfo?.sub))
  }, [userInfo?.sub, dispatch])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to='/'>
            <img src={logo} alt="logo" className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className='w-28' />
          </Link>
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-20 animate-slide-in z'>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeSidebar={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className='pb-2 flex-1 h-screen'>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfileContainer />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home