import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import Magic from './components/Auth/Magic';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Settings from './components/User/Settings';
import Alert from './components/Alerts';
import Statics from './components/Statics';

function App() {
  return (
    <div className="text-base-content bg-base-200 h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/magic-url" element={<Magic />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/alerts" element={<Alert />} />
          <Route path="/statics" element={<Statics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
