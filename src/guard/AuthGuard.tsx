import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthGuard = () => {
  const { authenticated, loading } = useAuth();
  console.log(authenticated)

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }
  
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;