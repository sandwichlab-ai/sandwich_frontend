import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (
        localStorage.getItem('token_obj') !== null &&
        localStorage.getItem('token_obj') != '[object Object]' &&
        localStorage.getItem('token_obj_header') != null
      ) {
        console.log(
          'auth part: ',
          JSON.parse(
            localStorage.getItem('token_obj'),
            'start time ',
            JSON.parse(localStorage.getItem('token_obj_header'))
          )
        );
        const dateHeader = JSON.parse(localStorage.getItem('token_obj_header'))[
          'date'
        ];
        console.log(
          'date header: ',
          dateHeader,
          JSON.parse(localStorage.getItem('token_obj_header'))
        );
        const dateObject = new Date(dateHeader);
        console.log('create time: ', dateObject);
        const expireData = 10; // JSON.parse(localStorage.getItem("token_obj"))['expires_in']
        const expirationTime = new Date(dateObject.getTime() + 3 * 1000);
        console.log(
          'date data: ',
          expirationTime,
          dateObject.getTime() + expireData * 1000,
          'current time',
          Date.now()
        );

        console.log('judge: ');

        if (Date.now() + 2000 >= dateObject.getTime() + expireData * 1000) {
          console.log('token expired', 'interval id is: ', intervalId);
          clearInterval(intervalId);
          setIsTokenValid(false);
          localStorage.removeItem('token_obj');
          localStorage.removeItem('token_obj_header');
          navigate('/auth'); // Redirect to login page
        }
      }
    };

    const intervalId = setInterval(checkTokenExpiry, 1000);

    console.log('clear interval id: ', intervalId);
    return () => clearInterval(intervalId);
  }, [navigate]);

  // const navigateRef = useRef(navigate);

  // useEffect(() => {
  //   const checkTokenExpiry = () => {
  //     if (
  //       localStorage.getItem("token_obj") &&
  //       localStorage.getItem("token_obj") !== "[object Object]" &&
  //       localStorage.getItem("token_obj_header")
  //     ) {
  //       const dateHeader = JSON.parse(localStorage.getItem("token_obj_header"))['date'];
  //       const dateObject = new Date(dateHeader);
  //       const expireData = 10; // 示例值，可替换为实际的 expires_in 数据

  //       if (Date.now() + 2000 >= dateObject.getTime() + expireData * 1000) {
  //         console.log("token expired");
  //         clearInterval(intervalId); // 清除定时器

  //         setIsTokenValid(false);
  //         localStorage.removeItem("token_obj");
  //         localStorage.removeItem("token_obj_header");

  //         navigateRef.current("/auth"); // 使用 ref 中的 navigate 进行导航
  //       }
  //     }
  //   };

  //   // 启动检查 token 过期时间的定时器
  //   const intervalId = setInterval(checkTokenExpiry, 1000);

  //   // 清理函数，确保组件卸载时清除 interval
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <AuthContext.Provider value={{ isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
