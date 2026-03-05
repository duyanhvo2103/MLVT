import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const baseApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

baseApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      console.error(`API error: ${error.response.status} - ${error.response.data}`);
    } else {
      console.error('Network error or request was not processed');
    }
    return Promise.reject(error);
  }
);
export default baseApi;
