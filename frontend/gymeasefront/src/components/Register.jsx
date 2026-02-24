import React, { useState } from 'react'
import Model from './Model'
import Forgotpassword from './Forgotpassword'

const Register = () => {
const [forgotpass,setForgotpass]=useState(false)
const handleclick=()=>{
    setForgotpass(prev=>!prev)

}

const[loginfield,setLoginfield]=useState({Email:"",Gym_Name:"",UserName:"",Password:"" , profilepic:""})
const handleonchange=(event,name)=>{
  setLoginfield({...loginfield,[name]:event.target.value})
  console.log(loginfield)

 }

  return (

    <div className='w-[80%] sm:w-1/3 border-2  p-6 m-8 bg-stone-800/50  h-91.25 overflow-y-auto rounded-2xl'>
            <div className='Heading text-2xl text-white font-sans text-center'>Register Your Gym</div>
            <input value={loginfield.Email} type="text"  onChange={(event)=>{handleonchange(event,"Email")}} className='w-full my-10 p-2 rounded bg-amber-50' placeholder='Enter Your Email'/>
            <input value={loginfield.Gym_Name} type="text" onChange={(event)=>{handleonchange(event,"Gym_Name")}}  className='w-full mb-10 p-2 rounded bg-amber-50' placeholder='Enter Gym Name '/>
            <input value={loginfield.UserName} type="text" onChange={(event)=>{handleonchange(event,"UserName")}} className='w-full mb-10 p-2 rounded bg-amber-50' placeholder='Enter User  Name '/>
            <input value={loginfield.Password}  type="text" onChange={(event)=>{handleonchange(event,"Password")}} className='w-full mb-10 p-2 rounded bg-amber-50' placeholder='Enter Password'/>
            <input value={loginfield.profilepic} type="file"className='w-[50%] mb-10 p-2 rounded bg-amber-50' accept='img' name='Gym Owner Image'/>
            
             <div className='p-2 w-[80%] bg-stone-800 mx-auto text-white text-center rounded-2xl text-xl hover:bg-stone-50 hover:text-black cursor-pointer  hover:text-2xl'>Register</div>
            <div className='p-2 w-[80%]  mx-auto text-blue-400 text-center rounded-2xl text-xl hover:cursor-pointer  hover:text-2xl' onClick={()=>handleclick()} >Forgot Password</div>
            {forgotpass&&
            <Model handleclick={handleclick} content={<Forgotpassword/>} header={"forgot Password"} />
            }

            </div>
  )
}

export default Register