import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import {AuthContextProvider} from './context/AuthContext';
import {DarkModeProvider} from '../src/context/DarkModeContext';
import {RefreshProvider} from '../src/context/RefreshContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <AuthContextProvider>
          <RefreshProvider>
            <App />
          </RefreshProvider>
        </AuthContextProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
