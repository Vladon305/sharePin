import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

type PropsType = {
  message: string
}

const Spinner: React.FC<PropsType> = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <ThreeCircles
        color='#00BFFF'
        height={50}
        width={200}
      />
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}
//Audio, BallTriangle, Bars, Circles, CirclesWithBar, CradleLoader, Grid, Hearts, LineWave, MutatingDots, Oval, Plane, Puff, RevolvingDot, Rings, RotatingSquare, TailSpin, ThreeCircles, ThreeDots, Triangle, Watch
export default Spinner