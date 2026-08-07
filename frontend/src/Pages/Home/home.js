import React, { useState } from 'react'
import Login from '../../Components/Login/login'
import SignUp from '../../Components/Signup/signUp'
import Modal from '../../Components/Modal/modal'
import TitanHero from '../../assets/titan-hero.png'

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className='w-full min-h-screen bg-titan-black text-white font-sans overflow-x-hidden'>
        {/* Navigation */}
        <nav className='absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-8 bg-gradient-to-b from-black/60 to-transparent'>
            <div className='flex items-center gap-2'>
                <div className='text-3xl font-heading font-black tracking-tighter uppercase'>.TITAN</div>
            </div>
        </nav>

        {/* Hero Section */}
        <div className='relative h-[85vh] w-full flex flex-col justify-center px-8 md:px-16 pt-20'>
            <div className='absolute inset-0 z-0'>
                <img src={TitanHero} alt="Titan Gym" className='w-full h-full object-cover filter brightness-50' />
                <div className='absolute inset-0 bg-gradient-to-r from-titan-black via-transparent to-transparent'></div>
                <div className='absolute inset-0 bg-gradient-to-t from-titan-black via-transparent to-transparent'></div>
            </div>

            <div className='relative z-10 max-w-4xl'>
                <h1 className='text-6xl md:text-8xl font-heading font-black leading-none mb-10 tracking-tighter'>
                    BE HEALTHIER.<br />
                    BE STRONGER.<br />
                    BE CONFIDENT.
                </h1>
                
                <div className='flex flex-wrap gap-4 items-center'>
                    <button 
                        onClick={() => { setIsLogin(true); setShowAuth(true); }} 
                        className='px-8 py-5 bg-titan-lime text-black rounded-full font-black text-sm uppercase flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(180,255,0,0.3)]'
                    >
                        Log in to Titan <div className='w-6 h-6 bg-black text-titan-lime rounded-full flex items-center justify-center text-xs'>↗</div>
                    </button>
                    <button 
                        onClick={() => { setIsLogin(false); setShowAuth(true); }} 
                        className='px-8 py-5 bg-titan-grey/50 backdrop-blur-md border border-titan-grey text-white rounded-full font-bold text-sm hover:bg-titan-grey transition-all'
                    >
                        Join the Club
                    </button>
            </div>
        </div>
    </div>


        {/* Auth Modal Overlay */}
        {showAuth && (
            <Modal 
                header={isLogin ? "Operative Access" : "Join the Elite"} 
                handleClose={() => setShowAuth(false)} 
                content={isLogin ? <Login setLogin={setIsLogin} /> : <SignUp setLogin={setIsLogin} />}
            />
        )}
    </div>
  )
}

export default Home