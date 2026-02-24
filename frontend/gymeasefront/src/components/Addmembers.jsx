import React from "react";
import { useState } from "react";
const Addmembers = () => {
   const[inputfield,setInputfield]=useState({Name:"",Mobile_No:"",Address:"",Date:"", Membership:"", ProfilePic:"",JoiningDate:""})

  const handleonchange=(event,name)=>{
    setInputfield({...inputfield,[name]:event.target.value})
    console.log(inputfield)
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6">
        
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Add New Member
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input value={inputfield.Name} onChange={(event)=>{handleonchange(event,"Name")}}
            type="text"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name Of the Member"
          />

          <input value={inputfield.Mobile_No} onChange={(event)=>{handleonchange(event,"Mobile_No")}}
            type="text"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Mobile No."
          />

          <input value={inputfield.Address} onChange={(event)=>{handleonchange(event,"Address")}}
            type="text"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Address of Member"
          />

          <input value={inputfield.Date} onChange={(event)=>{handleonchange(event,"Date")}}
            type="date"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select value={inputfield.Membership} onChange={(event)=>{handleonchange(event,"Membership")}} className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>1 Month Membership</option>
            <option>2 Month Membership</option>
            <option>3 Month Membership</option>
          </select>

          <input value={inputfield.ProfilePic}
            type="file"
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Image Preview + Button Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">

          <div className="w-24 h-24 md:w-32 md:h-32">
            <img
              className="w-full h-full object-cover rounded-full border"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJIkRR5xaxAjrWIeuiGkZBj4cMK7JFkB2CQ&s"
              alt="Member Preview"
            />
          </div>

          <button className="w-full md:w-auto px-8 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-900 transition duration-300">
            Register
          </button>

        </div>
      </div>
    </div>
  );
};

export default Addmembers;
