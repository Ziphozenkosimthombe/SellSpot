import {useState} from 'react';

const useUpdateStockQuantity = () => {
  const [isQuantity, setIsQuantity] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateStockQuantity = async (productId, newQuantity) => {
    setIsQuantity(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch('/api/cart/update-stock', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId, newQuantity}),
      });
      if (!response.ok) {
        throw new Error('Failed to update stock quantity');
      }
      const data = await response.json();
      setSuccess(true);
      return data; // return the updated cart data
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsQuantity(false);
    }
  };

  return {
    updateStockQuantity,
    isQuantity,
    error,
    success,
  };
};

export default useUpdateStockQuantity;

