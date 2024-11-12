import React, {useEffect} from 'react';
import Sidebar from './Sidebar';
import Title from './Title';
import Content from './Content';
import './index.css'; 
import axios from 'axios';

function Profile() {

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        console.log("code in profile: ", code)
        if (code) {
            // 如果 code 存在，则调用函数去换取 token
            console.log("code is: ", code)
            axios.get(`https://auth0.sandwichlab.ai/oauth2/callback?code=${code}`).then(
               res => {
                console.log("res is: ", res)
                if(res && res.data) {
                    localStorage.setItem("token_obj", JSON.stringify(res.data));
                    debugger
                }
               }
            ).catch(
               error => {
                console.log("error is: ", error);
               }
            )
        } else {
            console.error("Authorization code not found in URL.");
        }
    }, []);
    
   return(
    <div className="profile__container">
        <Sidebar />
        <div className="profile__right--container">
            <Title/>
            <Content/>
        </div>
    </div>
   )
}

export default Profile;