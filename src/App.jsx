import React from 'react';
import { AuthProvider } from 'contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'routes/mainRoutes';
import Footer from 'components/Footer';

import './global.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
