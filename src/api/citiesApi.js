import API from './axiosInstance';

export const getAllCities = () => API.get('/Cities');
export const getCityById = (id) => API.get(`/Cities/${id}`);
export const createCity = (data) => API.post('/Cities', data);
export const updateCity = (id, data) => API.put(`/Cities/${id}`, data);
export const deleteCity = (id) => API.delete(`/Cities/${id}`);
