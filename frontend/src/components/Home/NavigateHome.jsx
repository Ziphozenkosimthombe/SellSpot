import Links from '../Links';
import LogoutButton from './LogoutButton';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { useLocalStorage } from 'usehooks-ts';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const NavigateHome = () => {
  const [carts, setCarts] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [value] = useLocalStorage('users-auth', {});
  const { username: name } = value;

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

  return (
    <>
      <ul className="hidden md:flex space-x-4">
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0 mt-2">
          <p className="">Hi {name}</p>
        </li>
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0 ">
          <Links to="/account" text="My Account" />
        </li>
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0">
          <LogoutButton />
        </li>
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0">
          <Links
            to="/wishlist"
            text={<FaRegHeart className="w-6 h-6 cursor-pointer" />}
          />
        </li>
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0 relative">
          <Links
            to="/cart"
            text={
              <>
                <FiShoppingCart className="w-6 h-6 cursor-pointer" />
                {!isLoading && carts.items.length > 0 && (
                  <span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1">
                    {carts.items.length}
                  </span>
                )}
              </>
            }
          />
        </li>
      </ul>
    </>
  );
};

export default NavigateHome;
