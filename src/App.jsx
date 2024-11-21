import React from 'react';
import HomePage from './pages/home';
import Auth from './pages/auth';
import LoginPage from './pages/login';
import Profile from './pages/lexi/profile';
import Lexi from './pages/lexi';
import './App.css';
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './stores/routeStore';

Amplify.configure(aws_exports);

function App() {
  return (
    <StoreProvider>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/lexi' element={<Lexi />}>
            <Route index element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
