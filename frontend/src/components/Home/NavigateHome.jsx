import Links from '../Links';
import LogoutButton from './LogoutButton';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const NavigateHome = () => {
  const [userData, setUserData] = useState({ username: '', is_seller: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/accounts/account');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const { username: name, is_seller } = userData;

  return (
    <>
      <ul className="hidden md:flex space-x-4">
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0 mt-2">
          <p className="">Hi {name}</p>
        </li>
        {!is_seller && (
          <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0">
            <Links to="/apply" text="Apply To Sell" />
          </li>
        )}
        {is_seller && (
          <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0">
            <Links to="/upload" text="Sell Your Products" />
          </li>
        )}
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0">
          <LogoutButton />
        </li>
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0">
          <Links
            to="/list"
            text={<FaRegHeart className="w-6 h-6 cursor-pointer" />}
          />
        </li>
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0">
          <Links
            to="/cart"
            text={<FiShoppingCart className="w-6 h-6 cursor-pointer" />}
          />
        </li>
      </ul>
    </>
  );
};

export default NavigateHome;
