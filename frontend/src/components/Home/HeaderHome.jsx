import { useState } from 'react';
import MenuButton from '../MenuButton.jsx';
import NavigateHome from './NavigateHome';
import Links from '../Links';
import LogoutButton from './LogoutButton';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';
const HeaderHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navHeight = {
    height: '80px',
  };

  return (
    <div>
      <nav className="shadow-2xl w-screen" style={navHeight}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center relative mt-5 ">
          <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
          <div className="text-2xl font-bold">
            <Links to={'/home'} text={'SellSpot'} />
          </div>
          <NavigateHome />
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden shadow-2xl  w-48 fixed top-16 left-0 h-full pt-16">
          <ul className="">
            <Links to={'/apply'} text={'Sell on SellSpot'} />
            <Links
              to={'/list'}
              text={<FaRegHeart className="w-6  h-6 cursor-pointer" />}
            />
            <Links
              to={'/cart'}
              text={<FiShoppingCart className="w-6  h-6 cursor-pointer" />}
            />
            <div className="ml-4">
              <LogoutButton />
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderHome;
