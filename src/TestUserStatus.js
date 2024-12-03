import { useEffect, useState } from 'react';
import Contact from './pages/home/Contact';
import Home from './pages/home/Home';
import Navigate from './components/navigate';
import './index.css';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';


const TestUserStatus = () => {
    // 测试函数
    const testUserStatus = async () => {
      try {
        // 当前用户会自动刷新token
        const session = await fetchAuthSession();
        console.log("username", session.tokens.idToken.toString());
        // console.log("username", username);
        // console.log("user id", userId);
        // console.log("sign-in details", signInDetails);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    return (
      <div>
        <button onClick={testUserStatus}>Test User Status</button>
      </div>
    );
  };
  
  export default TestUserStatus;