import Links from './Links';

import DarkMode from './DarkAndLight';
const NavigationLinks = () => {
  return (
    <>
      <ul className="hidden md:flex space-x-4">
        <Links to={'/login'} text={'Login'} />
        <Links to={'/signup'} text={'Register'} />
        <Links to={'/aboutUs'} text={'About Us'} />
      <Links to={'/upload'} text={'Upload'} />
        <li>
          <DarkMode />
        </li>
      </ul>
    </>
  );
};

export default NavigationLinks;
