import { Squash as Hamburger } from 'hamburger-react';
import PropTypes from 'prop-types';

const MenuButton = ({ menuOpen, toggleMenu }) => {
  return (
    <button
      id="menuBtn"
      className="focus:outline-none md:hidden "
      onClick={toggleMenu}
    >
      <Hamburger toggled={menuOpen} toggle={toggleMenu} />
    </button>
  );
};

MenuButton.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MenuButton;
