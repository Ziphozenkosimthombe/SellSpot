import toast from 'react-hot-toast';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
  const [iseLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.message);
      }
      localStorage.removeItem('users-auth');
      setAuthUser(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { logout, iseLoading };
};

export default useLogout;
