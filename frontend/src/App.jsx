import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { DarkModeContext } from './context/DarkModeContext';
import ApplyToSell from './pages/Apply/ApplyToSell';
import { useAuthContext } from './context/AuthContext';
function App() {
  const { authUser } = useAuthContext();
  const { isDarkMode } = useContext(DarkModeContext);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className={`${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={'/login'} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/apply"
          element={authUser ? <ApplyToSell /> : <Navigate to={'/login'} />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
