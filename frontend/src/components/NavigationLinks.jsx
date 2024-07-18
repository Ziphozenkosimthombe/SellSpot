import Links from './Links';

import DarkMode from './DarkAndLight';
const NavigationLinks = () => {
  return (
    <>
      <ul className="hidden md:flex space-x-4">
        <Links to={'/login'} text={'Login'} />
        <Links to={'/signup'} text={'Register'} />
        <Links to={'/about'} text={'About Us'} />

        <li>
          <DarkMode />
        </li>
      </ul>
    </>
  );
};

export default NavigationLinks;
