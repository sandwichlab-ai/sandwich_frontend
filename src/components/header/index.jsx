import React, { useState, useMemo } from 'react';
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

  return(
    <div className='lexi__header'>
      <div>{`${menuMap[page]}`}</div>
      <div>{`> ${location.state}`}</div>
    </div>
  );
}

export default Header;
