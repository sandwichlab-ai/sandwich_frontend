import React, { useEffect } from 'react';
import HomePage from './pages/home';
import Auth from './pages/auth';
import LoginPage from './pages/login';
import Brand from './pages/lexi/brand';
import Lexi from './pages/lexi';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { StoreProvider } from './stores/routeStore';
import Project from './pages/lexi/project';
import ProjectEdit from './pages/lexi/project/detail';
import BrandCreate from './pages/lexi/brand/detail';
import ProjectEffect from './pages/lexi/project/effect';
import './mock'; // 引入 mock 数据
import { useNavigate } from 'react-router-dom';
import TestUserStatus from './TestUserStatus'; // 引入你的测试按钮组件

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
    <div>
    <h1>Test User Status App</h1>
    <TestUserStatus /> {/* 确保这里渲染了 TestUserStatus */}
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/' element={<HomePage />} />
      <Route
        path='/*'
        element={
          <Authenticator loginMechanisms={['email']} signUpAttributes={['gender']} socialProviders={['apple', 'google']}>
          {({ signOut, user }) => (
            <main>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
        </Authenticator>
          // <Authenticator socialProviders={['facebook', 'google']}>
          //   {({ signOut, user }) => (
          //     <StoreProvider>
          //       <div className='App'>
          //         {/* <button onClick={() => signOut()}>Sign Out</button> */}
          //         <Routes>
          //           {/* <Route path='/login' element={<LoginPage />} /> */}
          //           <Route path='/lexi' element={<Lexi />}>
          //             <Route
          //               index
          //               element={<Navigate to='/lexi/brands' replace />}
          //             />
          //             <Route path='brands' element={<Brand />}>
          //               <Route path=':mode/:id' element={<BrandCreate />} />
          //             </Route>
          //             <Route path='projects'>
          //               <Route index element={<Project />} />
          //               <Route path=':mode/:id?' element={<ProjectEdit />} />
          //               <Route path='effect/:id' element={<ProjectEffect />} />
          //             </Route>
          //           </Route>
          //         </Routes>
          //       </div>
          //     </StoreProvider>
          //   )}
          // </Authenticator>
        }
      />
    </Routes>

    </div>
  );
}

export default App;
