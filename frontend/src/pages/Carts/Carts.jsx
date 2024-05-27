import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Carts = () => {
  const [carts, setCarts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCarts = async () => {
      try {
        const res = await fetch('/api/carts/cart');
        if (!res.ok) {
          throw new Error('Failed to fetch carts');
        }
        const data = await res.json();
        if (isMounted) {
          setCarts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          toast.error(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCarts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cart-container flex flex-row justify-around">
      {carts && carts.items.length > 0 ? (
        <div className="product-listing mt-16">
          <div className="grid grid-row gap-4">
            <div className="shadow-2xl image-details-container shipped">
              <h1 className="pt-8 pl-5">Shipped from ShopSpot Warehouse</h1>
            </div>
            {carts.items.map((item) => (
              <div
                key={item.product._id}
                className="p-4 rounded-2xl shadow-2xl flex justify-between image-details-container"
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
                  <p className="text-2xl font-bold text-green-600 mb-4">
                    R {item.product.price.toLocaleString()}
                  </p>
                  <p className="">
                    Qty{' '}
                    <span className="text-xl font-bold">{item.quantity}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-16 shadow-2xl image-details-container flex flex-col justify-center items-center">
          <h1 className="">Your Shopping Cart is empty</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4">
            <Link to="/home">Continue Shopping</Link>
          </button>
        </div>
      )}
      <div className="cart-summary flex flex-col p-4 shadow-2xl h-full rounded-2xl mt-16">
        <h1 className="mt-10 font-extrabold ml-5 text-lg">Cart Summary</h1>
        <div className="flex justify-between">
          <div>
            <h2>
              Total (
              <span>
                {carts ? carts.items.length : 0}{' '}
                {carts && carts.items.length > 1 ? 'items' : 'item'}
              </span>
              )
            </h2>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 mb-4">
              {carts ? `R ${carts.totalPrice.toLocaleString()}` : 'R 0'}
            </p>
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Carts;
