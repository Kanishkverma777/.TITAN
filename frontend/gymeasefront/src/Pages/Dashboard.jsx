import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import NetworkCellIcon from "@mui/icons-material/NetworkCell";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
import RunningWithErrorsSharpIcon from "@mui/icons-material/RunningWithErrorsSharp";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [accordianDashboard, setAccordianDasboard] = useState(false);
  const ref = useRef();
  const handleOnclickMenu=(value)=>{
        sessionStorage.setItem("func",value)

  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        accordianDashboard &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setAccordianDasboard(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);


  

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [accordianDashboard]);

  return (
    <div className="w-full md:w-3/4 h-screen m-2">
      <div className="w-full p-3 rounded-lg text-white justify-between items-center flex bg-slate-800">
        <MenuIcon
          onClick={() => setAccordianDasboard((prev) => !prev)}
          className="cursor-pointer"
        />

        <img
          className="w-8 h-8  rounded-full border-2 border-slate-200"
          src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
          alt=""
        />
      </div>
      {accordianDashboard && (
        <div
          ref={ref}
          className="absolute p-3 bg-slate-800 text-white rounded-xl text-lg font-extralight
    "
        >
          <div>Hi Welcome TO Our Gym Management System</div>
          <p>Feel Free to Ask Anythin </p>
        </div>
      )}

      <div className="cards mt-4 pt-3 bg-slate-100/50 rounded-lg gap-5  grid   lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1 pb-3 h-[80%] overflow-x-auto w-full">
        <Link to={"/specific/Joined-Members"} ><div onClick={()=>{handleOnclickMenu("Joined-Members")}} className="w-full py-10  px-5 bg-slate-200 rounded-lg justify-center items-center text-center  h-fit flex flex-col cursor-pointer hover:bg-slate-400 text-black">
          <PeopleIcon sx={{ color: "green ", fontsize: "50" }} />

          <p className="text-xl my-2">Joined Members </p>
        </div></Link>


        <Link to={"/specific/Monthly-joined"} ><div onClick={()=>{handleOnclickMenu("Monthly-joined")}} className="w-full py-10  px-5 bg-slate-200 rounded-lg justify-center items-center text-center  h-fit flex flex-col cursor-pointer hover:bg-slate-400 text-black">
          <NetworkCellIcon sx={{ color: "blue", fontsize: "50" }} />
          <p className="text-xl my-2">Monthly Joined</p>
        </div></Link>

        <Link to={"/specific/expire-within-3days"} >
        <div onClick={()=>{handleOnclickMenu("expire-within-3days")}} className="w-full py-10  px-5 bg-slate-200 rounded-lg justify-center items-center text-center  h-fit flex flex-col cursor-pointer hover:bg-slate-400 text-black">
          <AccessTimeSharpIcon sx={{ color: "red", fontsize: "50" }} />

          <p className="text-xl my-2">Expiring Within 3 Days </p>
        </div>
        </Link>

        <Link to={"/specific/Expire-within-4to7-days"}>
        <div onClick={()=>{handleOnclickMenu("Expire-within-4to7-days")}} className="w-full py-10  px-5 bg-slate-200 rounded-lg justify-center items-center text-center  h-fit flex flex-col cursor-pointer hover:bg-slate-400 text-black">
          <AccessTimeSharpIcon sx={{ color: "red", fontsize: "50" }} />

          <p className="text-xl my-2">Expiring within 4-7 Days </p>
        </div>
        </Link>

        <Link to={"/specific/expired"}>
        <div onClick={()=>{handleOnclickMenu("expired")}} className="w-full py-10  px-5 bg-slate-200 rounded-lg justify-center items-center text-center  h-fit flex flex-col cursor-pointer hover:bg-slate-400 text-black">
          <ErrorSharpIcon sx={{ color: "orange", fontsize: "50" }} />

          <p className="text-xl my-2">Expired </p>
        </div>
        </Link>

        <Link to={"/specific/Inactive-members"}>
        <div onClick={()=>{handleOnclickMenu("Inactive-members")}} className="w-full py-10  px-5 bg-slate-200 rounded-lg justify-center items-center text-center  h-fit flex flex-col cursor-pointer hover:bg-slate-400 text-black">
          <RunningWithErrorsSharpIcon
            sx={{ color: "darkmagenta", fontsize: "50" }}
          />
          <p className="text-xl my-2">Inactive Members </p>
        </div>
        </Link>
      </div>

      <div className="md:bottom p-4 w-3/4 mb-8 sm:mb-0 absolute bg-black text-white  rounded-xl text-xl">
        Contact Developer for any technical Error
      </div>
    </div>
  );
};

export default Dashboard;
