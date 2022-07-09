import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import shareVideo from '../assets/share.mp4'
import logo from '../assets/logo.png'

import { DecodedResponseData } from '../types/types'
import { IdentifiedSanityDocumentStub } from '@sanity/client'
import { createIfNotExistsAPI } from '../API/API'


const Login: React.FC = () => {

  const navigate = useNavigate()

  const responseGoogle = async (response: any) => {
    const decoded: DecodedResponseData = jwt_decode(response.credential)
    localStorage.setItem('user', JSON.stringify(decoded))

    const { name, sub, picture } = decoded

    const doc: IdentifiedSanityDocumentStub = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    createIfNotExistsAPI(doc).then(() => {
      navigate('/', { replace: true })
    })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full  h-full'>
        <video
          src={shareVideo}
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt="logo" />
          </div>

          <div className='shadow-2xl'>
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={() => console.log('Error in googleLogin component')
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login