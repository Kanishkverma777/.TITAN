import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import Membercard from '../components/membercard';
import { useEffect,useState } from 'react';


const GeneralUser = () => {
    const [header,setHeader]=useState("")

useEffect(()=>{
    const func=sessionStorage.getItem("func")
    funccall(func) 

},[])  

const funccall=async(func)=>{
    switch(func){
        case "Joined-Members":
            setHeader("Joined_Members")
            break;
        case "Monthly-joined":
            setHeader("Monthly-joined")
            break;
        case "expire-within-3days":
            setHeader("Expire-within-3days")
            break;
        case "Expire-within-4to7-days":
            setHeader("Expire-within-4to7-days")
            break;
        case "expired":
            setHeader("Expired")
            break;
        case "Inactive-members":
            setHeader("Inactive-members")
            break;
    }

}

  return (
    <div className='w-3/4 p-5 flex-col'>
        <div className='border-2 w-full p-3 rounded-xl flex justify-between  border-slate-600 bg-slate-900 '>
            <div className='border-2 pl-2 pr-3 pt-1 border-white pb-1 rounded-xl cursor-pointer m-2'>
                <Link to={"/dashboard"}><div className='text-white'>
                    <ArrowBackIcon/>
                    Back to Dashboard
                </div>
                </Link>

            </div>

        </div>

        <div className='mt-5 text-xl text-slate-900'>
            {header}

        </div>

        <div className='bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[80%]'>
            <Membercard/>
             <Membercard/>
              <Membercard/>
               <Membercard/>
                <Membercard/>
                 <Membercard/>

        </div>

    </div>
  )
}

export default GeneralUser