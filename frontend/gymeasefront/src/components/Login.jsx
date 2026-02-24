import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const[loginfield,setLoginfield]=useState({"username":"","password":""})

  const navigate=useNavigate()
  const handlelogin=()=>{
    sessionStorage.setItem("islogin",true)
    navigate("/dashboard")
  }
   
 const handleonchange=(event,name)=>{
  setLoginfield({...loginfield,[name]:event.target.value})
  console.log(loginfield)

 }

  return (
    <div className="w-[80%] sm:w-1/3 border-2 p-6 m-8 bg-stone-800/50  rounded-2xl">
      <div className="Heading text-2xl text-white font-sans text-center">
        Login
      </div>
      <input value={loginfield.username} onChange={(event)=>{handleonchange(event,"username")}}
        type="text"
        className="w-full my-10 p-2 rounded bg-amber-50"
        placeholder="Enter  User Name"
      />
      <input value={loginfield.password} onChange={(event)=>{handleonchange(event,"password")}}
        type="text"
        className="w-full mb-10 p-2 rounded bg-amber-50"
        placeholder="Enter Password"
      />
      <div className="p-2 w-[80%] bg-stone-800 mx-auto text-white text-center rounded-2xl text-xl hover:bg-stone-50 hover:text-black cursor-pointer  hover:text-2xl" onClick={()=>{handlelogin()}}>
        Login
      </div>
    
    </div>
    
  );
};

export default Login;
