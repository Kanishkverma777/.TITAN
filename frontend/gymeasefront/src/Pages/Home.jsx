import React from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

export const Home = () => {
  return (
    <div  className='w-full min-h-screen sm:h-screen '>
        <div className='border-2 border-gray-500 bg-stone-800 text-white p-5 font-semibold text-xl text-center'>
            Welcome To GYMEASE

        </div>
        <div className='w-full bg-cover flex justify-center h-full bg-[url("https://wallpapercat.com/w/full/3/1/1/874385-1920x1080-desktop-1080p-gym-wallpaper-photo.jpg")]'>
        <div className='w-full flex flex-col h-fit justify-between sm:flex-row  '>
            
           <Login/>

           <Register/>
        </div>

        </div>
    </div>
  )
}
