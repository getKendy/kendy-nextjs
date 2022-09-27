import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import Profile from './components/User/Settings/Profile';
import Magic from './components/Auth/Magic';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Settings from './components/User/Settings';
import Alert from './components/AlertBinance/Alert';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/auth/magic-url" element={<Magic />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
