import { useState } from 'react';
import toast from 'react-hot-toast';

const useRemoveCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeItemFromCart = async (productId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/carts/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        const updatedCart = await res.json();
        toast.success('Item removed from cart');
        return { success: true, updatedCart };
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
      setIsLoading(false);
    }
  };

  return { isLoading, error, removeItemFromCart };
};

export default useRemoveCart;
