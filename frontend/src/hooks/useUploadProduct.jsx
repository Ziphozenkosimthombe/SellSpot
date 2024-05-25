import { useState } from 'react';
import toast from 'react-hot-toast';
const useUploadProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadProduct = async (formData) => {
    const { title, description, price, category, images, stock_quantity } =
      Object.fromEntries(formData.entries());
    const success = handleErrors({
      title,
      description: description instanceof Array ? description : [description],
      price,
      category,
      images: images instanceof Array ? images : [images],
      stock_quantity,
    });
    if (!success) return;
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
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadProduct, isLoading };
};

export default useUploadProduct;

const handleErrors = ({
  title,
  description,
  price,
  category,
  images,
  stock_quantity,
}) => {
  if (
    !title ||
    !description.length ||
    !price ||
    !category ||
    !images.length ||
    !stock_quantity
  ) {
    toast.error('Please fill in all fields');
    return false;
  }
  return true;
};
