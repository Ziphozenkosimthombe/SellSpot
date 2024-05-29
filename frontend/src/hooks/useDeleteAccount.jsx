import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const useDeleteAccount = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const deleteAccount = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const res = await fetch('/api/accounts/account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || 'Failed to delete account');
        setError(data.message || 'Failed to delete account');
        return { success: false };
      }

      const data = await res.json();
      toast.success(data.message || 'Account deleted successfully');
      localStorage.removeItem('users-auth');
      setAuthUser(null);
      navigate('/');
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
      return { success: false };
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteAccount, isDeleting, error };
};

export default useDeleteAccount;
