import React, { useState, useMemo, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth'
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

    const asyncFn = async () => {
      try {
        const session = await fetchAuthSession({ forceRefresh: true });
        console.log("session is: ", session, session.tokens.accessToken, session.tokens.refreshToken)
        // const idToken = session.getIdToken().getJwtToken(); // ID Token
        // const accessToken = session.getAccessToken().getJwtToken(); // Access Token
        // const refreshToken = session.getRefreshToken().getToken(); // Refresh Token

        localStorage.setItem("accessToken", "")
        console.log("access token before", localStorage.getItem('accessToken'))
        console.log("session is: ", session.tokens.accessToken, "id Token", session.tokens.idToken, "localStorage is: ");
        session.tokens.accessToken && localStorage.setItem('accessToken', session.tokens.accessToken);
        session.tokens.idToken && localStorage.setItem('idToken', session.tokens.idToken);

        console.log("token: ", localStorage.getItem('accessToken'))
        // console.log('ID Token:', idToken);
        // console.log('Access Token:', accessToken);
        // console.log('Refresh Token:', refreshToken);

        // return { idToken, accessToken, refreshToken };
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }

    }

    asyncFn()

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
