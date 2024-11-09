import React from'react';
import HomePage from './HomePage';
import Auth from './Auth';
import LoginPage from './LoginPage';
import Profile from './Profile';
import './App.css';
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';

Amplify.configure(aws_exports);

function App() {
  return (
    <div className="App">
        {/* <HomePage /> */}
       
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/login" element={<LoginPage />} /> */}
            </Routes>
        </Router>
       
        {/* <HomePage /> */}
        {/* <Auth /> */}
        {/* <LoginPage /> */}
    </div>
  );
}

export default App;
