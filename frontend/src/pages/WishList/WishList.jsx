import { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useAddCarts from '../../hooks/useAddCarts';
import useRemoveList from '../../hooks/useRemoveList';
const WishList = () => {
  const [wishes, setWishes] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItemToCart, cartIsLoading } = useAddCarts();
  const [loadingItemId, setLoadingItemId] = useState(null);
  const { removeItemFromList, isRemoving } = useRemoveList();
  const [removingItemId, setRemovingItemId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const fetchWishList = async () => {
      try {
        const res = await fetch('/api/wishlists/wishlist');
        if (!res.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        const data = await res.json();
        if (isMounted) {
          setWishes(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          toast.error(err.message);
          console.error('Error fetching wishlist:', err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchWishList();

    return () => {
      isMounted = false;
    };
  }, [refreshFlag]);

  const handleAddToCart = async (productId) => {
    setLoadingItemId(productId);
    await addItemToCart(productId, 1);
    setLoadingItemId(null);
  };
  const handleRemoveList = async (productId) => {
    setRemovingItemId(productId);
    const { success } = await removeItemFromList(productId);
    if (success) {
      setRefreshFlag((prevFlag) => !prevFlag);
    }
    setRemovingItemId(null);
  };
  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <div className="cart-container flex flex-row justify-around">
      {wishes && wishes.items.length > 0 ? (
        <div className="product-listing mt-16">
          <div className="grid grid-row gap-4">
            <div className="shadow-2xl image-details-container shipped flex justify-center">
              <h1 className="pt-8 text-gray-500 font-bold text-2xl">
                Wish List
              </h1>
            </div>
            {wishes.items.map((item) => (
              <div
                key={item.product._id}
                className="p-4 rounded-2xl shadow-2xl flex justify-between  image-details-container"
              >
                <div>
                  {item.product.images.length > 0 && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="object-cover w-full h-64 rounded-lg"
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{item.product.title}</h2>
                  <span className="text-lg text-gray-500 font-bold">
                    {item.product.status}
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 mb-4">
                    R {item.product.price.toLocaleString()}
                  </p>
                  <div>
                    <div className="flex flex-col ">
                      <button
                        onClick={() => handleAddToCart(item.product._id)}
                        className="btn-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                        disabled={
                          cartIsLoading && loadingItemId === item.product._id
                        }
                      >
                        {cartIsLoading && loadingItemId === item.product._id ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          'Add To Cart'
                        )}
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleRemoveList(item.product._id)}
                        className="btn-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                        disabled={
                          isRemoving && removingItemId === item.product._id
                        }
                      >
                        {isRemoving && removingItemId === item.product._id ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          'Removing'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-16 shadow-2xl image-details-container flex flex-col justify-center items-center h-36">
          <h1 className="">Your Shopping WishList is empty</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4">
            <Link to="/home">Continue Shopping</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default WishList;
