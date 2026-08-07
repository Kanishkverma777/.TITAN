import React from 'react'
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';

const MemberCard = ({ item }) => {
    const isActive = item?.status === "Active";
    // A member is considered expired if their nextBillDate is in the past
    const isExpired = item?.nextBillDate && new Date(item.nextBillDate) < new Date();
    const showRed = !isActive || isExpired;

    const cardStyle = showRed
        ? { border: '2px solid rgba(220, 38, 38, 0.7)', background: '#1a0808', boxShadow: '0 0 24px rgba(220,38,38,0.12)' }
        : { border: '2px solid rgba(180, 255, 0, 0.5)', background: '#111', boxShadow: '0 0 24px rgba(180,255,0,0.08)' };

    const ringStyle = showRed
        ? { border: '2px solid rgba(220, 38, 38, 0.9)' }
        : { border: '2px solid rgba(180, 255, 0, 0.9)' };

    const dotStyle = showRed
        ? { background: '#dc2626' }
        : { background: '#B4FF00' };

    const accentColor = showRed ? '#f87171' : '#B4FF00';

    const badgeStyle = showRed
        ? { background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.3)', color: '#f87171' }
        : { background: 'rgba(180,255,0,0.1)', border: '1px solid rgba(180,255,0,0.3)', color: '#B4FF00' };

    const dividerStyle = showRed
        ? { borderTop: '1px solid rgba(220,38,38,0.2)' }
        : { borderTop: '1px solid rgba(180,255,0,0.2)' };

    return (
        <Link
            to={`/member/${item?._id}`}
            style={cardStyle}
            className="text-white rounded-[24px] md:rounded-[32px] p-5 md:p-8 hover:-translate-y-2 cursor-pointer transition-all group overflow-hidden relative flex flex-col"
        >
            {/* Profile image ring */}
            <div style={ringStyle} className="w-24 h-24 md:w-32 md:h-32 flex justify-center relative items-center p-1 mx-auto rounded-full transition-colors duration-500">
                <img
                    className={`w-full h-full rounded-full object-cover transition-all duration-700 ${showRed ? 'grayscale' : ''}`}
                    src={item?.profilePic}
                    alt='Profile Pic'
                />
                {/* Status dot */}
                <div
                    style={dotStyle}
                    className="absolute top-1 right-1 md:top-2 md:right-2 w-5 h-5 md:w-6 md:h-6 rounded-full border-[3px] md:border-4 border-titan-dark shadow-lg"
                />
            </div>

            <div className='text-center mt-5 md:mt-8'>
                <div style={{ color: accentColor }} className="text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase mb-1.5 md:mb-2">
                    {item?.memberId}
                </div>
                <div className='text-xl md:text-2xl font-heading font-black italic uppercase tracking-tighter truncate'>{item?.name}</div>
                <div className='text-[10px] md:text-xs text-titan-muted font-bold tracking-[0.15em] md:tracking-[0.2em] mt-1.5 md:mt-2 uppercase'>{item?.mobileNo}</div>

                <div className='flex justify-center mt-4 md:mt-6'>
                    <div style={badgeStyle} className="text-[8px] md:text-[10px] font-black px-4 md:px-5 py-1.5 md:py-2 rounded-full uppercase tracking-wider md:tracking-widest shadow-inner">
                        {item?.membership?.months} MONTHS PLAN
                    </div>
                </div>
            </div>

            <div style={dividerStyle} className="mx-auto mt-5 md:mt-8 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-titan-muted pt-4 md:pt-6 flex justify-between items-center px-1 md:px-2 w-full">
                <span className='opacity-60'>NEXT BILLING</span>
                <span style={{ color: accentColor }}>
                    {formatDate(item?.nextBillDate)}
                </span>
            </div>
        </Link>
    )
}

export default MemberCard