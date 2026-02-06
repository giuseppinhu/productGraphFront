import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await api.get('/validate');
        console.log(response)
        setUser(response.data)
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);