import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';

const Modal = ({handleClose, content, header}) => {
  return (
    <div className='w-full h-full fixed inset-0 bg-black/98 backdrop-blur-xl text-white flex justify-center z-[200] overflow-y-auto p-4 md:p-10'>
        <div className='w-full max-w-lg bg-titan-dark border border-titan-grey rounded-[40px] h-fit my-auto relative shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden'>
            <div className='flex justify-between items-center p-8 border-b border-titan-grey/30 bg-titan-black/50'>
                <div className='space-y-1'>
                    <div className='text-[10px] text-titan-lime font-black tracking-[0.4em] uppercase'>System</div>
                    <h2 className='text-2xl font-heading font-black tracking-tighter uppercase italic'>{header}</h2>
                </div>
                <div onClick={handleClose} className='cursor-pointer w-12 h-12 border border-titan-grey rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all'>
                    <ClearIcon sx={{ fontSize: '24px' }} />
                </div>
            </div>
            <div>
                {content}
            </div>
        </div>
    </div>
  )
}

export default Modal