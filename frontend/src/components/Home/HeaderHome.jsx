import { useState, useEffect } from 'react';
import MenuButton from '../MenuButton.jsx';
import NavigateHome from './NavigateHome';
import Links from '../Links';
import LogoutButton from './LogoutButton';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';

const HeaderHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState({ is_seller: false });
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch('/api/accounts/account');
        const data = await response.json();
        if (isMounted) {
          setUserData(data);
          setIsSeller(data.is_seller);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navHeight = {
    height: '80px',
  };

  return (
    <div>
      <nav className="shadow-2xl w-screen" style={navHeight}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center relative mt-5">
          <MenuButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
          <div className="flex">
            <div className="text-3xl font-bold">
              <Links to={'/home'} text={'SellSpot'} />
            </div>
            <div>
              <ul>
                {!loading && !isSeller && (
                  <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0 mt-2">
                    <Links to="/apply" text="Apply To Sell" />
                  </li>
                )}
                {!loading && isSeller && (
                  <li className="pl-4 border-l border-gray-300 first:pl-0 first:border-0 mt-2">
                    <Links to="/upload" text="Sell Your Products" />
                  </li>
                )}
              </ul>
            </div>
          </div>
          <NavigateHome />
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden shadow-2xl w-48 fixed top-16 left-0 h-full pt-16">
          <ul className="">
            <Links to={'/apply'} text={'Sell on SellSpot'} />
            <Links
              to={'/list'}
              text={<FaRegHeart className="w-6 h-6 cursor-pointer" />}
            />
            <Links
              to={'/cart'}
              text={<FiShoppingCart className="w-6 h-6 cursor-pointer" />}
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
