
import { Navigate, Outlet } from 'react-router-dom';
import { api } from '../services/api';
import { useEffect, useState } from 'react';

const AuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const [sucess, setSucess] = useState(false)

   useEffect(() => {
    const checkLogin = async () => {
      await api
      .get('/validate')
        .then(res => {
          setSucess(res.data.sucess)
          setLoading(false)
        })
      .catch(error => {
        setSucess(false)
        setLoading(false)
      })
    };
    
    checkLogin();
  }, []);


  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  
  return sucess ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;