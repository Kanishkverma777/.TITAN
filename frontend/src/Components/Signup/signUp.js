import React, { useState } from 'react'
import './signUp.css';
import Modal from '../Modal/modal';
import ForgotPassword from '../ForgotPassword/forgotPassword';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useLoader } from '../../Context/LoaderContext';

const SignUp = (props) => {

    const [forgotPassword, setForgotPassword] = useState(false);
    const [inputField, setInputField] = useState({ 
        gymName: "", 
        email: "", 
        userName: "", 
        password: "", 
        profilePic: "https://th.bing.com/th/id/OIP.h4NU8Jb9tA2gJLi3veRj-wHaEl?rs=1&pid=ImgDetMain" 
    })
    const [loaderImage, setLoaderImage] = useState(false);
    const { setLoading } = useLoader();
    
    const handleClose = () => {
        setForgotPassword(prev => !prev);
    }

    const handleOnchange = (event, name) => {
        setInputField({ ...inputField, [name]: event.target.value })
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            setLoaderImage(true);
            reader.onloadend = () => {
                setInputField({ ...inputField, profilePic: reader.result });
                setLoaderImage(false);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleRegister = async () => {
        if (!inputField.gymName || !inputField.userName || !inputField.password) {
            toast.warning("Fill in all fields!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/auth/register', inputField);
            if (response.status === 201) {
                toast.success("Registration Successful! Please Login.");
                setInputField({ 
                    gymName: "", 
                    email: "", 
                    userName: "", 
                    password: "", 
                    profilePic: "https://th.bing.com/th/id/OIP.h4NU8Jb9tA2gJLi3veRj-wHaEl?rs=1&pid=ImgDetMain" 
                });
                setLoading(false);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.error || "Registration Failed");
        }
    }


    return (
        <div className='p-10 w-full mx-auto overflow-y-auto max-h-[80vh] custom-scrollbar overflow-x-hidden'>
            <div className='text-center mb-4'>
                <h2 className='text-3xl font-heading font-black tracking-tighter uppercase italic'>Join Titan</h2>
                <p className='text-[10px] text-titan-muted font-bold uppercase tracking-[0.3em] mt-1'>Start your elite fitness journey</p>
            </div>
            
            <div className='space-y-3'>
                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Gym Name</label>
                    <input 
                        type='text' 
                        value={inputField.gymName} 
                        onChange={(e) => handleOnchange(e, "gymName")} 
                        className='w-full bg-titan-black border border-titan-grey rounded-2xl p-3 text-white text-sm focus:border-titan-lime outline-none transition-all' 
                        placeholder='Titan Club' 
                    />
                </div>
                
                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Email</label>
                    <input 
                        type='email' 
                        value={inputField.email} 
                        onChange={(e) => handleOnchange(e, "email")} 
                        className='w-full bg-titan-black border border-titan-grey rounded-2xl p-3 text-white text-sm focus:border-titan-lime outline-none transition-all' 
                        placeholder='titan@example.com' 
                    />
                </div>

                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>User ID</label>
                    <input 
                        type='text' 
                        value={inputField.userName} 
                        onChange={(e) => handleOnchange(e, "userName")} 
                        className='w-full bg-titan-black border border-titan-grey rounded-2xl p-3 text-white text-sm focus:border-titan-lime outline-none transition-all' 
                        placeholder='TITAN_99' 
                    />
                </div>

                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Password</label>
                    <input 
                        type='password' 
                        value={inputField.password} 
                        onChange={(e) => handleOnchange(e, "password")} 
                        className='w-full bg-titan-black border border-titan-grey rounded-2xl p-3 text-white text-sm focus:border-titan-lime outline-none transition-all' 
                        placeholder='••••••••' 
                    />
                </div>

                <div className='bg-titan-black p-4 rounded-xl border border-titan-grey/50 group-hover:border-titan-lime transition-all overflow-hidden relative'>
                    <label className='block text-[10px] font-black text-titan-muted tracking-[0.3em] mb-2 uppercase'>Club Logo</label>
                    <input 
                        type='file' 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className='w-full text-[10px] file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-titan-grey file:text-white hover:file:bg-titan-lime hover:file:text-black file:transition-all cursor-pointer' 
                    />
                    {loaderImage && <Stack sx={{ width: '100%', mt: 1 }}><LinearProgress color="info" /></Stack>}
                    {inputField.profilePic && <img src={inputField.profilePic} className='mt-2 h-16 w-full object-cover rounded-xl border border-white/5 opacity-80' alt='Logo Preview' />}
                </div>

                <div className='flex flex-col gap-2'>
                    <button 
                        onClick={handleRegister} 
                        className='w-full bg-titan-lime text-black font-black uppercase tracking-widest py-3 rounded-xl mt-1 hover:bg-white transition-all shadow-xl active:scale-95'
                    >
                        Create Account
                    </button>
                    <button 
                        onClick={() => setForgotPassword(true)}
                        className='w-full text-center text-[10px] font-bold text-titan-muted uppercase tracking-widest hover:text-white transition-colors underline pt-1'
                    >
                        Forgot Password?
                    </button>
                </div>
            </div>

            <div className='text-center mt-4 text-[10px] font-bold text-titan-muted uppercase tracking-widest border-t border-titan-grey/30 pt-4'>
                Already a member? <span onClick={() => props.setLogin(true)} className='text-white hover:text-titan-lime cursor-pointer underline transition-colors'>Sign In</span>
            </div>

            {forgotPassword && <Modal header="Account Recovery" handleClose={handleClose} content={<ForgotPassword />} />}
            <ToastContainer theme="dark" />
        </div>
    )
}

export default SignUp