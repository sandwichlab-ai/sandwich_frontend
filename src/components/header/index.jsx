import React, { useState, useMemo, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useLocation } from 'react-router-dom';

const menuMap = {
  projects: 'Ad Projects',
  brands: 'Brands',
};

function Header() {
  const location = useLocation();
  console.log("location is: ", location);
  const [, , page] = location?.pathname?.split('/') || [];

  const navigate = useNavigate();

  useEffect(() => {
    console.log("header effect")
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
    // 监听 Auth 事件
    Hub.listen('auth', handleAuthEvents);

    return () => {
      // Hub.remove('auth', handleAuthEvents);

    };
  })

  return (
    <div className='lexi__header'>
      <div>{`${menuMap[page]}`}</div>
      {location.pathname.includes("edit") && <div>{`> ${location.state}`}</div>}
      {location.pathname.includes("add") && <div>{`> Create`}</div>}
    </div>
  );
}

export default Header;
