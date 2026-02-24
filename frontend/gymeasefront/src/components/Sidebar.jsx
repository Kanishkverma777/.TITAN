import React, { useState ,useEffect} from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
const navigate=useNavigate()


const handlelogout = () => {
  sessionStorage.removeItem("islogin");

  navigate("/");
};


const location=useLocation()

const [greeting,setGreeting]=useState("")
const greetingMessage=()=>{
    const currentHour=new Date().getHours();
    if (currentHour<12){
        setGreeting("Good Morning sir ")

    }
    else if(currentHour<18){
        setGreeting("Good Afternoon Sir ")
    }
    else if(currentHour<21){
        setGreeting("Good Evening Sir")

    }
    else{
        setGreeting("Good Night Sir / Mam ")
    }
}

useEffect(()=>{
    greetingMessage()
},[])
  return (
    <div className='w-1/4 m-1 border-1 bg-slate-800 h-screen p-4'>
    <div className=' text-white font-light text-center text-2xl'>A3 FITNESS CLUB</div>
    <div>
    <div className='flex gap-5 text-white font-light text-2xl'>
        <div className='w-[100px] h-[100px] rounded-full my-2'>
            <img src="https://content.jdmagicbox.com/v2/comp/delhi/m9/011pxx11.xx11.220626195258.h8m9/catalogue/a3-fitness-club-delhi-fitness-centres-Lw37e5vwWn-250.jpg" className='rounded-full w-full h-full' alt="" /> 
        </div>
        <div className='my-2'>
            <div className=''>{greeting}</div>
                <div className=''>ADMIN</div>
        </div>
    </div>
    <div className='border-t-2 border-gray-400 mt-10'> 
        <Link to={"/dashboard"}><div className={`bg-slate-500 flex gap-2 text-2xl text-white p-2 mt-4 rounded-xl hover:cursor-pointer hover:bg-slate-700 ${location.pathname==="/dashboard"?"border-2 border-slate-300 bg-slate-900":null}`}>
            <div><HomeIcon/></div>
            <div>Dashboard</div>
        </div>
        </Link>

        <Link to={"/members"}>
         <div className={`bg-slate-500 flex gap-2 text-2xl text-white p-2 mt-4 rounded-xl hover:cursor-pointer hover:bg-slate-700 ${location.pathname==="/members"?"border-2 border-slate-300 bg-slate-900":null}`}>
            <div><PeopleAltIcon/></div>
            <div>Members</div>
        </div>
        </Link>

        <Link  onClick={()=>{handlelogout()}} to={"/"}>
         <div className='bg-slate-500 flex gap-2 text-2xl text-white p-2 mt-4 rounded-xl hover:cursor-pointer hover:bg-sa-700'>
            <div><LogoutIcon/></div>
            <div onClick={()=>{handlelogout()}}>Logout</div>
        </div>
        </Link>
    </div>
    </div>
    
    </div>
  )
}

export default Sidebar