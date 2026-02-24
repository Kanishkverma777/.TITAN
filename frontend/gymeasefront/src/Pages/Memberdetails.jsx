import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
const Memberdetails = () => {
  const [status, setStatus] = useState("Pending");

  const [renew, setRenew] = useState(false);
  const handleswitchbutton = () => {
    let statuss = status === "Active" ? "Pending" : "Active";
    setStatus(statuss);
  };

  const navigate = useNavigate();
  return (
    <div className="w-3/4 text-black p-5 ">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="border-2 text-white w-fit font-sans p-2 rounded-2xl bg-slate-900"
      >
        <ArrowBackIcon />
        Go Back
      </div>

      <div className="mt-5 p-2">
        <div className="w-[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img
              className="w-full  mx-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHocDGl6rP_Qheul8pRJo1gFyzYzHQc9oaBw&s"
              alt=""
            />
          </div>
          <div className="w-2/3 mt-5 text-xl p-5 ">
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Name: Cbum{" "}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile: 9 19040{" "}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address: kuch bhi{" "}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Joiniing date : 11/11/1222{" "}
            </div>

            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next Bill Date:12.23.42
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold flex gap-2 items-center">
              Status:{" "}
              <Switch
                onColor="#6366f1"
                checked={status === "Active"}
                onChange={() => {
                  handleswitchbutton();
                }}
              />{" "}
            </div>

            <div
              onClick={() => setRenew((prev) => !prev)}
              className={`mt-5 p-4 border rounded-lg text-2xl text-white w-full md:w-1/2 text-center cursor-pointer hover:bg-slate-900 ${
                renew && status === "Active" ? "bg-amber-600" : "bg-slate-600"
              }`}
            >
              Renew
            </div>

            <div></div>
          </div>

          
        </div> 
      {
        renew && status==="Active"?(  <div className="mt-3 p-3 w-full h-fit mb-5 bg-slate-100 md:w-[50%] mx-auto">
            
              <div className="w-full">
                <div className="my-5  ">
                    <div className="text-2xl">Membership</div>
                    <select name="" id="" className="p-2 w-full border-2">
                        <option value="">1 Month Plan</option>
                                                <option value="">2 Month Plan</option>

                    </select>

                  
                    <div className={`p-4 border rounded-lg text-2xl mt-5 mx-auto bg-slate-600 text-white w-full md:w-1/2 text-center cursor-pointer hover:bg-slate-900`}> Save</div>
                </div>
              </div>
          </div>): null
      }
      </div>
    </div>
  );
};

export default Memberdetails;
