import React from 'react'

import { useState } from 'react'
const Addmembership = () => {
  const[inputfield,setInputfield]=useState({Months:"",Price:""})

  const handleonchange=(event,name)=>{
    setInputfield({...inputfield,[name]:event.target.value})
    console.log(inputfield)

  }
  return (
    <div className='mt-2 w-full h-auto'  >
        <div className='flex flex-wrap gap-5  items-center justify-center'>
            <div className='membershipcards  text-lg  text-white border-2 p-3  bg-slate-600 rounded-lg m-2 flex-col items-center gap-4  hover:bg-slate-800 justify-between'>
              <div>1 Month Membership </div>
              <div> Rs 2000</div>
              
            </div>
            <div className='membershipcards  text-lg  text-white border-2 p-3  bg-slate-600 rounded-lg m-2 flex-col items-center gap-4  hover:bg-slate-800 justify-between'>
              <div>1 Month Membership </div>
              <div> Rs 2000</div>
              
            </div>
            <div className='membershipcards  text-lg  text-white border-2 p-3 bg-slate-600 rounded-lg m-2 flex-col items-center gap-4  hover:bg-slate-800 justify-between'>
              <div>1 Month Membership </div>
              <div> Rs 2000</div>
              
            </div>

        </div>
        <hr className='mt-10 mb-10 ' />
         <div className='flex gap-6 mb-10'>

          <input value={inputfield.Months} onChange={(event)=>{handleonchange(event,"Months")}} className='p-2 w-1/3 h-1/2 m-2 border-2 rounded-lg  ' type="Number"  placeholder='Add No Of Months '/>
           <input value={inputfield.Price} onChange={(event)=>{handleonchange(event,"Price")}}  className='p-2 w-1/3 h-1/2 m-2 border-2 rounded-lg  ' type="Number"  placeholder='Add Price '/>
           <div className=' w-auto p-2 m-2 border-2  rounded-lg cursor-pointer hover:bg-slate-400 '>Add+</div>
         </div>
        

        </div>
  )
}

export default Addmembership