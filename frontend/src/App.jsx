import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { DarkModeContext } from './context/DarkModeContext';
import ApplyToSell from './components/ApplyToSell';
function App() {
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apply" element={<ApplyToSell />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
