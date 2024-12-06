import React from 'react';
import './index.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/routeStore';
import { Dropdown } from 'antd';

const menuMap = {
  projects: 'Ad Projects',
  brands: 'Brands',
  effect: 'Effect',
};

function Header({ signOut, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { brandList, projectList, currentEffect } = useStore();
  const [, , page, mode, id, isEffect] = location?.pathname?.split('/') || [];
  const getEditName = () => {
    if (page === 'brands') {
      return brandList.currentBrand?.name;
    } else if (page === 'projects') {
      if (isEffect) {
        return currentEffect?.project_name;
      } else {
        return projectList.currentProject?.introduction?.project_name;
      }
    }
  };
  return (
    <div className='lexi__header justify-between'>
      <div className='flex items-center'>
        <div>{`${menuMap[page]}`}</div>
        {location.pathname.includes('edit') && (
          <div className='ml-2'>{`/ ${getEditName()}`}</div>
        )}
        {location.pathname.includes('add') && (
          <div className='ml-2'>{`/ Create`}</div>
        )}
      </div>
      <Dropdown
        menu={{
          items: [
            {
              key: 'logout',
              label: 'Logout',
              onClick: signOut,
            },
          ],
        }}
        placement='bottomRight'
      >
        <div className='lexi__header__logout float-right'>
          <div className='mr-2 rounded-full w-[40px] h-[40px] bg-[#fff] text-center text-[#8C68FF] cursor-pointer'>
            {user?.username?.[0]}
          </div>
        </div>
      </Dropdown>
    </div>
  );
}

export default observer(Header);
