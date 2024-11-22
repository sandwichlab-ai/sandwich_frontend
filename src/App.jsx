import React from 'react';
import HomePage from './pages/home';
import Auth from './pages/auth';
import LoginPage from './pages/login';
import Brand from './pages/lexi/brand';
import Lexi from './pages/lexi';
import './App.css';
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './stores/routeStore';
import Project from './pages/lexi/project';
import ProjectEdit from './pages/lexi/project/detail';
import BrandCreate from './pages/lexi/brand/detail'
import ProjectEffect from './pages/lexi/project/effect';

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
            <Route path='brands' element={<Brand />} >
             <Route path="add" element={<BrandCreate />} />
            </Route>
            <Route path='projects' element={<Project />}>
              <Route path=":action" element={<ProjectEdit />} />
              <Route path="effect" element={<ProjectEffect />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
