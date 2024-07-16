import {useState} from 'react';
import MenuButton from './MenuButton';
import NavigationLinks from './NavigationLinks';
import DarkMode from './DarkAndLight';
import Links from './Links';
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
          <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
          <div className="text-2xl font-bold">
            <Links to={'/'} text={'SellSpot'} />
          </div>
          <NavigationLinks />
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden shadow-2xl  w-48 fixed top-16 left-0 h-full pt-16">
          <ul className="">
            <Links to={'/login'} text={'Login'} />
            <Links to={'/signup'} text={'Register'} />
            <Links to={'/about'} text={'About Us'} />
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
