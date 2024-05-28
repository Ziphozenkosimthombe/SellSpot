import { useState } from 'react';
import toast from 'react-hot-toast';

const useAddWishList = () => {
  const [wishIsLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItemToWishList = async (productId) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/wishlists/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.message) {
        toast.error(data.message);
        setError(data.message);
        return false;
      }
      toast.success('Product added to wishlist');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { wishIsLoading, error, addItemToWishList };
};

export default useAddWishList;
