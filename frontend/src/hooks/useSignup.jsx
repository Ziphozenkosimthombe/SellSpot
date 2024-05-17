import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({ username, email, password, confirmPassword }) => {
    const success = handleErrors({
      username,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error === 'User already exists') {
        new Error(data.error);
      }
      localStorage.setItem('users-auth', JSON.stringify(data));
      setAuthUser(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};

export default useSignup;

function handleErrors({ username, email, password, confirmPassword }) {
  if (!username || !email || !password || !confirmPassword) {
    toast.error('Please fill in all fields');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }
  if (password.length < 8) {
    toast.error('Password must be at least 8 characters');
    return false;
  }
  if (username.length < 5) {
    toast.error('Username must be at least 3 characters');
    return false;
  }
  if (!username.match(/^[a-zA-Z]+$/)) {
    toast.error('Username can only contain letters');
    return false;
  }

  return true;
}
