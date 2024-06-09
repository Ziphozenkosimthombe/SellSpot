import {createContext, useContext, useState, useEffect} from 'react';
import propTypes from 'prop-types';
import {useNavigate, useLocation} from 'react-router-dom';

//  AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// Function to store user data with a timestamp
export const storeUserData = (data) => {
  const userData = {...data, timestamp: new Date().getTime()};
  localStorage.setItem('users-auth', JSON.stringify(userData));
};

// AuthContextProvider component
export const AuthContextProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(() => {
    const userData = JSON.parse(localStorage.getItem('users-auth'));
    if (userData) {
      const now = new Date().getTime();
      const expiryTime = 24 * 60 * 60 * 1000; // 24 hours

      if (now - userData.timestamp > expiryTime) {
        localStorage.removeItem('users-auth');
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
        const expiryTime = 24 * 60 * 60 * 1000;

        if (now - userData.timestamp > expiryTime) {
          localStorage.removeItem('users-auth');
          setAuthUser(null);
          navigate('/');
        }
      }
    };

    const timeoutId = setTimeout(checkAuthExpiration, 24 * 60 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('users-auth'));
    const publicRoutes = ['/', '/about', '/login', '/signup']; // Define public routes

    if (!userData || !userData.token) {
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
