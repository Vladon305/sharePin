import React, { useEffect, useState } from 'react'
import { PinType } from '../types/types'
import { Link, useNavigate } from 'react-router-dom'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

import { urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'
import { deleteAPI } from '../API/API'
import { savePin, unSavePin } from '../store/pins/reducers';
import { useTypedDispatch } from '../hooks/useTypedDispatch'

type PropsType = {
  pin: PinType
}

const Pin: React.FC<PropsType> = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const [alreadySaved, setAlreadySaved] = useState(false)

  const navigate = useNavigate()
  const user = fetchUser()
  const dispatch = useTypedDispatch()

  const data = {
    pinId: _id,
    userId: user?.sub

  }
  const onSavePin = () => {
    if (!alreadySaved) {
      setAlreadySaved(true)
      setSavingPost(true)
      dispatch(savePin(data))
      setSavingPost(false)
    }
  }

  const onUnSavePin = () => {
    if (alreadySaved) {
      setAlreadySaved(false)
      setSavingPost(true)
      dispatch(unSavePin(_id))
      setSavingPost(false)
    }
  }

  const deletePin = (id: string) => {
    deleteAPI(id)
      .then(() => {
        window.location.reload()
      })
  }

  useEffect(() => {
    setAlreadySaved(!!(save?.filter((item) => item?.postedBy?._id === user?.sub))?.length)
    // eslint-disable-next-line
  }, [])


  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img src={urlFor(image).width(250).url()} alt="user-post" className='rounded-lg w-full' />
        {postHovered && (
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-15'
            style={{ height: '100%' }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex gup-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    onUnSavePin()
                  }}
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                  {save?.length}  Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSavePin()
                  }}
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                >
                  {save?.length} {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a
                  href={destination}
                  target='blank'
                  rel='noreferrer'
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md'
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 15 ? `${destination.slice(0, 10)}...` : destination}
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePin(_id)
                  }}
                  className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none'
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className='flex items-center gap-2 mt-2'>
        <img
          src={postedBy?.image}
          alt="user-profile"
          className='w-8 h-8 rounded-full object-cover'
        />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin