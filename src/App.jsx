import React, { useEffect } from 'react';
import HomePage from './pages/home';
import Auth from './pages/auth';
import LoginPage from './pages/login';
import Brand from './pages/lexi/brand';
import Lexi from './pages/lexi';
import './App.css';
import { Amplify } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import aws_exports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './stores/routeStore';
import Project from './pages/lexi/project';
import ProjectEdit from './pages/lexi/project/detail';
import BrandCreate from './pages/lexi/brand/detail';
import ProjectEffect from './pages/lexi/project/effect';
import { useNavigate } from 'react-router-dom';

Amplify.configure(aws_exports);

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthEvents = (data) => {
      const { event } = data.payload;

      if (event === 'signIn') {
        console.log('User signed in');
        navigate('/lexi/brand'); // 登录成功后跳转到 dashboard
      } else if (event === 'signUp') {
        console.log('User created account');
        navigate('/lexi/navigate'); // 注册成功后跳转到 welcome
      }
    };
    // // 监听 Auth 事件
    // Hub.listen('auth', handleAuthEvents);

    // return () => {
    //   // Hub.remove('auth', handleAuthEvents);
    // };
  }, [navigate]);


  return (
    <Authenticator socialProviders={['facebook']}>
      {({ signOut, user }) => (
        <StoreProvider>
          <div className='App'>
            <button onClick={() => signOut()}>test</button>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/auth' element={<Auth />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/lexi' element={<Lexi />}>
                {/* <Route path='brands' element={<Profile />} /> */}
                <Route path='brands' element={<Brand />} >
                  <Route path="add" element={<BrandCreate />} />
                  <Route path="edit/:id" element={<BrandCreate />} />
                </Route>
                <Route path='projects' element={<Project />}>
                  <Route path=":mode/:id" element={<ProjectEdit />} />
                  <Route path="effect" element={<ProjectEffect />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </StoreProvider>
      )}
    </Authenticator>
  );
}

export default App;
