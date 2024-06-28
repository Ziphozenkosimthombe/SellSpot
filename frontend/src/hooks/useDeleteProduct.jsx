import {useState} from 'react';
import toast from 'react-hot-toast';

const useDeleteProduct = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteProduct = async (productId) => {
    setIsDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/seller/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId}),
      });

      if (res.ok) {
        const updatedCart = await res.json();
        toast.success('Item removed from cart');
        return {success: true, updatedCart};
      } else {
        const data = await res.json();
        toast.error(data.message);
        setError(data.message);
        return {success: false};
      }
    } catch (err) {
      toast.error('Failed to remove item');
      setError(err.message);
      return {success: false};
    } finally {
      setIsDeleting(false);
    }
  };

  return {isDeleting, error, deleteProduct};
};

export default useDeleteProduct;
