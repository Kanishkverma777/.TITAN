import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import { useLoader } from '../../Context/LoaderContext';

const Addmembers = ({ handleClose }) => {

    const [inputField, setInputField] = useState({ 
        name: "", 
        mobileNo: "", 
        address: "", 
        membership: "", 
        profilePic: "https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=1&pid=ImgDetMain", 
        joiningDate: new Date().toISOString().slice(0, 10) 
    })
    const [imageLoader, setImageLoader] = useState(false);
    const [membershipList, setMembershipList] = useState([]);
    const { setLoading } = useLoader();

    const handleOnChange = (event, name) => {
        setInputField({ ...inputField, [name]: event.target.value })
    }

    const fetchMembership = async () => {
        try {
            const response = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/plans/get-membership', { withCredentials: true });
            const plans = response.data.memberships || [];
            setMembershipList(plans);
            if (plans.length > 0) {
                setInputField(prev => ({ ...prev, membership: plans[0]._id }));
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load plans");
        }
    }

    useEffect(() => {
        fetchMembership();
    }, [])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            setImageLoader(true);
            reader.onloadend = () => {
                setInputField({ ...inputField, profilePic: reader.result });
                setImageLoader(false);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleRegisterButton = async () => {
        if (!inputField.name || !inputField.mobileNo || !inputField.membership) {
            toast.warning("Please fill all required fields (Name, Mobile, Plan)");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:4000') + '/members/register-member', inputField, { withCredentials: true });
            if (response.status === 201) {
                toast.success("Member Registered!");
                setTimeout(() => {
                    setLoading(false);
                    handleClose();
                    window.location.reload();
                }, 1500);
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.response?.data?.error || "Registration failed");
        }
    }

    return (
        <div className='p-10'>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 text-white'>
                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Name (Required)</label>
                    <input 
                        value={inputField.name} 
                        onChange={(event) => handleOnChange(event, "name")} 
                        placeholder='OPERATIVE NAME' 
                        type='text' 
                        className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-4 text-white text-sm focus:border-titan-lime outline-none transition-all placeholder:opacity-20' 
                    />
                </div>
                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Mobile No (Required)</label>
                    <input 
                        value={inputField.mobileNo} 
                        onChange={(event) => handleOnChange(event, "mobileNo")} 
                        placeholder='+X XX XXXX XXXX' 
                        type='text' 
                        className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-4 text-white text-sm focus:border-titan-lime outline-none transition-all placeholder:opacity-20' 
                    />
                </div>
                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Address</label>
                    <input 
                        value={inputField.address} 
                        onChange={(event) => handleOnChange(event, "address")} 
                        placeholder='SECTOR/LOCATION' 
                        type='text' 
                        className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-4 text-white text-sm focus:border-titan-lime outline-none transition-all placeholder:opacity-20' 
                    />
                </div>
                <div className='space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Joining Date</label>
                    <input 
                        value={inputField.joiningDate} 
                        onChange={(event) => handleOnChange(event, "joiningDate")} 
                        type='date' 
                        className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-4 text-white text-sm focus:border-titan-lime outline-none transition-all [color-scheme:dark]' 
                    />
                </div>
                <div className='md:col-span-2 space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Membership Protocol (Required)</label>
                    <select 
                        value={inputField.membership} 
                        onChange={(e) => handleOnChange(e, "membership")} 
                        className='w-full bg-titan-dark border border-titan-grey rounded-2xl p-4 text-white text-sm focus:border-titan-lime outline-none transition-all appearance-none font-bold italic'
                    >
                        {membershipList.length === 0 ? (
                            <option value="">-- NO ACTIVE PROTOCOLS --</option>
                        ) : (
                            <>
                                <option value="" disabled>-- SELECT DURATION --</option>
                                {membershipList.map((item, index) => (
                                    <option key={index} value={item._id} className='bg-titan-dark'>{item.months} MONTHS — {item.price} INR</option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
                <div className='md:col-span-2 space-y-1'>
                    <label className='text-[10px] text-titan-muted font-black uppercase tracking-widest ml-1'>Profile Identification</label>
                    <input 
                        type='file' 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className='w-full text-[10px] file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:bg-titan-grey file:text-white hover:file:bg-titan-lime hover:file:text-black file:transition-all cursor-pointer border border-titan-grey border-dashed p-2 rounded-2xl' 
                    />
                </div>
            </div>

            <div className='mt-10 flex flex-col md:flex-row items-center gap-10 border-t border-titan-grey/30 pt-10'>
                <div className='relative'>
                    <div className='absolute -inset-1 bg-titan-lime rounded-full blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200'></div>
                    <img src={inputField.profilePic} className='relative h-32 w-32 object-cover rounded-full border-4 border-titan-dark shadow-2xl' alt='Preview' />
                    {imageLoader && <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full'><LinearProgress sx={{ width: '60%' }} color="success" /></div>}
                </div>
                <button 
                    onClick={handleRegisterButton} 
                    className='flex-grow bg-titan-lime text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-xs hover:bg-white transition-all shadow-xl active:scale-95'
                >
                    INITIALIZE REGISTRATION
                </button>
            </div>
            <ToastContainer theme="dark" />
        </div>
    )
}

export default Addmembers