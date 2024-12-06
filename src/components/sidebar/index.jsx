import React, { useState } from 'react';
import { Button, Menu } from 'antd';
import logo from '../../assets/images/logosandwich.png';
import logoShrink from '../../assets/images/logosandwich-shrink.png';
import { ReactComponent as Brands } from '../../assets/images/brands.svg';
import { ReactComponent as Ads } from '../../assets/images/ads.svg';
import { ReactComponent as Setting } from '../../assets/images/setting.svg';
import { ReactComponent as Expand } from '../../assets/images/expand.svg';

import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const items = [
  {
    key: 'brands',
    icon: <Brands fontSize={12} />,
    label: 'Brands',
  },
  {
    key: 'projects',
    icon: <Ads />,
    label: 'Ad Projects',
  },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate(); // 获取 navigate 函数
  const location = useLocation();
  const [, , page] = location?.pathname?.split('/') || [];
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    console.log('key is: ', key);
    navigate(key); // 跳转到对应的路由
  };

  return (
    <div className='lexi__sidebar'>
      <div className='brand__logo'>
        <img src={collapsed ? logoShrink : logo} alt='logo' />
        <Button
          type='default'
          shape='circle'
          size='small'
          onClick={toggleCollapsed}
          className='lexi__sidebar--expand'
        >
          <Expand />
        </Button>
      </div>

      <Menu
        defaultSelectedKeys={page}
        mode='inline'
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick} // 菜单点击事件
      />
    </div>
  );
};

export default Sidebar;
