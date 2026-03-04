import API from './axiosInstance';

export const register = (data) => API.post('/Auth/register', data);
export const login = (data) => API.post('/Auth/login', data);
export const forgotPassword = (data) => API.post('/Auth/forgot-password', data);
export const resetPassword = (data) => API.post('/Auth/reset-password', data);
export const updateProfile = (data) => API.put('/Auth/update-profile', data);
