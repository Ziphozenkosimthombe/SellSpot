import DarkMode from './DarkAndLight.jsx';
import { Link } from 'react-router-dom';

const NavigationLinks = () => {
  return (
    <>
      <ul className="hidden md:flex space-x-4">
        <li>
          <Link to={'/Login'} className=" hover:text-gray-400 font-bold ">
            Login
          </Link>
        </li>
        <li>
          <Link to={'/signup'} className=" hover:text-gray-400  font-bold ">
            Register
          </Link>
        </li>
        <li>
          <Link to={'/aboutUs'} className=" hover:text-gray-400 font-bold ">
            About Us
          </Link>
        </li>
        <li>
          <DarkMode />
        </li>
      </ul>
    </>
  );
};

export default NavigationLinks;
