import { useState } from 'react';
import toast from 'react-hot-toast';

const useRemoveList = () => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState(null);

  const removeItemFromList = async (productId) => {
    setIsRemoving(true);
    setError(null);
    try {
      const res = await fetch('/api/wishlists/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        const updatedWishList = await res.json();
        toast.success('Item removed from wish list');
        return { success: true, updatedWishList };
      } else {
        const data = await res.json();
        toast.error(data.message);
        setError(data.message);
        return { success: false };
      }
    } catch (err) {
      toast.error('Failed to remove item');
      setError(err.message);
      return { success: false };
    } finally {
      setIsRemoving(false);
    }
  };
  return { isRemoving, error, removeItemFromList };
};

export default useRemoveList;
