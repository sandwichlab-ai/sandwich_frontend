import React from "react";
// import { Auth } from 'aws-amplify';
import { signIn } from 'aws-amplify/auth'
import axios from 'axios';

function AuthComponent(props) {

    const handleFacebookLogin = async () => {
        // try {
        //     await Auth.federatedSignIn({ provider: 'Facebook' });
        // } catch (error) {
        //     console.error('Facebook 登录失败:', error);
        // }

        // const user = await signIn({
        //     provider: 'Facebook',
        //     // scope: ['username','email', 'public_profile'],
        //     // redirectSignIn: 'URL_ADDRESS',
        //     // redirectSignOut: 'URL_ADDRESS',
        //     options: {
        //         popup: true,
        //     },
        // });
        // console.log("user is: ",user)
        const inputData = {
          "client_id": "6fq4fehkakj1fvm8jocji3prdi",
          "redirect_uri": "https://openidconnect.net/callback",
          "scope": "openid",
          "response_type": "code",
          "state": "2ec45dc767d955a53b6c21c0705ab3db3bbbdc32"
      }
        axios.get('http://localhost:5000/api', inputData).then((res) => {
            console.log("request result",res);
            
            //  <iframe />
        }).catch((err) => {
            console.log("request error",err);
        })
    };  

  return (
    <div className="Auth">
      <button onClick = {() => handleFacebookLogin()}>auth</button>
    </div>
  );
}

export default AuthComponent;