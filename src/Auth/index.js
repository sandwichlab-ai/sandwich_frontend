import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { Auth } from 'aws-amplify';
import { signIn } from 'aws-amplify/auth'
import axios from 'axios';

function AuthComponent(props) {
    const location = useLocation();
    const [content, setContent] = useState("");

    const handleFacebookLogin = async () => {
      console.log("environment: ", process.env.NODE_ENV)
      const redirectUri = process.env.NODE_ENV == "production"
  ? "https://openidconnect.net/callback"
  : "http://localhost:3000/auth";

      // window.location.href = "https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=6cc58a4esgfbhngiq8437afip1&redirect_uri=https://openidconnect.net/callback";
      window.open(`https://sandwichlab.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=6cc58a4esgfbhngiq8437afip1&redirect_uri=${redirectUri}`, "_blank")  
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
          // "client_id": "6fq4fehkakj1fvm8jocji3prdi",
          // "redirect_uri": "https://openidconnect.net/callback",
          // "scope": "openid",
          // "response_type": "code",
          // "state": "2ec45dc767d955a53b6c21c0705ab3db3bbbdc32",
          // "redirect_uri": "https://www.google.com"
          "response_type": "code",
          "client_id": "6cc58a4esgfbhngiq8437afip1",
          "redirect_uri": "https://openidconnect.net/callback",
      }
        // axios.get('http://localhost:5000/api', inputData).then((res) => {
            
            // console.log("request result",res.data.replace(/null\/null\//g, "https://d3ownpzpj4jdb9.cloudfront.net/20240614193835"));
            
            // setContent(res.data.replace(/null\/null\//g, "https://d3ownpzpj4jdb9.cloudfront.net/20240614193835"))
        
        
        // axios.get("http://localhost:5000/login?response_type=code&client_id=6cc58a4esgfbhngiq8437afip1&redirect_uri=https://openidconnect.net/callback").then((res) => { 
        // //     setContent(res.data) 
        
        // // axios.get('http://localhost:5000/api', inputData).then((res) => {
            
        //     console.log("request result",res.data.replace(/null\/null\//g, "https://d3ownpzpj4jdb9.cloudfront.net/20240614193835"));
            
        //     setContent(res.data.replace(/null\/null\//g, "https://d3ownpzpj4jdb9.cloudfront.net/20240614193835"))

        //     //  <iframe />
        // }).catch((err) => {
        //     console.log("request error",err);
        // })
    };  

    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
  
      if (code) {
        // 发送 code 到服务器或进行后续处理
        console.log("Authorization code:", code);
  
      //   // 在此处调用你的后端服务，交换该 code 换取用户访问令牌
      //   fetch("https://your-backend.com/auth/facebook", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ code }),
      //   })
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log("Token data:", data);
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching token:", error);
      //     });
      // } else {
      //   console.error("Authorization code not found.");
      // }
      }
    }, [location]);


  return (
    <div className="Auth">
      <button onClick = {() => handleFacebookLogin()}>auth</button>
      <div
      dangerouslySetInnerHTML={{ __html: content }}
    />
    </div>
  );
}

export default AuthComponent;