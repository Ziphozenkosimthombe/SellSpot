import { Toaster } from 'react-hot-toast';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World</h1>
      <Signup />
      <Toaster />
    </>
  );
}

export default App;
