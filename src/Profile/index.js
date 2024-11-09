import React, {useState} from 'react';
import Sidebar from './Sidebar';
import Title from './Title';
import Content from './Content';
import './index.css'; 

function Profile() {
   return(
    <div className="profile__container">
        <Sidebar />
        <div className="profile__right--container">
            {/* <Profile/> */}
            <Title/>
            <Content/>
        </div>
    </div>
   )
}

export default Profile;