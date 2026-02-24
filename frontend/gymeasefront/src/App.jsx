import './App.css'
import { Home } from './Pages/Home'
import { Route,Routes, useNavigate } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Sidebar from './components/Sidebar'
import { useState,useEffect } from 'react'
import Members from './Pages/Members'
import GeneralUser from './Pages/GeneralUser'
import Memberdetails from './Pages/Memberdetails'


function App() {
  const [count, setCount] = useState(0)
  const [islogin ,setIslogin]=useState(false)

const navigate=useNavigate();

useEffect(()=>{
let isLoggedin=sessionStorage.getItem("islogin")
  if(isLoggedin){
    setIslogin(true)
    // navigate("/dashboard")
  }
  else{
    setIslogin(false)
    navigate("/")
  }
},[sessionStorage.getItem("islogin")])

  return (
  
    <div className="flex">
      {
        islogin && <Sidebar />
      }
     
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/members' element={<Members/>}/>
      <Route path='/specific/:page'  element={<GeneralUser/>}/>
      <Route path='/members/:id' element={<Memberdetails/>} />

    </Routes>
        </div>
  
  )
}

export default App
