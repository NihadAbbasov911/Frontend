import API from './axiosInstance';

export const getAllBrands = () => API.get('/Brands');
export const getBrandById = (id) => API.get(`/Brands/${id}`);
export const createBrand = (data) => API.post('/Brands', data);
export const updateBrand = (id, data) => API.put(`/Brands/${id}`, data);
export const deleteBrand = (id) => API.delete(`/Brands/${id}`);
