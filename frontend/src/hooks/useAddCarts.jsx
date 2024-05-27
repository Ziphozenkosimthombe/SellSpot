import { useState } from 'react';
import toast from 'react-hot-toast';

const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItemToCart = async (productId, quantity) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/carts/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (data.message) {
        toast.error(data.message);
        setError(data.message);
        return false;
      }
      toast.success('Product added to cart');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, addItemToCart };
};

export default useCart;
