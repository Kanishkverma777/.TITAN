import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useLoader } from '../../Context/LoaderContext';

const Login = (props) => {
    const [loginField, setLoginField] = useState({ "userName": "", "password": "" });
    const navigate = useNavigate();
    const { setLoading } = useLoader();

    const handleLogin = async () => {
        if (!loginField.userName || !loginField.password) {
            toast.warning("Please enter your credentials");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/auth/login', loginField, { withCredentials: true });
            if (response.status === 200) {
                toast.success("Login Successful");
                localStorage.setItem("isLogin", "true");
                localStorage.setItem("gymDetails", JSON.stringify(response.data.gym));
                setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard');
                    window.location.reload();
                }, 1500);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.error || "Login Failed");
        }
    }

    const handleOnChange = (event, name) => {
        setLoginField({ ...loginField, [name]: event.target.value });
    }

    return (
        <div className='p-10 w-full max-w-sm mx-auto'>
            <div className='text-center mb-10'>
                <div className='text-[10px] text-titan-muted font-black uppercase tracking-[0.4em] mb-2'>Access Protocol</div>
                <h2 className='text-3xl font-heading font-black tracking-tighter uppercase italic text-white'>Welcome Back</h2>
            </div>
            
            <div className='space-y-4'>
                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>User ID</label>
                    <input 
                        type='text' 
                        value={loginField.userName} 
                        onChange={(e) => handleOnChange(e, "userName")} 
                        className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-4 text-white text-sm focus:border-titan-lime outline-none transition-all placeholder:opacity-20' 
                        placeholder='TITAN_99' 
                    />
                </div>
                
                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Access Key</label>
                    <input 
                        type='password' 
                        value={loginField.password} 
                        onChange={(e) => handleOnChange(e, "password")} 
                        className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-4 text-white text-sm focus:border-titan-lime outline-none transition-all placeholder:opacity-20' 
                        placeholder='••••••••' 
                    />
                </div>

                <button 
                    onClick={handleLogin} 
                    className='w-full bg-titan-lime text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl mt-4 hover:bg-white transition-all shadow-[0_10px_30px_rgba(180,255,0,0.1)] active:scale-95 text-xs'
                >
                    Initialize Login
                </button>
            </div>

            <div className='text-center mt-10 text-[10px] font-bold text-titan-muted uppercase tracking-widest border-t border-titan-grey/30 pt-8'>
                Don't have an account? <span onClick={() => props.setLogin(false)} className='text-white hover:text-titan-lime cursor-pointer underline transition-colors'>Register</span>
            </div>
            <ToastContainer theme="dark" />
        </div>
    )
}

export default Login