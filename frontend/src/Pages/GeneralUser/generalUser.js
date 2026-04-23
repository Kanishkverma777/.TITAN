import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MemberCard from '../../Components/MemberCard/memberCard';
import { getMonthlyJoined, threeDayExpire, fourToSevenDaysExpire, expired, inActiveMembers } from './data';

const GeneralUser = () => {
    const [header, setHeader] = useState("");
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const func = sessionStorage.getItem('func');
        functionCall(func)
    }, [])

    const functionCall = async (func) => {
        let datas;
        switch (func) {
            case "monthlyJoined":
                setHeader("Monthly Joined Members")
                datas = await getMonthlyJoined();
                setData(datas.members || []);
                break;

            case "threeDayExpire":
                setHeader("Expiring In 3 Days Members")
                datas = await threeDayExpire();
                setData(datas.members || []);
                break;

            case "fourToSevenDaysExpire":
                setHeader("Expiring In 4-7 Days Members")
                datas = await fourToSevenDaysExpire();
                setData(datas.members || []);
                break;

            case "expired":
                setHeader("Expired Members")
                datas = await expired();
                setData(datas.members || []);
                break;

            case "inActiveMembers":
                setHeader("Inactive Members")
                datas = await inActiveMembers();
                setData(datas.members || []);
                break;
            
            default:
                setHeader("Member List")
                setData([]);
        }
    }

    return (
        <div className='w-full bg-titan-black text-white p-10 relative h-screen overflow-y-auto custom-scrollbar uppercase tracking-tighter'>

            <div className='bg-titan-dark border border-titan-grey flex justify-between w-full rounded-[32px] p-6 shadow-2xl'>
                <Link to={'/dashboard'} className='bg-titan-grey border border-white/5 text-white px-8 py-4 rounded-full cursor-pointer hover:bg-titan-lime hover:text-black transition-all font-black text-xs flex items-center gap-2'>
                    <ArrowBackIcon fontSize="small" /> BACK TO PERFORMANCE
                </Link>
            </div>

            <div className='mt-12 text-4xl font-heading font-black flex justify-between items-end border-b border-titan-grey pb-8 mb-12'>
                <div>{header} <span className='text-titan-lime ml-2 text-2xl'>{data.length}</span></div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24'>
                {data.map((item) => (
                    <MemberCard key={item._id} item={item} />
                ))}
            </div>

            {data.length === 0 && (
                <div className='flex flex-col items-center justify-center mt-32 text-titan-muted'>
                    <div className='text-8xl mb-6 opacity-20'>.T</div>
                    <div className='text-2xl font-black uppercase tracking-widest italic opacity-50'>CATEGORY EMPTY</div>
                </div>
            )}

        </div>
    )
}

export default GeneralUser