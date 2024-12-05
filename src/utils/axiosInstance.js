import axios from 'axios';
import { getCurrentUser } from 'aws-amplify/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

const axiosInstance = axios.create({
  baseURL: 'https://api-dev.sandwichlab.ai', // 'http://192.168.0.38:8080', // 替换为你的 API 基础地址
  timeout: 10000, // 请求超时时间
});

export const testUserStatus = async () => {
  try {
    // 当前用户会自动刷新token
    const session = await fetchAuthSession();
    return session.tokens.idToken.toString();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await testUserStatus();
    if (token) {
      config.headers['Authorization'] = token;
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
