import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser, storeUserData } = useAuthContext();

  const login = async ({ email, password }) => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

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

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success('Login successful');
      const userData = {
        _id: data._id,
        username: data.username,
        email: data.email,
        token: data.token,
        timestamp: new Date().getTime(),
      };

      storeUserData(userData);
      setAuthUser(userData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
