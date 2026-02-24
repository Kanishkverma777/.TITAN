import { Email, Password } from '@mui/icons-material'
import React, { use, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';

const Forgotpassword = () => {
const [emailSubmit,setEmailSubmit]=useState(false)
const[otpvalidate,setOtpvalidate]=useState(false)
const [buttonval,setButtonval]=useState("Submit Your Email")
const[inputfield,setInputfield]=useState({Email:"",OTP:"",New_Password:""})
const[passwordvisi,setPasswordvisi]=useState("password")

const handlemouseover=()=>{
    setPasswordvisi("text")
}
const handleSubmit=()=>{
    if(!emailSubmit){
    setEmailSubmit(true)
    setButtonval("Submit OTP")
    }
    else if(emailSubmit && !otpvalidate){
        setOtpvalidate(true)
        setButtonval("Submit Your New Password")
    }

}


const handleonchange=(event,name)=>{
    
    setInputfield({...inputfield,[name]:event.target.value})
    console.log(inputfield)
    
}
  return (
     <div className='w-full m-2'>
        <div className='w-full p-4  '>
            <div className='m-2 '>Enter your Email</div>
            <input value={inputfield.Email} onChange={(event)=>{handleonchange(event,"Email")}} type="text" placeholder='Enter  Your Email' className='border w-1/2 p-2 m- border-gray-400 rounded-xl' />
        </div>
        {
        emailSubmit&&
        <div className='w-full p-4  '>
            <div className='m-2 '>Enter OTP</div>
            <input value={inputfield.OTP} onChange={(event)=>{handleonchange(event,"OTP")}} type="text" placeholder='Enter  Your OTP' className='border w-1/2 p-2 m- border-gray-400 rounded-xl' />
        </div>
        }
        {
        otpvalidate&&
        <div className='w-full p-4  '>
            <div className='m-2 '>Set New Password </div>
            <input value={inputfield.New_Password} onChange={(event)=>{handleonchange(event,"New_Password")}} type={passwordvisi} placeholder='Enter your New Password' className='border w-1/2 p-2 m- border-gray-400 rounded-xl' />
            <VisibilityIcon sx={{ "&:hover": {
      color: "blue",
    }}} onMouseEnter={()=>setPasswordvisi("text")} onMouseLeave={()=>setPasswordvisi("password")} />
        </div>
        }
        <div className='p-2 w-[60%] border-2 bg-slate-700  text-white rounded-2xl text-center mx-auto hover:bg-slate-950 ' onClick={()=>handleSubmit()}>{buttonval}</div>
          
        </div>
  )
}

export default Forgotpassword