import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
