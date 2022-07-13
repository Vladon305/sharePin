import React, { useEffect } from 'react'
import { PinType, User } from '../../types/types'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'

import { urlFor } from '../../client'
import MasonryLayout from '../MasonryLayout'
import Spinner from '../Spinner'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { addNewComment, getPinDetail } from "../../store/pinDetail/pinDetailSlice"
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'

type PropsType = {
  user: User
  pinDetail: PinType
  loading: boolean
  comment: string
  similarPins: PinType[]
  setComment: ActionCreatorWithPayload<string, string>
}

const PinDetail: React.FC<PropsType> = ({ user, pinDetail, loading, comment, similarPins, setComment }) => {
  const dispatch = useTypedDispatch()
  const { pinId } = useParams()

  if (!pinId) {
    throw new Error('Unexpected undefined pin id')
  }

  const addComment = () => {
    if (comment) {
      dispatch(addNewComment({ pinId, user }))
    }
  }

  useEffect(() => {
    dispatch(getPinDetail(pinId))
    // eslint-disable-next-line
  }, [pinId])

  if (!pinDetail) return <Spinner message='Loading pin ...' />

  return (
    <>
      <div className='flex xl:flex-row flex-col m-auto bg-white ' style={{ maxWidth: '1500px', borderRadius: '32px' }}>
        <div className='flex justify-center items-center md:items-start flex-initial'>
          <img
            src={pinDetail?.image && urlFor(pinDetail?.image).url()}
            alt="user-post"
            className='rounded-t-3xl rounded-b-lg' />
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target='_blank' rel='noreferrer'>
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className='text-4xl font-bold break-words mt3'>
              {pinDetail.title}
            </h1>
            <p className='mt-3'>{pinDetail.about}</p>
          </div>
          <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
            <img
              src={pinDetail.postedBy?.image}
              alt="user-profile"
              className='w-8 h-8 rounded-full object-cover'
            />
            <p className='font-semibold capitalize'>{pinDetail.postedBy?.userName}</p>
          </Link>
          <h2 className='mt-5 text-xl'>Comments</h2>
          <div className='max-h-370 overflow-y-auto'>
            {pinDetail?.comments?.map((comment, i) => (
              <div className='flex gap-2 mt-5 items-center bg-white rounded-lg' key={i}>
                <Link to={`/user-profile/${comment.postedBy?._id}`}>
                  <img
                    src={comment.postedBy.image}
                    alt="user-profile"
                    className='w-10 h-10 rounded-full cursor-pointer'
                  />
                </Link>
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3'>
            <Link to={`/user-profile/${user?._id}`}>
              <img
                src={user?.image}
                alt="user-profile"
                className='w-10 h-10 rounded-full cursor-pointer'
              />
            </Link>
            <input
              type="text"
              className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
              placeholder='Add new comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="button"
              className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
              onClick={() => {
                addComment()
              }}
            >
              {loading ? 'Doing...' : 'Done'}
            </button>
          </div>
        </div>
      </div>
      {similarPins?.length > 0 ? (
        <>
          <h2 className="text-center font-bold text-2xl mt-8 mb-4">
            More like this
          </h2>
          <MasonryLayout pins={similarPins} />
        </>
      ) : (
        <Spinner message='Loading pins...' />
      )}
    </>
  )
}

export default PinDetail
