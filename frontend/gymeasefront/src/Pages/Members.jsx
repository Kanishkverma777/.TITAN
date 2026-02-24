import React, { useEffect, useState } from 'react'
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import AddCardSharpIcon from '@mui/icons-material/AddCardSharp';
import { Link } from 'react-router-dom';
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import PanoramaFishEyeSharpIcon from '@mui/icons-material/PanoramaFishEyeSharp';
import Membercard from '../components/membercard';
import Model from '../components/Model';
import Addmembership from '../components/Addmembership';
import Addmembers from '../components/Addmembers';

const Members = () => {
const  [addmembership,setAddmembership]=useState(false)
const[addmembers,setAddmembers]=useState(false  )

const[currentpage,setCurrentpage]=useState("1")
const[startfrom,setStartrom]=useState(0)
const[endto,setEndto]=useState(9)
const[totaldata,setTotaldata]=useState(0)
const[noofpage,setNoofpage]=useState(0)
const[limit ,setLimit]=useState(9)


const fetchdata=async()=>{

    let totaldata=52 
    setTotaldata(totaldata)
    let extrapage=totaldata%limit===0?0:1
    let totalpage=parseInt(totaldata/limit)+extrapage
    setNoofpage(totalpage)
    if(totaldata===0){
        setStartrom(-1)
        setEndto(0)
        setTotaldata(0)

    if(totaldata<9){
        setEndto()
    }
    else if(totaldata<9){
        setStartrom(0)
        setEndto(totaldata)
    }
    }
}

useEffect(()=>{
    fetchdata()

},[])


const handleaddmembers=()=>{
    setAddmembers(prev=>!prev)
}

const handlemembership=()=>{
    setAddmembership(prev=>!prev)
     
}

const handleprev=()=>{
    if(currentpage!=1){
        let currpage=currentpage-1;
        setCurrentpage(currpage);
        var from= (currpage-1)*9;
        var to =(currpage*9)
        setStartrom(from)
        setEndto(to)

    }
}

const handlenext=()=>{
    if(currentpage!==noofpage){
        let currpage=currentpage+1;
        setCurrentpage(currpage);
        var from= (currpage-1)*9;
        var to =(currpage*9)
        if(to>totaldata){
            to=totaldata
        }
        setStartrom(from)
        setEndto(to)
    }

}


  return (
    <div className='w-full md:w-3/4 h-[100vh] m-2'>
        <div className='w-full p-3 rounded-lg text-white justify-between items-center flex bg-slate-800'>
            <div className='items-center gap-2 flex cursor-pointer border border-white  p-2 rounded-lg bg-slate-700 hover:bg-slate-900'>
                <div onClick={()=>handleaddmembers()}>Add Members</div>
                <PersonAddAltSharpIcon/>


            </div>
           <div className='items-center gap-2 flex cursor-pointer border border-white  p-2 rounded-lg bg-slate-700 hover:bg-slate-900'>
                <div onClick={()=>handlemembership()}>Memberships </div>
                <AddCardSharpIcon/>
              


            </div>

          

        </div>
        <div className='mt-2 w-auto'><Link  to={'/dashboard '}><ReplySharpIcon/> Back To Dashboard  </Link></div>
        
        <div className='mt-5 w-1/2 flex gap-1 '>
        <input  className='p-2 w-full rounded-lg  border border-slate-400' type="text" placeholder='Search By Name Or Mobile No' />
        <div className='bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer '><SearchSharpIcon/></div>

        </div>

        <div className='mt-3 flex justify-between p-4 text-slate-950 text-xl'>
            <div>Total Members</div>
            <div className='flex  gap-2  items-center justify-center '>
            <div className=''>{startfrom+1}-{endto} Of {totaldata} Members</div>
            <div onClick={()=>{handleprev()}} className={`p-1 cursor-pointer hover:bg-slate-200 border-1 border-slate-300 flex items-center ${currentpage===1?'bg-grey-200 text-gray-200':null} `} >
                <KeyboardArrowLeftSharpIcon/>
               
            </div>
            <div  onClick={()=>{handlenext()}} className={`p-1 cursor-pointer hover:bg-slate-200 border-1 border-slate-300 flex items-center ${currentpage===noofpage?'bg-grey-200 text-gray-200':null} `}>
                 <ChevronRightSharpIcon/>
            </div>
            </div>
        </div>

        {/* member cards Div*/}

        <div className='w-full h-[65%] overflow-x-auto grid grid-cols-3 gap-2 m-2  bg-slate-200 rounded-lg '>
                <Membercard/>
                <Membercard/>
                <Membercard/>
                <Membercard/>
                    <Membercard/>
                    <Membercard/>
                
           



        </div>
        {addmembership&&
        <Model handleclick={handlemembership} content={<Addmembership/>} header="Add membership"/>
        }


        {
            addmembers && <Model handleclick={handleaddmembers} content={<Addmembers/>} header="Add Members" />
        }
    </div>
  )
}

export default Members