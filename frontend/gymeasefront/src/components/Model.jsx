import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
const Model = ({handleclick,content,header }) => {
  return (
    <div className='w-full h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center'>

        <div className='bg-white w-[50%] rounded-lg h-fit' >
            <div className='heading p-4  w-full flex justify-between'>
                <div className='font-bold text-2xl'>{header}</div>
                <div onClick={()=>handleclick()} className='hover:cursor-pointer'><ClearIcon  /></div>

            </div>
            <div className=' w-full '>
                {content}
                


            </div>
            <div>

            </div>
            
        </div>
    </div>
  )
}

export default  Model
