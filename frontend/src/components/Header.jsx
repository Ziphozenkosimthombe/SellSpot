import { useState } from 'react';
import MenuButton from './MenuButton';
import NavigationLinks from './NavigationLinks';
import DarkMode from './DarkAndLight';
import { Link } from 'react-router-dom';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navHeight = {
    height: '80px',
  };

  return (
    <div>
      <nav className="fixed w-screen" style={navHeight}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center relative mt-5">
          {/* Menu button for small screens */}
          <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
          {/* Menu rendered inside the nav tag for larger screens */}
          <Link to={'/'} className=" text-xl font-bold">
            SellSpot
          </Link>
          <NavigationLinks />
          {/* Add the DarkMode component here */}
        </div>
      </nav>
      {/* Sidebar rendered for small screens */}
      {menuOpen && (
        <div className="md:hidden shadow-2xl  w-48 fixed top-16 left-0 h-full pt-16">
          <ul className="">
            <li>
              <Link
                to={'/login'}
                className="block px-4 py-2 hover:text-gray-400"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={'/signup'}
                className="block px-4 py-2 hover:text-gray-400"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to={'/apply'}
                className="block px-4 py-2 hover:text-gray-400"
              >
                Sell on SellSpot
              </Link>
            </li>
            <li>
              <Link
                to={'/aboutUs'}
                className="block px-4 py-2 hover:text-gray-400"
              >
                About us
              </Link>
            </li>
            <li className="py-2 px-4">
              <DarkMode />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
