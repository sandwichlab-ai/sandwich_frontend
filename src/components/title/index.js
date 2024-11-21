import React, { useState } from 'react';
import setting from '../../assets/images/profile_settings.png';
import notification from '../../assets/images/profile-notification.png';
import z from '../../assets/images/Z.png';

import './index.css';

function Title() {
  return (
    <div className='title'>
      <span>Profile</span>
      <div>
        <img src={setting} />
        <img src={notification} />
        <img src={z} />
      </div>
    </div>
  );
}

export default Title;
