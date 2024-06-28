import {useState} from 'react';
import {useAuthContext} from '../context/AuthContext';
import toast from 'react-hot-toast';

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {setAuthUser, storeUserData} = useAuthContext();

  const signup = async ({username, email, password, confirmPassword}) => {
    const success = handleErrors({username, email, password, confirmPassword});
    if (!success) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, email, password, confirmPassword}),
      });
      const data = await res.json();

      if (data.message) {
        toast.error(data.message);
        return false;
      }

      toast.success('Signup successful');
      const {token, ...userData} = data;

      storeUserData(userData);
      setAuthUser(userData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {signup, isLoading};
};

export default useSignup;

function handleErrors({username, email, password, confirmPassword}) {
  if (!username || !email || !password || !confirmPassword) {
    toast.error('Please fill in all fields');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }
  if (username.length < 5) {
    toast.error('Username must be at least 5 characters');
    return false;
  }
  if (!username.match(/^[a-zA-Z]+$/)) {
    toast.error('Username can only contain letters');
    return false;
  }

  return true;
}
