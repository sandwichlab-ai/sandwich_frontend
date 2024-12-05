import React, { useEffect } from 'react';
import HomePage from './pages/home';
import Brand from './pages/lexi/brand';
import Lexi from './pages/lexi';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';
import { Hub } from '@aws-amplify/core';
import http from './utils/axiosInstance';
import { Authenticator } from '@aws-amplify/ui-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Project from './pages/lexi/project';
import ProjectEdit from './pages/lexi/project/detail';
import BrandCreate from './pages/lexi/brand/detail';
import ProjectEffect from './pages/lexi/project/effect';
import './mock'; // 引入 mock 数据

Amplify.configure(aws_exports);

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const listener = async (data) => {
      switch (data.payload.event) {
        case 'signedIn':
          console.log('User signed in');
          await http.get('https://auth0.sandwichlab.ai/oauth2/callback');
          // TODO 登录成功后发送给后端创建用户
          navigate('/lexi/brands/add');
          break;
        case 'signOut':
          console.log('User signed out');
          // 在这里处理登出后的逻辑
          break;
        default:
          break;
      }
    };

    Hub.listen('auth', listener);
  }, []);
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route
        path='/*'
        element={
          <Authenticator socialProviders={['google']}>
            {({ signOut, user }) => (
              <div className='App'>
                <Routes>
                  <Route
                    path='/lexi'
                    element={<Lexi signOut={signOut} user={user} />}
                  >
                    <Route
                      index
                      element={<Navigate to='/lexi/brands' replace />}
                    />
                    <Route path='brands'>
                      <Route index element={<Brand />}></Route>
                      <Route path=':mode/:id?' element={<BrandCreate />} />
                    </Route>
                    <Route path='projects'>
                      <Route index element={<Project />} />
                      <Route path=':mode/:id?' element={<ProjectEdit />} />
                      <Route path='effect/:id' element={<ProjectEffect />} />
                    </Route>
                  </Route>
                </Routes>
              </div>
            )}
          </Authenticator>
        }
      />
    </Routes>
  );
}

export default App;
