import React from 'react';
import './index.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/routeStore';

const menuMap = {
  projects: 'Ad Projects',
  brands: 'Brands',
};

function Header({ signOut, user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, id } = useParams();
  const { brandList, projectList } = useStore();
  console.log('currentBrand is: ', brandList.currentBrand?.toJSON());
  console.log('currentProject is: ', projectList.currentProject?.toJSON());
  const [, , page] = location?.pathname?.split('/') || [];
  const getEditName = () => {
    if (page === 'brands') {
      return brandList.currentBrand?.name;
    } else {
      return projectList.currentProject?.introduction?.project_name;
    }
  };
  return (
    <div className='lexi__header'>
      <div>{`${menuMap[page]}`}</div>
      {location.pathname.includes('edit') && <div>{`> ${getEditName()}`}</div>}
      {location.pathname.includes('add') && <div>{`> Create`}</div>}
      <div className='lexi__header__logout ' onClick={signOut}>
        Logout
      </div>
      <div>{user?.username}</div>
    </div>
  );
}

export default observer(Header);
