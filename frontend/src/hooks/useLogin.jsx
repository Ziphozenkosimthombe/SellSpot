import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async ({ email, password }) => {
    const success = handleErrors({ email, password });
    if (!success) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);
      if (data.message === 'Invalid credentials') {
        toast.error(data.message);
        return false;
      }
      localStorage.setItem('users-auth', JSON.stringify(data));
      setAuthUser(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};
export default useLogin;

const handleErrors = ({ email, password }) => {
  if (!email || !password) {
    toast.error('Please fill in all fields');
    return false;
  }
  return true;
};
