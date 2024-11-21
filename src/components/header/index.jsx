import React, { useState, useMemo } from 'react';
import './index.scss';
import { useLocation } from 'react-router-dom';

const menuMap = {
  projects: 'Ad Projects',
};

function Header() {
  const location = useLocation();
  console.log(location);
  const [, , page] = location?.pathname?.split('/') || [];

  return (
    <div className='lexi__header'>
      <div>{`${menuMap[page]}`}</div>
      <div></div>
    </div>
  );
}

export default Header;
