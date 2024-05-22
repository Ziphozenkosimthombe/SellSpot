import { useState } from 'react';
import MenuButton from './MenuButton';
import NavigateHome from './NavigateHome';
import Links from './Links';
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
      <nav className="fixed w-screen" style={navHeight}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center relative mt-5">
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
            <Links to={'/list'} text={'List'} />
            <Links to={'/cart'} text={'Cart'} />
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderHome;
