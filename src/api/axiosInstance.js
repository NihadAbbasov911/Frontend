import axios from 'axios';

const API = axios.create({
  baseURL: 'https://nihad911-001-site1.rtempurl.com/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('aucto_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('aucto_token');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default API;
