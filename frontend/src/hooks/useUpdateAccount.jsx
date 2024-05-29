import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useUpdateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateAccount = async (userData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/accounts/account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Account successfully updated');
        navigate('/home');
      } else {
        throw new Error(data.message || 'Failed to update account');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateAccount, isLoading };
};

export default useUpdateAccount;
