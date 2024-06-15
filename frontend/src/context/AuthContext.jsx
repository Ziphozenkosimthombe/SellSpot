import {createContext, useContext, useState, useEffect} from 'react';
import propTypes from 'prop-types';
import {useNavigate, useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';

// AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);

// Function to store user data with a timestamp in localStorage
export const storeUserData = (data) => {
  const userData = {...data, timestamp: new Date().getTime()};
  localStorage.setItem('users-auth', JSON.stringify(userData));
};

export const removeUserData = () => {
  localStorage.removeItem('users-auth');
  Cookies.remove('jwt', {path: '/'}); // Ensure the correct path is specified
};

// AuthContextProvider component
export const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(() => {
    const userData = JSON.parse(localStorage.getItem('users-auth'));
    if (userData) {
      const now = new Date().getTime();
      const expiryTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (now - userData.timestamp > expiryTime) {
        removeUserData();
        return null;
      }
      return userData;
    }
    return null;
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthExpiration = () => {
      const userData = JSON.parse(localStorage.getItem('users-auth'));
      if (userData) {
        const now = new Date().getTime();
        const expiryTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (now - userData.timestamp > expiryTime) {
          removeUserData();
          setAuthUser(null);
          navigate('/');

        }
      }
    };

    const intervalId = setInterval(checkAuthExpiration, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('users-auth'));
    const publicRoutes = ['/', '/about', '/login', '/signup']; // Define public routes

    if (!userData) {
      if (!publicRoutes.includes(location.pathname)) {
        navigate('/');
      }
    }
  }, [navigate, location.pathname]);

  return (
    <AuthContext.Provider value={{authUser, setAuthUser, storeUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: propTypes.node.isRequired,
};

