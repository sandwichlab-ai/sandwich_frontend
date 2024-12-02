import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api-dev.sandwichlab.ai', // 'http://192.168.0.38:8080', // 替换为你的 API 基础地址
  timeout: 10000, // 请求超时时间
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(
      'token is: ',
      token,
      'header is: ',
      localStorage.getItem('token')
    );
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized, please log in again.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
