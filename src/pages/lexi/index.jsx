import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Sidebar from '../../components/sidebar';
import Header from '../../components/header';
import './index.scss';

const Lexi = observer(() => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div
      className={`lexi__container  lexi__container--${
        collapsed ? 'shrink' : 'expand'
      }`}
    >
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className='lexi__container__right'>
        <Header />
        <div className='lexi__container__pages'>
          <Outlet />
        </div>
      </div>
    </div>
  );
});

export default Lexi;
