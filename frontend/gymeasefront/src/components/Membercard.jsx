import React from 'react'
import LensSharpIcon from '@mui/icons-material/LensSharp';
import { Link } from 'react-router-dom';


const Membercard = () => {
  return (
    <Link to={"/members/123"} > <div>
        <div className='Card w-full  bg-slate-300 hover:bg-slate-600 hover:text-white  p-3 m-3 rounded-lg cursor-pointer  flex flex-col items-center   '>
            <div className=' relative w-20 h-20 rounded-full border-1 flex justify-center  items-center border-black/50'>
                  
                <img className='w-full h-full rounded-full ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqhmiOmD6_cV5LZKYXen_OjjxPmhWQo9SSA&s" alt="" />
                 <LensSharpIcon sx={{color:"green"}} className='absolute top-0 left-0'/>
            </div>
            <div className='mt-2 text-xl text-black font-sans '>{"Shubham Kumar"}</div>
            <div className='mt-2 text-xl text-black'>{"+91"+"9643819040"}</div>
            <div className='mt-2 text-xl text-black'>Next Bill Date:{"12-02-2005 "}</div>


            </div>
            
            </div>
            </Link>
  )
}

export default Membercard