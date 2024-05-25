import Links from '../Links';
import LogoutButton from './LogoutButton';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
const NavigateHome = () => {
  return (
    <>
      <ul className="hidden md:flex space-x-4">
        <Links to="/apply" text="Sell on SellSpot" />
        <LogoutButton />
        <Links
          to="/list"
          text={<FaRegHeart className="w-6  h-6 cursor-pointer" />}
        ></Links>
        <Links
          to="/cart"
          text={<FiShoppingCart className="w-6  h-6 cursor-pointer" />}
        ></Links>
      </ul>
    </>
  );
};

export default NavigateHome;
