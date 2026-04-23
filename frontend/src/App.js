import './App.css';
import Sidebar from './Components/Sidebar/sidebar';
import Dashboard from './Pages/Dashboard/dashboard';
import Home from './Pages/Home/home';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Member from './Pages/Member/member';
import GeneralUser from './Pages/GeneralUser/generalUser';
import MemberDetail from './Pages/MemberDetail/memberDetail';
import 'react-toastify/dist/ReactToastify.css';
import { useLoader } from './Context/LoaderContext';
import Loader from './Components/Loader/loader';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const { loading } = useLoader();

  useEffect(() => {
    let isLogedIn = localStorage.getItem("isLogin");
    if (isLogedIn) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  }, [location.pathname]);

  return (
    <div className="flex">
      {loading && <Loader />}
      {isLogin && <Sidebar />}
      
      <div className='flex-grow'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/member' element={<Member />} />
          <Route path='/specific/:page' element={<GeneralUser />} />
          <Route path='/member/:id' element={<MemberDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
