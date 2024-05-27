import { useState, useEffect } from 'react';

const useFetchProducts = (trigger) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/seller/uploads');

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Failed to fetch products');
          }
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [trigger]);

  return { products, isLoading, error };
};

export default useFetchProducts;
