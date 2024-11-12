import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { signIn, signOut } from 'aws-amplify/auth';
import Sidebar from './Sidebar';
import Title from './Title';
import Content from './Content';
import './index.css'; 
import axios from 'axios';

function Profile() {
    const navigate = useNavigate();

    useEffect(async () => {
        // const user = await signIn({"username": "admin", "password": "admin123"});
        // console.log("user is: ", user);


        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        console.log("code in profile: ", code)
        if (code) {
            // 如果 code 存在，则调用函数去换取 token
            console.log("code is: ", code)
            axios.get(`https://auth0.sandwichlab.ai/oauth2/callback?code=${code}`).then(
               res => {
                console.log("res is: ", res, res.data, res.data.error)
                if(res && res.data && !res.data.error) {
                    localStorage.setItem("token_obj", JSON.stringify(res.data));
                    if(res.headers) {
                        localStorage.setItem("token_obj_header", JSON.stringify(res.headers));
                    }
                } else if(res.data.error && res.data.error === "invalid_grant") {
                    console.log("expired invalid grant")
                    // localStorage.removeItem("token_obj");
                    // if(localStorage.getItem("token_obj_header")) {
                    //     localStorage.removeItem("token_obj_header");
                    // }
                    // navigate("/auth");
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