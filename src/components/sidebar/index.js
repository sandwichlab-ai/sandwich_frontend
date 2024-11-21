import React, { useState } from 'react';
import image from '../../assets/images/logosandwich.png';
import { ReactComponent as Icon } from '../../assets/images/Icon.svg';
import { ReactComponent as Ads } from '../../assets/images/ads.svg';
import { ReactComponent as Creative } from '../../assets/images/creative.svg';
import { ReactComponent as Setting } from '../../assets/images/setting.svg';

import './index.css';

function Sidebar() {
  const [options, setOptions] = useState([
    'Profile',
    'Ad Projects',
    'Creatives',
    'Settings',
  ]);
  const [iconColor, setIconColor] = useState([
    'black',
    'black',
    'black',
    'black',
  ]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className='profile__sidebar--container'>
      <img src={image} alt='' />
      <div className='profile__sidebar--content'>
        <div
          key='0'
          onClick={() => {
            setIconColor(['#8C68FF', 'black', 'black', 'black']);
            setSelectedIndex(0);
            document
              .querySelector('.icon_test')
              .firstChild.setAttribute('fill', '#8C68FF');
            document
              .querySelector('.icon_ads')
              .firstChild.setAttribute('fill', 'black');
            document
              .querySelector('.icon_creative')
              .children[1].children[0].setAttribute('fill', 'black');
            document
              .querySelector('.icon_setting')
              .firstChild.setAttribute('fill', 'black');
          }}
        >
          {<Icon fill={iconColor[0]} className='icon_test' />}{' '}
          <span
            style={{
              cursor: 'pointer',
              color: selectedIndex === 0 ? '#8C68FF' : 'black',
            }}
          >
            {options[0]}
          </span>
        </div>
        <div
          key='1'
          onClick={() => {
            setIconColor(['black', 'purple', 'black', 'black']);
            setSelectedIndex(1);
            document
              .querySelector('.icon_test')
              .firstChild.setAttribute('fill', 'black');
            document
              .querySelector('.icon_ads')
              .firstChild.setAttribute('fill', '#8C68FF');
            document
              .querySelector('.icon_creative')
              .children[1].children[0].setAttribute('fill', 'black');
            document
              .querySelector('.icon_setting')
              .firstChild.setAttribute('fill', 'black');
          }}
        >
          {<Ads fill={iconColor[1]} className='icon_ads' />}{' '}
          <span
            style={{
              cursor: 'pointer',
              color: selectedIndex === 1 ? '#8C68FF' : 'black',
            }}
          >
            {options[1]}
          </span>
        </div>
        <div
          key='2'
          onClick={() => {
            setIconColor(['black', 'black', 'purple', 'black']);
            setSelectedIndex(2);
            document
              .querySelector('.icon_test')
              .firstChild.setAttribute('fill', 'black');
            document
              .querySelector('.icon_ads')
              .firstChild.setAttribute('fill', 'black');
            document
              .querySelector('.icon_creative')
              .children[1].children[0].setAttribute('fill', '#8C68FF');
            document
              .querySelector('.icon_setting')
              .firstChild.setAttribute('fill', 'black');
          }}
        >
          {<Creative fill={iconColor[2]} className='icon_creative' />}{' '}
          <span
            style={{
              cursor: 'pointer',
              color: selectedIndex === 2 ? '#8C68FF' : 'black',
            }}
          >
            {options[2]}
          </span>
        </div>
        <div
          key='3'
          onClick={() => {
            setIconColor(['black', 'black', 'black', 'purple']);
            setSelectedIndex(3);
            document
              .querySelector('.icon_test')
              .firstChild.setAttribute('fill', 'black');
            document
              .querySelector('.icon_ads')
              .firstChild.setAttribute('fill', 'black');
            document
              .querySelector('.icon_creative')
              .children[1].children[0].setAttribute('fill', 'black');
            document
              .querySelector('.icon_setting')
              .firstChild.setAttribute('fill', '#8C68FF');
          }}
        >
          {<Setting fill={iconColor[3]} className='icon_setting' />}{' '}
          <span
            style={{
              cursor: 'pointer',
              color: selectedIndex === 3 ? '#8C68FF' : 'black',
            }}
          >
            {options[3]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
