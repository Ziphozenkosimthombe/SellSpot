import Links from '../Links';
import LogoutButton from './LogoutButton';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
import { useLocalStorage } from 'usehooks-ts';

const NavigateHome = () => {
  const [value] = useLocalStorage('users-auth', 0);
  const { username: name } = value;

  return (
    <>
      <ul className="hidden md:flex space-x-4">
        <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0 mt-2">
          <p className="">Hi {name}</p>
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
