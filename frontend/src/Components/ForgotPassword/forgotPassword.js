import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const ForgotPassword = () => {
    const [emailSubmit, setEmailSubmit] = useState(false)
    const [otpValidate, setOtpValidate] = useState(false);
    const [loader, setLoader] = useState(false)
    const [contentVal, setContentValue] = useState("Submit Your Email")

    const [inputField, setInputField] = useState({ email: "", otp: "", newPassword: "" });

    const handleSubmit = () => {
        if (!emailSubmit) {
            sendOtp();
        } else if (emailSubmit && !otpValidate) {
            verifyOTP();
        } else {
            changePassword()
        }
    }

    const sendOtp = async () => {
        setLoader(true);
        try {
            const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/auth/reset-password/sendOtp', { email: inputField.email });
            if (response.status === 200) {
                toast.success("OTP sent to your email");
                setEmailSubmit(true);
                setContentValue("Verify OTP");
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to send OTP");
        } finally {
            setLoader(false);
        }
    }

    const verifyOTP = async () => {
        setLoader(true);
        try {
            const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/auth/reset-password/checkOtp', { email: inputField.email, otp: inputField.otp });
            if (response.status === 200) {
                toast.success("OTP Verified");
                setOtpValidate(true);
                setContentValue("Reset Password");
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "OTP Verification Failed");
        } finally {
            setLoader(false);
        }
    }

    const changePassword = async () => {
        setLoader(true)
        try {
            const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/auth/reset-password', { email: inputField.email, newPassword: inputField.newPassword });
            if (response.status === 200) {
                toast.success("Password Changed Successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to change password");
        } finally {
            setLoader(false);
        }
    }

    const handleOnChange = (event, name) => {
        setInputField({ ...inputField, [name]: event.target.value })
    }

    return (
        <div className='w-full p-10'>
            <div className='mb-8 space-y-6'>
                <div className='text-center mb-10'>
                    <div className='text-[10px] text-titan-lime font-black tracking-[0.4em] mb-2 uppercase'>Security Protocol</div>
                    <h3 className='text-3xl font-heading font-black tracking-tighter uppercase italic text-white'>Recovery Mode</h3>
                </div>

                {!emailSubmit && (
                    <div className='space-y-1'>
                        <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Registered Email</label>
                        <input 
                            type='email' 
                            placeholder='OPERATIVE@TITAN.COM' 
                            value={inputField.email} 
                            onChange={(e) => handleOnChange(e, "email")} 
                            className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-5 text-white text-sm focus:border-titan-lime outline-none transition-all placeholder:opacity-20'
                        />
                    </div>
                )}

                {emailSubmit && !otpValidate && (
                    <div className='space-y-1'>
                        <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Security Code</label>
                        <input 
                            type='text' 
                            placeholder='X X X X X X' 
                            value={inputField.otp} 
                            onChange={(e) => handleOnChange(e, "otp")} 
                            className='w-full bg-titan-dark border border-titan-lime rounded-2xl p-5 text-titan-lime text-center text-2xl font-black tracking-[0.5em] focus:border-white outline-none transition-all placeholder:opacity-20'
                        />
                    </div>
                )}

                {otpValidate && (
                    <div className='space-y-1'>
                        <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>New Access Key</label>
                        <input 
                            type='password' 
                            placeholder='••••••••' 
                            value={inputField.newPassword} 
                            onChange={(e) => handleOnChange(e, "newPassword")} 
                            className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-5 text-white text-sm focus:border-titan-lime outline-none transition-all placeholder:opacity-20'
                        />
                    </div>
                )}
            </div>

            <button 
                className='w-full bg-titan-lime text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-xs hover:bg-white transition-all shadow-[0_10px_30px_rgba(180,255,0,0.1)] active:scale-95 disabled:opacity-50' 
                onClick={() => handleSubmit()}
                disabled={loader}
            >
                {loader ? "INITIALIZING..." : contentVal.toUpperCase()}
            </button>
            <ToastContainer theme="dark" />
        </div>
    )
}

export default ForgotPassword