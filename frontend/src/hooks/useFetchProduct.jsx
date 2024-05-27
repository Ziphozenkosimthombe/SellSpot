import { useState, useEffect } from 'react';

const useFetchProducts = (trigger) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      if (isMounted) {
        setIsLoading(true);
      }
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
        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, [trigger]);

  return { products, isLoading, error };
};

export default useFetchProducts;
