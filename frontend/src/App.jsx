import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import ProductDetails from './components/ProductDetails';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Home from './pages/Home/Home';
import UploadProduct from './pages/UploadProduct/UploadProduct';
import { DarkModeContext } from './context/DarkModeContext';
import ApplyToSell from './pages/Apply/ApplyToSell';
import { useAuthContext } from './context/AuthContext';
import Carts from './pages/Carts/Carts';
import WishList from './pages/WishList/WishList';

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
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/" element={authUser ? <Home /> : <Main />} />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/apply"
          element={authUser ? <ApplyToSell /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/upload"
          element={authUser ? <UploadProduct /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={authUser ? <Carts /> : <Navigate to="/login" />}
        />
        <Route
          path="/wishlist"
          element={authUser ? <WishList /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
