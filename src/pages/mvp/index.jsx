import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { signIn, signOut } from 'aws-amplify/auth';
import { observer } from 'mobx-react-lite';
// import { useStore } from '../../stores/routeStore'; {/* mobx 使用示例 */}
import Sidebar from '../../components/sidebar';
import Title from '../../components/header';
import './index.css';
import axios from 'axios';

const Mvp = observer(() => {
  const navigate = useNavigate();
  //   const { counter } = useStore(); {/* mobx 使用示例 */}

  useEffect(() => {
    // const user = await signIn({"username": "admin", "password": "admin123"});
    // console.log("user is: ", user);

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    console.log('code in profile: ', code);
    if (code) {
      // 如果 code 存在，则调用函数去换取 token
      console.log('code is: ', code);
      axios
        .get(`https://auth0.sandwichlab.ai/oauth2/callback?code=${code}`)
        .then((res) => {
          console.log('res is: ', res, res.data, res.data.error);
          if (res && res.data && !res.data.error) {
            localStorage.setItem('token_obj', JSON.stringify(res.data));
            if (res.headers) {
              localStorage.setItem(
                'token_obj_header',
                JSON.stringify(res.headers)
              );
            }
          } else if (res.data.error && res.data.error === 'invalid_grant') {
            console.log('expired invalid grant');
            // localStorage.removeItem("token_obj");
            // if(localStorage.getItem("token_obj_header")) {
            //     localStorage.removeItem("token_obj_header");
            // }
            // navigate("/auth");
          }
        })
        .catch((error) => {
          console.log('error is: ', error);
        });
    } else {
      console.error('Authorization code not found in URL.');
    }
  }, []);

  useEffect(() => {
    console.log('66 token interval');
    const checkTokenExpiration = setInterval(() => {
      console.log('68 inside interval');
      const tokenObj = JSON.parse(localStorage.getItem('token_obj'));
      const tokenObjHeader = JSON.parse(
        localStorage.getItem('token_obj_header')
      );
      if (
        tokenObj &&
        tokenObj.expires_in &&
        tokenObjHeader &&
        tokenObjHeader.date
      ) {
        // const expirationTime = new Date(tokenObjHeader.date).getTime() + tokenObj.expires_in * 1000;
        const expirationTime =
          new Date(tokenObjHeader.date).getTime() + tokenObj.expires_in * 1000;
        console.log('cur time', Date.now(), 'expire time:', expirationTime);
        if (Date.now() > expirationTime) {
          console.log('token expired');
          localStorage.removeItem('token_obj');
          localStorage.removeItem('token_obj_header');
          navigate('/auth');
        }
      }
    }, 1000);

    return () => {
      clearInterval(checkTokenExpiration);
    };
  }, [navigate]);

  return (
    <div className='profile__container'>
      {/* mobx 使用示例 */}
      {/* <div>
        <h1>Count: {counter.count}</h1>
        <h2>Double: {counter.double()}</h2>
        <button onClick={counter.increment}>Increment</button>
        <button onClick={counter.decrement}>Decrement</button>
      </div> */}
      <Sidebar />
      <div className='profile__right--container'>
        <Title />
        <Outlet />
      </div>
    </div>
  );
});

export default Mvp;
