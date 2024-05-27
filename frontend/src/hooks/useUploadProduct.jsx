import { useState } from 'react';
import toast from 'react-hot-toast';

const useUploadProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadProduct = async (formData, onSuccess) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/seller/sell', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      if (data.message) {
        toast.error(data.message);
        return false;
      }
      toast.success('Product uploaded successfully');
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadProduct, isLoading };
};

export default useUploadProduct;
